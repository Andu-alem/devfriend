import { Badge } from "./ui/badge";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "./ui/card";

interface RecentActivity {
    action: string
    title: string
    date: string
    type: string
}

export function RecentActivities({
    recentActivities
}:{ recentActivities: RecentActivity[] }) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
                </CardHeader>
            <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                        <div className="flex-1">
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-sm">{activity.title}</p>
                            <p className="text-xs text-muted-foreground">@ {activity.date}</p>
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