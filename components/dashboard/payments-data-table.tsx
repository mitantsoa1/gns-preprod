"use client";

import { PaymentWithRelations } from "@/actions/payment-actions";
import { DataTable } from "@/components/DataTable";
import { getPaymentsColumns } from "./payments-columns";

interface PaymentsDataTableProps {
  payments: PaymentWithRelations[];
}

/**
 * This is a Client Component that wraps the DataTable and its column definitions.
 * It's necessary because getPaymentsColumns is a client function (due to interactive elements)
 * and cannot be called directly from a Server Component.
 */
export function PaymentsDataTable({ payments }: PaymentsDataTableProps) {
  const columns = getPaymentsColumns();
  return <DataTable columns={columns} data={payments} />;
}
