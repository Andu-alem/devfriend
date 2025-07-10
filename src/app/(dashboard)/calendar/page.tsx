import { Suspense } from "react";

import { db } from "@/db/drizzle";
import { events } from "@/db/schema/events-schema";

import { CalendarPage } from "@/components/calendar-page";

export default async function Page() {
  const fetchedEvents = await db.select().from(events)
  return (
    <Suspense fallback={(<div>Loading.....</div>)}>
      <CalendarPage events={ fetchedEvents } />
    </Suspense>
  )
}