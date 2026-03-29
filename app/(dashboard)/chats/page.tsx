import ChatHistoryView from "@/components/chatsHistory/ChatHistoryView";
import { auth } from "@/auth";
import { getConversationHistoryAction } from "@/app/actions/conversationHistory";

const page = async () => {
  const session = await auth();
  const companyId = (session?.user as { id?: string } | undefined)?.id ?? "";

  const historyResult = companyId
    ? await getConversationHistoryAction(companyId, 100, 0)
    : { ok: false, error: "Company not found in session." };

  return (
    <div>
      <ChatHistoryView
        initialData={historyResult.ok ? historyResult.data : undefined}
        initialError={historyResult.ok ? undefined : historyResult.error}
      />
    </div>
  );
};

export default page;
