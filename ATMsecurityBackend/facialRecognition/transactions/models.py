from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="account")
    account_number = models.CharField(max_length=20, unique=True)
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.account_number}"

class Transaction(models.Model):  # ✅ Must be defined before subclasses
    TRANSACTION_TYPES = [
        ("deposit", "Deposit"),
        ("withdrawal", "Withdrawal"),
        ("transfer", "Transfer"),
        ("bill_payment", "Bill Payment"),
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="transactions")
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.transaction_type} - {self.amount}"

# ✅ Define subclasses AFTER Transaction
class Withdrawal(Transaction):
    atm_location = models.CharField(max_length=255)

    def __str__(self):
        return f"Withdrawal - {self.amount} from {self.atm_location}"

class Deposit(Transaction):
    source = models.CharField(max_length=255)  # e.g., "Bank Transfer", "Cash Deposit"

    def __str__(self):
        return f"Deposit - {self.amount} via {self.source}"

class Transfer(Transaction):
    recipient_account = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="received_transfers")
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Transfer - {self.amount} to {self.recipient_account.account_number}"

class BillPayment(Transaction):
    biller_name = models.CharField(max_length=255)
    biller_account = models.CharField(max_length=50)

    def __str__(self):
        return f"Bill Payment - {self.amount} to {self.biller_name}"
