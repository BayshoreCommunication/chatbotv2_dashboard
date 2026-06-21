import { Suspense } from "react";
import LeadsDetailsView from "@/components/leads/LeadsDetailsView";

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <LeadsDetailsView />
      </Suspense>
    </div>
  );
};

export default page;
