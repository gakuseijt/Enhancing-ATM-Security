import os
from django.contrib.auth.models import AbstractUser, BaseUserManager, PermissionsMixin, Group
from django.db import models
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver
import dlib
import numpy as np
from PIL import Image
from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from django.core import validators
from django.utils.deconstruct import deconstructible
from django.utils.translation import gettext_lazy as _



@deconstructible
class UnicodeUsernameValidator(validators.RegexValidator):
    regex = r"^[\w.@+-]+\Z"
    message = _(
        "Enter a valid username. This value may contain only letters, "
        "numbers, and @/./+/-/_ characters."
    )
    flags = 0
class CustomUser(AbstractUser, PermissionsMixin):
    ROLE_CHOICES = [
        ("student", "Student"),
        ("staff", "Staff"),
        ("admin", "Admin"),
    ]
    username_validator = UnicodeUsernameValidator()

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=15, choices=ROLE_CHOICES)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    username = models.CharField(
        _("username"),
        max_length=150,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        }, blank=True, null=True
    )
    address = models.TextField(blank=True, null=True)   
    registered_face = models.ImageField(
        upload_to="faces/", blank=True, null=True
    )  # Used for facial recognition authentication
    face_encoding = models.JSONField(blank=True, null=True)  # Store face encoding as JSON

    # Staff-specific fields
    employee_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self):
        return f"{self.email} ({self.get_role_display()})"
    
    def get_role_display(self):
        return self.role.capitalize()

    def is_student(self):
        return self.role == "student"

    
    def is_admin(self):
        return self.role == "admin"
    
    def save(self, *args, **kwargs):
        """Override save method to dynamically assign groups."""
        super().save(*args, **kwargs)  # Save user first

        # Ensure role has a corresponding group
        if self.role:
            group, _ = Group.objects.get_or_create(name=self.role)  # Create if not exists
            self.groups.set([group])  # Assign user to their respective group

        # Assign is_staff automatically for admin users
        if self.role == "admin":
            self.is_staff = True
            self.is_superuser = True
        elif self.role == "staff":
            self.is_staff = True
        else:
            self.is_staff = False

        super().save(*args, **kwargs)  # Save user again after setting groups
# Paths to Dlib models
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SHAPE_PREDICTOR_PATH = os.path.join(BASE_DIR, "dlib" , "shape_predictor_68_face_landmarks.dat")
FACE_RECOGNITION_MODEL_PATH = os.path.join(BASE_DIR, "dlib" , "dlib_face_recognition_resnet_model_v1.dat")

# Ensure required model files exist
for path in [SHAPE_PREDICTOR_PATH, FACE_RECOGNITION_MODEL_PATH]:
    if not os.path.exists(path):
        raise RuntimeError(f"Missing file: {path}")

# Load Dlib models globally
face_detector = dlib.get_frontal_face_detector()
shape_predictor = dlib.shape_predictor(SHAPE_PREDICTOR_PATH)
face_rec_model = dlib.face_recognition_model_v1(FACE_RECOGNITION_MODEL_PATH)
# ======================== FACE ENCODING FUNCTION ========================
def get_face_encoding(image):
    """Extracts face encoding using dlib"""
    try:
        img = Image.open(image).convert("RGB")
        img_array = np.array(img)
        detections = face_detector(img_array)

        if len(detections) == 0:
            raise serializers.ValidationError("No face detected in the image.")
        elif len(detections) > 1:
            raise serializers.ValidationError("Multiple faces detected. Please upload a clear image with one face.")

        shape = shape_predictor(img_array, detections[0])
        encoding = np.array(face_rec_model.compute_face_descriptor(img_array, shape))

        return encoding.tolist()  # Store as JSON-friendly format
    except Exception as e:
        raise serializers.ValidationError(f"Error processing face image: {str(e)}")
@receiver(post_save, sender=CustomUser)
def assign_user_group(sender, instance, created, **kwargs):
    """Assign user to a group based on their role after creation"""
    if created and instance.role:
        group, _ = Group.objects.get_or_create(name=instance.role)
        instance.groups.set([group])  # Assign user to their respective group
@receiver(post_save, sender=CustomUser)
def generate_face_encoding(sender, instance, **kwargs):
    """Auto-generate Face encoding only if the image is modified"""
    if instance.registered_face:
        # Load face encoding
        encoding = get_face_encoding(instance.registered_face)

        # Prevent recursive save by updating the field directly
        CustomUser.objects.filter(id=instance.id).update(face_encoding=encoding)