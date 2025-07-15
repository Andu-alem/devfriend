import { Suspense } from "react";

import { cookies } from "next/headers";
import { JobsList } from "@/components/jobs-list";
import { Job } from "@/db/db-types";

export default async function Page() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")

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