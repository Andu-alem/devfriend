import { Suspense } from "react";

import { cookies } from "next/headers";

import { DashboardHomeHeader } from "@/components/dashboard-home-header";
import { StatusSummaryList } from "@/components/status-summary-list";
import { JobStatusChart } from "@/components/job-status-chart";
import { ProjectStatusChart } from "@/components/project-status-chart";
import { BottomDashboardRow } from "@/components/bottom-dashboard-row";

async function getJobsSummary(cookieHeader: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/status-counts`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  return res.json()
}

async function getProjectsSummary(cookieHeader: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/status-counts`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  return res.json()
}

async function getEventsSummary(cookieHeader: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events/type-count`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  return res.json()
}

async function getAllEvents(cookieHeader: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  return res.json()
}

async function getAllProjects(cookieHeader: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  return res.json()
}
async function getAllJobs(cookieHeader: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  return res.json()
}


export default async function Page() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")
  
  const [jobsSummary, projectsSummary, eventsSummary, events, projects, jobs] = await Promise.all([
    getJobsSummary(cookieHeader),
    getProjectsSummary(cookieHeader),
    getEventsSummary(cookieHeader),
    getAllEvents(cookieHeader),
    getAllProjects(cookieHeader),
    getAllJobs(cookieHeader),
  ])

  return (
    <div className="space-y-6">
      <DashboardHomeHeader />
      <StatusSummaryList 
        jobSummary={jobsSummary}
        projectSummary={projectsSummary}
        eventSummary={eventsSummary}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={(<div>Loading....</div>)}>
          <JobStatusChart jobSummary={jobsSummary} />
        </Suspense>
        <Suspense fallback={(<div>Loading....</div>)}>
          <ProjectStatusChart projectSummary={projectsSummary} />
        </Suspense>
      </div>
      <Suspense fallback={(<div>Loading....</div>)}>
        <BottomDashboardRow events={events} jobs={jobs} projects={projects} />
      </Suspense>
    </div>
  )
}