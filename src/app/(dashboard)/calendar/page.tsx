import { Suspense } from "react";

import { cookies } from "next/headers";
import { CalendarPage } from "@/components/calendar-page";
import { Event } from "@/db/db-types";

export default async function Page() {
  const cookieStore = await cookies()
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ")

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    headers: { Cookie: cookieHeader },
    cache: 'force-cache',
  })

  const fetchedEvents = await res.json() as Event[]

  return (
    <Suspense fallback={(<div>Loading.....</div>)}>
      <CalendarPage events={ fetchedEvents } />
    </Suspense>
  )
}