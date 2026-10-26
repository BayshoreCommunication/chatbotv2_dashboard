const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

export interface UserProfileData {
  id: string;
  name?: string;
  companyName?: string;
  companyType?: string;
  website?: string | null;
  avatar?: string | null;
  email?: string;
  role?: string;
  is_subscribed: boolean;
  has_paid_subscription: boolean;
  subscription_type: string;
}

/**
 * Same as fetchUserProfile but also says WHY there's no profile, so callers
 * can tell an expired/invalid login (401) from the backend being unreachable.
 * status 0 = network failure.
 */
export async function fetchUserProfileWithStatus(
  token: string
): Promise<{ user: UserProfileData | null; status: number }> {
  try {
    const res = await fetch(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return { user: null, status: res.status };
    const data = await res.json();
    return { user: (data?.payload?.user as UserProfileData) ?? null, status: res.status };
  } catch {
    return { user: null, status: 0 };
  }
}

export async function fetchUserProfile(
  token: string
): Promise<UserProfileData | null> {
  try {
    const res = await fetch(`${API_URL}/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data?.payload?.user as UserProfileData) ?? null;
  } catch {
    return null;
  }
}
