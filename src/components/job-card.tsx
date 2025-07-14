"use client"

import { 
    Building, 
    MapPin, 
    DollarSign, 
    Calendar, 
    Edit, 
    ExternalLink, 
    Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { StatusBadge } from "./job-status-badge";
import { type Job } from "@/db/db-types";
import { EditJobDialog } from "./edit-job-dialog";
import { DeleteDataDialog } from "./delete-data-dialog";


export function JobCard({
    job,
    viewMode
}:{
    job: Job,
    viewMode: string
}) {
    return viewMode === "kanban" ? (
        <KanbanJobCard job={ job } />
    ) : (
        <ListModeCard job={ job } />
    )
}

function ListModeCard({
    job
}:{ job: Job }) {
    return (
        <Card key={job.id} className="card-hover">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <StatusBadge jobStatus={job.status} />
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
                            {job.deadline && (
                                <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    Applied {job.deadline}
                                </div>
                            )}
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                            {job.requiredSkills && job.requiredSkills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                    {skill}
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
                        <EditJobDialog job={ job }>
                            <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </EditJobDialog>
                        <DeleteDataDialog id={job.id} type="job">
                            <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive hover:text-destructive bg-transparent"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </DeleteDataDialog>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


function KanbanJobCard({
    job
}:{ job: Job }) {
    return (
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
                {job.deadline && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Applied {job.deadline}
                    </p>
                )}
                <div className="flex flex-wrap gap-1">
                    {job.requiredSkills && job.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                        </Badge>
                    ))}
                </div>

                <div className="flex gap-2">
                    {job.url && (
                        <Button variant="outline" size="sm" asChild>
                            <a href={job.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        </Button>
                    )}
                    <EditJobDialog job={ job }>
                        <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                        </Button>
                    </EditJobDialog>
                    <DeleteDataDialog id={job.id} type="job">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:text-destructive bg-transparent"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </DeleteDataDialog>
                </div>
            </div>
        </Card>
    )
}