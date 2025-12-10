
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statsData } from "@/lib/dashboard/mock-data";
import { useTranslations } from "next-intl";

export function DashboardStats() {
    const t = useTranslations();

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => {
                const Icon = stat.icon;
                const trendColor = stat.changeType === "positive" ? "text-green-500" : stat.changeType === "negative" ? "text-red-500" : "text-gray-500";

                return (
                    <Card key={index} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t(stat.title)}
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}{stat.suffix}</div>
                            <p className="text-xs text-muted-foreground">
                                <span className={`${trendColor} font-medium`}>{stat.change}</span> par rapport au mois dernier
                            </p>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
