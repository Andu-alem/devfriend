"use client"

import { AlertCircle, CalendarIcon, CheckCircle, Clock, Users } from "lucide-react";
import { UpcomingEvent } from "./upcoming-event";
import { type Event, type Project, type Job } from "@/db/db-types";
import { RecentActivities } from "./recent-activities";

export function BottomDashboardRow({
    events,
    projects,
    jobs
}:{
    events: Event[],
    projects: Project[],
    jobs: Job[]
}) {
    const recentActivities = [
        {
            action: "Project added",
            title: projects[0].title,
            date: (new Date(projects[0].createdAt)).toISOString(),
            type: "Project"
        },
        {
            action: "Job added",
            title: jobs[0].title,
            date: (new Date(jobs[0].createdAt)).toISOString(),
            type: "Job"
        },
        {
            action: "Event added",
            title: events[0].title,
            date: (new Date(events[0].createdAt)).toISOString(),
            type: "Event"
        }
    ]
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <UpcomingEvent
                events={ events } 
                getEventIcon={ getEventIcon }
                getTypeColor={ getTypeColor }
            />
    
            {/* Recent Activity */}
            <RecentActivities recentActivities={ recentActivities } />
        </div>
    )
}