import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { jobs } from "@/db/schema/jobs-schema";
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
                status: jobs.status,
                count: count()
            })
            .from(jobs)
            .where(eq(jobs.userId, authData.user.id))
            .groupBy(jobs.status)

        return NextResponse.json(result)
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        )
    }
}