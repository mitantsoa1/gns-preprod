import { getPayments } from "@/actions/payment-actions";
import { PaymentsStats } from "@/components/dashboard/payments-stats";
import AppLayout from "@/components/layouts/app-layout";
import { PaymentsDataTable } from "@/components/dashboard/payments-data-table"; // Import the new client component

export default async function PaymentsDashboardPage() {
  const payments = await getPayments();

  const totalRevenue = payments.reduce((acc, payment) => {
    if (payment.status === "succeeded") {
      return acc + payment.amount;
    }
    return acc;
  }, 0);

  const totalSales = payments.filter(
    (payment) => payment.status === "succeeded"
  ).length;

  return (
    <AppLayout>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold tracking-tight">
            Tableau de bord des paiements
          </h1>
          <p className="text-muted-foreground">
            Visualisez et gérez les paiements de vos clients.
          </p>
        </header>

        <PaymentsStats totalRevenue={totalRevenue} totalSales={totalSales} />

        {/* Use the new client component wrapper */}
        <PaymentsDataTable payments={payments} />
      </div>
    </AppLayout>
  );
}