"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Shield } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export function EmergencyPanicButton() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [isActivated, setIsActivated] = useState(false)

  const handleEmergency = () => {
    setIsActivated(true)

    // Start countdown
    let count = 5
    const timer = setInterval(() => {
      count -= 1
      setCountdown(count)

      if (count <= 0) {
        clearInterval(timer)
        // Simulate emergency protocol
        setTimeout(() => {
          setIsOpen(false)
          router.push("/")
        }, 1000)
      }
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 border-red-200"
        >
          <AlertTriangle className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-500 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Emergency Security Protocol
          </DialogTitle>
          <DialogDescription>
            Activate this only in case of emergency or if you're being forced to withdraw money.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!isActivated ? (
            <div className="space-y-4">
              <p className="text-sm">When activated, this will:</p>
              <ul className="list-disc pl-5 text-sm space-y-1">
                <li>Silently alert bank security</li>
                <li>Limit withdrawal to KSh 10,000</li>
                <li>Capture additional security footage</li>
                <li>Lock your account after this transaction</li>
              </ul>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-500" />
              </div>
              <p className="text-lg font-medium">Emergency Protocol Activated</p>
              <p className="text-sm text-muted-foreground">Security has been notified</p>
              <div className="text-2xl font-bold text-red-500">{countdown}</div>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-center">
          {!isActivated ? (
            <Button variant="destructive" onClick={handleEmergency} className="w-full">
              Activate Emergency Protocol
            </Button>
          ) : (
            <p className="text-xs text-muted-foreground">Please remain calm. Follow any instructions given.</p>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

