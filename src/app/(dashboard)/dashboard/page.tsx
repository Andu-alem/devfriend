"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddJobDialog } from "@/components/add-job-dialog"
import { AddProjectDialog } from "@/components/add-project-dialog"
import { AddEventDialog } from "@/components/add-event-dialog"
import { Briefcase, Code, Calendar, TrendingUp, Plus, Clock, CheckCircle, AlertCircle, Users } from "lucide-react"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", company: "Google", status: "applied" },
    { id: 2, title: "Full Stack Engineer", company: "Meta", status: "interviewing" },
  ])

  const [projects, setProjects] = useState([
    { id: 1, title: "E-commerce Dashboard", status: "in-progress" },
    { id: 2, title: "Task Manager", status: "completed" },
  ])

  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Technical Interview - Google",
      date: "Today, 2:00 PM",
      type: "interview",
      priority: "high",
    },
    {
      id: 2,
      title: "Follow up - Microsoft",
      date: "Tomorrow, 10:00 AM",
      type: "followup",
      priority: "medium",
    },
  ])

  const stats = [
    {
      title: "Total Applications",
      value: jobs.length.toString(),
      change: "+12%",
      icon: <Briefcase className="h-4 w-4" />,
      color: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: projects.length.toString(),
      change: "+3",
      icon: <Code className="h-4 w-4" />,
      color: "text-green-600",
    },
    {
      title: "Interviews",
      value: events.filter((e) => e.type === "interview").length.toString(),
      change: "+2",
      icon: <Users className="h-4 w-4" />,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "68%",
      change: "+5%",
      icon: <TrendingUp className="h-4 w-4" />,
      color: "text-orange-600",
    },
  ]

  const jobStatusData = [
    { name: "Applied", value: jobs.filter((j) => j.status === "applied").length, color: "#3b82f6" },
    { name: "Interviewing", value: jobs.filter((j) => j.status === "interviewing").length, color: "#8b5cf6" },
    { name: "Offer", value: jobs.filter((j) => j.status === "offer").length, color: "#10b981" },
    { name: "Rejected", value: jobs.filter((j) => j.status === "rejected").length, color: "#ef4444" },
  ]

  const projectStatusData = [
    { name: "Idea", count: projects.filter((p) => p.status === "idea").length },
    { name: "In Progress", count: projects.filter((p) => p.status === "in-progress").length },
    { name: "Completed", count: projects.filter((p) => p.status === "completed").length },
    { name: "Deployed", count: projects.filter((p) => p.status === "deployed").length },
  ]

  const recentActivity = [
    {
      action: "Applied to Frontend Developer at Stripe",
      time: "2 hours ago",
      type: "application",
    },
    {
      action: "Completed React Dashboard project",
      time: "1 day ago",
      type: "project",
    },
    {
      action: "Interview scheduled with Meta",
      time: "2 days ago",
      type: "interview",
    },
    {
      action: "Updated portfolio website",
      time: "3 days ago",
      type: "project",
    },
  ]

  const handleJobAdded = (newJob: any) => {
    setJobs((prev) => [...prev, newJob])
  }

  const handleProjectAdded = (newProject: any) => {
    setProjects((prev) => [...prev, newProject])
  }

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
      default:
        return <CheckCircle className="h-4 w-4" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your developer journey overview.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <AddJobDialog onJobAdded={handleJobAdded}>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          </AddJobDialog>
          <AddProjectDialog onProjectAdded={handleProjectAdded}>
            <Button variant="outline" className="w-full sm:w-auto bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </AddProjectDialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={stat.color}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Job Applications Chart */}
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
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {jobStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Status Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Overview of your project progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={projectStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Your schedule for the next few days</CardDescription>
              </div>
              <AddEventDialog onEventAdded={handleEventAdded}>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </AddEventDialog>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${getPriorityColor(event.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getEventIcon(event.type)}</div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest actions and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
