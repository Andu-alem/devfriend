"use client"

import React from "react";
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { deleteEvent, deleteJob, deleteProject } from "@/lib/actions/delete-actions";

const initialState = {
    success: false,
    errorMessage: ""
};

export function DeleteDataDialog({
    children,
    id,
    type
}: {
    children: React.ReactNode,
    id: number,
    type: "event" | "job" | "project"
}) {
    const [open, setOpen] = React.useState(false);
    const [state, formAction, isPending] = React.useActionState(
        type === "event" ? deleteEvent : type === "job" ? deleteJob : deleteProject,
        initialState
    );
    const router = useRouter();

    React.useEffect(() => {
        const { success, errorMessage } = state;
        if (!success && errorMessage.length < 1) return;
        if (errorMessage.length > 0) {
            toast.error(errorMessage);
        } else {
            toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
            setOpen(false);
            router.refresh();
        }
    }, [state, router, type]);

    const handleDelete = () => {
        const formData = new FormData();
        formData.append('id', String(id));
        React.startTransition(() => {
            formAction(formData)
        })
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {type.charAt(0).toUpperCase() + type.slice(1)}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure you want to delete this {type}?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isPending}
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isPending ? "Deleting..." : "Yes, Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
