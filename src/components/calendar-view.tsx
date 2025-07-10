"use client"

import { type Event } from "@/db/db-types"
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card"
import { Calendar } from "./ui/calendar"


export function CalendarView({
    events,
    date,
    setDate
}:{
    events: Event[],
    date?: Date,
    setDate: (arg: Date) => void
}) {
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
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
                    required
                />
            </CardContent>
        </Card>
    )
}