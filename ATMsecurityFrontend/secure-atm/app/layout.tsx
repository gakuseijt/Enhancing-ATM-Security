import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { RecognitionProvider } from "@/context/RecognitionContext"
import { TransactionProvider } from "@/context/TransactionContext"
import { AccountProvider } from "@/contexts/account-context"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SecureATM - Enhanced Banking Security",
  description: "ATM security system with facial recognition",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
        <AuthProvider>
<RecognitionProvider>
          <TransactionProvider>
            <AccountProvider>
          {children}
          </AccountProvider>
          </TransactionProvider>
          
        </RecognitionProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'