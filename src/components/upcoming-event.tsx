"use client"

import { type Event } from "@/db/db-types"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card"
import { Button } from "./ui/button"
import { AddEventDialog } from "./add-event-dialog"
import { Badge } from "./ui/badge"
import { CalendarIcon, Clock, Plus } from "lucide-react"


export function UpcomingEvent({
    events,
    getEventIcon,
    getTypeColor
}:{
    events: Event[],
    
    getEventIcon: (arg: string) => React.ReactNode,
    getTypeColor: (arg: string) => string
}) {
    const upcomingEvents = events
        .filter((event) => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5)

    return (
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