"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Camera, Upload, MapPin, Info, CheckCircle2 } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function ReportPage() {
  const [image, setImage] = useState<string | null>(null)
  const [severity, setSeverity] = useState(3)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const headerRef = useRef(null)
  const formRef = useRef(null)
  const successRef = useRef(null)

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    )

    // Form animation
    gsap.fromTo(
      formRef.current?.querySelectorAll(".form-item"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        delay: 0.3,
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  useEffect(() => {
    if (isSubmitted) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
      )
    }
  }, [isSubmitted])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Scroll to success message
      setTimeout(() => {
        successRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  return (
    <div className="overflow-hidden">
      {/* Header Section */}
      <section className="relative py-20 bg-blue-600 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Background pattern" fill className="object-cover" />
        </div>

        <div ref={headerRef} className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 px-4 py-2 text-sm bg-white text-blue-600 hover:bg-gray-100">Report a Hazard</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Help Make Your Community Safer</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Report safety hazards in your area and our AI will help categorize and prioritize them for quick resolution.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          {!isSubmitted ? (
            <div className="max-w-3xl mx-auto">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                {/* Image Upload */}
                <div className="form-item">
                  <label className="block text-lg font-bold mb-4">Upload Image (Required)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                    {image ? (
                      <div className="relative h-64 w-full mb-4">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt="Uploaded hazard"
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8">
                        <Camera className="h-16 w-16 text-gray-400 mb-4" />
                        <p className="text-gray-500 mb-4">Take a photo or upload an image of the hazard</p>
                      </div>
                    )}

                    <div className="flex justify-center">
                      <label className="cursor-pointer">
                        <Input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} required />
                        <Button type="button" variant="outline" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          {image ? "Change Image" : "Upload Image"}
                        </Button>
                      </label>
                    </div>
                  </div>
                  {image && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                      <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        <span className="font-semibold">AI Analysis:</span> Our system has detected this as a potential
                        <span className="font-semibold"> road hazard</span> with
                        <span className="font-semibold"> medium severity</span>. Please confirm or adjust below.
                      </p>
                    </div>
                  )}
                </div>

                {/* Location */}
                <div className="form-item">
                  <label className="block text-lg font-bold mb-4">Location</label>
                  <div className="flex gap-4 items-center">
                    <Button type="button" variant="outline" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Use My Current Location
                    </Button>
                    <p className="text-sm text-gray-500">or</p>
                    <Input placeholder="Enter address manually" className="flex-1" />
                  </div>
                  <div className="mt-4 relative h-[200px] rounded-xl overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=200&width=800"
                      alt="Map location"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <MapPin className="h-8 w-8 text-red-600" />
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="form-item">
                  <label htmlFor="description" className="block text-lg font-bold mb-4">
                    Describe the Issue
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Please provide details about the hazard..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Category */}
                <div className="form-item">
                  <label className="block text-lg font-bold mb-4">Category</label>
                  <Select defaultValue="road">
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="road">Road Damage</SelectItem>
                      <SelectItem value="electrical">Electrical Hazard</SelectItem>
                      <SelectItem value="water">Water/Flooding Issue</SelectItem>
                      <SelectItem value="structural">Structural Damage</SelectItem>
                      <SelectItem value="debris">Debris/Obstruction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Severity */}
                <div className="form-item">
                  <label className="block text-lg font-bold mb-4">
                    Severity Level: <span className="text-blue-600 font-bold">{getSeverityLabel(severity)}</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <span className="text-green-600">Low</span>
                    <Slider
                      value={[severity]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => setSeverity(value[0])}
                      className="flex-1"
                    />
                    <span className="text-red-600">High</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-xs text-gray-500">Minor inconvenience</span>
                    <span className="text-xs text-gray-500">Immediate danger</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-item pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700"
                    disabled={isSubmitting || !image}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <div ref={successRef} className="max-w-3xl mx-auto text-center">
              <div className="mb-8 bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Report Submitted Successfully!</h2>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for helping make your community safer. Your report has been received and will be reviewed
                shortly.
              </p>
              <Card className="border-none shadow-lg mb-8">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Report Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                    <div>
                      <p className="text-sm text-gray-500">Report ID</p>
                      <p className="font-medium">#SR-{Math.floor(Math.random() * 10000)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium">Pending Review</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Category</p>
                      <p className="font-medium">Road Damage</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Severity</p>
                      <p className="font-medium">{getSeverityLabel(severity)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  View Report Status
                </Button>
                <Button size="lg" variant="outline">
                  Report Another Hazard
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Similar Reports Section */}
      {!isSubmitted && (
        <section className="py-20 bg-gray-50">
          <div className="container px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 px-4 py-2 text-sm">Community</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Similar Reports Nearby</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These hazards have been reported in your area. You can upvote them to increase their priority.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="relative h-48">
                      <Image
                        src="/placeholder.svg?height=200&width=400"
                        alt="Reported hazard"
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-500">{getSeverityLabel(Math.floor(Math.random() * 5) + 1)}</Badge>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">Pothole on Main Street</h3>
                      <p className="text-gray-600 mb-4">Large pothole causing traffic hazard near the intersection.</p>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          <MapPin className="h-4 w-4 inline mr-1" />
                          0.3 miles away
                        </div>
                        <Button variant="outline" size="sm">
                          Upvote ({Math.floor(Math.random() * 50) + 5})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function getSeverityLabel(level: number): string {
  switch (level) {
    case 1:
      return "Very Low"
    case 2:
      return "Low"
    case 3:
      return "Medium"
    case 4:
      return "High"
    case 5:
      return "Very High"
    default:
      return "Medium"
  }
}

