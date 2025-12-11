import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import AppLayout from "@/components/layouts/app-layout";
import { BreadcrumbItem } from "@/types/sidebar";
import { useTranslations } from "next-intl";
// import { DashboardStats } from "@/components/dashboard/dashboard-stats";
// import { PaymentsTable } from "@/components/dashboard/payments-table";
// import { QuotesSection } from "@/components/dashboard/quotes-section";
// import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
// import { QuickActions } from "@/components/dashboard/quick-actions";
// import { getUserDashboardData } from "@/actions/dashboard-actions";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    }
];

export default function DashboardPage({ dashboardData }: { dashboardData: any }) {
    const t = useTranslations("dashboard");


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="flex-1 space-y-6 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
                        <p className="text-muted-foreground">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>

                <DashboardStats stats={dashboardData.stats} />

                {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="lg:col-span-4">
                        <PaymentsTable payments={dashboardData.payments} />
                    </div>
                    <div className="lg:col-span-3">
                        <QuotesSection quotes={dashboardData.quotes} />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="lg:col-span-4">
                        <div className="mb-6">
                            <QuickActions />
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <ActivityTimeline activities={dashboardData.activities} />
                    </div> 
                </div>*/}
            </div>
        </AppLayout>
    );
}
