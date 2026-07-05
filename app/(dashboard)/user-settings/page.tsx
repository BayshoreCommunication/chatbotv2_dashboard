import { auth } from "@/auth";
import UserDetails from "@/components/userSettings/UserDetails";

export default async function UserSettingsPage() {
  const session = await auth();
  const isTeamMember = session?.user?.is_team_member ?? false;

  return (
    <div>
      <UserDetails isTeamMember={isTeamMember} />
    </div>
  );
}
