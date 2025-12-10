"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PaymentWithRelations } from "@/actions/payment-actions";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

// Helper function for status variant (can be moved if used elsewhere)
const getStatusVariant = (status: string) => {
  switch (status) {
    case "succeeded":
      return "success";
    case "pending":
      return "secondary";
    case "failed":
      return "destructive";
    default:
      return "default";
  }
};

export const getPaymentsColumns = (): ColumnDef<PaymentWithRelations>[] => {
  return [
    {
      accessorKey: "user",
      header: "Client",
      cell: ({ row }) => {
        const user = row.original.user;
        return (
          <div className="text-left">
            <div className="font-medium">{user?.name}</div>
            <div className="text-sm text-muted-foreground">
              {user?.email}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: "Produit",
      cell: ({ row }) => {
        return <div className="text-left">{row.original.product?.name ?? row.original.productName}</div>;
      },
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <div className="text-center">
            <Badge variant={getStatusVariant(status)}>
              {status}
            </Badge>
          </div>
        );
      },
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Montant</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.original.amount.toString());
        const currency = row.original.currency;
        const formatted = new Intl.NumberFormat("fr-FR", {
          style: "currency",
          currency: currency,
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Date</div>,
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const formatted = date.toLocaleDateString("fr-FR");
        return <div className="text-right">{formatted}</div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <div className="text-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Ouvrir le menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  disabled={!payment.receiptUrl}
                  onClick={() =>
                    payment.receiptUrl &&
                    window.open(payment.receiptUrl, "_blank")
                  }
                >
                  Voir le reçu Stripe
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!payment.invoiceUrl}
                  onClick={() =>
                    payment.invoiceUrl &&
                    window.open(payment.invoiceUrl, "_blank")
                  }
                >
                  Voir la facture
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];
};
