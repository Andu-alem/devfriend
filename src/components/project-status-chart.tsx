"use client"

import { 
    Bar, 
    BarChart, 
    CartesianGrid, 
    ResponsiveContainer, 
    Tooltip, 
    XAxis, 
    YAxis
} from "recharts";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";

interface ProjectSummary {
    status: string
    count: number
}

export function ProjectStatusChart({
    projectSummary
}:{
    projectSummary: ProjectSummary[]
}) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Overview of your project progress</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] sm:h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={projectSummary}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="status" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}