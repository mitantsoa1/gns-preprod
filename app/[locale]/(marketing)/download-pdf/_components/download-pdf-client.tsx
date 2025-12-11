'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { useTranslations } from "next-intl";

export default function DownloadPdfClientPage({ initialDocuments }: { initialDocuments: any[] }) {
    const t = useTranslations('downloadPdfPage');

    const documents = initialDocuments;

    return (
        <div className="container mx-auto px-4 py-16 max-w-7xl pt-36">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
                <p className="text-muted-foreground text-lg">
                    {t('description')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {documents.map((doc, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                            <div className="bg-primary/10 p-3 rounded-lg">
                                <FileText className="h-8 w-8 text-primary" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-xl mb-2">{doc.title}</CardTitle>
                                <CardDescription>{doc.description}</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground mb-4">
                                <span>PDF • {doc.size}</span>
                                <span>{t('updated', { date: doc.date })}</span>
                            </div>
                            <Button asChild className="w-full gap-2">
                                <a href={doc.url} download target="_blank" rel="noopener noreferrer">
                                    <Download className="h-4 w-4" />
                                    {t('download')}
                                </a>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
