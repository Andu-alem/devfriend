"use client"

import { Plus, Briefcase, FolderOpen, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const jobStatusData = [
  { name: "Saved", value: 12, color: "hsl(var(--chart-1))" },
  { name: "Applied", value: 8, color: "hsl(var(--chart-2))" },
  { name: "Interviewing", value: 3, color: "hsl(var(--chart-3))" },
  { name: "Offer", value: 1, color: "hsl(var(--chart-4))" },
  { name: "Rejected", value: 5, color: "hsl(var(--chart-5))" },
]

const projectStatusData = [
  { name: "Idea", count: 4 },
  { name: "In Progress", count: 6 },
  { name: "Completed", count: 8 },
  { name: "Deployed", count: 3 },
]

const upcomingItems = [
  { type: "interview", title: "Frontend Developer at TechCorp", date: "Today, 2:00 PM" },
  { type: "deadline", title: "E-commerce App - MVP", date: "Tomorrow" },
  { type: "followup", title: "Follow up with StartupXYZ", date: "Dec 15" },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your development journey overview.</p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Job
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29</div>
            <p className="text-xs text-muted-foreground">+3 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 nearing completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Job Applications Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Job Application Status</CardTitle>
            <CardDescription>Current status of your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                saved: { label: "Saved", color: "hsl(var(--chart-1))" },
                applied: { label: "Applied", color: "hsl(var(--chart-2))" },
                interviewing: { label: "Interviewing", color: "hsl(var(--chart-3))" },
                offer: { label: "Offer", color: "hsl(var(--chart-4))" },
                rejected: { label: "Rejected", color: "hsl(var(--chart-5))" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jobStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {jobStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Overview of your project pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Projects", color: "hsl(var(--chart-1))" },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectStatusData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Items */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming</CardTitle>
          <CardDescription>Your upcoming interviews, deadlines, and reminders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.type === "interview"
                        ? "bg-blue-500"
                        : item.type === "deadline"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <Badge
                  variant={
                    item.type === "interview" ? "default" : item.type === "deadline" ? "destructive" : "secondary"
                  }
                >
                  {item.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
