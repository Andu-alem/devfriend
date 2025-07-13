import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader } from "./ui/card";

export function TestimonialsSection() {
    const testimonials = [
        {
            name: "Sarah Chen",
            role: "Full Stack Developer",
            company: "TechCorp",
            content:
            "DevFriend helped me land my dream job! The application tracking made my job search so much more organized.",
            avatar: "/placeholder-user.jpg",
            rating: 5,
            delay: "delay-100",
        },
        {
            name: "Marcus Johnson",
            role: "Frontend Developer",
            company: "StartupXYZ",
            content: "The project management features are incredible. I can showcase all my work in one place.",
            avatar: "/placeholder-user.jpg",
            rating: 5,
            delay: "delay-200",
        },
        {
            name: "Emily Rodriguez",
            role: "Software Engineer",
            company: "BigTech Inc",
            content: "Clean interface, powerful features. DevFriend is exactly what every developer needs.",
            avatar: "/placeholder-user.jpg",
            rating: 5,
            delay: "delay-300",
        },
    ]
    return (
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Loved by Developers</h2>
                    <p className="text-xl text-muted-foreground">See what developers are saying about DevFriend</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className={`card-hover animate-slide-up ${testimonial.delay}`}>
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                                        <AvatarFallback>
                                            {testimonial.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">
                                        {testimonial.role} at {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">&quot;{testimonial.content}&quot;</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}