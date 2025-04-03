import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BellRing, Mail, Shield, Globe, CreditCard, AlertTriangle, Clock } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="linked">Linked Accounts</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your general account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Time Zone</Label>
                <Select defaultValue="america-new_york">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="america-new_york">Eastern Time (ET)</SelectItem>
                    <SelectItem value="america-chicago">Central Time (CT)</SelectItem>
                    <SelectItem value="america-denver">Mountain Time (MT)</SelectItem>
                    <SelectItem value="america-los_angeles">Pacific Time (PT)</SelectItem>
                    <SelectItem value="etc-utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currency">Currency Display</Label>
                <Select defaultValue="usd">
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                    <SelectItem value="gbp">GBP (£)</SelectItem>
                    <SelectItem value="jpy">JPY (¥)</SelectItem>
                    <SelectItem value="cad">CAD (C$)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                </div>
                <Switch id="dark-mode" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Management</CardTitle>
              <CardDescription>Manage your account status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Account Status</Label>
                  <p className="text-sm text-muted-foreground">Your account is currently active</p>
                </div>
                <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                  Deactivate Account
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-0.5">
                  <Label className="text-red-500">Danger Zone</Label>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your security preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">Automatically log out after period of inactivity</p>
                </div>
                <Select defaultValue="15">
                  <SelectTrigger id="session-timeout" className="w-[180px]">
                    <SelectValue placeholder="Select timeout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch id="two-factor" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="biometric">Biometric Authentication</Label>
                  <p className="text-sm text-muted-foreground">Use facial recognition for secure login</p>
                </div>
                <Switch id="biometric" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="location">Location-Based Security</Label>
                  <p className="text-sm text-muted-foreground">Restrict access to recognized locations</p>
                </div>
                <Switch id="location" />
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Shield className="mr-2 h-4 w-4" />
                  View Security Log
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trusted Devices</CardTitle>
              <CardDescription>Manage devices that can access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Chrome on Windows</p>
                    <p className="text-xs text-muted-foreground">New York, NY (Current device)</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" disabled>
                  Current
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Safari on iPhone</p>
                    <p className="text-xs text-muted-foreground">Last active: Yesterday</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                  Remove
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Chrome on MacBook</p>
                    <p className="text-xs text-muted-foreground">Last active: 3 days ago</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                  Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Security Alerts</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Unusual Login Attempts</p>
                      <p className="text-xs text-muted-foreground">Get notified of suspicious login activity</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Switch id="login-email" defaultChecked />
                      <Label htmlFor="login-email" className="text-xs">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Switch id="login-sms" defaultChecked />
                      <Label htmlFor="login-sms" className="text-xs">
                        SMS
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Large Transactions</p>
                      <p className="text-xs text-muted-foreground">Get notified of transactions over $1,000</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Switch id="transaction-email" defaultChecked />
                      <Label htmlFor="transaction-email" className="text-xs">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Switch id="transaction-sms" defaultChecked />
                      <Label htmlFor="transaction-sms" className="text-xs">
                        SMS
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">Account Updates</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Account Statements</p>
                      <p className="text-xs text-muted-foreground">Monthly account statements and summaries</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Switch id="statement-email" defaultChecked />
                      <Label htmlFor="statement-email" className="text-xs">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Switch id="statement-sms" />
                      <Label htmlFor="statement-sms" className="text-xs">
                        SMS
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <BellRing className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Promotional Updates</p>
                      <p className="text-xs text-muted-foreground">New features, offers, and services</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Switch id="promo-email" />
                      <Label htmlFor="promo-email" className="text-xs">
                        Email
                      </Label>
                    </div>
                    <div className="flex items-center gap-1">
                      <Switch id="promo-sms" />
                      <Label htmlFor="promo-sms" className="text-xs">
                        SMS
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="linked" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Linked Accounts</CardTitle>
              <CardDescription>Manage accounts linked to your profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Bank Accounts</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Checking Account</p>
                      <p className="text-xs text-muted-foreground">****4567 • Primary</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Savings Account</p>
                      <p className="text-xs text-muted-foreground">****7890</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Link New Account
                </Button>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-lg font-medium">External Accounts</h3>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">External Bank</p>
                      <p className="text-xs text-muted-foreground">****1234 • Linked 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    Unlink
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Link External Account
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Automatic Payments</CardTitle>
              <CardDescription>Manage recurring payments and transfers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Monthly Savings Transfer</p>
                    <p className="text-xs text-muted-foreground">$500 • 1st of every month</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Mortgage Payment</p>
                    <p className="text-xs text-muted-foreground">$1,200 • 15th of every month</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 hover:text-red-600">
                    Cancel
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  Set Up New Automatic Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

