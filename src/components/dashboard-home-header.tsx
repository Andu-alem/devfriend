"use client"

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { AddProjectDialog } from "./add-project-dialog";
import { AddJobDialog } from "./add-job-dialog";

export function DashboardHomeHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your developer journey overview.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <AddJobDialog>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Job
          </Button>
        </AddJobDialog>
        <AddProjectDialog>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </AddProjectDialog>
      </div>
    </div>
  )
}