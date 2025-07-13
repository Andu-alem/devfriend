"use client"

import { useTheme } from "next-themes"
import { Button } from "./ui/button"

export function ThemeToggler({
    isMobile = false
}) {
    const {theme, setTheme} = useTheme()

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-full justify-start"
            >
                {isMobile ? 
                    (theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode")
                    : (theme === "dark" ? "☀️" : "🌙")
                }
        </Button>
    )
}