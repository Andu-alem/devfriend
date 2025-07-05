"use client"

import { Calendar, Home, Briefcase, FolderOpen, Settings, Target } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Jobs",
    url: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 z-40 w-64 h-screen bg-background border-r border-border flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Target className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold">DevFriend</span>
            <span className="text-xs text-muted-foreground">Developer Tracker</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <Link key={item.title} href={item.url}>
                <Button variant={isActive ? "default" : "ghost"} className="w-full justify-start gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
