"use client"

import React from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { deleteEvent, deleteJob, deleteProject } from "@/lib/actions/delete-actions";


const initialState = {
    success: false,
    errorMessage: ""
}

export function DeleteDataDialog({
    children,
    id,
    type
}:{
    children: React.ReactNode,
    id: number,
    type: "event"|"job"|"project"
}) {
    const [open, setOpen] = React.useState(false)
    const [ state, formAction, isPending ] = React.useActionState(
        type === "event" ? deleteEvent : type === "job" ? deleteJob : deleteProject, 
        initialState)
    const router = useRouter()

    React.useEffect(() => {
        const { success, errorMessage } = state
        if (!success && errorMessage.length < 1) return
        if (errorMessage.length > 0) {
            toast.error(errorMessage)
        } else {
            toast.success("Job added successfully!!!")
            setOpen(false)
            router.refresh()
        }
    }, [state, router])

    const handleDelete = async () => {
        const formData = new FormData()
        
        formData.append('id', String(id))

        React.startTransition(() => {
            formAction(formData)
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{ children }</DialogTrigger>
            <DialogHeader>
                <DialogTitle>Delete Data</DialogTitle>
                <DialogDescription>Are you sure you want to proceed ?</DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <div>
                    <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button 
                        variant="destructive" 
                        onClick={handleDelete}
                        disabled={isPending}
                    >{ isPending ? "Deleting...." : "Yes" }</Button>
                </div>
            </DialogFooter>
        </Dialog>
    )
}