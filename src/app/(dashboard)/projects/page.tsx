import { Suspense } from "react";

import { ProjectsList } from "@/components/proects-list";

import { db } from "@/db/drizzle";
import { projects } from "@/db/schema/projects-schema";


export default async function Page() {
  const fetchedProjects = await db.select().from(projects)
  return (
    <Suspense fallback={(<div>Loading.....</div>)}>
      <ProjectsList projects={ fetchedProjects } />
    </Suspense>
  )
}