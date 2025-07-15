"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { signupUser } from "@/lib/actions/auth-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AppLogo } from "./app-logo";
import { SocialSignIn } from "./social-signin";

export function SignUpForm() {
  const initialState = {
    errorMessage: ""
  }
  const [ state, formAction, pending ] = useActionState(signupUser,initialState)

  useEffect(() => {
    if(state.errorMessage.length > 0){
        toast.error(state.errorMessage)
    }
  }, [state])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xs w-full flex flex-col items-center">
        <AppLogo />
        <p className="mt-4 text-xl font-bold tracking-tight">
          Sign up to DevFriend
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
              { pending ? <Loader2 className="animate-spin" /> : "Sign up" }
            </Button>
        </form>
        <div className="my-3 w-full flex items-center justify-center overflow-hidden">
          <Separator />
            <span className="text-sm px-2">OR</span>
          <Separator />
        </div>
        <SocialSignIn />

        <p className="mt-5 text-sm text-center">
          Already have an account?
          <Link href="/login" className="ml-1 underline text-muted-foreground">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};