import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Shield, Camera, Key } from "lucide-react"
import { BiometricSettings } from "@/components/biometric-settings"

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and security settings</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_3fr]">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h3 className="text-lg font-medium">User</h3>
                <p className="text-sm text-muted-foreground">Customer since 2018</p>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
              <div className="w-full pt-4">
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-sm text-muted-foreground">Customer ID</span>
                  <span className="text-sm font-medium">ATM-78945</span>
                </div>
                <div className="flex items-center justify-between py-2 border-t">
                  <span className="text-sm text-muted-foreground">Last Login</span>
                  <span className="text-sm">Today, 10:30 AM</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" defaultValue="1985-06-15" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ssn">SSN (Last 4 digits)</Label>
                    <Input id="ssn" defaultValue="****1234" disabled />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Update your address details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1">Street Address</Label>
                    <Input id="address1" defaultValue="123 Main Street" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address2">Apt, Suite, etc. (optional)</Label>
                    <Input id="address2" defaultValue="Apt 4B" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" defaultValue="NY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" defaultValue="10001" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update your contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="email" defaultValue="john.doe@example.com" className="pl-9" />
                      </div>
                      <Badge variant="outline" className="self-center">
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input id="phone" defaultValue="(212) 555-1234" className="pl-9" />
                      </div>
                      <Badge variant="outline" className="self-center">
                        Verified
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="altPhone">Alternative Phone (optional)</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="altPhone" placeholder="Add alternative phone number" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPreference">Contact Preference</Label>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="email-pref"
                          name="contact-pref"
                          className="h-4 w-4 accent-primary"
                          defaultChecked
                        />
                        <Label htmlFor="email-pref">Email</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="phone-pref" name="contact-pref" className="h-4 w-4 accent-primary" />
                        <Label htmlFor="phone-pref">Phone</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="radio" id="both-pref" name="contact-pref" className="h-4 w-4 accent-primary" />
                        <Label htmlFor="both-pref">Both</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4 pt-4">
              <BiometricSettings />
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pin">Change PIN</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="pin" type="password" placeholder="Enter new PIN" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPin">Confirm PIN</Label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input id="confirmPin" type="password" placeholder="Confirm new PIN" className="pl-9" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Biometric Authentication</Label>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-sm">Facial Recognition</Label>
                        <p className="text-xs text-muted-foreground">
                          Use facial recognition for secure login and transactions
                        </p>
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        <Label htmlFor="facial-recognition" className="sr-only">
                          Toggle facial recognition
                        </Label>
                        <input
                          type="checkbox"
                          id="facial-recognition"
                          className="h-6 w-10 appearance-none rounded-full bg-muted p-0.5 transition-colors duration-200 ease-in-out checked:bg-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label className="text-sm">SMS Verification</Label>
                        <p className="text-xs text-muted-foreground">
                          Receive a verification code via SMS for sensitive operations
                        </p>
                      </div>
                      <div className="ml-auto flex items-center space-x-2">
                        <Label htmlFor="sms-verification" className="sr-only">
                          Toggle SMS verification
                        </Label>
                        <input
                          type="checkbox"
                          id="sms-verification"
                          className="h-6 w-10 appearance-none rounded-full bg-muted p-0.5 transition-colors duration-200 ease-in-out checked:bg-primary"
                          defaultChecked
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Security Settings</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login History</CardTitle>
                  <CardDescription>Recent account access</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Today, 10:30 AM</p>
                          <p className="text-xs text-muted-foreground">New York, NY (Current session)</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Successful
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Yesterday, 3:45 PM</p>
                          <p className="text-xs text-muted-foreground">New York, NY (Mobile App)</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Successful
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Shield className="h-8 w-8 text-red-500" />
                        <div>
                          <p className="text-sm font-medium">Mar 28, 5:23 AM</p>
                          <p className="text-xs text-muted-foreground">London, UK (Unrecognized device)</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-red-50 text-red-700">
                        Failed
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm">
                    View Full History
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

