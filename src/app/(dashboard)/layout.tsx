import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopBar } from "@/components/top-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <TopBar />
      <main className="ml-64 mt-16 p-6 min-h-[calc(100vh-4rem)] overflow-x-hidden">
        <div className="max-w-full">{children}</div>
      </main>
    </div>
  )
}
