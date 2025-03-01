"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Search, Filter, AlertTriangle, ThumbsUp, MessageSquare, Calendar } from "lucide-react"
import Image from "next/image"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample hazard data
const HAZARDS = [
  {
    id: 1,
    title: "Large Pothole",
    description: "Deep pothole causing traffic hazard and potential vehicle damage.",
    category: "Road Damage",
    severity: "High",
    status: "In Progress",
    location: "Main Street & 5th Avenue",
    votes: 42,
    comments: 8,
    date: "2 days ago",
    lat: 40.7128,
    lng: -74.006,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "Fallen Tree Branch",
    description: "Large branch blocking sidewalk after recent storm.",
    category: "Debris/Obstruction",
    severity: "Medium",
    status: "Pending",
    location: "Oak Park, near playground",
    votes: 18,
    comments: 3,
    date: "1 day ago",
    lat: 40.7138,
    lng: -74.016,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "Exposed Wiring",
    description: "Electrical box with exposed wires near public walkway.",
    category: "Electrical Hazard",
    severity: "Very High",
    status: "Resolved",
    location: "Central Plaza, near fountain",
    votes: 67,
    comments: 12,
    date: "5 days ago",
    lat: 40.7148,
    lng: -74.026,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "Broken Streetlight",
    description: "Streetlight not functioning, creating dark area at night.",
    category: "Electrical Hazard",
    severity: "Medium",
    status: "Pending",
    location: "Elm Street & 10th Avenue",
    votes: 24,
    comments: 5,
    date: "3 days ago",
    lat: 40.7158,
    lng: -74.036,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "Flooded Underpass",
    description: "Water accumulation making road impassable after rain.",
    category: "Water/Flooding Issue",
    severity: "High",
    status: "In Progress",
    location: "Highway 101 Underpass",
    votes: 53,
    comments: 9,
    date: "1 day ago",
    lat: 40.7168,
    lng: -74.046,
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function MapPage() {
  const [selectedHazard, setSelectedHazard] = useState<typeof HAZARDS[0] | null>(null)
  const [filter, setFilter] = useState({
    category: "all",
    severity: "all",
    status: "all"
  })
  
  const headerRef = useRef(null)
  const mapRef = useRef(null)
  const filtersRef = useRef(null)
  const listRef = useRef(null)

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
      }
    )

    // Map animation
    gsap.fromTo(
      mapRef.current,
      { opacity: 0, scale: 0.95 },
      { 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        ease: "power2.out",
        delay: 0.3
      }
    )

    // Filters animation
    gsap.fromTo(
      filtersRef.current,
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.5, 
        ease: "power1.out",
        delay: 0.5
      }
    )

    // List animation
    gsap.fromTo(
      ".hazard-card",
      { opacity: 0, x: 20 },
      { 
        opacity: 1, 
        x: 0,
        stagger: 0.1,
        duration: 0.5, 
        ease: "power1.out",
        delay: 0.7
      }
    )

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Filter hazards based on current filters
  const filteredHazards = HAZARDS.filter(hazard => {
    if (filter.category !== "all" && hazard.category !== filter.category) return false;
    if (filter.severity !== "all" && hazard.severity !== filter.severity) return false;
    if (filter.status !== "all" && hazard.status !== filter.status) return false;
    return true;
  });

  return (
    <div className="overflow-hidden">
      {/* Header Section */}
      <section className="relative py-16 bg-blue-600 text-white">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image 
            src="/placeholder.svg?height=600&width=1920" 
            alt="Background pattern" 
            fill 
            className="object-cover"
          />
        </div>
        
        <div ref={headerRef} className="container relative z-10 px-4 text-center">
          <Badge className="mb-4 px-4 py-2 text-sm bg-white text-blue-600 hover:bg-gray-100">Live Data</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Safety Map</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore reported hazards in your community and track their resolution status in real-time.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Filters */}
            <div ref={filtersRef} className="lg:col-span-3 mb-4">
              <Card className="border-none shadow-md">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1 w-full">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input 
                          placeholder="Search by location or keyword..." 
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 items-center w-full md:w-auto">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-500">Filters:</span>
                      </div>
                      
                      <Select 
                        defaultValue="all"
                        onValueChange={(value) => setFilter({...filter, category: value})}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Road Damage">Road Damage</SelectItem>
                          <SelectItem value="Electrical Hazard">Electrical Hazard</SelectItem>
                          <SelectItem value="Water/Flooding Issue">Water/Flooding</SelectItem>
                          <SelectItem value="Debris/Obstruction">Debris/Obstruction</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        defaultValue="all"
                        onValueChange={(value) => setFilter({...filter, severity: value})}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Severity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Severities</SelectItem>
                          <SelectItem value="Very Low">Very Low</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Very High">Very High</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <Select 
                        defaultValue="all"
                        onValueChange={(value) => setFilter({...filter, status: value})}
                      >
                        <SelectTrigger className="w-[160px]">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="In Progress">In Progress</SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Map */}
            <div className="lg:col-span-2">
              <Card ref={mapRef} className="border-none shadow-xl h-[700px] overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  <div className="absolute inset-0">
                    <Image 
                      src="/placeholder.svg?height=700&width=1000" 
                      alt="Interactive map" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Sample hazard markers */}
                  {HAZARDS.map((hazard) => (
                    <div 
                      key={hazard.id}
                      className={`absolute hazard-marker cursor-pointer ${getMarkerColor(hazard.severity)}`}
                      style={{ 
                        top: `${Math.random() * 80 + 10}%`, 
                        left: `${Math.random() * 80 + 10}%` 
                      }}
                      onClick={() => setSelectedHazard(hazard)}
                    ></div>
                  ))}
                  
                  {/* Selected hazard popup */}
                  {selectedHazard && (
                    <div 
                      className="absolute bg-white rounded-lg shadow-xl p-4 w-64 z-10"
                      style={{ 
                        top: '30%', 
                        left: '40%',
                        transform: 'translate(-50%, -100%)'
                      }}
                    >
                      <div className="relative h-32 mb-3">
                        <Image 
                          src={selectedHazard.image || "/placeholder.svg"} 
                          alt={selectedHazard.title} 
                          fill
                          className="object-cover rounded-md"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className={getSeverityBadgeColor(selectedHazard.severity)}>
                            {selectedHazard.severity}
                          </Badge>
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-1">{selectedHazard.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{selectedHazard.description}</p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{selectedHazard.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{selectedHazard.date}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Badge variant="outline" className={getStatusBadgeColor(selectedHazard.status)}>
                          {selectedHazard.status}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => setSelectedHazard(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Hazard List */}
            <div ref={listRef} className="lg:col-span-1">
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="list" className="flex-1">List View</TabsTrigger>
                  <TabsTrigger value="stats" className="flex-1">Statistics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list" className="mt-0">
                  <div className="space-y-4 max-h-[650px] overflow-y-auto pr-2">
                    {filteredHazards.length > 0 ? (
                      filteredHazards.map((hazard) => (
                        <Card 
                          key={hazard.id} 
                          className="hazard-card border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => setSelectedHazard(hazard)}
                        >
                          <CardContent className="p-0">
                            <div className="relative h-32">
                              <Image 
                                src={hazard.image || "/placeholder.svg"} 
                                alt={hazard.title} 
                                fill
                                className="object-cover rounded-t-lg"
                              />
                              <div className="absolute top-2 right-2">
                                <Badge className={getSeverityBadgeColor(hazard.severity)}>
                                  {hazard.severity}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold">{hazard.title}</h3>
                                <Badge variant="outline" className={getStatusBadgeColor(hazard.status)}>
                                  {hazard.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{hazard.description}</p>
                              <div className="flex justify-between items-center text-sm text-gray-500">
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  <span className="truncate max-w-[100px]">{hazard.location}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="flex items-center">
                                    <ThumbsUp className="h-3 w-3 mr-1" />
                                    {hazard.votes}
                                  </span>
                                  <span className="flex items-center">
                                    <MessageSquare className="h-3 w-3 mr-1" />
                                    {hazard.comments}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">No hazards found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search criteria.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="stats" className="mt-0">
                  <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-4">Hazard Statistics</h3>
                      
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium mb-2">By Status</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Pending</span>
                                <span className="text-sm font-medium">40%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">In Progress</span>
                                <span className="text-sm font-medium">35%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Resolved</span>
                                <span className="text-sm font-medium">25%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">By Category</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Road Damage</span>
                                <span className="text-sm font-medium">45%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-red-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Electrical Hazard</span>
                                <span className="text-sm font-medium">20%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-orange-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Water/Flooding</span>
                                <span className="text-sm font-medium">15%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Debris/Obstruction</span>
                                <span className="text-sm font-medium">20%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Resolution Time</h4>
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-2xl font-bold text-blue-600">2.4</p>
                              <p className="text-xs text-gray-500">Days (Average)</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-2xl font-bold text-green-600">1</p>
                              <p className="text-xs text-gray-500">Day (Fastest)</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-2xl font-bold text-red-600">7</p>
                              <p className="text-xs text-gray-500">Days (Slowest)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Legend Section */}
      <section className="py-10 bg-white border-t">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Severity Levels</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Very Low - Minor inconvenience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span className="text-sm">Low - Limited impact</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Medium - Moderate concern</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span className="text-sm">High - Significant hazard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">Very High - Immediate danger</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Status Indicators</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                      Pending
                    </Badge>
                    <span className="text-sm">Awaiting review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">
                      In Progress
                    </Badge>
                    <span className="text-sm">Being addressed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                      Resolved
                    </Badge>
                    <span className="text-sm">Issue fixed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm">Road Damage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                    <span className="text-sm">Electrical Hazard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">Water/Flooding Issue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm">Debris/Obstruction</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-md">
              <CardContent className="p-4">
                <h3 className="font-bold mb-3">Actions</h3>
                <div className="space-\

