"use client"

import { Trash2, ExternalLink, Edit, Calendar, Github } from "lucide-react"
import { Button } from "./ui/button"
import { 
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
} from "./ui/card"
import { StatusBadge } from "./project-status-badge"
import { type Project } from "@/db/db-types"
import { Badge } from "./ui/badge"

export function ProjectCard({
    project,
    viewMode
}:{
    project: Project,
    viewMode: string
}) {
    return viewMode === "grid" ? (
        <VerticalProjectCard project={project} />
    ) : (
        <HorizontalProjectCard project={project} />
    )
}


function VerticalProjectCard({ 
    project 
}:{ project: Project }) {
    return (
        <Card key={project.id} className="card-hover">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                        <StatusBadge projectStatus={project.status} />
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

                <div className="flex flex-wrap gap-1">
                    {project.techStack && project.techStack.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                    {project.techStack && project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                            +{project.techStack.length - 3}
                        </Badge>
                    )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {(project.updatedAt).toDateString()}
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
    )
}



function HorizontalProjectCard({ 
    project 
}:{ project: Project }) {
    return (
        <Card key={project.id} className="card-hover">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="text-lg font-semibold">{project.title}</h3>
                            <StatusBadge projectStatus={project.status} />
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>


                        <div className="flex flex-wrap gap-2">
                            {project.techStack && project.techStack.map((stack) => (
                                <Badge key={stack} variant="outline" className="text-xs">
                                    {stack}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Updated {(project.updatedAt).toDateString()}
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
    )
}