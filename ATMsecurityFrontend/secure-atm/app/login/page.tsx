"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FacialRecognition } from "@/components/facial-recognition";
import { Shield, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();

  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [faceVerified, setFaceVerified] = useState(false);
  const [faceError, setFaceError] = useState<string | null>(null);
  const [faceProcessing, setFaceProcessing] = useState(false);

  const handleFaceVerification = () => {
    if (faceProcessing) return;

    setFaceProcessing(true);
    setFaceError(null);

    setTimeout(() => {
      // Simulating a successful verification 70% of the time
      const isSuccess = Math.random() < 0.7;

      if (isSuccess) {
        setFaceVerified(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        setFaceError("Face not recognized. Please try again.");
      }

      setFaceProcessing(false);
    }, 2000); // Simulated processing time
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setFormError(err?.message || "Login failed. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SecureATM</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Secure Login</CardTitle>
            <CardDescription>
              Access your account using facial recognition or credentials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="face" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="face">Face Recognition</TabsTrigger>
                <TabsTrigger value="email">Email & Password</TabsTrigger>
              </TabsList>
              <TabsContent value="face" className="space-y-4">
                <div className="flex flex-col items-center justify-center space-y-4 py-4">
                  <FacialRecognition
                    onVerification={handleFaceVerification}
                    title="Secure Login"
                    description="Verify your identity to access your account"
                  />
                  {faceProcessing && (
                    <p className="text-sm text-blue-500 text-center">Processing...</p>
                  )}
                  {faceVerified && (
                    <p className="text-sm text-green-500 text-center">Face Verified! Redirecting...</p>
                  )}
                  {faceError && (
                    <p className="text-sm text-red-500 text-center">{faceError}</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        className="pl-9"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-9 pr-9"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red-500 text-sm text-center">{formError}</p>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground text-center">
              Forgot your password?{" "}
              <Link href="#" className="text-primary hover:underline">
                Reset Password
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
