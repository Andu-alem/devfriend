'use server'
import { auth } from '../auth'
import * as z from 'zod'
import { APIError } from 'better-auth/api'
import { redirect } from 'next/navigation'


const signupSchema = z.object({
    name: z.string().max(15),
    email: z.string().email(),
    password: z.string().min(8)
})

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

interface PrevState {
    errorMessage: string
}

export async function signupUser(prevState:PrevState, formData: FormData) {
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
        await auth.api.signUpEmail({
            body: {
                name: name as string,
                email: email as string,
                password: password as string
            }
        })
    } catch (error) {
        if (error instanceof APIError) {
            switch(error.status) {
                case "UNPROCESSABLE_ENTITY":
                    return {
                        errorMessage: "User already exists."
                    }
                case "BAD_REQUEST":
                    return {
                        errorMessage: "Invalid Credentials."
                    }
                default: 
                    return {
                        errorMessage: "Something went wrong."
                    }
            }
        } else {
            return {
                errorMessage: "Something went wrong, try again"
            }
        }
    }

    redirect("/dashboard")
}

export async function loginUser(prevState:PrevState, formData: FormData) {
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
        await auth.api.signInEmail({
            body: {
                email: email as string,
                password: password as string
            }
        })
    } catch(error) {
        if (error instanceof APIError) {
            switch(error.status) {
                case "UNPROCESSABLE_ENTITY":
                    return {
                        errorMessage: "User not found."
                    }
                case "BAD_REQUEST":
                    return {
                        errorMessage: "Invalid Credentials."
                    }
                default: 
                    return {
                        errorMessage: "Something went wrong."
                    }
            }
        } else {
            return {
                errorMessage: "Something went wrong, try again."
            }
        }
    }

    redirect("/dashboard")
}