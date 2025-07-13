import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { events } from "@/db/schema/events-schema";
import { count, eq } from "drizzle-orm";

export async function GET() {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    if(!authData?.user) {
        return NextResponse.json(
            { error: 'Unauthorized access' },
            { status: 401 }
        )
    }
    try {
        const result = await db
            .select({
                type: events.type,
                count: count()
            })
            .from(events)
            .where(eq(events.userId, authData.user.id))
            .groupBy(events.type)

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        )
    }
}