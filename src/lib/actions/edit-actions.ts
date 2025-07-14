"use server"

import { db } from "@/db/drizzle";

import { projects } from "@/db/schema/projects-schema";
import { jobs } from "@/db/schema/jobs-schema";
import { events } from "@/db/schema/events-schema";
import { 
    projectSchema,
    jobInsertSchema,
    eventInsertSchema
} from "@/db/db-types";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

interface PrevState {
    success: boolean
    errorMessage: string
}

export async function editProject(prevState:PrevState, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        techStack: JSON.parse(formData.get("techStacks") as string) as string[],
        deadline: formData.get("deadline") === "" ? null : formData.get("deadline"),
        startDate: formData.get("startDate") === "" ? null : formData.get("startDate"),
        githubUrl: formData.get("startDate") === "" ? null : formData.get("githubUrl"),
        demoUrl: formData.get("demoUrl") === "" ? null : formData.get("demoUrl"),
        projectId: formData.get("projectId")
    }

    const { projectId, ...updateData } = newRawData

    // validate the formdata using zod schema that is generated from the database schema
    if (!projectSchema.safeParse(updateData).success) {
        return {
            ...prevState,
            errorMessage: "Invalid data"
        }
    }

    try {
        const parsedData = projectSchema.parse(updateData)
        await db.update(projects)
                .set(parsedData)
                .where(eq(projects.id, Number(projectId)))

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

export async function editJob(prevState: PrevState, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        requiredSkills: JSON.parse(formData.get("requiredSkills") as string) as string[],
        deadline: formData.get("deadline") === "" ? null : formData.get("deadline"),
        url: formData.get("url") === "" ? null : formData.get("url"),
        location: formData.get("location") === "" ? null : formData.get("location"),
        userId: formData.get("userId"),
        jobId: formData.get("jobId")
    }

    const { jobId, ...updateData } = newRawData

    // validate the formdata using zod schema that is generated from the database schema
    if (!jobInsertSchema.safeParse(updateData).success) {
        return {
            ...prevState,
            errorMessage: "Invalid data"
        }
    }

    try {
        const parsedData = jobInsertSchema.parse(updateData)
        await db.update(jobs)
            .set(parsedData)
            .where(eq(jobs.id, Number(jobId)))

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

export async function editEvent(prevState: PrevState, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        userId: formData.get("userId"),
        eventId: formData.get("projectId")
    }

    const { eventId, ...updateData } = newRawData
    // validate the formdata using zod schema that is generated from the database schema
    if (!eventInsertSchema.safeParse(updateData).success) {
        return {
            ...prevState,
            errorMessage: "Invalid data"
        }
    }

    try {
        const parsedData = eventInsertSchema.parse(updateData)
        await db.update(events)
                .set(parsedData)
                .where(eq(events.id, Number(eventId)))

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