"use client";  // ✅ This makes it a Client Component

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, PiggyBank, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useAccount } from "@/contexts/account-context"

export function AccountSummary() {
  const { accounts, getTotalBalance } = useAccount()
  const totalBalance = getTotalBalance()

  // Calculate monthly spending (this would typically come from your backend)
  const monthlySpending = 1248.5
  const monthlyBudget = 2000.0
  const spendingPercentage = (monthlySpending / monthlyBudget) * 100

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Total Balance</CardTitle>
            <CardDescription>Your combined account balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              KSh {totalBalance.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Monthly Spending</span>
                <span>
                  KSh {monthlySpending.toLocaleString("en-KE", { minimumFractionDigits: 2 })} / KSh{" "}
                  {monthlyBudget.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <Progress value={spendingPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common banking operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <DollarSign className="mr-2 h-4 w-4" />
                Transfer Money
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center">
                <CreditCard className="mr-2 h-4 w-4" />
                Pay Bills
              </span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Your Accounts</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {accounts.map((account) => {
            const IconComponent = account.icon === "CreditCard" ? CreditCard : PiggyBank

            return (
              <Card key={account.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{account.name}</CardTitle>
                  <IconComponent className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    KSh{" "}
                    {account.balance.toLocaleString("en-KE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <p className="text-xs text-muted-foreground">Account: {account.number}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/accounts/${account.id}`} className="text-sm text-primary hover:underline">
                    View Details
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

