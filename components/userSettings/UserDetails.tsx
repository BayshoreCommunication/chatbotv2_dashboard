"use client";

import {
  getInvitesAction,
  revokeInviteAction,
  sendInviteAction,
  type Invite,
} from "@/app/actions/invites";
import {
  getCurrentUserDetails,
  getUserData,
  updateUserData,
  type UserFull,
  type UserProfile,
} from "@/app/actions/user";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  BiBrain,
  BiBuilding,
  BiCalendar,
  BiCheckCircle,
  BiPencil,
  BiRefresh,
  BiSave,
  BiShield,
  BiUserPlus,
  BiX,
} from "react-icons/bi";

type UserViewModel = {
  companyName?: string;
  companyType?: string;
  website?: string | null;
  email?: string;
  role?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isSubscribed?: boolean;
  hasPaidSubscription?: boolean;
  subscriptionType?: string;
  subscriptionStart?: string | null;
  subscriptionEnd?: string | null;
  isTrained?: boolean;
  trainScore?: number;
  trainUpdatedAt?: string | null;
  trainRuns?: string;
  entriesStored?: number;
  pagesCrawled?: number;
  categories?: string[];
  createdAt?: string | null;
  updatedAt?: string | null;
};

type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
  iconColor: string;
  badge?: { label: string; color: string };
};

type ProfileForm = {
  companyName: string;
  companyType: string;
  website: string;
};

type InviteForm = {
  name: string;
  email: string;
};

const MAX_MEMBERS = 5;

function formatDate(value?: string | null): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString();
}

function prettifyCompanyType(value?: string): string {
  if (!value) return "—";
  return value.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function renderValue(value?: string | null): string {
  if (!value || value.trim() === "") return "—";
  return value;
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <div className="text-sm font-medium text-gray-900">{children}</div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-gray-900">{value}</p>
    </div>
  );
}

function SkeletonPulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

function SkeletonView() {
  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-gray-200 bg-white p-5 space-y-3"
          >
            <div className="flex items-center gap-3">
              <SkeletonPulse className="h-10 w-10 rounded-lg" />
              <SkeletonPulse className="h-3.5 w-24" />
            </div>
            <SkeletonPulse className="h-7 w-20" />
            <SkeletonPulse className="h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <SkeletonPulse className="h-4 w-32" />
        </div>
        <div className="p-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <SkeletonPulse className="h-3 w-20" />
              <SkeletonPulse className="h-4 w-40" />
            </div>
          ))}
        </div>
      </div>
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
          <SkeletonPulse className="h-4 w-28" />
        </div>
        <div className="p-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonPulse key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

function statusBadge(status: Invite["status"]) {
  if (status === "active")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  if (status === "pending")
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-700">
        <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
        Pending
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Revoked
    </span>
  );
}

const UserDetails = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [full, setFull] = useState<UserFull | null>(null);
  const [form, setForm] = useState<ProfileForm>({
    companyName: "",
    companyType: "",
    website: "",
  });

  // Team access state
  const [invites, setInvites] = useState<Invite[]>([]);
  const [inviteForm, setInviteForm] = useState<InviteForm>({ name: "", email: "" });
  const [inviting, setInviting] = useState(false);
  const [revoking, setRevoking] = useState<string | null>(null);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const [inviteSuccess, setInviteSuccess] = useState<string | null>(null);

  const loadUser = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const [profileRes, fullRes] = await Promise.all([
        getUserData(),
        getCurrentUserDetails(),
      ]);
      if (!profileRes.ok && !fullRes.ok) {
        setError(
          fullRes.error || profileRes.error || "Failed to load user details.",
        );
        return;
      }
      if (profileRes.ok && profileRes.data) setProfile(profileRes.data);
      if (fullRes.ok && fullRes.data) setFull(fullRes.data);
    } catch {
      setError("Failed to load user details.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const loadInvites = useCallback(async () => {
    const res = await getInvitesAction();
    if (res.ok && res.data) setInvites(res.data);
  }, []);

  useEffect(() => {
    void loadUser(false);
    void loadInvites();
  }, [loadUser, loadInvites]);

  const vm = useMemo<UserViewModel>(
    () => ({
      companyName: full?.company_name || profile?.companyName || profile?.name,
      companyType: full?.company_type || profile?.companyType,
      website: full?.company_website ?? profile?.website,
      email: full?.email || profile?.email,
      role: full?.role || profile?.role,
      isActive: full?.is_active,
      isVerified: full?.is_verified,
      isSubscribed: full?.is_subscribed,
      hasPaidSubscription: full?.has_paid_subscription,
      subscriptionType: full?.subscription_type,
      subscriptionStart: full?.subscription_start_date,
      subscriptionEnd: full?.subscription_end_date,
      isTrained: full?.train_data?.is_trained,
      trainScore: full?.train_data?.score,
      trainUpdatedAt: full?.train_data?.last_updated,
      trainRuns: full?.train_data
        ? `${full.train_data.update_count} / ${full.train_data.update_limit}`
        : undefined,
      entriesStored: full?.train_data?.entries_stored,
      pagesCrawled: full?.train_data?.pages_crawled,
      categories: full?.train_data?.categories,
      createdAt: full?.created_at,
      updatedAt: full?.updated_at,
    }),
    [full, profile],
  );

  useEffect(() => {
    if (!editing) {
      setForm({
        companyName: vm.companyName || "",
        companyType: vm.companyType || "",
        website: vm.website || "",
      });
    }
  }, [editing, vm.companyName, vm.companyType, vm.website]);

  const stats = useMemo<StatCard[]>(
    () => [
      {
        title: "Account Status",
        value: vm.isActive ? "Active" : "Inactive",
        subtitle: vm.isVerified ? "Identity verified" : "Verification pending",
        icon: <BiShield size={20} />,
        color: vm.isActive ? "bg-green-50" : "bg-red-50",
        iconColor: vm.isActive ? "text-green-600" : "text-red-500",
        badge: vm.isVerified
          ? { label: "Verified", color: "bg-green-100 text-green-700" }
          : { label: "Unverified", color: "bg-yellow-100 text-yellow-700" },
      },
      {
        title: "Subscription",
        value: vm.subscriptionType
          ? prettifyCompanyType(vm.subscriptionType)
          : "Free",
        subtitle: vm.subscriptionStart
          ? `${formatDate(vm.subscriptionStart)} → ${formatDate(vm.subscriptionEnd)}`
          : "No active subscription",
        icon: <BiCheckCircle size={20} />,
        color: vm.hasPaidSubscription ? "bg-blue-50" : "bg-gray-50",
        iconColor: vm.hasPaidSubscription ? "text-blue-600" : "text-gray-500",
        badge: vm.hasPaidSubscription
          ? { label: "Paid", color: "bg-blue-100 text-blue-700" }
          : { label: "Free", color: "bg-gray-100 text-gray-600" },
      },
      {
        title: "AI Training",
        value: vm.isTrained
          ? `${(vm.trainScore ?? 0).toFixed(1)} / 100`
          : "Not trained",
        subtitle: `Runs: ${vm.trainRuns ?? "—"}  ·  Facts: ${vm.entriesStored ?? 0}`,
        icon: <BiBrain size={20} />,
        color: vm.isTrained ? "bg-purple-50" : "bg-gray-50",
        iconColor: vm.isTrained ? "text-purple-600" : "text-gray-500",
        badge: vm.isTrained
          ? { label: "Trained", color: "bg-purple-100 text-purple-700" }
          : { label: "Untrained", color: "bg-gray-100 text-gray-500" },
      },
      {
        title: "Member Since",
        value: vm.createdAt ? new Date(vm.createdAt).toLocaleDateString() : "—",
        subtitle: `Last updated: ${vm.updatedAt ? new Date(vm.updatedAt).toLocaleDateString() : "—"}`,
        icon: <BiCalendar size={20} />,
        color: "bg-orange-50",
        iconColor: "text-orange-500",
      },
    ],
    [vm],
  );

  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(null);
    setSaving(true);
    try {
      const response = await updateUserData({
        companyName: form.companyName.trim(),
        companyType: form.companyType.trim(),
        website: form.website.trim(),
      });
      if (!response.ok) {
        setSaveError(response.error || "Failed to update profile.");
        return;
      }
      const updated = response.data;
      if (updated) {
        setProfile(updated);
        setFull((prev) =>
          prev
            ? {
                ...prev,
                company_name: updated.companyName || prev.company_name,
                company_type: updated.companyType || prev.company_type,
                company_website: updated.website ?? prev.company_website,
              }
            : prev,
        );
      }
      setSaveSuccess("Profile updated successfully.");
      setEditing(false);
    } catch {
      setSaveError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setSaveError(null);
    setSaveSuccess(null);
    setForm({
      companyName: vm.companyName || "",
      companyType: vm.companyType || "",
      website: vm.website || "",
    });
  };

  const activeCount = invites.filter((i) => i.status !== "revoked").length;

  const handleSendInvite = async () => {
    setInviteError(null);
    setInviteSuccess(null);
    const name = inviteForm.name.trim();
    const email = inviteForm.email.trim();
    if (!name || !email) {
      setInviteError("Name and email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setInviteError("Enter a valid email address.");
      return;
    }
    if (activeCount >= MAX_MEMBERS) {
      setInviteError(`You have reached the maximum of ${MAX_MEMBERS} team members.`);
      return;
    }
    setInviting(true);
    try {
      const res = await sendInviteAction(name, email);
      if (!res.ok) {
        setInviteError(res.error || "Failed to send invite.");
        return;
      }
      if (res.data) setInvites((prev) => [res.data!, ...prev]);
      setInviteForm({ name: "", email: "" });
      setInviteSuccess(`Invite sent to ${email}.`);
    } catch {
      setInviteError("An unexpected error occurred.");
    } finally {
      setInviting(false);
    }
  };

  const handleRevoke = async (id: string) => {
    setRevoking(id);
    try {
      const res = await revokeInviteAction(id);
      if (!res.ok) return;
      setInvites((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, status: "revoked" } : inv)),
      );
    } finally {
      setRevoking(null);
    }
  };

  if (loading) return <SkeletonView />;

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                >
                  <span className={stat.iconColor}>{stat.icon}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-700">
                  {stat.title}
                </h3>
              </div>
              {stat.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${stat.badge.color}`}
                >
                  {stat.badge.label}
                </span>
              )}
            </div>
            <p className="mb-1 text-2xl font-bold text-gray-900 break-words">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Company Profile */}
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BiBuilding size={16} className="text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Company Profile
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => void loadUser(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-white disabled:opacity-50"
            >
              <BiRefresh
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing…" : "Refresh"}
            </button>
            {!editing ? (
              <button
                type="button"
                onClick={() => {
                  setSaveError(null);
                  setSaveSuccess(null);
                  setEditing(true);
                }}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white"
              >
                <BiPencil size={16} /> Edit
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white"
                >
                  <BiX size={16} /> Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
                >
                  <BiSave size={16} /> {saving ? "Saving…" : "Save"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 space-y-5">
          {saveError && (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {saveError}
            </div>
          )}
          {saveSuccess && (
            <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {saveSuccess}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Field label="Company Name">
              {editing ? (
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, companyName: e.target.value }))
                  }
                  placeholder="Enter company name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                renderValue(vm.companyName)
              )}
            </Field>

            <Field label="Company Type">
              {editing ? (
                <input
                  type="text"
                  value={form.companyType}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, companyType: e.target.value }))
                  }
                  placeholder="e.g. law-firm"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                prettifyCompanyType(vm.companyType)
              )}
            </Field>

            <Field label="Website">
              {editing ? (
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, website: e.target.value }))
                  }
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : vm.website ? (
                <a
                  href={vm.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-blue-600 hover:underline"
                >
                  {vm.website}
                </a>
              ) : (
                "—"
              )}
            </Field>

            <Field label="Contact Email">
              <span className="break-all">{renderValue(vm.email)}</span>
            </Field>

            <Field label="Role">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 capitalize">
                {vm.role ?? "organization"}
              </span>
            </Field>

            <Field label="Account Verified">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${vm.isVerified ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
              >
                {vm.isVerified ? "✓ Verified" : "⚠ Pending"}
              </span>
            </Field>
          </div>

          {/* Subscription */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-gray-100 pt-4">
            <InfoBox
              label="Subscription Plan"
              value={prettifyCompanyType(vm.subscriptionType) || "Free"}
            />
            <InfoBox
              label="Subscription Start"
              value={
                vm.subscriptionStart ? formatDate(vm.subscriptionStart) : "None"
              }
            />
            <InfoBox
              label="Subscription End"
              value={
                vm.subscriptionEnd ? formatDate(vm.subscriptionEnd) : "None"
              }
            />
          </div>
        </div>
      </div>

      {/* Team Access */}
      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BiUserPlus size={16} className="text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
              Team Access
            </h2>
          </div>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
            {activeCount} / {MAX_MEMBERS} members
          </span>
        </div>

        <div className="p-6 space-y-5">
          {/* Invite form */}
          <div className="rounded-lg border border-gray-100 bg-gray-50 p-4 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Invite a team member
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <input
                type="text"
                value={inviteForm.name}
                onChange={(e) =>
                  setInviteForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Full name"
                disabled={inviting || activeCount >= MAX_MEMBERS}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
              />
              <input
                type="email"
                value={inviteForm.email}
                onChange={(e) =>
                  setInviteForm((p) => ({ ...p, email: e.target.value }))
                }
                placeholder="Email address"
                disabled={inviting || activeCount >= MAX_MEMBERS}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => void handleSendInvite()}
                disabled={inviting || activeCount >= MAX_MEMBERS}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 whitespace-nowrap"
              >
                <BiUserPlus size={16} />
                {inviting ? "Sending…" : "Send Invite"}
              </button>
            </div>
            {activeCount >= MAX_MEMBERS && (
              <p className="text-xs text-amber-600">
                Member limit reached. Revoke an existing member to invite someone new.
              </p>
            )}
            {inviteError && (
              <p className="text-xs text-red-600">{inviteError}</p>
            )}
            {inviteSuccess && (
              <p className="text-xs text-green-600">{inviteSuccess}</p>
            )}
          </div>

          {/* Members list */}
          {invites.length === 0 ? (
            <p className="text-center py-6 text-sm text-gray-400">
              No team members invited yet.
            </p>
          ) : (
            <div className="divide-y divide-gray-100 rounded-lg border border-gray-100 overflow-hidden">
              {invites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {invite.invitee_name}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      {invite.invitee_email}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {statusBadge(invite.status)}
                    <span className="hidden text-xs text-gray-400 sm:block">
                      {new Date(invite.created_at).toLocaleDateString()}
                    </span>
                    {invite.status !== "revoked" && (
                      <button
                        type="button"
                        onClick={() => void handleRevoke(invite.id)}
                        disabled={revoking === invite.id}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                      >
                        <BiX size={14} />
                        {revoking === invite.id ? "Revoking…" : "Revoke"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
