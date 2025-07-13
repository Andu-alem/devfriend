import { BarChart3, Briefcase, Calendar, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function FeaturesSection() {
    const features = [
        {
            icon: <Briefcase className="h-8 w-8" />,
            title: "Job Application Tracking",
            description: "Organize your job applications with our intuitive Kanban board. Track status from saved to offer.",
            delay: "delay-100",
        },
        {
            icon: <Code className="h-8 w-8" />,
            title: "Project Management",
            description: "Manage your personal projects from idea to deployment. Track progress and showcase your work.",
            delay: "delay-200",
        },
        {
            icon: <Calendar className="h-8 w-8" />,
            title: "Interview Scheduling",
            description: "Never miss an interview or deadline. Integrated calendar keeps you organized and prepared.",
            delay: "delay-300",
        },
        {
            icon: <BarChart3 className="h-8 w-8" />,
            title: "Analytics Dashboard",
            description: "Get insights into your job search progress and project completion rates with detailed analytics.",
            delay: "delay-500",
        },
    ]

    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Powerful features designed specifically for developers to manage their career journey
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className={`card-hover animate-slide-up ${feature.delay}`}>
                            <CardHeader>
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                    {feature.icon}
                                </div>
                                <CardTitle className="text-xl">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">{feature.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}