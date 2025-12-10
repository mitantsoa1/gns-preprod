
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
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/lib/dashboard/mock-data";
import { useTranslations } from "next-intl";

export function ProjectsTable() {
    const t = useTranslations("dashboard.projects");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En cours":
                return "bg-blue-100 text-blue-800 hover:bg-blue-100";
            case "Terminé":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "Planifié":
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card className="shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">{t("title")}</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                    {t("viewAll")} <ArrowUpRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("columns.name")}</TableHead>
                            <TableHead>{t("columns.client")}</TableHead>
                            <TableHead>{t("columns.status")}</TableHead>
                            <TableHead className="text-right">{t("columns.progress")}</TableHead>
                            <TableHead className="text-right">{t("columns.budget")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projectsData.map((project) => (
                            <TableRow key={project.id}>
                                <TableCell className="font-medium">{project.name}</TableCell>
                                <TableCell>{project.client}</TableCell>
                                <TableCell>
                                    <Badge className={getStatusColor(project.status)} variant="secondary">
                                        {project.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <span className="text-sm font-medium">{project.progress}%</span>
                                        <div className="h-2 w-16 rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-[#FFD700]"
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{project.budget}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
