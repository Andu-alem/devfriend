import { Suspense } from "react";

import { JobsList } from "@/components/jobs-list";

import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema/jobs-schema";


export default async function Page() {
  const fetchedJobs = await db.select().from(jobs)
  return (
    <Suspense fallback={(<div>Loading.....</div>)}>
      <JobsList jobs={ fetchedJobs } />
    </Suspense>
  )
}