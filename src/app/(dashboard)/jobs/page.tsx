"use client"

import { useState } from "react"
import { Plus, Filter, Search, MapPin, Building, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const jobColumns = [
  { id: "saved", title: "Saved", color: "bg-gray-100 dark:bg-gray-800" },
  { id: "applied", title: "Applied", color: "bg-blue-100 dark:bg-blue-900" },
  { id: "interviewing", title: "Interviewing", color: "bg-yellow-100 dark:bg-yellow-900" },
  { id: "offer", title: "Offer", color: "bg-green-100 dark:bg-green-900" },
  { id: "rejected", title: "Rejected", color: "bg-red-100 dark:bg-red-900" },
]

const jobsData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    status: "saved",
    salary: "$120k - $150k",
    appliedDate: "2024-01-15",
    tags: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    status: "applied",
    salary: "$100k - $130k",
    appliedDate: "2024-01-10",
    tags: ["Node.js", "React", "PostgreSQL"],
  },
  {
    id: 3,
    title: "React Developer",
    company: "InnovateLab",
    location: "New York, NY",
    status: "interviewing",
    salary: "$110k - $140k",
    appliedDate: "2024-01-05",
    tags: ["React", "Redux", "GraphQL"],
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCompany, setFilterCompany] = useState("")

  const filteredJobs = jobsData.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Tracker</h1>
          <p className="text-muted-foreground">Manage your job applications with a visual Kanban board</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Job
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCompany} onValueChange={setFilterCompany}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by company" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            <SelectItem value="techcorp">TechCorp</SelectItem>
            <SelectItem value="startupxyz">StartupXYZ</SelectItem>
            <SelectItem value="innovatelab">InnovateLab</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {jobColumns.map((column) => (
          <div key={column.id} className="space-y-4">
            <div className={`p-3 rounded-lg ${column.color}`}>
              <h3 className="font-semibold text-center">{column.title}</h3>
              <p className="text-sm text-center text-muted-foreground">
                {filteredJobs.filter((job) => job.status === column.id).length} jobs
              </p>
            </div>

            <div className="space-y-3">
              {filteredJobs
                .filter((job) => job.status === column.id)
                .map((job) => (
                  <Card key={job.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">{job.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-3 w-3" />
                        {job.company}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {job.location}
                      </div>
                      <div className="text-sm font-medium text-green-600">{job.salary}</div>
                      <div className="flex flex-wrap gap-1">
                        {job.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Applied {job.appliedDate}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
