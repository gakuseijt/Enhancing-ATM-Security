import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Home, Search, Download, Filter } from "lucide-react"

// Mock data for transactions
const transactions = [
  {
    id: "t1",
    description: "Withdrawal - ATM",
    amount: -200.0,
    date: "2023-03-30",
    time: "2:34 PM",
    icon: ArrowUpRight,
    iconColor: "text-red-500",
    badge: "Withdrawal",
    badgeVariant: "destructive" as const,
    account: "Checking (****4567)",
    location: "Main St. ATM",
  },
  {
    id: "t2",
    description: "Deposit - Check",
    amount: 1250.0,
    date: "2023-03-29",
    time: "4:15 PM",
    icon: ArrowDownRight,
    iconColor: "text-green-500",
    badge: "Deposit",
    badgeVariant: "default" as const,
    account: "Checking (****4567)",
    location: "Mobile App",
  },
  {
    id: "t3",
    description: "Starbucks Coffee",
    amount: -4.5,
    date: "2023-03-28",
    time: "9:30 AM",
    icon: Coffee,
    iconColor: "text-muted-foreground",
    badge: "Purchase",
    badgeVariant: "secondary" as const,
    account: "Checking (****4567)",
    location: "New York, NY",
  },
  {
    id: "t4",
    description: "Amazon.com",
    amount: -67.32,
    date: "2023-03-27",
    time: "2:20 PM",
    icon: ShoppingBag,
    iconColor: "text-muted-foreground",
    badge: "Purchase",
    badgeVariant: "secondary" as const,
    account: "Checking (****4567)",
    location: "Online",
  },
  {
    id: "t5",
    description: "Mortgage Payment",
    amount: -1200.0,
    date: "2023-03-25",
    time: "12:00 PM",
    icon: Home,
    iconColor: "text-muted-foreground",
    badge: "Payment",
    badgeVariant: "outline" as const,
    account: "Checking (****4567)",
    location: "Automated Payment",
  },
  {
    id: "t6",
    description: "Salary Deposit",
    amount: 3500.0,
    date: "2023-03-15",
    time: "9:00 AM",
    icon: ArrowDownRight,
    iconColor: "text-green-500",
    badge: "Deposit",
    badgeVariant: "default" as const,
    account: "Checking (****4567)",
    location: "Direct Deposit",
  },
  {
    id: "t7",
    description: "Transfer to Savings",
    amount: -500.0,
    date: "2023-03-15",
    time: "10:30 AM",
    icon: ArrowUpRight,
    iconColor: "text-red-500",
    badge: "Transfer",
    badgeVariant: "outline" as const,
    account: "Checking (****4567)",
    location: "Online Banking",
  },
  {
    id: "t8",
    description: "Interest Payment",
    amount: 12.45,
    date: "2023-03-01",
    time: "12:00 AM",
    icon: ArrowDownRight,
    iconColor: "text-green-500",
    badge: "Interest",
    badgeVariant: "default" as const,
    account: "Savings (****7890)",
    location: "Automated",
  },
]

export default function TransactionsPage() {
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
                <Input placeholder="Search transactions..." className="pl-9" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
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
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                      >
                        <div className="col-span-5 flex items-center gap-3">
                          <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                            <transaction.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{transaction.description}</p>
                            <p className="text-xs text-muted-foreground">{transaction.account}</p>
                          </div>
                        </div>
                        <div
                          className={`col-span-2 text-right text-sm font-medium ${transaction.amount < 0 ? "text-red-500" : "text-green-500"}`}
                        >
                          {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toFixed(2)}
                        </div>
                        <div className="col-span-3">
                          <p className="text-sm">{transaction.date}</p>
                          <p className="text-xs text-muted-foreground">{transaction.time}</p>
                        </div>
                        <div className="col-span-2">
                          <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="deposits" className="m-0">
                  <div className="divide-y">
                    {transactions
                      .filter((t) => t.amount > 0)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="col-span-5 flex items-center gap-3">
                            <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                              <transaction.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.account}</p>
                            </div>
                          </div>
                          <div className="col-span-2 text-right text-sm font-medium text-green-500">
                            +${transaction.amount.toFixed(2)}
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">{transaction.date}</p>
                            <p className="text-xs text-muted-foreground">{transaction.time}</p>
                          </div>
                          <div className="col-span-2">
                            <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="withdrawals" className="m-0">
                  <div className="divide-y">
                    {transactions
                      .filter((t) => t.badge === "Withdrawal")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="col-span-5 flex items-center gap-3">
                            <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                              <transaction.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.account}</p>
                            </div>
                          </div>
                          <div className="col-span-2 text-right text-sm font-medium text-red-500">
                            -${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">{transaction.date}</p>
                            <p className="text-xs text-muted-foreground">{transaction.time}</p>
                          </div>
                          <div className="col-span-2">
                            <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="payments" className="m-0">
                  <div className="divide-y">
                    {transactions
                      .filter((t) => t.badge === "Payment" || t.badge === "Purchase")
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/50 cursor-pointer"
                        >
                          <div className="col-span-5 flex items-center gap-3">
                            <div className={`rounded-full p-2 bg-muted ${transaction.iconColor}`}>
                              <transaction.icon className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{transaction.description}</p>
                              <p className="text-xs text-muted-foreground">{transaction.account}</p>
                            </div>
                          </div>
                          <div className="col-span-2 text-right text-sm font-medium text-red-500">
                            -${Math.abs(transaction.amount).toFixed(2)}
                          </div>
                          <div className="col-span-3">
                            <p className="text-sm">{transaction.date}</p>
                            <p className="text-xs text-muted-foreground">{transaction.time}</p>
                          </div>
                          <div className="col-span-2">
                            <Badge variant={transaction.badgeVariant}>{transaction.badge}</Badge>
                          </div>
                        </div>
                      ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>8</strong> of <strong>24</strong> transactions
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

