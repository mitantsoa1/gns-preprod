
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, Layout, Phone, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export function QuickActions() {
    const t = useTranslations("dashboard.actions");

    return (
        <Card className="shadow-sm">
            <CardContent className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-[#FFD700]/10 hover:border-[#FFD700] hover:text-black">
                        <FilePlus className="h-6 w-6" />
                        <span>{t("newQuote")}</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-[#FFD700]/10 hover:border-[#FFD700] hover:text-black">
                        <Layout className="h-6 w-6" />
                        <span>{t("viewProjects")}</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-[#FFD700]/10 hover:border-[#FFD700] hover:text-black">
                        <FileText className="h-6 w-6" />
                        <span>{t("documents")}</span>
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-[#FFD700]/10 hover:border-[#FFD700] hover:text-black">
                        <Phone className="h-6 w-6" />
                        <span>{t("contactSupport")}</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
