"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { AddEventDialog } from "@/components/add-event-dialog"
import { Plus, CalendarIcon, Clock, MapPin, Users, Briefcase, AlertCircle, CheckCircle } from "lucide-react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Technical Interview - Google",
      description: "Frontend Developer position interview",
      date: "2024-01-22",
      time: "14:00",
      type: "interview",
      priority: "high",
      location: "Google Office, Mountain View",
      company: "Google",
    },
    {
      id: 2,
      title: "Follow up - Microsoft",
      description: "Follow up call regarding application status",
      date: "2024-01-23",
      time: "10:00",
      type: "followup",
      priority: "medium",
      location: "Phone Call",
      company: "Microsoft",
    },
    {
      id: 3,
      title: "Project Demo - Portfolio",
      description: "Present portfolio website to potential client",
      date: "2024-01-25",
      time: "15:00",
      type: "deadline",
      priority: "low",
      location: "Remote - Zoom",
      company: "Personal Project",
    },
    {
      id: 4,
      title: "Code Review - React App",
      description: "Review code with team members",
      date: "2024-01-26",
      time: "11:00",
      type: "meeting",
      priority: "medium",
      location: "Office",
      company: "Current Company",
    },
    {
      id: 5,
      title: "Networking Event",
      description: "Tech meetup and networking event",
      date: "2024-01-27",
      time: "18:00",
      type: "other",
      priority: "low",
      location: "Tech Hub, San Francisco",
      company: "Tech Community",
    },
  ])

  const handleEventAdded = (newEvent: any) => {
    setEvents((prev) => [...prev, newEvent])
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "interview":
        return <Users className="h-4 w-4" />
      case "followup":
        return <Clock className="h-4 w-4" />
      case "deadline":
        return <AlertCircle className="h-4 w-4" />
      case "meeting":
        return <CheckCircle className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50 dark:bg-red-950/20"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20"
      default:
        return "border-l-green-500 bg-green-50 dark:bg-green-950/20"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "interview":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "followup":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "meeting":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const selectedDateEvents = events.filter((event) => {
    if (!date) return false
    const eventDate = new Date(event.date)
    return (
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear()
    )
  })

  const upcomingEvents = events
    .filter((event) => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Manage your schedule and upcoming events.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant={viewMode === "month" ? "default" : "outline"}
            onClick={() => setViewMode("month")}
            className="w-full sm:w-auto"
          >
            Month
          </Button>
          <Button
            variant={viewMode === "week" ? "default" : "outline"}
            onClick={() => setViewMode("week")}
            className="w-full sm:w-auto"
          >
            Week
          </Button>
          <Button
            variant={viewMode === "day" ? "default" : "outline"}
            onClick={() => setViewMode("day")}
            className="w-full sm:w-auto"
          >
            Day
          </Button>
          <AddEventDialog onEventAdded={handleEventAdded}>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </AddEventDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              {viewMode === "month" && "Monthly View"}
              {viewMode === "week" && "Weekly View"}
              {viewMode === "day" && "Daily View"}
            </CardTitle>
            <CardDescription>Click on a date to view events for that day.</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border w-full"
              modifiers={{
                hasEvents: events.map((event) => new Date(event.date)),
              }}
              modifiersStyles={{
                hasEvents: {
                  backgroundColor: "hsl(var(--primary))",
                  color: "hsl(var(--primary-foreground))",
                  fontWeight: "bold",
                },
              }}
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {date ? `Events for ${date.toLocaleDateString()}` : "Select a Date"}
              </CardTitle>
              <CardDescription>
                {selectedDateEvents.length === 0
                  ? "No events scheduled for this date."
                  : `${selectedDateEvents.length} event${selectedDateEvents.length > 1 ? "s" : ""} scheduled`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(event.priority)}`}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">{getEventIcon(event.type)}</div>
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {event.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      )}
                      {event.company && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {event.company}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {selectedDateEvents.length === 0 && date && (
                <div className="text-center py-8">
                  <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No events for this date</p>
                  <AddEventDialog onEventAdded={handleEventAdded}>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </AddEventDialog>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
              <CardDescription>Your next scheduled events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">{getEventIcon(event.type)}</div>
                        <div>
                          <h4 className="font-medium text-sm">{event.title}</h4>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs ${getTypeColor(event.type)}`}>
                        {event.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8">
                  <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No upcoming events</p>
                  <AddEventDialog onEventAdded={handleEventAdded}>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </AddEventDialog>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
