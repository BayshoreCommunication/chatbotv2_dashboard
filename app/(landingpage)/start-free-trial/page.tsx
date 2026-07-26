import { auth } from "@/auth";
import FreeTrailMainPage from "@/components/trainAi/startFreeTrial/FreeTrailMainPage";

const page = async () => {
  const session = await auth();
  return (
    <>
      <FreeTrailMainPage session={session} />
    </>
  );
};

export default page;
