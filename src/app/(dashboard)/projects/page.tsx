import { Suspense } from "react";

import { ProjectsList } from "@/components/proects-list";

import { Project } from "@/db/db-types";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session) {
    redirect("/login")
  }

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