"use client"

import { useState, useMemo } from "react";
import { type Project } from "@/db/db-types"
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Filter, Search, Plus, FolderOpen } from "lucide-react";
import { AddProjectDialog } from "./add-project-dialog";
import { ProjectCard } from "./project-card";
import { Card, CardContent } from "./ui/card";


export function ProjectsList({
    projects
}:{ projects: Project[] }) {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    

    const filteredProjects = useMemo(() => {
        return projects.filter((project) => {
            const matchesSearch =
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (project.techStack?.some((stack) => stack.toLowerCase().includes(searchTerm.toLowerCase())) || false)
        
            const matchesStatus = statusFilter === "all" || project.status === statusFilter
        
            return matchesSearch && matchesStatus
        })
    },[searchTerm, statusFilter])

    const statusCounts = {
        all: projects.length,
        idea: projects.filter((p) => p.status === "idea").length,
        "in-progress": projects.filter((p) => p.status === "in-progress").length,
        completed: projects.filter((p) => p.status === "completed").length,
        deployed: projects.filter((p) => p.status === "deployed").length,
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold">Projects</h1>
                    <p className="text-muted-foreground">Manage and track your development projects.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Button
                        variant={viewMode === "grid" ? "default" : "outline"}
                        onClick={() => setViewMode("grid")}
                        className="w-full sm:w-auto"
                    >
                        Grid View
                    </Button>
                    <Button
                        variant={viewMode === "list" ? "default" : "outline"}
                        onClick={() => setViewMode("list")}
                        className="w-full sm:w-auto"
                    >
                        List View
                    </Button>
                    <AddProjectDialog>
                        <Button className="w-full sm:w-auto">
                            <Plus className="h-4 w-4 mr-2" />
                            New Project
                        </Button>
                    </AddProjectDialog>
                </div>
            </div>
        
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search projects, descriptions, or technologies..."
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
                        <SelectItem value="idea">Ideas ({statusCounts.idea})</SelectItem>
                        <SelectItem value="in-progress">In Progress ({statusCounts["in-progress"]})</SelectItem>
                        <SelectItem value="completed">Completed ({statusCounts.completed})</SelectItem>
                        <SelectItem value="deployed">Deployed ({statusCounts.deployed})</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            

            {/* Projects Grid/List */}
            {
                viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            filteredProjects.map((project) => (
                                <ProjectCard key={ project.id } project={ project } viewMode={ viewMode } />
                            ))
                        }
                    </div>
                ) : (
                    <div className="space-y-4">
                        {
                            filteredProjects.map((project) => (
                                <ProjectCard key={ project.id } project={ project } viewMode={ viewMode } />
                            ))
                        }
                    </div>
                )
            }

            {filteredProjects.length === 0 && (
                <Card>
                    <CardContent className="p-12 text-center">
                        <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No projects found</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchTerm || statusFilter !== "all"
                            ? "Try adjusting your search or filters."
                            : "Start by creating your first project."}
                        </p>
                        <AddProjectDialog>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                New Project
                            </Button>
                        </AddProjectDialog>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}