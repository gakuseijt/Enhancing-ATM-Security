import django_filters
from django.contrib.auth import get_user_model


User = get_user_model()


class UserFilter(django_filters.FilterSet):
    role = django_filters.ChoiceFilter(choices=User.ROLE_CHOICES)
    department = django_filters.CharFilter(field_name="department__name", lookup_expr="icontains")
    email = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = User
        fields = ["role", "department", "email"]
