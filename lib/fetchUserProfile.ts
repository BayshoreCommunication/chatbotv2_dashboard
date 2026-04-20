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
