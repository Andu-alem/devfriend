"use client"

import { useState } from "react";
import Link from "next/link";
import { AppLogo } from "./app-logo";
import { ThemeToggler } from "./theme-toggler";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <AppLogo />
                        <span className="text-xl font-bold">DevFriend</span>
                    </div>

                    {/* Desktop Navigation */}
                    <DesktopNavigation />

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={ () => setIsMenuOpen(!isMenuOpen) }>
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <MobileNavigation
                    isMenuOpen={ isMenuOpen }
                    setIsMenuOpen={ setIsMenuOpen }
                />
            </div>
        </nav>
    )
}

function DesktopNavigation() {
    return (
        <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
            </Link>
            <div className="w-10">
                <ThemeToggler />
            </div>
            <Button asChild>
                <Link href="/dashboard">Get Started</Link>
            </Button>
        </div>
    )
}

function MobileNavigation({
    isMenuOpen,
    setIsMenuOpen
}:{
    isMenuOpen: boolean,
    setIsMenuOpen: (arg: boolean) => void
}) {
    return (
        <>
            {isMenuOpen && (
                <div className="md:hidden animate-slide-down">
                    <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t">
                        <Link
                            href="#features"
                            className="block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Features
                        </Link>
                        <div className="px-3 py-2">
                            <ThemeToggler isMobile={true} />
                        </div>
                        <div className="px-3 py-2">
                            <Button asChild className="w-full">
                                <Link href="/dashboard">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}