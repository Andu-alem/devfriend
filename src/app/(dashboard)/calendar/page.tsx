import { Suspense } from "react";

import { Event } from "@/db/db-types";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { CalendarPage } from "@/components/calendar-page";

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