import { db } from "@/db/drizzle";
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";

export async function createProject(prevState:any, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    console.log("the submited data is ----- ", rawData)

    return {
        errorMessage: ""
    }
}

export async function createJob(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    console.log("the submited data is ----- ", rawData)

    return {
        errorMessage: ""
    }
}

export async function createEvent(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData);
    console.log("the submited data is ----- ", rawData)

    return {
        errorMessage: ""
    }
}