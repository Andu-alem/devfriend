"use client"

import type React from "react"

import { useState, useEffect, useActionState, startTransition } from "react"
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
import { Plus, X, Building, MapPin, DollarSign, Calendar, FileText, Tag } from "lucide-react"
import { createJob } from "@/lib/actions/app-actions"
import { toast } from "sonner"

const initialState = {
  success: false,
  errorMessage: ""
}

export function AddJobDialog({ children }:{ children: React.ReactNode }) {
  const router = useRouter()
  const pathName = usePathname()
  const [ state, formAction, isPending ] = useActionState(createJob, initialState)
  const [open, setOpen] = useState(false)
  const [requiredSkills, setRequiredSkills] = useState<string[]>([])
  
  const [currentSkill, setCurrentSkill] = useState("")

  useEffect(() => {
    const { success, errorMessage } = state
    if (!success && errorMessage.length < 1) return
    if (errorMessage.length > 0) {
      toast.error(errorMessage)
    } else {
      toast.success("Job added successfully!!!")
      setOpen(false)
      if (pathName.includes("jobs")){
        router.refresh()
      } else {
        // if job is added from the dashboard home page, redirect user to jobs page
        router.push("/jobs")
      }
    }
  }, [state, router, pathName])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    formData.append('requiredSkills', JSON.stringify(requiredSkills))

    startTransition(() => {
      formAction(formData)
    })
  }

  const addSkill = () => {
    if (currentSkill.trim() && !requiredSkills.includes(currentSkill.trim())) {
      setRequiredSkills([...requiredSkills, currentSkill.trim()])
      setCurrentSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setRequiredSkills(requiredSkills.filter((skill) => skill !== skillToRemove))
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
            <Building className="h-5 w-5" />
            Add New Job Application
          </DialogTitle>
          <DialogDescription>Add a new job opportunity to track your application progress.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Job Title <span className="text-red-400">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company <span className="text-red-400">*</span>
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="e.g. Google"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                placeholder="e.g. San Francisco, CA"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Salary Range
              </Label>
              <Input
                id="salary"
                name="salary"
                placeholder="e.g. $120k - $150k"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectItem value="saved">Saved</SelectItem>
                  <SelectItem value="applied">Applied</SelectItem>
                  <SelectItem value="interviewing">Interviewing</SelectItem>
                  <SelectItem value="offer">Offer</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
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

          <div className="space-y-2">
            <Label htmlFor="url">Job URL</Label>
            <Input
              id="url"
              type="url"
              name="url"
              placeholder="https://company.com/careers/job-id"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Job description, requirements, notes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Skills & Technologies
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g. React, TypeScript)"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button type="button" onClick={addSkill} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {requiredSkills.map((skill) => (
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
              {isPending ? "Adding..." : "Add Job Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
