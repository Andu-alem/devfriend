"use server"

import { db } from "@/db/drizzle";
import { auth } from "../auth";
import { headers } from "next/headers";

import { projects } from "@/db/schema/projects-schema";
import { jobs } from "@/db/schema/jobs-schema";
import { events } from "@/db/schema/events-schema";
import { 
    projectSchema,
    jobInsertSchema,
    eventInsertSchema
} from "@/db/db-types";
import { revalidatePath } from "next/cache";

interface PrevState {
    success: boolean
    errorMessage: string
}

export async function createProject(prevState:PrevState, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        techStack: JSON.parse(formData.get("techStacks") as string) as string[],
        deadline: formData.get("deadline") === "" ? null : formData.get("deadline"),
        startDate: formData.get("startDate") === "" ? null : formData.get("startDate"),
        userId: authData?.user.id as string
    }

    // validate the formdata using zod schema that is generated from the database schema
    if (!projectSchema.safeParse(newRawData).success) {
        return {
            success: false,
            errorMessage: "Invalid data"
        }
    }

    try {
        const parsedData = projectSchema.parse(newRawData)
        await db.insert(projects).values(parsedData)

        revalidatePath("/projects")
        revalidatePath("/dashboard")

        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error
        }
    }
}

export async function createJob(prevState: PrevState, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        requiredSkills: JSON.parse(formData.get("requiredSkills") as string) as string[],
        deadline: formData.get("deadline") === "" ? null : formData.get("deadline"),
        userId: authData?.user.id as string
    }

    // validate the formdata using zod schema that is generated from the database schema
    if (!jobInsertSchema.safeParse(newRawData).success) {
        return {
            success: false,
            errorMessage: "Invalid data"
        }
    }

    try {
        const parsedData = jobInsertSchema.parse(newRawData)
        await db.insert(jobs).values(parsedData)

        revalidatePath("/jobs")
        revalidatePath("/dashboard")
        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error
        }
    }
}

export async function createEvent(prevState: PrevState, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })

    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        userId: authData?.user.id as string
    }

    // validate the formdata using zod schema that is generated from the database schema
    if (!eventInsertSchema.safeParse(newRawData).success) {
        return {
            success: false,
            errorMessage: "Invalid data"
        }
    }

    try {
        const parsedData = eventInsertSchema.parse(newRawData)
        await db.insert(events).values(parsedData)

        revalidatePath("/calendar")
        revalidatePath("/dashboard")
        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: error
        }
    }
}