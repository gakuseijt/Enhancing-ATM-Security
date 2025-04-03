"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FacialRecognition } from "@/components/facial-recognition"
import { ArrowDownRight, CheckCircle, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount } from "@/contexts/account-context"

export default function DepositPage() {
  const router = useRouter()
  const { deposit } = useAccount()
  const [step, setStep] = useState<"amount" | "verification" | "success">("amount")
  const [amount, setAmount] = useState("")
  const [account, setAccount] = useState("")
  const [depositMethod, setDepositMethod] = useState("cash")
  const [transactionId, setTransactionId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (amount && account) {
      setStep("verification")
    }
  }

  const handleVerification = async (verified: boolean) => {
    if (verified) {
      setIsProcessing(true)

      // Process the deposit through our context
      const success = await deposit(account, Number.parseFloat(amount), depositMethod)

      if (success) {
        // Generate a transaction ID
        const newTransactionId = "DP-" + Math.floor(Math.random() * 1000000)
        setTransactionId(newTransactionId)
        setStep("success")
      }

      setIsProcessing(false)
    }
  }

  const handleComplete = () => {
    router.push("/dashboard")
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Deposit Funds</h1>
        <p className="text-muted-foreground">Securely deposit money into your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === "amount" && "Deposit Details"}
            {step === "verification" && "Verify Your Identity"}
            {step === "success" && "Deposit Successful"}
          </CardTitle>
          <CardDescription>
            {step === "amount" && "Enter the amount and select your account"}
            {step === "verification" && "Complete facial verification to confirm deposit"}
            {step === "success" && "Your deposit has been processed"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === "amount" && (
            <form onSubmit={handleAmountSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="account">Select Account</Label>
                <Select value={account} onValueChange={setAccount} required>
                  <SelectTrigger id="account">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account (****4567)</SelectItem>
                    <SelectItem value="savings">Savings Account (****7890)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground">KSh</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-9"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="depositMethod">Deposit Method</Label>
                <Select value={depositMethod} onValueChange={setDepositMethod} required>
                  <SelectTrigger id="depositMethod">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                    <SelectItem value="transfer">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {depositMethod === "check" && (
                <div className="space-y-2">
                  <Label htmlFor="checkImage">Upload Check Image</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="checkImage"
                      className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">Click to upload check image</p>
                      </div>
                      <input id="checkImage" type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                <ArrowDownRight className="mr-2 h-4 w-4" />
                Continue to Verification
              </Button>
            </form>
          )}

          {step === "verification" && (
            <div className="space-y-4">
              <div className="rounded-lg border bg-muted/50 p-4">
                <div className="flex justify-between">
                  <div className="text-sm">Amount:</div>
                  <div className="font-medium">KSh {Number.parseFloat(amount).toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Account:</div>
                  <div className="font-medium">
                    {account === "checking" ? "Checking (****4567)" : "Savings (****7890)"}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Method:</div>
                  <div className="font-medium capitalize">{depositMethod}</div>
                </div>
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-4"></div>
                  <p className="text-lg font-medium">Processing Deposit...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we process your transaction</p>
                </div>
              ) : (
                <FacialRecognition
                  onVerification={handleVerification}
                  title="Deposit Verification"
                  description="Verify your identity to complete this deposit"
                />
              )}
            </div>
          )}

          {step === "success" && (
            <div className="flex flex-col items-center space-y-4 py-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-center">
                <p className="text-xl font-medium">Deposit Successful</p>
                <p className="text-muted-foreground">
                  KSh {Number.parseFloat(amount).toFixed(2)} has been deposited to your{" "}
                  {account === "checking" ? "Checking" : "Savings"} account
                </p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 w-full">
                <div className="flex justify-between">
                  <div className="text-sm">Transaction ID:</div>
                  <div className="font-medium">{transactionId}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-sm">Date & Time:</div>
                  <div className="font-medium">{new Date().toLocaleString()}</div>
                </div>
                {depositMethod === "check" && (
                  <div className="flex justify-between">
                    <div className="text-sm">Status:</div>
                    <div className="font-medium text-amber-500">Pending Verification</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>

        {step === "success" && (
          <CardFooter>
            <Button onClick={handleComplete} className="w-full">
              Return to Dashboard
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

