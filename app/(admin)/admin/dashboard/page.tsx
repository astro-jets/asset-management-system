import ECommerce from "@/components/Dashboard/customersPage";
import { Metadata } from "next";
import { getAdminStats, getCustomerStats, getReports } from "@/app/actions/action";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { MonthlyReport } from "@/types/monthlyReport";
import { StatsType } from "@/types/stats";
export const metadata: Metadata = {
    title: "World Vision | Dashboard",
    description: "This is the dashboard",
};

export default async function Home() {
    const session = await getServerSession(options);
    if (!session?.user) { return }
    // Get users
    const res = await getAdminStats();
    const stats: StatsType = res.stats;

    const reports = await getReports();
    const monthly: MonthlyReport = reports.monthly;

    const data = {
        monthly,
        stats
    }

    return (
        <>
            <DefaultLayout>
                <ECommerce data={data} />
            </DefaultLayout>
        </>
    );
}
