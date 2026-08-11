"use client";

import type {
  ChartBucket,
  DashboardSummary,
  LeadCategory,
  RecentSession,
  VisitorStats,
} from "@/app/actions/dashboard";
import type { SubscriptionData } from "@/app/actions/subscriptions";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  BiCheck,
  BiClipboard,
  BiDollar,
  BiMessageDetail,
  BiTime,
  BiTrendingUp,
  BiUser,
} from "react-icons/bi";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DashboardDetailsViewProps {
  summary: DashboardSummary | null;
  chartThisYear: ChartBucket[];
  chartLastYear: ChartBucket[];
  visitors: VisitorStats | null;
  recentSessions: RecentSession[];
  subscription: SubscriptionData | null;
  leadCategories: LeadCategory[];
  companyType: string | null;
}

// Estimated time a staff member would spend handling one inquiry manually
// (phone/email back-and-forth) if the chatbot hadn't answered it instead.
const AVG_HANDLE_TIME_MINUTES = 8;

// Estimated fully-loaded hourly staff cost by industry — used to translate
// "hours saved" into a dollar figure on the Cost vs. Value banner. These are
// rough US averages for the role that would otherwise field these inquiries
// (intake/front-desk/support), not the company's own billing rate.
const HOURLY_RATE_BY_COMPANY_TYPE: Record<string, number> = {
  "law-firm": 65,
  "healthcare-company": 45,
  "realestate-company": 40,
  "consultancy-company": 55,
  "agency-company": 40,
  "tech-company": 45,
  other: 35,
};
const DEFAULT_HOURLY_RATE = 35;

// Estimated value of a single captured lead (name + email/phone), used to
// translate "leads captured" into a dollar figure alongside staff time saved.
// Flat across every organization by design — not industry-adjusted.
const LEAD_VALUE_USD = 100;

function fmtMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function deltaLabel(pct: number): string {
  if (pct > 0) return `+${pct}% vs prev 30d`;
  if (pct < 0) return `${pct}% vs prev 30d`;
  return "No change vs prev 30d";
}

const DashboardDetailsView = ({
  summary,
  chartThisYear,
  chartLastYear,
  visitors,
  recentSessions,
  subscription,
  leadCategories,
  companyType,
}: DashboardDetailsViewProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Land here after a successful checkout (see app/checkout/page.tsx) — show
  // a one-time confirmation, then strip the query param so it doesn't fire
  // again on refresh/back-navigation.
  useEffect(() => {
    if (searchParams.get("subscription") !== "success") return;
    toast.success("Subscription confirmed — welcome aboard!");
    router.replace("/dashboard");
  }, [searchParams, router]);

  const [selectedPeriod, setSelectedPeriod] = useState<"year" | "last-year">(
    "year",
  );

  const chartData = (
    selectedPeriod === "year" ? chartThisYear : chartLastYear
  ).map((b) => ({
    month: b.label,
    chats: b.sessions,
    leads: b.leads,
    visitors: b.visitors,
  }));

  const hoursSaved = summary
    ? Math.round((summary.total_sessions * AVG_HANDLE_TIME_MINUTES) / 60)
    : 0;

  const hourlyRate = companyType
    ? (HOURLY_RATE_BY_COMPANY_TYPE[companyType] ?? DEFAULT_HOURLY_RATE)
    : DEFAULT_HOURLY_RATE;
  const dollarsSaved = hoursSaved * hourlyRate;

  const totalLeads = summary?.total_leads ?? 0;
  const leadValue = totalLeads * LEAD_VALUE_USD;

  const totalValue = dollarsSaved + leadValue;
  const monthlyPrice = subscription?.payment_amount ?? 0;
  const roiMultiple = monthlyPrice > 0 ? totalValue / monthlyPrice : null;

  const stats = [
    {
      title: "Website Visitors",
      value: fmt(visitors?.total_visitors ?? 0),
      subtitle: visitors
        ? `${fmt(visitors.new_visitors_30d)} new this month`
        : "People who visited your site",
      icon: <BiUser size={24} />,
      color: "bg-primary/10",
      iconColor: "text-primary-dark",
    },
    {
      title: "Conversations Handled",
      value: fmt(summary?.total_sessions ?? 0),
      subtitle: summary
        ? deltaLabel(summary.deltas.sessions_pct)
        : "Chats your AI has handled",
      icon: <BiMessageDetail size={24} />,
      color: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      title: "Leads Captured",
      value: fmt(summary?.total_leads ?? 0),
      subtitle: summary
        ? deltaLabel(summary.deltas.leads_pct)
        : "Visitors who left contact info",
      icon: <BiTrendingUp size={24} />,
      color: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "Est. Hours Saved",
      value: `${fmt(hoursSaved)} hrs`,
      subtitle: `~${AVG_HANDLE_TIME_MINUTES} min saved per conversation`,
      icon: <BiTime size={24} />,
      color: "bg-orange-50",
      iconColor: "text-orange-600",
    },
  ];

  const showValueBanner = !!summary && summary.total_sessions > 0;

  // Right sidebar: recent sessions as notifications
  const notifications =
    recentSessions.length > 0
      ? recentSessions.map((s, i) => ({
          id: i + 1,
          title: s.lead_name
            ? `${s.lead_name} — ${s.last_message.slice(0, 50)}`
            : s.last_message.slice(0, 60) || "New conversation",
          time: s.updated_at ? new Date(s.updated_at).toLocaleString() : "",
          icon: s.lead_captured ? (
            <BiTrendingUp size={16} />
          ) : (
            <BiMessageDetail size={16} />
          ),
        }))
      : [
          {
            id: 1,
            title: "New message from John Doe",
            time: "Just now",
            icon: <BiMessageDetail size={16} />,
          },
          {
            id: 2,
            title: "New user registered",
            time: "5 minutes ago",
            icon: <BiUser size={16} />,
          },
          {
            id: 3,
            title: "System update completed",
            time: "1 hour ago",
            icon: <BiCheck size={16} />,
          },
          {
            id: 4,
            title: "Payment received",
            time: "2 hours ago",
            icon: <BiDollar size={16} />,
          },
          {
            id: 5,
            title: "New lead generated",
            time: "3 hours ago",
            icon: <BiTrendingUp size={16} />,
          },
        ];

  // Right sidebar: plain-language bot health, instead of raw technical metrics
  const activeUsers = summary
    ? [
        {
          id: 1,
          initials: `${summary.kb_score.toFixed(0)}%`,
          name: "Knowledge base ready",
          active: summary.kb_score > 50,
        },
        {
          id: 2,
          initials: fmt(visitors?.returning_visitors ?? 0),
          name: "Returning visitors",
          active: true,
        },
        {
          id: 3,
          initials: fmt(summary.total_messages),
          name: "Messages exchanged",
          active: true,
        },
        {
          id: 4,
          initials: String(summary.total_train_runs),
          name: "Times you've trained your bot",
          active: summary.total_train_runs > 0,
        },
      ]
    : [
        { id: 1, name: "John Doe", initials: "JD", active: true },
        { id: 2, name: "Jane Smith", initials: "JS", active: true },
        { id: 3, name: "Mike Johnson", initials: "MJ", active: false },
        { id: 4, name: "Sarah Wilson", initials: "SW", active: true },
        { id: 5, name: "David Brown", initials: "DB", active: true },
      ];

  return (
    // @container: the row↔column switch and sidebar width below react to the
    // ACTUAL space available for this layout, not the raw viewport — the
    // fixed sidebar's expand/collapse toggle changes that available space
    // without changing the viewport at all, which a viewport breakpoint can't see.
    <div className="@container">
      <div className="flex flex-col gap-6 @5xl:flex-row bg-gray-50 min-h-[calc(100vh-115px)]">
      {/* Main Content */}
      <div className="min-w-0 flex-1">
        {/* Cost vs. Value Banner */}
        {showValueBanner && (
          <div className="mb-6 rounded border border-green-100 bg-gradient-to-br from-green-50 to-primary/10 p-5">
            {/* Headline: total value vs. what was paid, plus the ROI callout */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Value delivered this month
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900 @7xl:text-3xl">
                  {fmtMoney(totalValue)}
                  {monthlyPrice > 0 && (
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      vs {fmtMoney(monthlyPrice)} paid
                    </span>
                  )}
                </p>
              </div>
              {roiMultiple !== null && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600 px-3 py-1.5 text-sm font-semibold text-white">
                  <BiTrendingUp size={16} />
                  {roiMultiple.toFixed(1)}&times; return
                </span>
              )}
            </div>

            {/* Where the value comes from */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg bg-white/70 p-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                  <BiTime size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {fmtMoney(dollarsSaved)} in staff time
                  </p>
                  <p className="text-xs text-gray-500">
                    ~{fmt(hoursSaved)} hrs saved on{" "}
                    {fmt(summary!.total_sessions)} conversations
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg bg-white/70 p-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-600">
                  <BiDollar size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">
                    {fmtMoney(leadValue)} in lead value
                  </p>
                  <p className="text-xs text-gray-500">
                    {fmt(totalLeads)} leads captured &times; ~${LEAD_VALUE_USD}/lead
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="mb-6 grid grid-cols-2 gap-5 @7xl:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded border border-gray-200 bg-white p-5 hover:shadow-sm transition-shadow"
            >
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                {stat.title}
              </h3>
              <p className="mb-1 text-2xl font-bold text-gray-900 @7xl:text-3xl">
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* What People Are Asking About */}
        {leadCategories.length > 0 && (
          <div className="mb-6 rounded border border-gray-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BiClipboard size={18} className="text-gray-500" />
                <h2 className="text-base font-bold text-gray-900">
                  What People Are Asking About
                </h2>
              </div>
              <span className="text-xs text-gray-400">Est. value by topic</span>
            </div>
            <div className="space-y-3">
              {leadCategories.map((cat) => {
                const maxCount = leadCategories[0]?.count || 1;
                const widthPct = Math.max(
                  8,
                  Math.round((cat.count / maxCount) * 100),
                );
                return (
                  <div key={cat.category} className="flex items-center gap-3">
                    <span className="w-36 flex-shrink-0 truncate text-sm text-gray-700">
                      {cat.category}
                    </span>
                    <div className="h-6 flex-1 overflow-hidden rounded bg-gray-100">
                      <div
                        className="h-full rounded bg-primary"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <span className="w-8 flex-shrink-0 text-right text-sm font-semibold text-gray-900">
                      {cat.count}
                    </span>
                    <span className="w-16 flex-shrink-0 text-right text-xs text-gray-400">
                      {fmtMoney(cat.count * LEAD_VALUE_USD)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Chart Section */}
        <div className="rounded border border-gray-200 bg-white p-6">
          {/* Chart Header */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-base font-bold text-gray-900">Overview</h2>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                <div className="relative">
                  <input
                    type="radio"
                    name="period"
                    checked={selectedPeriod === "year"}
                    onChange={() => setSelectedPeriod("year")}
                    className="peer sr-only"
                  />
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:border-[5px] transition-all" />
                </div>
                This year
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
                <div className="relative">
                  <input
                    type="radio"
                    name="period"
                    checked={selectedPeriod === "last-year"}
                    onChange={() => setSelectedPeriod("last-year")}
                    className="peer sr-only"
                  />
                  <div className="h-4 w-4 rounded-full border-2 border-gray-300 peer-checked:border-primary peer-checked:border-[5px] transition-all" />
                </div>
                Last year
              </label>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 @7xl:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="5 5"
                  stroke="#e5e7eb"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => (v >= 10000 ? `${v / 1000}K` : v)}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "12px",
                    fontSize: "13px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                  cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: "13px", paddingTop: "12px" }}
                />
                <Line
                  type="monotone"
                  dataKey="chats"
                  name="Total Chat"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="leads"
                  name="Total Leads"
                  stroke="#16a34a"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  name="Total Visitors"
                  stroke="#00b2ad"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 5, strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Right Sidebar — side-by-side when stacked below the main content
          (plenty of width to share), stacked vertically once it becomes the
          narrow right column instead (@5xl+). */}
      <div className="w-full shrink-0 flex flex-row gap-5 @5xl:w-72 @5xl:flex-col @7xl:w-80">
        {/* Notifications */}
        <div className="min-w-0 flex-1 rounded border border-gray-200 bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 @7xl:px-6 @7xl:py-4">
            <h2 className="text-base font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="overflow-y-auto max-h-[260px] p-3 @7xl:max-h-[305px] @7xl:p-4">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-2.5 rounded-xl p-2.5 transition-all hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-200 @7xl:gap-3 @7xl:p-3"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 shrink-0 group-hover:bg-gray-600 group-hover:text-white transition-colors @7xl:h-10 @7xl:w-10">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bot Performance */}
        <div className="min-w-0 flex-1 rounded border border-gray-200 bg-white overflow-y-auto flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 @7xl:px-6 @7xl:py-4">
            <h2 className="text-base font-bold text-gray-900">
              Bot Performance
            </h2>
          </div>
          <div className="overflow-y-auto p-3 max-h-[260px] @7xl:p-4 @7xl:max-h-[305px]">
            <div className="space-y-1">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start gap-2.5 rounded-xl p-2.5 transition-all hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-200 @7xl:gap-3 @7xl:p-3"
                >
                  <div className="flex items-center gap-2.5 @7xl:gap-3">
                    <div className="relative">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 shrink-0 group-hover:bg-gray-600 group-hover:text-white transition-colors text-xs font-bold @7xl:h-10 @7xl:w-10">
                        {user.initials}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${
                          user.active ? "bg-green-500" : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {user.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default DashboardDetailsView;
