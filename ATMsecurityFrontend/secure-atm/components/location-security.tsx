"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Plus, AlertTriangle, Check } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data for trusted locations
const trustedLocations = [
  {
    id: "loc1",
    name: "Home Branch",
    address: "Kimathi Street, Nairobi",
    isActive: true,
  },
  {
    id: "loc2",
    name: "Work Branch",
    address: "Westlands, Nairobi",
    isActive: true,
  },
  {
    id: "loc3",
    name: "Mall Branch",
    address: "Garden City Mall, Nairobi",
    isActive: false,
  },
]

export function LocationSecurity() {
  const [locations, setLocations] = useState(trustedLocations)
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationStatus, setLocationStatus] = useState<"trusted" | "untrusted" | "unknown">("unknown")

  // Simulate getting current location
  useEffect(() => {
    // In a real app, you would use the Geolocation API
    setTimeout(() => {
      setCurrentLocation({ lat: -1.2921, lng: 36.8219 }) // Nairobi coordinates
      setLocationStatus("trusted")
    }, 1500)
  }, [])

  const toggleLocationStatus = (id: string) => {
    setLocations(locations.map((loc) => (loc.id === id ? { ...loc, isActive: !loc.isActive } : loc)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Location Security</span>
          {locationStatus === "trusted" && (
            <Badge variant="outline" className="bg-green-50 text-green-700">
              Trusted Location
            </Badge>
          )}
          {locationStatus === "untrusted" && (
            <Badge variant="outline" className="bg-red-50 text-red-700">
              Untrusted Location
            </Badge>
          )}
          {locationStatus === "unknown" && (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
              Verifying Location
            </Badge>
          )}
        </CardTitle>
        <CardDescription>Manage trusted ATM locations for enhanced security</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Current Location</p>
              <p className="text-xs text-muted-foreground">
                {currentLocation ? "Nairobi CBD, Kenya" : "Detecting location..."}
              </p>
            </div>
          </div>
          {locationStatus === "trusted" && <Check className="h-5 w-5 text-green-500" />}
          {locationStatus === "untrusted" && <AlertTriangle className="h-5 w-5 text-red-500" />}
          {locationStatus === "unknown" && (
            <div className="h-5 w-5 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">Trusted Locations</h3>
            <Button variant="ghost" size="sm" className="h-8 gap-1">
              <Plus className="h-3 w-3" /> Add Location
            </Button>
          </div>

          <div className="space-y-3">
            {locations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-2 border rounded-md">
                <div>
                  <p className="text-sm font-medium">{location.name}</p>
                  <p className="text-xs text-muted-foreground">{location.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id={`location-${location.id}`}
                    checked={location.isActive}
                    onCheckedChange={() => toggleLocationStatus(location.id)}
                  />
                  <Label htmlFor={`location-${location.id}`} className="sr-only">
                    Toggle {location.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          Location-based security helps prevent unauthorized access from unfamiliar locations.
        </p>
      </CardFooter>
    </Card>
  )
}

