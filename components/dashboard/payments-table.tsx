
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

// In a real app we might want specific translations for payments
// For now we can reuse dashboard or add new keys. 
// Assuming we'll adding "dashboard.payments" keys or fallback to raw text if keys missing.

export function PaymentsTable({ payments }: { payments: any[] }) {

    return (
        <Card className="shadow-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-bold">Historique des Paiements</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                    Voir tout <ArrowUpRight className="h-4 w-4" />
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Produit</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Méthode</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead className="text-right">Montant</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payments.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground">
                                    Aucun paiement effectué
                                </TableCell>
                            </TableRow>
                        ) : payments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell className="font-medium">{payment.product}</TableCell>
                                <TableCell>{payment.date}</TableCell>
                                <TableCell>{payment.method}</TableCell>
                                <TableCell>
                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="secondary">
                                        {payment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-bold">{payment.amount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
