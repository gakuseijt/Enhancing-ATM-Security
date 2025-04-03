"use client";  // ✅ This makes it a Client Component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Home } from "lucide-react"
import Link from "next/link"
import { useAccount } from "@/contexts/account-context"

export function RecentTransactions() {
  const { transactions } = useAccount()

  // Get only the 5 most recent transactions
  const recentTransactions = transactions.slice(0, 5)

  // Helper function to get the appropriate icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ArrowUpRight":
        return ArrowUpRight
      case "ArrowDownRight":
        return ArrowDownRight
      case "Coffee":
        return Coffee
      case "ShoppingBag":
        return ShoppingBag
      case "Home":
        return Home
      default:
        return ArrowUpRight
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest account activity</CardDescription>
        </div>
        <Link href="/dashboard/transactions">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => {
            const TransactionIcon = getIcon(transaction.icon)

            return (
              <div key={transaction.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                    <TransactionIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.date}, {transaction.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className={`text-sm font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                    {transaction.amount < 0 ? "-" : "+"}KSh {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

