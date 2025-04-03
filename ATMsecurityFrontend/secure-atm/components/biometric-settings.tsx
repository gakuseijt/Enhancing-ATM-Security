"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Fingerprint, Scan, NetworkIcon as VoiceNetwork, Shield, Camera } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function BiometricSettings() {
  const [facialEnabled, setFacialEnabled] = useState(true)
  const [fingerprintEnabled, setFingerprintEnabled] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [livenessEnabled, setLivenessEnabled] = useState(true)

  const securityScore =
    70 + (facialEnabled ? 10 : 0) + (fingerprintEnabled ? 10 : 0) + (voiceEnabled ? 5 : 0) + (livenessEnabled ? 5 : 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Biometric Security</CardTitle>
        <CardDescription>Manage your biometric authentication methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Security Score</span>
            <span className="text-sm font-medium">{securityScore}%</span>
          </div>
          <Progress value={securityScore} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {securityScore >= 90
              ? "Excellent security! Your account is well protected."
              : securityScore >= 80
                ? "Good security. Consider enabling additional biometrics."
                : "Enhance your security by enabling more biometric options."}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Camera className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Facial Recognition</Label>
                <p className="text-xs text-muted-foreground">Use your face to authenticate transactions</p>
              </div>
            </div>
            <Switch checked={facialEnabled} onCheckedChange={setFacialEnabled} aria-label="Toggle facial recognition" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Fingerprint className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Fingerprint Authentication</Label>
                <p className="text-xs text-muted-foreground">Use your fingerprint for secure access</p>
              </div>
            </div>
            <Switch
              checked={fingerprintEnabled}
              onCheckedChange={setFingerprintEnabled}
              aria-label="Toggle fingerprint authentication"
            />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <VoiceNetwork className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Voice Recognition</Label>
                <p className="text-xs text-muted-foreground">Use your voice as an additional security layer</p>
              </div>
            </div>
            <Switch checked={voiceEnabled} onCheckedChange={setVoiceEnabled} aria-label="Toggle voice recognition" />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Scan className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Liveness Detection</Label>
                <p className="text-xs text-muted-foreground">Prevent spoofing with advanced liveness checks</p>
              </div>
            </div>
            <Switch
              checked={livenessEnabled}
              onCheckedChange={setLivenessEnabled}
              aria-label="Toggle liveness detection"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          <Shield className="h-3 w-3 inline-block mr-1" />
          Biometric data is securely stored and never leaves your device
        </p>
        <Button variant="outline" size="sm">
          Update Settings
        </Button>
      </CardFooter>
    </Card>
  )
}

