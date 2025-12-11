
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activitiesData } from "@/lib/dashboard/mock-data";
import { useTranslations } from "next-intl";

import {
    FileText,
    Hammer,
    CheckCircle2,
    Truck
} from "lucide-react";

export function ActivityTimeline({ activities }: { activities: any[] }) {
    const t = useTranslations("dashboard.activities");

    const getIcon = (type: string) => {
        switch (type) {
            case 'quote': return FileText;
            case 'project': return Hammer;
            case 'milestone': return CheckCircle2;
            case 'delivery': return Truck;
            default: return FileText;
        }
    };

    return (
        <Card className="shadow-sm h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activities.length === 0 ? (
                        <div className="text-center text-muted-foreground text-sm">
                            Aucune activité récente
                        </div>
                    ) : activities.map((activity, index) => {
                        const Icon = getIcon(activity.type);
                        return (
                            <div key={activity.id} className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className={`p-2 rounded-full ${activity.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    {index !== activities.length - 1 && (
                                        <div className="w-px h-full bg-gray-200 my-2" />
                                    )}
                                </div>
                                <div className="pb-8">
                                    <p className="text-sm font-medium">{activity.title}</p>
                                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
