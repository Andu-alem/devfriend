"use client"

import type React from "react"

import { useState, useActionState, startTransition, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Code, Calendar, Github, ExternalLink, Tag, FolderOpen } from "lucide-react"
import { createProject } from "@/lib/actions/app-actions"
import { toast } from "sonner"

const initialState = {
  success: false,
  errorMessage: ""
}

export function AddProjectDialog({ children }:{ children: React.ReactNode }) {
  const router = useRouter()
  const pathName = usePathname()
  const [ state, formAction, isPending ] = useActionState(createProject, initialState)
  const [open, setOpen] = useState(false)
  const [techStacks, setTechStacks] = useState<string[]>([])
  
  const [currentStack, setCurrentStack] = useState("")

  useEffect(() => {
    const { success, errorMessage } = state
    if (!success && errorMessage.length < 1) return
    if (errorMessage.length > 0) {
      toast.error(errorMessage)
    } else {
      toast.success("Project added successfully!!!")
      setOpen(false)
      if (pathName.includes("projects")){
        router.refresh()
      } else {
        // if project is added from the dashboard home page, redirect user to projects page
        router.push("/projects")
      }
    }
  }, [state, router, pathName])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    formData.append('techStacks', JSON.stringify(techStacks))

    startTransition(() => {
      formAction(formData)
    })
  }

  const addSkill = () => {
    if (currentStack.trim() && !techStacks.includes(currentStack.trim())) {
      setTechStacks([...techStacks, currentStack.trim()])
      setCurrentStack("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setTechStacks(techStacks.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderOpen className="h-5 w-5" />
            Add New Project
          </DialogTitle>
          <DialogDescription>Create a new project to track your development progress.</DialogDescription>
        </DialogHeader>

        <form onSubmit={ handleSubmit } className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. E-commerce Dashboard"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your project, its goals, and key features..."
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Status
              </Label>
              <Select
                name="status"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="deployed">Deployed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                name="startDate"
                min={ (new Date()).toISOString().split("T")[0] }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                name="deadline"
                min={ (new Date()).toISOString().split("T")[0] }
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                GitHub Repository
              </Label>
              <Input
                id="githubUrl"
                type="url"
                name="githubUrl"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="demoUrl" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Demo URL
              </Label>
              <Input
                id="demoUrl"
                type="url"
                name="demoUrl"
                placeholder="https://your-project-demo.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Technologies & Stack
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add technology (e.g. React, Node.js, PostgreSQL)"
                value={currentStack}
                onChange={(e) => setCurrentStack(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button type="button" onClick={addSkill} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {techStacks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {techStacks.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
