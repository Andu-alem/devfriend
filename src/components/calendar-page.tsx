"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddEventDialog } from "@/components/add-event-dialog"
import { Plus, CalendarIcon, Clock, Users, AlertCircle, CheckCircle } from "lucide-react"
import { CalendarView } from "./calendar-view"
import { type Event } from "@/db/db-types"
import { EventDate } from "./event-date"
import { UpcomingEvent } from "./upcoming-event"


export function CalendarPage({
    events
}:{
    events: Event[]
}) {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const getEventIcon = (type: string) => {
        switch (type) {
        case "interview":
            return <Users className="h-4 w-4" />
        case "follow-up":
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Calendar</h1>
                    <p className="text-muted-foreground">Manage your schedule and upcoming events.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <AddEventDialog>
                        <Button className="w-full sm:w-auto">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Event
                        </Button>
                    </AddEventDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <CalendarView events={ events } date={ date } setDate={ setDate } />

                <div className="space-y-6">
                    {/* Events for Selected D`ate */}
                    <EventDate 
                        events={ events } 
                        date={ date } 
                        getEventIcon={ getEventIcon }
                        getPriorityColor={ getPriorityColor }
                        getTypeColor={ getTypeColor }
                    />

                    {/* Upcoming Events */}
                    <UpcomingEvent 
                        events={ events } 
                        getEventIcon={ getEventIcon }
                        getTypeColor={ getTypeColor }
                    />
                </div>
            </div>
        </div>
    )
}
