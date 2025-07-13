"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/landing-page-navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { FooterSection } from "@/components/footer-section"
import { CTASection } from "@/components/cta-section"
import { TestimonialsSection } from "@/components/testimonials-section"

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  )
}

function StatsSection() {
  const stats = [
    { label: "Active Users", value: "10,000+", delay: "delay-100" },
    { label: "Jobs Tracked", value: "50,000+", delay: "delay-200" },
    { label: "Projects Managed", value: "25,000+", delay: "delay-300" },
    { label: "Success Rate", value: "85%", delay: "delay-500" },
  ]
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center animate-count-up ${stat.delay}`}>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
    </section>
  )
}
