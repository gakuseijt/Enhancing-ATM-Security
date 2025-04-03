"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define types for our account data
export type Transaction = {
  id: string
  description: string
  amount: number
  date: string
  time: string
  icon: string
  iconColor: string
  badge: string
  badgeVariant: "destructive" | "default" | "secondary" | "outline"
  account: string
  location: string
}

export type Account = {
  id: string
  name: string
  number: string
  balance: number
  icon: string
}

type AccountContextType = {
  accounts: Account[]
  transactions: Transaction[]
  deposit: (accountId: string, amount: number, method: string) => Promise<boolean>
  withdraw: (accountId: string, amount: number, type: string) => Promise<boolean>
  getAccount: (accountId: string) => Account | undefined
  getTotalBalance: () => number
}

const AccountContext = createContext<AccountContextType | undefined>(undefined)

// Initial account data
const initialAccounts: Account[] = [
  {
    id: "checking",
    name: "Checking Account",
    number: "****4567",
    balance: 2543.87,
    icon: "CreditCard",
  },
  {
    id: "savings",
    name: "Savings Account",
    number: "****7890",
    balance: 12750.42,
    icon: "PiggyBank",
  },
]

// Initial transaction data
const initialTransactions: Transaction[] = [
  {
    id: "t1",
    description: "Withdrawal - ATM",
    amount: -200.0,
    date: "2023-03-30",
    time: "2:34 PM",
    icon: "ArrowUpRight",
    iconColor: "text-red-500",
    badge: "Withdrawal",
    badgeVariant: "destructive",
    account: "Checking (****4567)",
    location: "Main St. ATM",
  },
  {
    id: "t2",
    description: "Deposit - Check",
    amount: 1250.0,
    date: "2023-03-29",
    time: "4:15 PM",
    icon: "ArrowDownRight",
    iconColor: "text-green-500",
    badge: "Deposit",
    badgeVariant: "default",
    account: "Checking (****4567)",
    location: "Mobile App",
  },
  // More initial transactions...
]

export function AccountProvider({ children }: { children: ReactNode }) {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)

  // Load data from localStorage on client side
  useEffect(() => {
    const savedAccounts = localStorage.getItem("accounts")
    const savedTransactions = localStorage.getItem("transactions")

    if (savedAccounts) {
      setAccounts(JSON.parse(savedAccounts))
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    }
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("accounts", JSON.stringify(accounts))
    localStorage.setItem("transactions", JSON.stringify(transactions))
  }, [accounts, transactions])

  // Get a specific account by ID
  const getAccount = (accountId: string) => {
    return accounts.find((account) => account.id === accountId)
  }

  // Calculate total balance across all accounts
  const getTotalBalance = () => {
    return accounts.reduce((sum, account) => sum + account.balance, 0)
  }

  // Process a deposit
  const deposit = async (accountId: string, amount: number, method: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      // Update account balance
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === accountId ? { ...account, balance: account.balance + amount } : account,
        ),
      )

      // Add transaction record
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        description: `Deposit - ${method}`,
        amount: amount,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        icon: "ArrowDownRight",
        iconColor: "text-green-500",
        badge: "Deposit",
        badgeVariant: "default",
        account: accountId === "checking" ? "Checking (****4567)" : "Savings (****7890)",
        location: "Mobile App",
      }

      setTransactions((prev) => [newTransaction, ...prev])
      return true
    } catch (error) {
      console.error("Deposit failed:", error)
      return false
    }
  }

  // Process a withdrawal
  const withdraw = async (accountId: string, amount: number, type: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
      const account = accounts.find((acc) => acc.id === accountId)

      // Check if account exists and has sufficient funds
      if (!account || account.balance < amount) {
        return false
      }

      // Update account balance
      setAccounts((prevAccounts) =>
        prevAccounts.map((account) =>
          account.id === accountId ? { ...account, balance: account.balance - amount } : account,
        ),
      )

      // Add transaction record
      const newTransaction: Transaction = {
        id: `t${Date.now()}`,
        description: `Withdrawal - ${type}`,
        amount: -amount,
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        icon: "ArrowUpRight",
        iconColor: "text-red-500",
        badge: "Withdrawal",
        badgeVariant: "destructive",
        account: accountId === "checking" ? "Checking (****4567)" : "Savings (****7890)",
        location: type === "cash" ? "ATM" : "Online Banking",
      }

      setTransactions((prev) => [newTransaction, ...prev])
      return true
    } catch (error) {
      console.error("Withdrawal failed:", error)
      return false
    }
  }

  return (
    <AccountContext.Provider
      value={{
        accounts,
        transactions,
        deposit,
        withdraw,
        getAccount,
        getTotalBalance,
      }}
    >
      {children}
    </AccountContext.Provider>
  )
}

export function useAccount() {
  const context = useContext(AccountContext)
  if (context === undefined) {
    throw new Error("useAccount must be used within an AccountProvider")
  }
  return context
}

