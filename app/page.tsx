"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Vote, AlertTriangle, CheckCircle, MapPin, Shield, Award, Users, ArrowRight } from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Home() {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const howItWorksRef = useRef(null)
  const testimonialsRef = useRef(null)
  const mapPreviewRef = useRef(null)
  const partnersRef = useRef(null)
  const ctaRef = useRef(null)

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
      },
    )

    // Stats counter animation
    const statsElements = document.querySelectorAll(".stat-number")
    statsElements.forEach((stat) => {
      const target = Number.parseInt(stat.textContent || "0", 10)
      gsap.fromTo(
        stat,
        { innerText: 0 },
        {
          innerText: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          },
          onUpdate: function () {
            stat.textContent = Math.ceil(this.targets()[0].innerText).toString()
          },
        },
      )
    })

    // How it works animation
    gsap.fromTo(
      ".step-card",
      { opacity: 0, y: 50, stagger: 0.2 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 70%",
        },
      },
    )

    // Testimonials animation
    gsap.fromTo(
      ".testimonial-card",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.3,
        duration: 0.7,
        ease: "elastic.out(1, 0.7)",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 70%",
        },
      },
    )

    // Map preview animation
    gsap.fromTo(
      mapPreviewRef.current,
      { opacity: 0, clipPath: "circle(0% at center)" },
      {
        opacity: 1,
        clipPath: "circle(100% at center)",
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: mapPreviewRef.current,
          start: "top 70%",
        },
      },
    )

    // Partners animation
    gsap.fromTo(
      ".partner-logo",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: partnersRef.current,
          start: "top 80%",
        },
      },
    )

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      },
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="City with hazard markers"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50"></div>
        </div>

        <div ref={heroRef} className="container relative z-10 px-4 text-center text-white">
          <Badge className="mb-4 px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600">AI-Powered Community Safety</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Transforming Community Safety with AI</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Report hazards, track safety issues, and make your community safer with AI-powered detection
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700">
              Report a Hazard Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
              View Safety Map
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div className="animate-bounce">
            <ArrowRight className="h-8 w-8 text-white transform rotate-90" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making Communities Safer Together</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              SafetySpot uses AI and community collaboration to identify, report, and resolve safety hazards in your
              neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="stat-number text-4xl font-bold text-blue-600 mb-2">10000</h3>
                <p className="text-gray-600">Hazards Reported</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="stat-number text-4xl font-bold text-green-600 mb-2">8500</h3>
                <p className="text-gray-600">Issues Resolved</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="stat-number text-4xl font-bold text-purple-600 mb-2">25000</h3>
                <p className="text-gray-600">Active Users</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="stat-number text-4xl font-bold text-orange-600 mb-2">120</h3>
                <p className="text-gray-600">Communities Served</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SafetySpot Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform makes it easy to report hazards and get them resolved quickly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="step-card border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="mb-6 bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Camera className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">1. Take a Photo</h3>
                <p className="text-gray-600 text-center">
                  Capture the hazard with your phone. Our AI will analyze the image to categorize and assess severity.
                </p>
              </CardContent>
            </Card>

            <Card className="step-card border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="mb-6 bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Vote className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">2. Submit & Vote</h3>
                <p className="text-gray-600 text-center">
                  Submit your report and let the community vote on its priority. More votes mean faster action.
                </p>
              </CardContent>
            </Card>

            <Card className="step-card border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="mb-6 bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">3. Action Taken</h3>
                <p className="text-gray-600 text-center">
                  Local authorities are alerted and take action. You'll receive updates as the issue is resolved.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from community members and officials who have used SafetySpot to make a difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="testimonial-card border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "I reported a dangerous pothole on my street, and it was fixed within 48 hours. The AI accurately
                  assessed it as high priority!"
                </p>
                <h4 className="font-bold">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Community Member</p>
              </CardContent>
            </Card>

            <Card className="testimonial-card border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "SafetySpot has revolutionized how we prioritize infrastructure repairs. The community voting system
                  helps us focus on what matters most."
                </p>
                <h4 className="font-bold">Michael Rodriguez</h4>
                <p className="text-sm text-gray-500">City Official</p>
              </CardContent>
            </Card>

            <Card className="testimonial-card border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="User Avatar"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "As a school principal, I've used SafetySpot to report hazards near our school. The response time has
                  been impressive!"
                </p>
                <h4 className="font-bold">Jennifer Lee</h4>
                <p className="text-sm text-gray-500">School Principal</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-blue-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Recognition</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Earn Recognition for Your Contributions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get rewarded for making your community safer with badges and community recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safety Hero</h3>
              <p className="text-gray-600 text-sm">Report 10+ hazards</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Community Guardian</h3>
              <p className="text-gray-600 text-sm">Vote on 25+ issues</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Problem Solver</h3>
              <p className="text-gray-600 text-sm">5+ of your reports resolved</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="mb-4 bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Safety Champion</h3>
              <p className="text-gray-600 text-sm">Top contributor in your area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview Section */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Live Data</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-time Safety Map</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              View hazards in your area and track their resolution status in real-time.
            </p>
          </div>

          <div ref={mapPreviewRef} className="rounded-xl overflow-hidden shadow-xl">
            <div className="relative h-[500px] w-full">
              <Image
                src="/placeholder.svg?height=500&width=1200"
                alt="Safety Map Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>

              {/* Sample hazard markers */}
              <div className="absolute top-1/4 left-1/3 hazard-marker bg-red-500"></div>
              <div className="absolute top-1/2 left-1/2 hazard-marker bg-orange-500"></div>
              <div className="absolute bottom-1/3 right-1/4 hazard-marker bg-yellow-500"></div>
              <div className="absolute top-1/3 right-1/3 hazard-marker bg-green-500"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Explore Full Map
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section ref={partnersRef} className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Collaborations</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Working together with local authorities and organizations to create safer communities.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="partner-logo flex items-center justify-center p-4">
                <Image
                  src="/placeholder.svg?height=80&width=160"
                  alt={`Partner Logo ${i + 1}`}
                  width={160}
                  height={80}
                  className="opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-blue-600 text-white">
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Community Safer?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of community members who are making a difference with SafetySpot.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100">
              Report a Hazard Now
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white/10">
              Download Our App
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

