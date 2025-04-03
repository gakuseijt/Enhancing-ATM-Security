"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QrCode, Check, Copy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function QrTransaction() {
  const [isOpen, setIsOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [qrGenerated, setQrGenerated] = useState(false)

  const handleGenerateQR = () => {
    if (amount) {
      setQrGenerated(true)
    }
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText("QR-TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          <span>QR Transaction</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cardless QR Transaction</DialogTitle>
          <DialogDescription>Generate a QR code to withdraw money without your card.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!qrGenerated ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (KSh)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <p className="text-sm text-muted-foreground">This will generate a secure QR code valid for 10 minutes.</p>
            </div>
          ) : (
            <div className="space-y-4 flex flex-col items-center">
              <div className="w-48 h-48 bg-white p-2 border rounded-md flex items-center justify-center">
                {/* Simulated QR code */}
                <div className="w-full h-full bg-[url('/placeholder.svg?height=180&width=180')] bg-contain bg-no-repeat bg-center"></div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  Amount: KSh {Number.parseFloat(amount).toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground">Valid for 10 minutes</p>
              </div>
              <div className="flex items-center gap-2 bg-muted p-2 rounded-md w-full">
                <code className="text-xs flex-1 text-center">
                  QR-TXN-{Math.random().toString(36).substring(2, 10).toUpperCase()}
                </code>
                <Button variant="ghost" size="icon" onClick={handleCopyCode} className="h-6 w-6">
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-start">
          {!qrGenerated ? (
            <Button type="submit" onClick={handleGenerateQR}>
              Generate QR Code
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setQrGenerated(false)}>
              Generate New Code
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

