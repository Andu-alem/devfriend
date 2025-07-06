'use server'
import { db } from '@/db/drizzle'
import { auth } from '../auth'

export async function signupUser(prevState:any, formData: FormData) {
    const fullName = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(`Name: ${fullName}, email: ${email}, password: ${password}`)
    return {
        errorMessage: 'error'
    }
}

export async function loginUser(prevState:any, formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')
    console.log(`Email: ${email}, password: ${password}`)
    return {
        errorMessage: 'error'
    }
}