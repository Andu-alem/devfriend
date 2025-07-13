"use client"

import { 
    Cell, 
    Pie, 
    PieChart, 
    ResponsiveContainer, 
    Tooltip 
} from "recharts";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";

interface JobSummary {
    status: string
    count: number
}

const chartColors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
]

export function JobStatusChart({
    jobSummary
}:{
    jobSummary: JobSummary[]
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Job Application Status</CardTitle>
                <CardDescription>Current status of your job applications</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={jobSummary}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={5}
                                nameKey="status"
                                dataKey="count"
                                >
                                {jobSummary.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={chartColors[index]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {jobSummary.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors[index] }} />
                        <span className="text-sm">
                            {item.status}: {item.count}
                        </span>
                    </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}