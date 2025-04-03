import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ShieldAlert, MapPin, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data for security alerts
const alerts = [
  {
    id: "a1",
    title: "Unusual Login Attempt",
    description: "Login attempt from unrecognized device in London, UK",
    date: "Today, 5:23 AM",
    severity: "high",
    icon: AlertTriangle,
    resolved: false,
  },
  {
    id: "a2",
    title: "Security Settings Updated",
    description: "Your account security settings were updated",
    date: "Mar 28, 2:45 PM",
    severity: "info",
    icon: ShieldAlert,
    resolved: true,
  },
  {
    id: "a3",
    title: "New Location Detected",
    description: "First login from Chicago, IL",
    date: "Mar 25, 10:15 AM",
    severity: "medium",
    icon: MapPin,
    resolved: true,
  },
]

export function SecurityAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Alerts</CardTitle>
        <CardDescription>Recent security events for your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <Alert key={alert.id} variant={alert.severity === "high" ? "destructive" : "default"}>
            <div className="flex items-start gap-4">
              <alert.icon className="h-5 w-5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <AlertTitle className="flex items-center gap-2">
                    {alert.title}
                    {alert.severity === "high" && <Badge variant="destructive">High Risk</Badge>}
                    {alert.severity === "medium" && <Badge variant="secondary">Medium Risk</Badge>}
                    {alert.severity === "info" && <Badge variant="outline">Info</Badge>}
                  </AlertTitle>
                  <span className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {alert.date}
                  </span>
                </div>
                <AlertDescription className="mt-1">{alert.description}</AlertDescription>
                <div className="mt-2 flex items-center justify-between">
                  {alert.resolved ? (
                    <span className="flex items-center text-xs text-green-500">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Resolved
                    </span>
                  ) : (
                    <Button size="sm" variant={alert.severity === "high" ? "default" : "outline"}>
                      Review
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Alert>
        ))}
        <div className="flex justify-end">
          <Link href="/settings">
            <Button variant="outline" size="sm">
              Security Settings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

