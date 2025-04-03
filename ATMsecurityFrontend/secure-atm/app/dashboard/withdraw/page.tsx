"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FacialRecognition } from "@/components/facial-recognition"
import { ArrowUpRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAccount } from "@/contexts/account-context"

export default function WithdrawPage() {
  const router = useRouter()
  const { withdraw, getAccount } = useAccount()
  const [step, setStep] = useState<"amount" | "verification" | "success">("amount")
  const [amount, setAmount] = useState("")
  const [account, setAccount] = useState("")
  const [withdrawalType, setWithdrawalType] = useState("cash")
  const [transactionId, setTransactionId] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  const handleAmountSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (amount && account) {
      // Check if there are sufficient funds
      const selectedAccount = getAccount(account)
      if (selectedAccount && Number.parseFloat(amount) > selectedAccount.balance) {
        setError(`Insufficient funds. Available balance: KSh ${selectedAccount.balance.toFixed(2)}`)
        return
      }

      setStep("verification")
    }
  }

  const handleVerification = async (verified: boolean) => {
    if (verified) {
      setIsProcessing(true)

      // Process the withdrawal through our context
      const success = await withdraw(account, Number.parseFloat(amount), withdrawalType)

      if (success) {
        // Generate a transaction ID
        const newTransactionId = "WD-" + Math.floor(Math.random() * 1000000)
        setTransactionId(newTransactionId)
        setStep("success")
      } else {
        setError("Withdrawal failed. Please try again.")
        setStep("amount")
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
        <h1 className="text-3xl font-bold">Withdraw Funds</h1>
        <p className="text-muted-foreground">Securely withdraw money from your account</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {step === "amount" && "Withdrawal Details"}
            {step === "verification" && "Verify Your Identity"}
            {step === "success" && "Withdrawal Successful"}
          </CardTitle>
          <CardDescription>
            {step === "amount" && "Enter the amount and select your account"}
            {step === "verification" && "Complete facial verification to confirm withdrawal"}
            {step === "success" && "Your withdrawal has been processed"}
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
                {error && <p className="text-sm text-red-500">{error}</p>}
                {account && (
                  <p className="text-xs text-muted-foreground">
                    Available balance: KSh {getAccount(account)?.balance.toFixed(2) || "0.00"}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Withdrawal Type</Label>
                <RadioGroup value={withdrawalType} onValueChange={setWithdrawalType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="transfer" id="transfer" />
                    <Label htmlFor="transfer">Transfer</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit" className="w-full">
                <ArrowUpRight className="mr-2 h-4 w-4" />
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
                  <div className="text-sm">Type:</div>
                  <div className="font-medium">{withdrawalType === "cash" ? "Cash" : "Transfer"}</div>
                </div>
              </div>

              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin mb-4"></div>
                  <p className="text-lg font-medium">Processing Withdrawal...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we process your transaction</p>
                </div>
              ) : (
                <FacialRecognition
                  onVerification={handleVerification}
                  title="Withdrawal Verification"
                  description="Verify your identity to complete this withdrawal"
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
                <p className="text-xl font-medium">Withdrawal Successful</p>
                <p className="text-muted-foreground">
                  KSh {Number.parseFloat(amount).toFixed(2)} has been withdrawn from your{" "}
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

