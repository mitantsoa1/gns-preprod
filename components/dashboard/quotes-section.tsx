
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { quotesData } from "@/lib/dashboard/mock-data";
import { useTranslations } from "next-intl";

export function QuotesSection() {
    const t = useTranslations("dashboard.quotes");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En attente":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "Accepté":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "Refusé":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card className="shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
                <Button size="sm" className="bg-[#FFD700] text-black hover:bg-[#FFD700]/90">
                    <Plus className="h-4 w-4 mr-2" /> {t("create")}
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("columns.reference")}</TableHead>
                            <TableHead>{t("columns.client")}</TableHead>
                            <TableHead className="text-right">{t("columns.amount")}</TableHead>
                            <TableHead className="text-right">{t("columns.status")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {quotesData.map((quote) => (
                            <TableRow key={quote.id}>
                                <TableCell className="font-medium">{quote.id}</TableCell>
                                <TableCell>{quote.client}</TableCell>
                                <TableCell className="text-right font-medium">{quote.amount}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={getStatusColor(quote.status)} variant="secondary">
                                        {quote.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
