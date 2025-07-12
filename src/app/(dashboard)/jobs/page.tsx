import { Suspense } from "react";

import { Job } from "@/db/db-types";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { JobsList } from "@/components/jobs-list";


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

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  const fetchedJobs = await res.json() as Job[]

  return (
    <Suspense fallback={(<div>Loading.....</div>)}>
      <JobsList jobs={ fetchedJobs } />
    </Suspense>
  )
}