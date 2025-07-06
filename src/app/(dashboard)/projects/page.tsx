"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { AddProjectDialog } from "@/components/add-project-dialog"
import {
  Search,
  Filter,
  Plus,
  Github,
  ExternalLink,
  Calendar,
  Star,
  GitCommit,
  Edit,
  Trash2,
  FolderOpen,
  Code,
  Clock,
  CheckCircle,
  Lightbulb,
  Rocket,
} from "lucide-react"

export default function ProjectsPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "A comprehensive admin dashboard for managing online store operations with real-time analytics.",
      status: "in-progress",
      progress: 75,
      tags: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      githubUrl: "https://github.com/user/ecommerce-dashboard",
      demoUrl: "https://ecommerce-dashboard-demo.vercel.app",
      startDate: "2024-01-01",
      deadline: "2024-02-15",
      lastUpdated: "2024-01-20",
      stars: 12,
      commits: 45,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates and team collaboration features.",
      status: "completed",
      progress: 100,
      tags: ["Next.js", "Prisma", "PostgreSQL", "Socket.io"],
      githubUrl: "https://github.com/user/task-manager",
      demoUrl: "https://task-manager-demo.vercel.app",
      startDate: "2023-11-01",
      deadline: "2023-12-31",
      lastUpdated: "2024-01-01",
      stars: 28,
      commits: 89,
    },
    {
      id: 3,
      title: "Weather App",
      description: "A beautiful weather application with location-based forecasts and interactive maps.",
      status: "deployed",
      progress: 100,
      tags: ["React Native", "Expo", "Weather API", "Maps"],
      githubUrl: "https://github.com/user/weather-app",
      demoUrl: "https://weather-app-demo.vercel.app",
      startDate: "2023-10-01",
      deadline: "2023-11-15",
      lastUpdated: "2023-11-20",
      stars: 35,
      commits: 67,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects and skills with modern design.",
      status: "idea",
      progress: 10,
      tags: ["Next.js", "Framer Motion", "MDX", "Vercel"],
      githubUrl: "",
      demoUrl: "",
      startDate: "2024-01-15",
      deadline: "2024-03-01",
      lastUpdated: "2024-01-15",
      stars: 0,
      commits: 3,
    },
    {
      id: 5,
      title: "Chat Application",
      description: "Real-time chat application with rooms, file sharing, and emoji reactions.",
      status: "in-progress",
      progress: 45,
      tags: ["Node.js", "Socket.io", "MongoDB", "Express"],
      githubUrl: "https://github.com/user/chat-app",
      demoUrl: "",
      startDate: "2024-01-10",
      deadline: "2024-02-28",
      lastUpdated: "2024-01-18",
      stars: 8,
      commits: 23,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleProjectAdded = (newProject: any) => {
    setProjects((prev) => [...prev, newProject])
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || project.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "idea":
        return <Lightbulb className="h-4 w-4" />
      case "in-progress":
        return <Clock className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "deployed":
        return <Rocket className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "idea":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "deployed":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

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
          <AddProjectDialog onProjectAdded={handleProjectAdded}>
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
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                    <Badge className={`w-fit ${getStatusColor(project.status)}`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(project.status)}
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
                      </div>
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    {project.stars > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {project.stars}
                      </div>
                    )}
                    {project.commits > 0 && (
                      <div className="flex items-center gap-1">
                        <GitCommit className="h-3 w-3" />
                        {project.commits}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {project.lastUpdated}
                  </div>
                </div>

                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="outline" size="sm" asChild className="flex-1 bg-transparent">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <Badge className={`w-fit ${getStatusColor(project.status)}`}>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(project.status)}
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")}
                        </div>
                      </Badge>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      {project.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {project.stars} stars
                        </div>
                      )}
                      {project.commits > 0 && (
                        <div className="flex items-center gap-1">
                          <GitCommit className="h-4 w-4" />
                          {project.commits} commits
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Updated {project.lastUpdated}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.demoUrl && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
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
      )}

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
            <AddProjectDialog onProjectAdded={handleProjectAdded}>
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
