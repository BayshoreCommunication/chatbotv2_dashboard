"use client";

import { BiMessageDetail, BiTrendingUp, BiUser } from "react-icons/bi";
import type { RecentSession, VisitorStats } from "@/app/actions/dashboard";

interface RightNotificationProps {
  recentSessions?: RecentSession[];
  visitors?: VisitorStats | null;
}

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function getInitials(name: string | null, sessionId: string): string {
  if (name?.trim()) {
    const words = name.trim().split(/\s+/);
    return words.length === 1
      ? words[0][0].toUpperCase()
      : `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return sessionId.slice(0, 2).toUpperCase();
}

const RightNotification = ({ recentSessions = [], visitors = null }: RightNotificationProps) => {
  const notifications = recentSessions.length > 0
    ? recentSessions.map((s) => ({
        id:      s.session_id,
        title:   s.lead_name
          ? `${s.lead_name} — ${s.last_message.slice(0, 45)}`
          : s.last_message.slice(0, 55) || "New conversation",
        time:    timeAgo(s.updated_at),
        icon:    s.lead_captured ? <BiTrendingUp size={16} /> : <BiMessageDetail size={16} />,
      }))
    : [
        { id: "1", title: "No recent conversations yet", time: "", icon: <BiMessageDetail size={16} /> },
      ];

  const activeUsers = visitors
    ? [
        { id: "total",     initials: String(visitors.total_visitors),     name: "Total visitors",     active: visitors.total_visitors > 0 },
        { id: "new",       initials: String(visitors.new_visitors_30d),   name: "New this month",     active: visitors.new_visitors_30d > 0 },
        { id: "returning", initials: String(visitors.returning_visitors), name: "Returning visitors", active: visitors.returning_visitors > 0 },
      ]
    : recentSessions.map((s) => ({
        id:       s.session_id,
        initials: getInitials(s.lead_name, s.session_id),
        name:     s.lead_name ?? s.session_id,
        active:   true,
      }));

  return (
    <div className="w-80 rounded bg-white overflow-hidden flex flex-col">
      <div className="w-80 flex flex-col gap-5">
        {/* Notifications */}
        <div className="rounded border border-gray-200 bg-white overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900">Notifications</h2>
          </div>
          <div className="overflow-y-auto p-4">
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 flex-shrink-0 group-hover:bg-gray-600 group-hover:text-white transition-colors">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{notification.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Users / Visitor Stats */}
        <div className="rounded border border-gray-200 bg-white overflow-y-auto flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900">
              {visitors ? "Visitors" : "Active"}
            </h2>
          </div>
          <div className="overflow-y-auto">
            <div className="space-y-1">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-start gap-3 rounded-xl p-3 transition-all hover:bg-gray-50 cursor-pointer group border border-transparent hover:border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 flex-shrink-0 group-hover:bg-gray-600 group-hover:text-white transition-colors text-xs font-bold">
                        {visitors ? (
                          <BiUser size={18} />
                        ) : (
                          user.initials
                        )}
                      </div>
                      <div className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white shadow-sm ${user.active ? "bg-green-500" : "bg-gray-400"}`} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-900 block">{user.name}</span>
                      {visitors && (
                        <span className="text-xs text-gray-500">{user.initials}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNotification;
