"use client"

import { 
    Lightbulb,
    Clock,
    CheckCircle,
    Rocket,
    Code
} from "lucide-react";
import { Badge } from "./ui/badge";

export function StatusBadge({ projectStatus }:{ projectStatus: string }) { 
       
    const getStatusIcon = (status: string) => {
        switch (status) {
            case "idea":
                return <Lightbulb className="h-4 w-4" />
            case "in-progress":
                return <Clock className="h-4 w-4" />
            case "completed":
                return <CheckCircle className="h-4 w-4" />
            case "deployed":
                return <Rocket className="h-4 w-4" />
            default:
                return <Code className="h-4 w-4" />
        }
    }
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case "idea":
                return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
            case "in-progress":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "completed":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            case "deployed":
                return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    return (
        <Badge className={`w-fit ${getStatusColor(projectStatus)}`}>
            <div className="flex items-center gap-1">
                {getStatusIcon(projectStatus)}
                {projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1).replace("-", " ")}
            </div>
        </Badge>
    )
}