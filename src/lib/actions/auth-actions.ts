'use server'
import { db } from '@/db/drizzle'
import { auth } from '../auth'
import * as z from 'zod'


const signupSchema = z.object({
    name: z.string().max(15),
    email: z.string().email(),
    password: z.string().min(8)
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

export async function signupUser(prevState:any, formData: FormData) {
    const rawFormData = Object.fromEntries(formData)
    const { name, email, password } = rawFormData

    const validateData = signupSchema.safeParse({
        name,
        email,
        password
    })

    if (!validateData.success) {
        return {
            errorMessage: "Invalid data"
        }
    }

    try {
    } catch(error) {
        console.log("error occlured")
        return {
            errorMessage: ""
        }
    }
}

export async function loginUser(prevState:any, formData: FormData) {
    const rawFormData = Object.fromEntries(formData)
    const { email, password } = rawFormData

    const validateData = loginSchema.safeParse({
        email,
        password
    })

    if (!validateData.success) {
        return {
            errorMessage: "Invalid data"
        }
    }

    try {
    } catch(error) {
        console.log("error occlured")
        return {
            errorMessage: ""
        }
    }
}