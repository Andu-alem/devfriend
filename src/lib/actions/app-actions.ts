"use server"

import { db } from "@/db/drizzle";
import { redirect } from 'next/navigation';
import { auth } from "../auth";
import { headers } from "next/headers";

import { projects } from "@/db/schema/projects-schema";
import { jobs } from "@/db/schema/jobs-schema";
import { 
    projectSchema,
    jobInsertSchema
} from "@/db/db-types";

export async function createProject(prevState:any, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        techStack: JSON.parse(formData.get("requiredSkills") as string) as string[],
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
        const createdProject = await db.insert(projects).values(parsedData)
        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: "Something went wrong, try again"
        }
    }
}

export async function createJob(prevState: any, formData: FormData) {
    const authData = await auth.api.getSession({
        headers: await headers()
    })
    const rawData = Object.fromEntries(formData);
    const newRawData = {
        ...rawData,
        requiredSkills: JSON.parse(formData.get("requiredSkills") as string) as string[],
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
        const createJob = await db.insert(jobs).values(parsedData)

        return {
            success: true,
            errorMessage: ""
        }
    } catch (error) {
        return {
            success: false,
            errorMessage: "Something went wrong, try again"
        }
    }
}

export async function createEvent(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    console.log("the submited data is ----- ", rawData)

    return {
        errorMessage: ""
    }
}