import { Badge } from "./ui/badge";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";

export function RecentActivities() {
    const recentActivity = [
        {
            action: "Applied to Frontend Developer at Stripe",
            time: "2 hours ago",
            type: "application",
        },
        {
            action: "Completed React Dashboard project",
            time: "1 day ago",
            type: "project",
        },
        {
            action: "Interview scheduled with Meta",
            time: "2 days ago",
            type: "interview",
        },
        {
            action: "Updated portfolio website",
            time: "3 days ago",
            type: "project",
        },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
            <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                            {activity.type}
                        </Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}