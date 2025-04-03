from django.contrib import admin
from .models import Account, Transaction, Withdrawal, Deposit, Transfer, BillPayment

@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ("user", "account_number", "balance", "created_at")
    search_fields = ("user__username", "account_number")


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ("account", "transaction_type", "amount", "timestamp")
    search_fields = ("account__account_number", "transaction_type")


@admin.register(Withdrawal)
class WithdrawalAdmin(admin.ModelAdmin):
    list_display = ("account", "amount", "atm_location", "timestamp")
    search_fields = ("account__account_number", "atm_location")


@admin.register(Deposit)
class DepositAdmin(admin.ModelAdmin):
    list_display = ("account", "amount", "source", "timestamp")
    search_fields = ("account__account_number", "source")


@admin.register(Transfer)
class TransferAdmin(admin.ModelAdmin):
    list_display = ("account", "recipient_account", "amount", "timestamp")
    search_fields = ("account__account_number", "recipient_account__account_number")


@admin.register(BillPayment)
class BillPaymentAdmin(admin.ModelAdmin):
    list_display = ("account", "biller_name", "biller_account", "amount", "timestamp")
    search_fields = ("account__account_number", "biller_name", "biller_account")
