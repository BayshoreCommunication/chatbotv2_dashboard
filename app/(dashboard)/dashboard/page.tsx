import { auth } from "@/auth";
import DashboardDetailsView from "@/components/dashboard/DashboardDetailsView";
import { Suspense } from "react";
import {
  getDashboardChartAction,
  getDashboardSummaryAction,
  getDashboardVisitorsAction,
  getDashboardRecentSessionsAction,
  getDashboardLeadCategoriesAction,
} from "@/app/actions/dashboard";
import { getSubscriptionAction } from "@/app/actions/subscriptions";
import { getUserData } from "@/app/actions/user";

const page = async () => {
  const session = await auth();
  const companyId = (session?.user as { id?: string } | undefined)?.id ?? "";

  const [summaryRes, chartThisRes, chartLastRes, visitorsRes, recentRes, subscriptionRes, leadCategoriesRes, userRes] =
    await Promise.all([
      getDashboardSummaryAction(companyId),
      getDashboardChartAction(companyId, "monthly", 12, 0),
      getDashboardChartAction(companyId, "monthly", 12, 1),
      getDashboardVisitorsAction(companyId),
      getDashboardRecentSessionsAction(companyId, 5),
      getSubscriptionAction(),
      getDashboardLeadCategoriesAction(companyId, 8),
      getUserData(),
    ]);

  return (
    <div>
      <Suspense fallback={null}>
        <DashboardDetailsView
          summary={summaryRes.ok ? summaryRes.data : null}
          chartThisYear={chartThisRes.ok ? chartThisRes.data : []}
          chartLastYear={chartLastRes.ok ? chartLastRes.data : []}
          visitors={visitorsRes.ok ? visitorsRes.data : null}
          recentSessions={recentRes.ok ? recentRes.data : []}
          subscription={subscriptionRes.ok ? subscriptionRes.data ?? null : null}
          leadCategories={leadCategoriesRes.ok ? leadCategoriesRes.data : []}
          companyType={userRes.ok ? userRes.data?.companyType ?? null : null}
        />
      </Suspense>
    </div>
  );
};

export default page;
