"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddJobDialog } from "@/components/add-job-dialog"
import {
  Search,
  Filter,
  Plus,
  Building,
  MapPin,
  DollarSign,
  Calendar,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Briefcase,
} from "lucide-react"

export default function JobsPage() {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Google",
      location: "Mountain View, CA",
      salary: "$150k - $200k",
      status: "applied",
      appliedDate: "2024-01-15",
      description: "Build next-generation web applications using React and TypeScript.",
      url: "https://careers.google.com/jobs/123",
      tags: ["React", "TypeScript", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "Meta",
      location: "Menlo Park, CA",
      salary: "$140k - $180k",
      status: "interviewing",
      appliedDate: "2024-01-10",
      description: "Work on Facebook's core platform and infrastructure.",
      url: "https://careers.meta.com/jobs/456",
      tags: ["React", "Node.js", "GraphQL", "Python"],
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "Apple",
      location: "Cupertino, CA",
      salary: "$130k - $170k",
      status: "offer",
      appliedDate: "2024-01-05",
      description: "Develop innovative software solutions for Apple products.",
      url: "https://jobs.apple.com/jobs/789",
      tags: ["Swift", "iOS", "macOS", "Objective-C"],
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "Netflix",
      location: "Los Gatos, CA",
      salary: "$120k - $160k",
      status: "rejected",
      appliedDate: "2024-01-01",
      description: "Build scalable backend services for streaming platform.",
      url: "https://jobs.netflix.com/jobs/101",
      tags: ["Java", "Spring", "Microservices", "AWS"],
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Amazon",
      location: "Seattle, WA",
      salary: "$110k - $150k",
      status: "saved",
      appliedDate: null,
      description: "Manage cloud infrastructure and deployment pipelines.",
      url: "https://amazon.jobs/jobs/202",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform"],
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "kanban">("list")

  const handleJobAdded = (newJob: any) => {
    setJobs((prev) => [...prev, newJob])
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || job.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "applied":
        return <Clock className="h-4 w-4" />
      case "interviewing":
        return <AlertCircle className="h-4 w-4" />
      case "offer":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return <Eye className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "applied":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "interviewing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "offer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const statusCounts = {
    all: jobs.length,
    saved: jobs.filter((j) => j.status === "saved").length,
    applied: jobs.filter((j) => j.status === "applied").length,
    interviewing: jobs.filter((j) => j.status === "interviewing").length,
    offer: jobs.filter((j) => j.status === "offer").length,
    rejected: jobs.filter((j) => j.status === "rejected").length,
  }

  if (viewMode === "kanban") {
    const columns = [
      { id: "saved", title: "Saved", jobs: jobs.filter((j) => j.status === "saved") },
      { id: "applied", title: "Applied", jobs: jobs.filter((j) => j.status === "applied") },
      { id: "interviewing", title: "Interviewing", jobs: jobs.filter((j) => j.status === "interviewing") },
      { id: "offer", title: "Offer", jobs: jobs.filter((j) => j.status === "offer") },
      { id: "rejected", title: "Rejected", jobs: jobs.filter((j) => j.status === "rejected") },
    ]

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Job Applications</h1>
            <p className="text-muted-foreground">Track and manage your job application pipeline.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className="w-full sm:w-auto"
            >
              List View
            </Button>
            <Button
              variant={viewMode === "kanban" ? "default" : "outline"}
              onClick={() => setViewMode("kanban")}
              className="w-full sm:w-auto"
            >
              Kanban View
            </Button>
            <AddJobDialog onJobAdded={handleJobAdded}>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Job Application
              </Button>
            </AddJobDialog>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto">
          {columns.map((column) => (
            <Card key={column.id} className="min-h-[500px]">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  {column.title}
                  <Badge variant="secondary" className="ml-2">
                    {column.jobs.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {column.jobs.map((job) => (
                  <Card key={job.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm line-clamp-2">{job.title}</h4>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {job.company}
                      </p>
                      {job.location && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {job.location}
                        </p>
                      )}
                      {job.salary && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          {job.salary}
                        </p>
                      )}
                      {job.appliedDate && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Applied {job.appliedDate}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {job.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {job.tags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Job Applications</h1>
          <p className="text-muted-foreground">Track and manage your job application pipeline.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className="w-full sm:w-auto"
          >
            List View
          </Button>
          <Button
            variant={viewMode === "kanban" ? "default" : "outline"}
            onClick={() => setViewMode("kanban")}
            className="w-full sm:w-auto"
          >
            Kanban View
          </Button>
          <AddJobDialog onJobAdded={handleJobAdded}>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Add Job Application
            </Button>
          </AddJobDialog>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search jobs, companies, or technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({statusCounts.all})</SelectItem>
            <SelectItem value="saved">Saved ({statusCounts.saved})</SelectItem>
            <SelectItem value="applied">Applied ({statusCounts.applied})</SelectItem>
            <SelectItem value="interviewing">Interviewing ({statusCounts.interviewing})</SelectItem>
            <SelectItem value="offer">Offer ({statusCounts.offer})</SelectItem>
            <SelectItem value="rejected">Rejected ({statusCounts.rejected})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs List */}
      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="card-hover">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <Badge className={`w-fit ${getStatusColor(job.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(job.status)}
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </div>
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {job.company}
                    </div>
                    {job.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </div>
                    )}
                    {job.appliedDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Applied {job.appliedDate}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex flex-row lg:flex-col gap-2">
                  {job.url && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || statusFilter !== "all"
                ? "Try adjusting your search or filters."
                : "Start by adding your first job application."}
            </p>
            <AddJobDialog onJobAdded={handleJobAdded}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Job Application
              </Button>
            </AddJobDialog>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
