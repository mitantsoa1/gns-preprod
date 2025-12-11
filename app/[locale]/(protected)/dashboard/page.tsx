import type { Metadata } from 'next';
import DashboardPage from './_components/dahsboard-page';
import { getUser } from '@/lib/get-session';
import { redirect } from 'next/navigation';
import { getUserDashboardData } from '@/actions/dashboard-actions';

export default async function DashPage() {

  const user = await getUser();
  if (!user) {
    redirect(`/login`);
  }
  const dashboardData = await getUserDashboardData();
  // return <div>Dashboard</div>;
  return <DashboardPage dashboardData={dashboardData} />;
}
