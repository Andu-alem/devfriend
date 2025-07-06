"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/google-logo";
import Link from "next/link";
import { signupUser } from "@/lib/actions/auth-actions";
import { Code } from "lucide-react";


export function SignUpForm() {
  const initialState = {
    errorMessage: ""
  }
  const [ state, formAction, pending ] = useActionState(signupUser,initialState)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xs w-full flex flex-col items-center">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Code className="h-5 w-5 text-white" />
        </div>
        <p className="mt-4 text-xl font-bold tracking-tight">
          Sign up for DevFriend
        </p>
        <form
            className="w-full space-y-4 mt-5"
            action={formAction}
        >
            <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    className="w-full text-sm"
                    required
                    maxLength={15}
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="name">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full text-sm"
                    required
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full text-sm"
                    required
                    minLength={8}
                />
            </div>
            <Button 
                type="submit" 
                className={`mt-4 w-full ${pending ? 'animate-pulse':'animate-none'}`}
                disabled={ pending }
            >
              Continue with Email
            </Button>
        </form>
        <div className="my-3 w-full flex items-center justify-center overflow-hidden">
          <Separator />
            <span className="text-sm px-2">OR</span>
          <Separator />
        </div>
        <Button className="w-full gap-3">
          <GoogleLogo />
          Continue with Google
        </Button>

        <p className="mt-5 text-sm text-center">
          Already have an account?
          <Link href="#" className="ml-1 underline text-muted-foreground">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};