from django.urls import path, include,re_path
from rest_framework.routers import DefaultRouter
from .core import CustomPasswordResetView, confirm_email,ResendEmailVerificationView, email_confirmation_done, email_confirmation_failure,CustomPasswordResetConfirmView ,CustomTokenRefreshView
from dj_rest_auth.views import PasswordResetConfirmView
from .views import UserViewSet
router = DefaultRouter()
router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('api/', include(router.urls)),
    path('register/account-confirm-email/<str:key>/', confirm_email, name='account_confirm_email'),
    path('email-confirmation-done/', email_confirmation_done, name='email_confirmation_done'),
    path('email-confirmation-failure/', email_confirmation_failure, name='email_confirmation_failure'),
    re_path(r'^resend-email/?$', ResendEmailVerificationView.as_view(), name="rest_resend_email_verification"),


    path('user/password/reset/', CustomPasswordResetView.as_view(), name='password_reset'),
    path('reset/<uidb64>/<token>/', CustomPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    re_path('api/reset/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),

    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),


]
