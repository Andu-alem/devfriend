import { Briefcase, Code, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface ProjectSummary {
    status: string,
    count: number
}

interface JobSummary {
    status: string
    count: number
}
interface EventSummary {
    type: string
    count: number
}

export function StatusSummaryList({
    projectSummary,
    jobSummary,
    eventSummary
}:{
    projectSummary: ProjectSummary[],
    jobSummary: JobSummary[],
    eventSummary: EventSummary[]
}) {
    const stats = [
        {
            title: "Total Job Tracked",
            value: jobSummary.reduce((sum, summary) => sum + summary.count, 0),
            icon: <Briefcase className="h-4 w-4" />,
            color: "text-blue-600"
        },
        {
            title: "Total Projects Tracked",
            value: projectSummary.reduce((sum, summary) => sum + summary.count, 0),
            icon: <Code className="h-4 w-4" />,
            color: "text-green-600"
        },
        {
            title: "Events Tracked So Far",
            value: eventSummary.reduce((sum, summary) => sum + summary.count, 0),
            icon: <Users className="h-4 w-4" />,
            color: "text-purple-600"
        },
    ]

    return (
        <div className="grid grid-cols-3 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="card-hover">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <div className={stat.color}>{stat.icon}</div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}