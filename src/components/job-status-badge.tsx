"use client"

import { 
    Clock,
    CheckCircle,
    AlertCircle,
    XCircle,
    Eye,
    VerifiedIcon
} from "lucide-react";
import { Badge } from "./ui/badge";

export function StatusBadge({ jobStatus }:{ jobStatus: string }) { 

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "applied":
                return <Clock className="h-4 w-4" />
            case "interviewing":
                return <AlertCircle className="h-4 w-4" />
            case "offer":
                return <CheckCircle className="h-4 w-4" />
            case "rejected":
                return <XCircle className="h-4 w-4" />
            case "accepted":
                return <VerifiedIcon className="h-4 w-4" />
            default:
                return <Eye className="h-4 w-4" />
        }
    }
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case "applied":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
            case "interviewing":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
            case "offer":
                return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300"
            case "rejected":
                return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
            case "accepted":
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
    }

    return (
        <Badge className={`w-fit ${getStatusColor(jobStatus)}`}>
            <div className="flex items-center gap-1">
                {getStatusIcon(jobStatus)}
                {jobStatus.charAt(0).toUpperCase() + jobStatus.slice(1).replace("-", " ")}
            </div>
        </Badge>
    )
}