"use server"

import { db } from "@/db/drizzle";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { projects } from "@/db/schema/projects-schema";
import { jobs } from "@/db/schema/jobs-schema";
import { events } from "@/db/schema/events-schema";

interface PrevState {
    success: boolean
    errorMessage: string
}

export async function deleteProject(prevState: PrevState, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const projectId = Number(formData.get("id"))

    if (!authData) {
        return {
            ...prevState,
            errorMessage: "Unauthorized user"
        }
    }

    try {
        await db.delete(projects).where(eq(projects.id, projectId))

        revalidatePath("/projects")
        revalidatePath("/dashboard")

        return {
            ...prevState,
            success: true
        }
    } catch (error) {
        return {
            ...prevState,
            errorMessage: error as string
        }
    }
}

export async function deleteJob(prevState: PrevState, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const jobId = Number(formData.get("id"))

    if (!authData) {
        return {
            ...prevState,
            errorMessage: "Unauthorized user"
        }
    }

    try {
        await db.delete(jobs).where(eq(jobs.id, jobId))

        revalidatePath("/jobs")
        revalidatePath("/dashboard")

        return {
            ...prevState,
            success: true
        }
    } catch (error) {
        return {
            ...prevState,
            errorMessage: error as string
        }
    }
}

export async function deleteEvent(prevState: PrevState, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const eventId = Number(formData.get("id"))

    if (!authData) {
        return {
            ...prevState,
            errorMessage: "Unauthorized user"
        }
    }

    try {
        await db.delete(events).where(eq(events.id, eventId))

        revalidatePath("/calendar")
        revalidatePath("/dashboard")

        return {
            ...prevState,
            success: true
        }
    } catch (error) {
        return {
            ...prevState,
            errorMessage: error as string
        }
    }
}