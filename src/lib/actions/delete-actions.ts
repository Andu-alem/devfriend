"use server"

import { db } from "@/db/drizzle";
import { auth } from "../auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

import { projects } from "@/db/schema/projects-schema";
import { jobs } from "@/db/schema/jobs-schema";
import { events } from "@/db/schema/events-schema";


export async function deleteProject(projectId:number) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })

    if (!authData) {
        return {
            success: false,
            errorMessage: "Unauthorized user"
        }
    }

    try {
        await db.delete(projects).where(eq(projects.id, projectId))

        revalidatePath("/projects")
        revalidatePath("/dashboard")

        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            succes: false,
            errorMessage: error as string
        }
    }
}

export async function deleteJob(projectId:number) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })

    if (!authData) {
        return {
            success: false,
            errorMessage: "Unauthorized user"
        }
    }

    try {
        await db.delete(jobs).where(eq(jobs.id, projectId))

        revalidatePath("/jobs")
        revalidatePath("/dashboard")

        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            succes: false,
            errorMessage: error as string
        }
    }
}

export async function deleteEvent(projectId:number) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })

    if (!authData) {
        return {
            success: false,
            errorMessage: "Unauthorized user"
        }
    }

    try {
        await db.delete(events).where(eq(events.id, projectId))

        revalidatePath("/calendar")
        revalidatePath("/dashboard")

        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            succes: false,
            errorMessage: error as string
        }
    }
}