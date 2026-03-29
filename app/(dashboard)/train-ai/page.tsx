import { auth } from "@/auth";
import TrainKnowledgeBase from "@/components/trainAi/TrainKnowledgeBase";

const Page = async () => {
  const session = await auth();

  
  const companyId = session?.user?.id || "";

  return (
    <div className="p-2 md:p-4">
      <TrainKnowledgeBase companyId={companyId} />
    </div>
  );
};

export default Page;
