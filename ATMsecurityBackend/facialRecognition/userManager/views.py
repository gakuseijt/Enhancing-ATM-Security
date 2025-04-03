from rest_framework import viewsets, permissions, status
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import get_user_model
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.decorators import action
import random
import string
from .serializers import (
    UserSerializer,
    CustomRegisterSerializer,
    UserUpdateSerializer,
)
from .filters import UserFilter

# Custom pagination class for controlling page size and limits
class CustomPagination(PageNumberPagination):
    page_size = 10  # Default page size
    page_size_query_param = "page_size"  # Allows clients to set page size dynamically
    max_page_size = 50  # Maximum page size limit

# Get the custom user model
User = get_user_model()


def generate_random_password(length=12):
    """Generate a random password with letters, digits, and special characters."""
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for _ in range(length))


class UserViewSet(viewsets.ModelViewSet):
    """
    Viewset for managing users.
    - By default, returns the authenticated user's data.
    - Allows querying all users based on role permissions.
    - Supports filtering by role, department, and email.
    - Implements pagination for better performance.
    """

    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = UserFilter
    pagination_class = CustomPagination

    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.all().order_by("-date_joined")
        if not self.request.query_params.get("all") == "true":
            return queryset.filter(id=user.id)
        if user.role in ["admin", "config_user", "hod", "dp_academics"]:
            return queryset
        return queryset.filter(id=user.id)

    def get_serializer_class(self):
        if self.action == "create":
            return CustomRegisterSerializer
        if self.action in ["update", "partial_update"]:
            return UserUpdateSerializer
        return UserSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.set_password(self.request.data["password"])
        face_image = self.request.FILES.get("registered_face", None)
        if face_image:
            encoding = self.get_face_encoding(face_image)
            user.face_encoding = encoding
            user.save()
        user.save()

    @action(detail=False, methods=["post"], permission_classes=[permissions.IsAdminUser])
    def mass_register(self, request):
        """
        Custom endpoint for mass user registration.
        - Accepts a list of users.
        - Generates a random password for each user.
        - Sends an email with the password reset instructions.
        """
        users_data = request.data.get("users", [])
        created_users = []
        errors = []

        for user_data in users_data:
            password = generate_random_password()
            username = user_data.get("username", None)
            if not username:
                # generate username from email
                username = user_data.get("email", "").split("@")[0]
            user_data["username"] = username
            user_data["password1"] = password
            user_data["password2"] = password

            serializer = CustomRegisterSerializer(data=user_data, context={"request": request})
            if serializer.is_valid():
                user = serializer.save(request=request)
                user.set_password(password)
                user.save()
                
                created_users.append(UserSerializer(user).data)
            else:
                errors.append({"data": user_data, "errors": serializer.errors})

        return Response({"created_users": created_users, "errors": errors}, status=status.HTTP_201_CREATED)

