"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ShieldAlert, CheckCircle, Info } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for transaction risk analysis
const riskFactors = [
  {
    id: "risk1",
    name: "Transaction Amount",
    description: "KSh 25,000 is higher than your usual range",
    riskLevel: 75,
    status: "high",
  },
  {
    id: "risk2",
    name: "Transaction Time",
    description: "11:30 PM is outside your normal hours",
    riskLevel: 60,
    status: "medium",
  },
  {
    id: "risk3",
    name: "Location",
    description: "Nairobi CBD is a trusted location",
    riskLevel: 10,
    status: "low",
  },
  {
    id: "risk4",
    name: "Device",
    description: "Using a recognized device",
    riskLevel: 5,
    status: "low",
  },
]

export function AnomalyDetection() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)

  const overallRisk = riskFactors.reduce((sum, factor) => sum + factor.riskLevel, 0) / riskFactors.length

  const handleVerify = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Transaction Risk Analysis</span>
          <Badge
            variant={overallRisk > 60 ? "destructive" : overallRisk > 30 ? "outline" : "default"}
            className={
              overallRisk > 60 ? "" : overallRisk > 30 ? "bg-yellow-50 text-yellow-700" : "bg-green-50 text-green-700"
            }
          >
            {overallRisk > 60 ? "High Risk" : overallRisk > 30 ? "Medium Risk" : "Low Risk"}
          </Badge>
        </CardTitle>
        <CardDescription>AI-powered anomaly detection for your transaction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Overall Risk Score</span>
            <span className="font-medium">{Math.round(overallRisk)}%</span>
          </div>
          <Progress value={overallRisk} className="h-2" />
        </div>

        <div className="space-y-3">
          {riskFactors.map((factor) => (
            <div key={factor.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {factor.status === "high" && <AlertTriangle className="h-3 w-3 text-red-500" />}
                  {factor.status === "medium" && <Info className="h-3 w-3 text-yellow-500" />}
                  {factor.status === "low" && <CheckCircle className="h-3 w-3 text-green-500" />}
                  <span>{factor.name}</span>
                </div>
                <span
                  className={`text-xs font-medium ${
                    factor.status === "high"
                      ? "text-red-500"
                      : factor.status === "medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }`}
                >
                  {factor.status === "high" ? "High" : factor.status === "medium" ? "Medium" : "Low"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">{factor.description}</div>
              <Progress value={factor.riskLevel} className="h-1" />
            </div>
          ))}
        </div>

        {overallRisk > 30 && !isVerified && (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-700">Additional verification required</p>
                <p className="text-xs text-yellow-600">
                  This transaction has unusual patterns that require verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {isVerified && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-700">Transaction verified</p>
                <p className="text-xs text-green-600">You have confirmed this transaction is legitimate.</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isVerified && overallRisk > 30 ? (
          <Button onClick={handleVerify} disabled={isVerifying} className="w-full">
            {isVerifying ? (
              <>
                <div className="mr-2 h-4 w-4 rounded-full border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                Verifying...
              </>
            ) : (
              "Verify This Transaction"
            )}
          </Button>
        ) : (
          <p className="text-xs text-muted-foreground">
            Our AI continuously learns from your transaction patterns to improve security.
          </p>
        )}
      </CardFooter>
    </Card>
  )
}

