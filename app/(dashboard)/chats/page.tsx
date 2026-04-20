import ChatHistoryView from "@/components/chatsHistory/ChatHistoryView";
import { auth } from "@/auth";
import { getConversationHistoryAction } from "@/app/actions/conversationHistory";
import {
  getDashboardRecentSessionsAction,
  getDashboardVisitorsAction,
} from "@/app/actions/dashboard";

const page = async () => {
  const session = await auth();
  const companyId = (session?.user as { id?: string } | undefined)?.id ?? "";

  const [historyResult, recentRes, visitorsRes] = await Promise.all([
    companyId
      ? getConversationHistoryAction(companyId, 100, 0)
      : Promise.resolve({ ok: false as const, error: "Company not found in session." }),
    companyId ? getDashboardRecentSessionsAction(companyId, 5) : Promise.resolve({ ok: false as const, error: "" }),
    companyId ? getDashboardVisitorsAction(companyId) : Promise.resolve({ ok: false as const, error: "" }),
  ]);

  return (
    <div>
      <ChatHistoryView
        companyId={companyId}
        initialData={historyResult.ok ? historyResult.data : undefined}
        initialError={historyResult.ok ? undefined : historyResult.error}
        recentSessions={recentRes.ok ? recentRes.data : []}
        visitors={visitorsRes.ok ? visitorsRes.data : null}
      />
    </div>
  );
};

export default page;
