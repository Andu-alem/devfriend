"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/google-logo";
import Link from "next/link";
import { loginUser } from "@/lib/actions/auth-actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { AppLogo } from "./app-logo";


export function LoginForm() {
  const initialState = {
    errorMessage: ""
  }
  const [ state, formAction, pending ] = useActionState(loginUser,initialState)

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
          Wellcome back to DevFriend
        </p>
        <form
            className="w-full space-y-4 mt-5"
            action={formAction}
        >
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
              { pending ? <Loader2 className="animate-spin" /> : "Log in" }
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
          Don&apos;t you have an account?
          <Link href="/signup" className="ml-1 underline text-muted-foreground">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};