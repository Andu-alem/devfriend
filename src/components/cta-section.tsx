import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Level Up Your Developer Career?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                    Join other developers who are already using DevFriend to track their journey
                </p>
                <Button size="lg" asChild className="animate-pulse-subtle">
                    <Link href="/dashboard">
                        Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </section>
    )
}