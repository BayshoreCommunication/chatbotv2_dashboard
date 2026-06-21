import { auth } from "@/auth";
import DashboardDetailsView from "@/components/dashboard/DashboardDetailsView";
import {
  getDashboardChartAction,
  getDashboardSummaryAction,
  getDashboardVisitorsAction,
  getDashboardRecentSessionsAction,
  getDashboardLeadCategoriesAction,
} from "@/app/actions/dashboard";
import { getSubscriptionAction } from "@/app/actions/subscriptions";

const page = async () => {
  const session = await auth();
  const companyId = (session?.user as { id?: string } | undefined)?.id ?? "";

  const [summaryRes, chartThisRes, chartLastRes, visitorsRes, recentRes, subscriptionRes, leadCategoriesRes] =
    await Promise.all([
      getDashboardSummaryAction(companyId),
      getDashboardChartAction(companyId, "monthly", 12, 0),
      getDashboardChartAction(companyId, "monthly", 12, 1),
      getDashboardVisitorsAction(companyId),
      getDashboardRecentSessionsAction(companyId, 5),
      getSubscriptionAction(),
      getDashboardLeadCategoriesAction(companyId, 8),
    ]);

  return (
    <div>
      <DashboardDetailsView
        summary={summaryRes.ok ? summaryRes.data : null}
        chartThisYear={chartThisRes.ok ? chartThisRes.data : []}
        chartLastYear={chartLastRes.ok ? chartLastRes.data : []}
        visitors={visitorsRes.ok ? visitorsRes.data : null}
        recentSessions={recentRes.ok ? recentRes.data : []}
        subscription={subscriptionRes.ok ? subscriptionRes.data : null}
        leadCategories={leadCategoriesRes.ok ? leadCategoriesRes.data : []}
      />
    </div>
  );
};

export default page;
