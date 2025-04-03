from os import read
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.serializers import ValidationError
from .models import CustomUser
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from .tasks import send_mass_registration_email
User = get_user_model()

# ======================== TOKEN REFRESH ========================
class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    """Handles token refresh with user existence check"""
    def validate(self, attrs):
        try:
            data = super().validate(attrs)
            return data
        except ObjectDoesNotExist:
            raise InvalidToken("User no longer exists.")
# ======================== USER REGISTRATION ========================
class CustomRegisterSerializer(RegisterSerializer):
    """Serializer for registering a user with required fields"""
    
    role = serializers.ChoiceField(choices=CustomUser.ROLE_CHOICES)
    phone_number = serializers.CharField(required=False, allow_blank=True)
    student_id = serializers.CharField(required=False, allow_blank=True)
    employee_id = serializers.CharField(required=False, allow_blank=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)
    registered_face = serializers.ImageField(required=False)
    

    class Meta:
        model = CustomUser
        fields = "__all__"
        read_only_fields = ["id", "is_verified", "date_joined"]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate_role(self, value):
        """Ensure valid roles are assigned"""
        if value not in dict(CustomUser.ROLE_CHOICES).keys():
            raise serializers.ValidationError("Invalid role selected.")
        return value

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email is required.")
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    def custom_signup(self, request, user):
        """Custom user creation logic with face encoding"""
        face_image = self.validated_data.pop("registered_face", None)

        user.role = self.validated_data["role"]
        user.phone_number = self.validated_data.get("phone_number", None)
        user.employee_id = self.validated_data.get("employee_id") or None  # Set to None if empty
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.registered_face = face_image
        user.save()

        # Send password reset email
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        backend_domain = request.get_host()  # Get the backend's domain dynamically

        reset_password_link = f"http://{backend_domain}{reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token})}"

        context = {
            "user": UserSerializer(user).data,
            "reset_password_link": reset_password_link,
            "sitename": settings.SITENAME
        }

        send_mass_registration_email.delay(user.email, context)

        return user


# ======================== USER UPDATE ========================
class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user details"""
    registered_face = serializers.ImageField(required=False, write_only=True)


    class Meta:
        model = CustomUser
        fields = "__all__"
        extra_kwargs = {
            'password': {'write_only': True},
        }
        

    def update(self, instance, validated_data):
        """Handle optional updates, including face encoding"""
        face_image = validated_data.pop("registered_face", None)
        if face_image:
            instance.registered_face = face_image

        return super().update(instance, validated_data)

# ======================== USER SERIALIZERS ========================

class UserSerializer(serializers.ModelSerializer):
    """Serializer for retrieving user details."""    
    registered_face = serializers.ImageField(required=False, write_only=True)


    class Meta:
        model = CustomUser
        fields = "__all__"
        read_only_fields = ["id", "role", "date_joined", "is_verified"]
        extra_kwargs = {
            'password': {'write_only': True},
            'face_encoding': {'write_only': True},
        }

# ======================== RESEND EMAIL VERIFICATION ========================
class ResendEmailVerificationSerializer(serializers.Serializer):
    """Serializer for resending email verification"""
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No account found with this email.")
        return value
