import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, Clock, AlertTriangle, DollarSign } from "lucide-react"
import { AccountSummary } from "@/components/account-summary"
import { RecentTransactions } from "@/components/recent-transactions"
import { SecurityAlerts } from "@/components/security-alerts"
import { LocationSecurity } from "@/components/location-security"
import { AnomalyDetection } from "@/components/anomaly-detection"
import { QrTransaction } from "@/components/qr-transaction"
import { EmergencyPanicButton } from "@/components/emergency-panic-button"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Your accounts are secure.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/dashboard/withdraw">
            <Button variant="outline" className="gap-1">
              <ArrowUpRight className="h-4 w-4" />
              Withdraw
            </Button>
          </Link>
          <Link href="/dashboard/deposit">
            <Button className="gap-1">
              <ArrowDownRight className="h-4 w-4" />
              Deposit
            </Button>
          </Link>
          <QrTransaction />
          <EmergencyPanicButton />
        </div>
      </div>

      <Tabs defaultValue="accounts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="accounts">Accounts</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="accounts" className="space-y-4">
          <AccountSummary />
        </TabsContent>
        <TabsContent value="activity" className="space-y-4">
          <RecentTransactions />
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <SecurityAlerts />
            <LocationSecurity />
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnomalyDetection />
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Login</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">Today, 10:30 AM</div>
            <div className="text-xs text-muted-foreground">Nairobi, Kenya (Recognized Device)</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <AlertTriangle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-green-500">Secure</div>
            <div className="text-xs text-muted-foreground">All security features are active</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Transfer</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Link href="/dashboard/transactions">
              <Button variant="outline" size="sm" className="w-full">
                Transfer Funds
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

