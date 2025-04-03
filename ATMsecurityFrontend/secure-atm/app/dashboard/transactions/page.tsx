"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Home, Search, Download, Filter } from "lucide-react"
import { useAccount } from "@/contexts/account-context"
import { useState } from "react"

export default function TransactionsPage() {
  const { transactions } = useAccount()
  const [searchTerm, setSearchTerm] = useState("")
  const [accountFilter, setAccountFilter] = useState("all")

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

  // Filter transactions based on search term and account filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = searchTerm === "" || transaction.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAccount =
      accountFilter === "all" ||
      (accountFilter === "checking" && transaction.account.includes("Checking")) ||
      (accountFilter === "savings" && transaction.account.includes("Savings"))

    return matchesSearch && matchesAccount
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
        <p className="text-muted-foreground">View and manage your transaction history</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>View all your account transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all" value={accountFilter} onValueChange={setAccountFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Accounts</SelectItem>
                    <SelectItem value="checking">Checking (****4567)</SelectItem>
                    <SelectItem value="savings">Savings (****7890)</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>

              <div className="mt-4 border rounded-lg">
                <div className="grid grid-cols-12 gap-4 p-4 border-b bg-muted/50 text-sm font-medium">
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-right">Amount</div>
                  <div className="col-span-3">Date</div>
                  <div className="col-span-2">Type</div>
                </div>

                <TabsContent value="all" className="m-0">
                  <div className="divide-y">
                    {filteredTransactions.map((transaction) => {
                      const TransactionIcon = getIcon(transaction.icon)

                      return (
                        <div
                          key={transaction.id}
                          className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="col-span-5 flex items-center gap-3">
                            <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                              <TransactionIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.account}</p>
                            </div>
                          </div>
                          <div
                            className={`col-span-2 text-right text-sm font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}
                          >
                            {transaction.amount < 0 ? "-" : "+"}KSh{Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">{transaction.date}</p>
                            <p className="text-xs text-muted-foreground">{transaction.time}</p>
                          </div>
                          <div className="col-span-2">
                            <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                          </div>
                        </div>
                      )
                    })}

                    {filteredTransactions.length === 0 && (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No transactions found</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="deposits" className="m-0">
                  <div className="divide-y">
                    {filteredTransactions
                      .filter((t) => t.amount > 0)
                      .map((transaction) => {
                        const TransactionIcon = getIcon(transaction.icon)

                        return (
                          <div
                            key={transaction.id}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                                <TransactionIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{transaction.description}</p>
                                <p className="text-xs text-muted-foreground">{transaction.account}</p>
                              </div>
                            </div>
                            <div className="col-span-2 text-right text-sm font-medium text-green-500">
                              +KSh{transaction.amount.toFixed(2)}
                            </div>
                            <div className="col-span-3">
                              <p className="text-sm">{transaction.date}</p>
                              <p className="text-xs text-muted-foreground">{transaction.time}</p>
                            </div>
                            <div className="col-span-2">
                              <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                            </div>
                          </div>
                        )
                      })}

                    {filteredTransactions.filter((t) => t.amount > 0).length === 0 && (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No deposits found</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="withdrawals" className="m-0">
                  <div className="divide-y">
                    {filteredTransactions
                      .filter((t) => t.badge === "Withdrawal")
                      .map((transaction) => {
                        const TransactionIcon = getIcon(transaction.icon)

                        return (
                          <div
                            key={transaction.id}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                                <TransactionIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{transaction.description}</p>
                                <p className="text-xs text-muted-foreground">{transaction.account}</p>
                              </div>
                            </div>
                            <div className="col-span-2 text-right text-sm font-medium text-red-500">
                              -KSh{Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            <div className="col-span-3">
                              <p className="text-sm">{transaction.date}</p>
                              <p className="text-xs text-muted-foreground">{transaction.time}</p>
                            </div>
                            <div className="col-span-2">
                              <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                            </div>
                          </div>
                        )
                      })}

                    {filteredTransactions.filter((t) => t.badge === "Withdrawal").length === 0 && (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No withdrawals found</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="payments" className="m-0">
                  <div className="divide-y">
                    {filteredTransactions
                      .filter((t) => t.badge === "Payment" || t.badge === "Purchase")
                      .map((transaction) => {
                        const TransactionIcon = getIcon(transaction.icon)

                        return (
                          <div
                            key={transaction.id}
                            className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="col-span-5 flex items-center gap-3">
                              <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                                <TransactionIcon className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="text-sm font-medium">{transaction.description}</p>
                                <p className="text-xs text-muted-foreground">{transaction.account}</p>
                              </div>
                            </div>
                            <div className="col-span-2 text-right text-sm font-medium text-red-500">
                              -KSh{Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            <div className="col-span-3">
                              <p className="text-sm">{transaction.date}</p>
                              <p className="text-xs text-muted-foreground">{transaction.time}</p>
                            </div>
                            <div className="col-span-2">
                              <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                            </div>
                          </div>
                        )
                      })}

                    {filteredTransactions.filter((t) => t.badge === "Payment" || t.badge === "Purchase").length ===
                      0 && (
                      <div className="p-8 text-center">
                        <p className="text-muted-foreground">No payments found</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredTransactions.length}</strong> of <strong>{transactions.length}</strong>{" "}
                transactions
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

