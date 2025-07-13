import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function HeroSection() {
    return (
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <div className="animate-fade-in">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x bg-300">
                        Track Your Developer Journey
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-slide-up delay-200">
                        Manage job applications and personal projects in one beautiful, developer-friendly platform. Stay
                        organized, track progress, and land your dream job.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-500">
                        <Button size="lg" asChild className="animate-bounce-subtle">
                            <Link href="/dashboard">
                                Start Tracking <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="#features">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}