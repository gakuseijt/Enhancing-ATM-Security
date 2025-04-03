import axios from 'axios';
import {
  ACCOUNTS_URL,
  TRANSACTIONS_URL,
  WITHDRAWALS_URL,
  DEPOSITS_URL,
  TRANSFERS_URL,
  BILL_PAYMENTS_URL,
} from './apiConfig';

export const transactionManager = {
  // Accounts
  fetchAccounts: async () => {
    const res = await axios.get(ACCOUNTS_URL);
    return res.data;
  },
  createAccount: async (accountData: any) => {
    const res = await axios.post(ACCOUNTS_URL, accountData);
    return res.data;
  },

  // Transactions
  fetchTransactions: async () => {
    const res = await axios.get(TRANSACTIONS_URL);
    return res.data;
  },
  createTransaction: async (transactionData: any) => {
    const res = await axios.post(TRANSACTIONS_URL, transactionData);
    return res.data;
  },

  // Withdrawals
  fetchWithdrawals: async () => {
    const res = await axios.get(WITHDRAWALS_URL);
    return res.data;
  },
  createWithdrawal: async (withdrawalData: any) => {
    const res = await axios.post(WITHDRAWALS_URL, withdrawalData);
    return res.data;
  },

  // Deposits
  fetchDeposits: async () => {
    const res = await axios.get(DEPOSITS_URL);
    return res.data;
  },
  createDeposit: async (depositData: any) => {
    const res = await axios.post(DEPOSITS_URL, depositData);
    return res.data;
  },

  // Transfers
  fetchTransfers: async () => {
    const res = await axios.get(TRANSFERS_URL);
    return res.data;
  },
  createTransfer: async (transferData: any) => {
    const res = await axios.post(TRANSFERS_URL, transferData);
    return res.data;
  },

  // Bill Payments
  fetchBillPayments: async () => {
    const res = await axios.get(BILL_PAYMENTS_URL);
    return res.data;
  },
  createBillPayment: async (paymentData: any) => {
    const res = await axios.post(BILL_PAYMENTS_URL, paymentData);
    return res.data;
  },
};
