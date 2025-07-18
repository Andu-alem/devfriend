"use client"

import { useState } from "react"
import { Github, Calendar, Bell, Shield, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    interviews: true,
    deadlines: true,
    followups: true,
    email: false,
  })

  const [integrations, setIntegrations] = useState({
    github: false,
    googleCalendar: false,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="bg-secondary border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </div>
              <Badge className="bg-blue-200 text-blue-500">Comming Soon</Badge>
            </CardTitle>
            <CardDescription>Update your profile information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline">Change Avatar</Button>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>

            <Button disabled>Update Profile</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-secondary border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </div>
              <Badge className="bg-blue-200 text-blue-500">Comming Soon</Badge>
            </CardTitle>
            <CardDescription>Configure how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Interview Reminders</Label>
                <p className="text-sm text-muted-foreground">Get notified about upcoming interviews</p>
              </div>
              <Switch
                checked={notifications.interviews}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, interviews: checked }))}
                disabled
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Project Deadlines</Label>
                <p className="text-sm text-muted-foreground">Get notified about project deadlines</p>
              </div>
              <Switch
                checked={notifications.deadlines}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, deadlines: checked }))}
                disabled
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Follow-up Reminders</Label>
                <p className="text-sm text-muted-foreground">Get reminded to follow up on applications</p>
              </div>
              <Switch
                checked={notifications.followups}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, followups: checked }))}
                disabled
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                disabled
              />
            </div>

            <Button disabled>Save Updates</Button>
          </CardContent>
        </Card>

        {/* Integrations */}
        <Card className="bg-secondary border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Integrations</span>
              <Badge className="bg-blue-200 text-blue-500">Comming Soon</Badge>
            </CardTitle>
            <CardDescription>Connect your external accounts and services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Github className="h-6 w-6" />
                <div>
                  <Label>GitHub</Label>
                  <p className="text-sm text-muted-foreground">Sync your repositories and projects</p>
                </div>
              </div>
              <Button
                variant={integrations.github ? "destructive" : "default"}
                onClick={() => setIntegrations((prev) => ({ ...prev, github: !prev.github }))}
                disabled
              >
                {integrations.github ? "Disconnect" : "Connect"}
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6" />
                <div>
                  <Label>Google Calendar</Label>
                  <p className="text-sm text-muted-foreground">Sync interviews and deadlines</p>
                </div>
              </div>
              <Button
                variant={integrations.googleCalendar ? "destructive" : "default"}
                onClick={() => setIntegrations((prev) => ({ ...prev, googleCalendar: !prev.googleCalendar }))}
                disabled
              >
                {integrations.googleCalendar ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-secondary border-blue-300">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </div>
              <Badge className="bg-blue-200 text-blue-500">Comming Soon</Badge>
            </CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>

            <Button disabled>Update Password</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
