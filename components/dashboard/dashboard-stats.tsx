import {
    CreditCard,
    FileText,
    CheckCircle2,
    TrendingUp
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function DashboardStats({ stats }: { stats: any }) {
    const t = useTranslations("dashboard.stats");

    const data = [
        {
            title: t("totalRevenue"),
            value: stats.totalRevenue,
            change: "+12%",
            changeType: "positive",
            icon: TrendingUp,
            suffix: ""
        },
        {
            title: t("pendingQuotes"),
            value: stats.pendingQuotes,
            change: "+2",
            changeType: "neutral",
            icon: FileText,
            suffix: ""
        },
        {
            title: t("completedPayments"),
            value: stats.completedPayments,
            change: "+5",
            changeType: "positive",
            icon: CheckCircle2,
            suffix: ""
        },
        {
            title: t("averageCart"),
            value: stats.averagePayment,
            change: "+4%",
            changeType: "positive",
            icon: CreditCard,
            suffix: ""
        }
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.map((stat, index) => {
                const Icon = stat.icon;
                const trendColor = stat.changeType === "positive" ? "text-green-500" : stat.changeType === "negative" ? "text-red-500" : "text-gray-500";

                return (
                    <Card key={index} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {t("title")}
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
