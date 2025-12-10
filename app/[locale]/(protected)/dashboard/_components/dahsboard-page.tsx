
"use client";

import AppLayout from "@/components/layouts/app-layout";
import { BreadcrumbItem } from "@/types/sidebar";
import { useTranslations } from "next-intl";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ProjectsTable } from "@/components/dashboard/projects-table";
import { QuotesSection } from "@/components/dashboard/quotes-section";
import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { QuickActions } from "@/components/dashboard/quick-actions";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    }
];

export default function DashboardPage() {
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

                <DashboardStats />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="lg:col-span-4">
                        <ProjectsTable />
                    </div>
                    <div className="lg:col-span-3">
                        <QuotesSection />
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <div className="lg:col-span-4">
                        <div className="mb-6">
                            <QuickActions />
                        </div>
                    </div>
                    <div className="lg:col-span-3">
                        <ActivityTimeline />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
