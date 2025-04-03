from rest_framework import viewsets
from .models import Account, Transaction, Withdrawal, Deposit, Transfer, BillPayment
from .serializers import (
    AccountSerializer, TransactionSerializer, WithdrawalSerializer, 
    DepositSerializer, TransferSerializer, BillPaymentSerializer
)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class WithdrawalViewSet(viewsets.ModelViewSet):
    queryset = Withdrawal.objects.all()
    serializer_class = WithdrawalSerializer


class DepositViewSet(viewsets.ModelViewSet):
    queryset = Deposit.objects.all()
    serializer_class = DepositSerializer


class TransferViewSet(viewsets.ModelViewSet):
    queryset = Transfer.objects.all()
    serializer_class = TransferSerializer


class BillPaymentViewSet(viewsets.ModelViewSet):
    queryset = BillPayment.objects.all()
    serializer_class = BillPaymentSerializer
