"use client"

import { useMemo } from "react"
import { type Event } from "@/db/db-types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { AddEventDialog } from "./add-event-dialog"
import { CalendarIcon, Clock, Plus } from "lucide-react"


export function EventDate({
    events,
    date,
    getEventIcon,
    getPriorityColor,
    getTypeColor
}:{ 
    events: Event[],
    date?: Date,
    getEventIcon: (arg: string) => React.ReactNode,
    getPriorityColor: (arg: string) => string,
    getTypeColor: (arg: string) => string
}) {

    const selectedDateEvents = useMemo(() => (events.filter((event) => {
        if (!date) return false
        const eventDate = new Date(event.date)
        return (
          eventDate.getDate() === date.getDate() &&
          eventDate.getMonth() === date.getMonth() &&
          eventDate.getFullYear() === date.getFullYear()
        )
    })), [events, date])

    return (
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
                    </div>
                    </div>
                </div>
                ))}
                {selectedDateEvents.length === 0 && date && (
                <div className="text-center py-8">
                    <CalendarIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">No events for this date</p>
                    <AddEventDialog>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Event
                    </Button>
                    </AddEventDialog>
                </div>
                )}
            </CardContent>
            </Card>
    )
}