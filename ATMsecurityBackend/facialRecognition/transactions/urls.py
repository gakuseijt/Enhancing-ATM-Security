from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AccountViewSet, TransactionViewSet, WithdrawalViewSet, 
    DepositViewSet, TransferViewSet, BillPaymentViewSet
)

router = DefaultRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'withdrawals', WithdrawalViewSet)
router.register(r'deposits', DepositViewSet)
router.register(r'transfers', TransferViewSet)
router.register(r'bill-payments', BillPaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
