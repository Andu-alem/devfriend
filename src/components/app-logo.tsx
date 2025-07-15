"use client"
import Link from "next/link";
import { Target } from "lucide-react";

export function AppLogo() {
    return (
        <Link href="/" className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Target className="h-4 w-4" />
        </Link>
    )
}