from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = (
        "email",
        "role",
        "is_verified",
        "is_active",
        "is_staff",
        "date_joined",
    )
    list_filter = ("role", "is_verified", "is_active", "is_staff")
    search_fields = ("email", "employee_id", "phone_number")
    ordering = ("-date_joined",)
    readonly_fields = ("face_encoding","date_joined", "last_updated")

    fieldsets = (
        ("Account Info", {"fields": ("email", "password")}),
        ("Personal Details", {"fields": ("phone_number", "is_verified", "employee_id", "first_name", "last_name")}),
        ("Roles & Permissions", {"fields": ("role", "groups", "user_permissions")}),
        ("Status", {"fields": ("is_active", "is_staff", "is_superuser")}),
        ("Timestamps", {"fields": ("date_joined", "last_updated")}),
        (" Verification details", {"fields": ("registered_face", "face_encoding")}),
    )

    add_fieldsets = (
        (
            "Create User",
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "role", "is_active"),
            },
        ),
    )

    actions = ["mark_verified"]

    def mark_verified(self, request, queryset):
        """Admin action to mark selected users as verified"""
        queryset.update(is_verified=True)
        self.message_user(request, "Selected users have been verified successfully.")

    mark_verified.short_description = "Mark selected users as Verified"

    filter_horizontal = ("groups", "user_permissions")


# Register the model
admin.site.register(CustomUser, CustomUserAdmin)

# Optionally unregister the built-in Group model if not used directly
admin.site.unregister(Group)