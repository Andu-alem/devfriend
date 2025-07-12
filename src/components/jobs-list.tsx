"use client"

import { useMemo, useState } from "react"
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
  Briefcase,
} from "lucide-react"
import { JobCard } from "./job-card"
import { type Job } from "@/db/db-types";


export function JobsList({
    jobs
}:{ jobs: Job[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [viewMode, setViewMode] = useState<"list" | "kanban">("list")

    const filteredJobs = useMemo(() => jobs.filter((job) => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (job.requiredSkills?.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) || false)

        const matchesStatus = statusFilter === "all" || job.status === statusFilter

        return matchesSearch && matchesStatus
    }), [jobs, searchTerm, statusFilter])

    const columns = useMemo(() => ([
        { id: "saved", title: "Saved", jobs: jobs.filter((j) => j.status === "saved") },
        { id: "applied", title: "Applied", jobs: jobs.filter((j) => j.status === "applied") },
        { id: "interviewing", title: "Interviewing", jobs: jobs.filter((j) => j.status === "interviewing") },
        { id: "offer", title: "Offer", jobs: jobs.filter((j) => j.status === "offer") },
        { id: "rejected", title: "Rejected", jobs: jobs.filter((j) => j.status === "rejected") },
    ]), [jobs])


    return (
        <div className="space-y-6">
            {/* Header */}
            <PageHeader viewMode={ viewMode } setViewMode={ setViewMode } />

            {/* Filters */}
            {viewMode === "list" && <JobFilters
                jobs={jobs}
                searchTerm={ searchTerm }
                setSearchTerm={ setSearchTerm }
                statusFilter={ statusFilter }
                setStatusFilter={ setStatusFilter }
            />}

            {/* Jobs List in list view or kanban */}
            {
                viewMode === "list" ? (
                    <div className="grid gap-4">
                        {filteredJobs.map((job) => (
                            <JobCard key={job.id} viewMode="list" job={ job } />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-x-auto">
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
                                        <JobCard key={job.id} viewMode="kanban" job={job} />
                                    ))}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )
            }

            {(viewMode === "list" && filteredJobs.length === 0) && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchTerm || statusFilter !== "all"
                                ? "Try adjusting your search or filters."
                                : "Start by adding your first job application."}
                        </p>
                        <AddJobDialog>
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



function PageHeader({
    viewMode,
    setViewMode
}:{
    viewMode: "kanban"|"list",
    setViewMode: (arg: "kanban"|"list") => void
}) {
    return (
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
                <AddJobDialog>
                    <Button className="w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Job Application
                    </Button>
                </AddJobDialog>
            </div>
        </div>
    )
}

function JobFilters({
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    jobs
}:{
    searchTerm: string,
    setSearchTerm: (arg: string) => void,
    statusFilter: string,
    setStatusFilter: (arg: string) => void,
    jobs: Job[]
}) {
    const statusCounts = useMemo(() => ({
        all: jobs.length,
        saved: jobs.filter((j) => j.status === "saved").length,
        applied: jobs.filter((j) => j.status === "applied").length,
        interviewing: jobs.filter((j) => j.status === "interviewing").length,
        offer: jobs.filter((j) => j.status === "offer").length,
        rejected: jobs.filter((j) => j.status === "rejected").length,
    }), [jobs])

    return (
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
    )
}