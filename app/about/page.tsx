"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  Users,
  Brain,
  BarChart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export default function AboutPage() {
  const headerRef = useRef(null)
  const missionRef = useRef(null)
  const aiSectionRef = useRef(null)
  const teamRef = useRef(null)
  const contactRef = useRef(null)

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

    // Mission section animation
    gsap.fromTo(
      missionRef.current?.querySelectorAll(".mission-item"),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: missionRef.current,
          start: "top 70%",
        },
      },
    )

    // AI section animation
    gsap.fromTo(
      aiSectionRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: aiSectionRef.current,
          start: "top 70%",
        },
      },
    )

    // Team animation
    gsap.fromTo(
      ".team-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power1.out",
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 70%",
        },
      },
    )

    // Contact animation
    gsap.fromTo(
      contactRef.current?.querySelectorAll(".contact-item"),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power1.out",
        scrollTrigger: {
          trigger: contactRef.current,
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
      {/* Header Section */}
      <section className="relative py-20 bg-blue-600 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/placeholder.svg?height=600&width=1920" alt="Background pattern" fill className="object-cover" />
        </div>

        <div ref={headerRef} className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 px-4 py-2 text-sm bg-white text-blue-600 hover:bg-gray-100">About Us</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Mission & Vision</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We're building a safer world through community collaboration and artificial intelligence.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section ref={missionRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 px-4 py-2 text-sm">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why SafetySpot?</h2>

              <div className="space-y-6">
                <div className="mission-item flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Safety First</h3>
                    <p className="text-gray-600">
                      We believe everyone deserves to live in a safe environment. Our platform empowers communities to
                      identify and address safety hazards quickly.
                    </p>
                  </div>
                </div>

                <div className="mission-item flex gap-4">
                  <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <Users className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Community Driven</h3>
                    <p className="text-gray-600">
                      By harnessing the power of community collaboration, we create a network of vigilant citizens
                      working together for the common good.
                    </p>
                  </div>
                </div>

                <div className="mission-item flex gap-4">
                  <div className="bg-purple-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <Brain className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">AI-Powered Solutions</h3>
                    <p className="text-gray-600">
                      Our artificial intelligence technology helps categorize, prioritize, and track hazards, making the
                      reporting process more efficient.
                    </p>
                  </div>
                </div>

                <div className="mission-item flex gap-4">
                  <div className="bg-orange-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                    <BarChart className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Data-Driven Impact</h3>
                    <p className="text-gray-600">
                      We provide valuable insights to local authorities, helping them allocate resources more
                      effectively and make data-driven decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=500&width=600" alt="Community safety" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* AI & Crowdsourcing Section */}
      <section ref={aiSectionRef} className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Our Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Use AI & Crowdsourcing</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines the power of artificial intelligence with community knowledge to create a
              comprehensive safety solution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">AI-Powered Analysis</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Image Recognition:</span> Our AI analyzes photos to identify
                      hazard types automatically.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Severity Assessment:</span> The system evaluates the danger level
                      of each hazard.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Pattern Recognition:</span> We identify recurring issues and
                      high-risk areas.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-blue-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Predictive Analytics:</span> Our system can forecast potential
                      hazard areas.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Community Crowdsourcing</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Collective Reporting:</span> Multiple reports help validate and
                      prioritize issues.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Voting System:</span> Community members vote on which issues need
                      immediate attention.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Local Knowledge:</span> Residents provide valuable context that AI
                      might miss.
                    </p>
                  </li>
                  <li className="flex gap-3">
                    <div className="bg-green-100 p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 mt-1">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-gray-600">
                      <span className="font-semibold">Community Engagement:</span> The platform fosters civic
                      participation and responsibility.
                    </p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Our People</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind SafetySpot who are dedicated to making communities safer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Alex Johnson", role: "Founder & CEO" },
              { name: "Maria Rodriguez", role: "Chief Technology Officer" },
              { name: "David Chen", role: "AI Research Lead" },
              { name: "Sarah Williams", role: "Community Relations" },
            ].map((member, index) => (
              <div key={index} className="team-card text-center">
                <div className="mb-4 relative h-64 rounded-xl overflow-hidden">
                  <Image src="/placeholder.svg?height=300&width=300" alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} className="py-20 bg-gray-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm">Get In Touch</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or want to learn more about SafetySpot? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="contact-item flex gap-4">
                <div className="bg-blue-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Email</h3>
                  <p className="text-gray-600">info@safetyspot.com</p>
                </div>
              </div>

              <div className="contact-item flex gap-4">
                <div className="bg-green-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Phone</h3>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>

              <div className="contact-item flex gap-4">
                <div className="bg-purple-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Address</h3>
                  <p className="text-gray-600">123 Safety Street, Innovation City, ST 12345</p>
                </div>
              </div>

              <div className="contact-item pt-4">
                <h3 className="text-xl font-bold mb-3">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-blue-100 transition-colors">
                    <Facebook className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-blue-100 transition-colors">
                    <Twitter className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-blue-100 transition-colors">
                    <Instagram className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-blue-100 transition-colors">
                    <Linkedin className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image src="/placeholder.svg?height=400&width=600" alt="Office location" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

