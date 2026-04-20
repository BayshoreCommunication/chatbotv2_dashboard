import { getCurrentUserDetails } from "@/app/actions/user";
import { auth } from "@/auth";
import TrainKnowledgeBase from "@/components/trainAi/TrainKnowledgeBase";

const Page = async () => {
  const session = await auth();
  const companyId = session?.user?.id || "";

  const userRes = await getCurrentUserDetails();
  const user = userRes.ok ? userRes.data : null;

  return (
    <div className="p-2 md:p-4">
      <TrainKnowledgeBase
        companyId={companyId}
        companyName={user?.company_name ?? ""}
        websiteUrl={user?.company_website ?? ""}
        companyType={user?.company_type ?? "other"}
      />
    </div>
  );
};

export default Page;
