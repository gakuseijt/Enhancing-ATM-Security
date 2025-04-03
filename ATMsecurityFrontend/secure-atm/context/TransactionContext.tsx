"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { transactionManager } from "@/handler/TransactionManager";

interface TransactionContextType {
  accounts: any[];
  transactions: any[];
  withdrawals: any[];
  deposits: any[];
  transfers: any[];
  billPayments: any[];
  loading: boolean;
  error: string | null;
  fetchAllTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [billPayments, setBillPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const [
        accountData,
        transactionData,
        withdrawalData,
        depositData,
        transferData,
        billPaymentData,
      ] = await Promise.all([
        transactionManager.fetchAccounts(),
        transactionManager.fetchTransactions(),
        transactionManager.fetchWithdrawals(),
        transactionManager.fetchDeposits(),
        transactionManager.fetchTransfers(),
        transactionManager.fetchBillPayments(),
      ]);

      setAccounts(accountData);
      setTransactions(transactionData);
      setWithdrawals(withdrawalData);
      setDeposits(depositData);
      setTransfers(transferData);
      setBillPayments(billPaymentData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        accounts,
        transactions,
        withdrawals,
        deposits,
        transfers,
        billPayments,
        loading,
        error,
        fetchAllTransactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionProvider");
  }
  return context;
};
