import { Suspense } from "react";

import { ProjectsList } from "@/components/proects-list";

import { Project } from "@/db/db-types";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/projects`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })
  const fetchedProjects = await res.json() as Project[]

  return (
    <Suspense fallback={(<div>Loading.....</div>)}>
      <ProjectsList projects={ fetchedProjects } />
    </Suspense>
  )
}