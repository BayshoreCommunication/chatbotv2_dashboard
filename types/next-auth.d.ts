import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id?: string;
    email?: string;
    name?: string;
    /** Owner's company name (always set, even for team member sessions) */
    companyName?: string;
    accessToken?: string;
    role?: string;
    has_paid_subscription?: boolean;
    subscription_type?: string;
    /** True when this session belongs to a team member logging in as an owner */
    is_team_member?: boolean;
    /** The team member's own email address */
    team_member_email?: string | null;
    /** The team member's display name */
    team_member_name?: string | null;
  }

  interface Session {
    user: User & {
      id: string;
      accessToken: string;
      role: string;
      companyName: string;
      has_paid_subscription: boolean;
      subscription_type: string;
      is_team_member: boolean;
      team_member_email: string | null;
      team_member_name: string | null;
      avatar?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accessToken?: string;
    role?: string;
    companyName?: string;
    has_paid_subscription?: boolean;
    subscription_type?: string;
    is_team_member?: boolean;
    team_member_email?: string | null;
    team_member_name?: string | null;
  }
}
