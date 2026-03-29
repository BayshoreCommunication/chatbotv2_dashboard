"use client";

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
  BiCalendar,
  BiCheckCircle,
  BiPencil,
  BiRefresh,
  BiSave,
  BiShield,
  BiX,
} from "react-icons/bi";

type UserViewModel = {
  companyName?: string;
  companyType?: string;
  website?: string | null;
  email?: string;
  isActive?: boolean;
  isVerified?: boolean;
  isSubscribed?: boolean;
  subscriptionType?: string;
  subscriptionStart?: string | null;
  subscriptionEnd?: string | null;
  trainScore?: number;
  trainUpdatedAt?: string | null;
  trainRuns?: string;
};

type StatCard = {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  color: string;
  iconColor: string;
};

type ProfileForm = {
  companyName: string;
  companyType: string;
  website: string;
};

function formatDate(value?: string | null): string {
  if (!value) return "-";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleString();
}

function prettifyCompanyType(value?: string): string {
  if (!value) return "-";
  return value.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function renderValue(value?: string | null): string {
  if (!value || value.trim() === "") return "-";
  return value;
}

function SkeletonView() {
  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      <div className="rounded border border-gray-200 bg-white p-6 h-28 animate-pulse" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded border border-gray-200 bg-white p-5 h-32 animate-pulse"
          />
        ))}
      </div>
      <div className="rounded border border-gray-200 bg-white p-6 h-72 animate-pulse" />
    </div>
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [form, setForm] = useState<ProfileForm>({
    companyName: "",
    companyType: "",
    website: "",
  });

  const loadUser = useCallback(async (showRefresh = false) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

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
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to load user details", e);
      setError("Failed to load user details.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    void loadUser(false);
  }, [loadUser]);

  const vm = useMemo<UserViewModel>(() => {
    return {
      companyName: full?.company_name || profile?.companyName || profile?.name,
      companyType: full?.company_type || profile?.companyType,
      website: full?.company_website || profile?.website,
      email: full?.email || profile?.email,
      isActive: full?.is_active,
      isVerified: full?.is_verified,
      isSubscribed: full?.is_subscribed,
      subscriptionType: full?.subscription_type,
      subscriptionStart: full?.subscription_start_date,
      subscriptionEnd: full?.subscription_end_date,
      trainScore: full?.train_data?.score,
      trainUpdatedAt: full?.train_data?.last_updated,
      trainRuns: full?.train_data
        ? `${full.train_data.update_count}/${full.train_data.update_limit}`
        : undefined,
    };
  }, [full, profile]);

  useEffect(() => {
    if (!editing) {
      setForm({
        companyName: vm.companyName || "",
        companyType: vm.companyType || "",
        website: vm.website || "",
      });
    }
  }, [editing, vm.companyName, vm.companyType, vm.website]);

  const stats = useMemo<StatCard[]>(() => {
    const trainingScore =
      vm.trainScore !== undefined ? `${vm.trainScore.toFixed(1)} / 100` : "-";

    return [
      {
        title: "Account Status",
        value: vm.isActive ? "Active" : "Inactive",
        subtitle: vm.isVerified ? "Identity verified" : "Verification pending",
        icon: <BiShield size={20} />,
        color: "bg-blue-50",
        iconColor: "text-blue-600",
      },
      {
        title: "Subscription",
        value: vm.isSubscribed
          ? vm.subscriptionType || "Subscribed"
          : "Not Subscribed",
        subtitle: `Ends: ${formatDate(vm.subscriptionEnd)}`,
        icon: <BiCheckCircle size={20} />,
        color: "bg-green-50",
        iconColor: "text-green-600",
      },
      {
        title: "Training Score",
        value: trainingScore,
        subtitle: `Runs: ${vm.trainRuns || "-"}`,
        icon: <BiRefresh size={20} />,
        color: "bg-purple-50",
        iconColor: "text-purple-600",
      },
      {
        title: "Last Sync",
        value: lastUpdated ? formatDate(lastUpdated.toISOString()) : "-",
        subtitle: "Most recent data fetch",
        icon: <BiCalendar size={20} />,
        color: "bg-orange-50",
        iconColor: "text-orange-600",
      },
    ];
  }, [
    lastUpdated,
    vm.isActive,
    vm.isSubscribed,
    vm.isVerified,
    vm.subscriptionEnd,
    vm.subscriptionType,
    vm.trainRuns,
    vm.trainScore,
  ]);

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
        setFull((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            company_name: updated.companyName || prev.company_name,
            company_type: updated.companyType || prev.company_type,
            company_website: updated.website ?? prev.company_website,
          };
        });
      }

      setSaveSuccess("Profile updated successfully.");
      setEditing(false);
      setLastUpdated(new Date());
    } catch (e) {
      console.error("Failed to update profile", e);
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

  if (loading) {
    return <SkeletonView />;
  }

  if (error) {
    return (
      <div className="rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
              >
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700">
                {stat.title}
              </h3>
            </div>
            <p className="mb-1 text-2xl font-bold text-gray-900 break-words">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500">{stat.subtitle}</p>
          </div>
        ))}
      </div>

      <div className="rounded border border-gray-200 bg-white overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">
            Company Profile
          </h2>
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
              <BiPencil size={16} />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white"
              >
                <BiX size={16} />
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed"
              >
                <BiSave size={16} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <div className="p-6 space-y-5">
          {saveError ? (
            <div className="rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {saveError}
            </div>
          ) : null}
          {saveSuccess ? (
            <div className="rounded border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {saveSuccess}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Company Name
              </p>
              {editing ? (
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      companyName: e.target.value,
                    }))
                  }
                  placeholder="Enter company name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {renderValue(vm.companyName)}
                </p>
              )}
            </div>

            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Company Type
              </p>
              {editing ? (
                <input
                  type="text"
                  value={form.companyType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      companyType: e.target.value,
                    }))
                  }
                  placeholder="e.g. Personal Injury Law"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900">
                  {prettifyCompanyType(vm.companyType)}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Website
              </p>
              {editing ? (
                <input
                  type="url"
                  value={form.website}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, website: e.target.value }))
                  }
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              ) : (
                <p className="text-sm font-medium text-gray-900 break-all">
                  {renderValue(vm.website)}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Contact Email
              </p>
              <p className="text-sm font-medium text-gray-900 break-all">
                {renderValue(vm.email)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 border-t border-gray-100 pt-4">
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Subscription Start
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {formatDate(vm.subscriptionStart)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Subscription End
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {formatDate(vm.subscriptionEnd)}
              </p>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Training Updated
              </p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {formatDate(vm.trainUpdatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
