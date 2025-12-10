
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { activitiesData } from "@/lib/dashboard/mock-data";
import { useTranslations } from "next-intl";

export function ActivityTimeline() {
    const t = useTranslations("dashboard.activities");

    return (
        <Card className="shadow-sm h-full">
            <CardHeader>
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {activitiesData.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id} className="flex">
                                <div className="flex flex-col items-center mr-4">
                                    <div className={`p-2 rounded-full ${activity.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    {index !== activitiesData.length - 1 && (
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
