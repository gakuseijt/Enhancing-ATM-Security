"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CheckCircle, XCircle } from "lucide-react"
import { useRecognition } from "@/context/RecognitionContext"

interface FacialRecognitionProps {
  onVerification: (verified: boolean) => void
  title?: string
  description?: string
}

export function FacialRecognition({
  onVerification,
  title = "Facial Verification",
  description = "Verify your identity to continue",
}: FacialRecognitionProps) {
  const [isCapturing, setIsCapturing] = useState(false)
  const [hasFailed, setHasFailed] = useState(false) // ✅ Track verification failure
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { recognizedUser, recognizeUser, isLoading, error } = useRecognition()
  const router = useRouter()

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCapturing(true)
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setIsCapturing(false)
    }
  }

  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current || isLoading || hasFailed) return; // ✅ Prevent multiple API calls

    const context = canvasRef.current.getContext("2d")
    if (context) {
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)

      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const imageFile = new File([blob], "capture.jpg", { type: "image/jpeg" })

          if (!isLoading && !hasFailed) { // ✅ Prevent additional API calls
            console.log("Sending image to recognition API...")
            await recognizeUser(imageFile)
          }
        }
      }, "image/jpeg")
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  useEffect(() => {
    if (recognizedUser) {
      onVerification(true)
      router.push("?status=success", { scroll: false })
      stopCamera()
      setHasFailed(false) // ✅ Reset failure state on success
    } else if (error) {
      onVerification(false)
      setHasFailed(true) // ✅ Mark as failed
      router.push("?status=failed", { scroll: false })
    }
  }, [recognizedUser, error]) // ✅ Only runs when recognition state changes

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative mx-auto h-[300px] bg-muted rounded-md overflow-hidden border-4 border-primary/20">
          {recognizedUser && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50 z-10">
              <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
              <h3 className="text-2xl font-bold text-green-700">Access Granted</h3>
              <p className="text-green-600 text-lg">Welcome, {recognizedUser.username}</p>
            </div>
          )}
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 z-10">
              <XCircle className="h-24 w-24 text-red-500 mb-6" />
              <h3 className="text-2xl font-bold text-red-700">Access Denied</h3>
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
              <div className="h-12 w-12 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            </div>
          )}
          <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${isCapturing ? "block" : "hidden"}`} />
          {!isCapturing && !isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <Camera className="h-24 w-24 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-xl">Camera is off</p>
            </div>
          )}
        </div>
        <canvas ref={canvasRef} className="hidden" />

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Please ensure your face is clearly visible and well-lit for accurate verification.
          </p>
          <p className="text-sm text-muted-foreground">Look directly at the camera and remove any face coverings.</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {!recognizedUser && !error && (
          <>
            {isCapturing ? (
              <Button onClick={captureImage} size="lg" className="w-full max-w-xs">
                Verify Identity
              </Button>
            ) : (
              <Button onClick={startCamera} size="lg" className="w-full max-w-xs">
                Start Camera
              </Button>
            )}
          </>
        )}
        {(recognizedUser || error) && (
          <Button
            onClick={() => {
              setHasFailed(false) // ✅ Reset failure state
              router.push("?status=idle", { scroll: false })
              startCamera()
            }}
            size="lg"
            className="w-full max-w-xs"
          >
            Try Again
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
