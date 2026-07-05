"use client";

import { signoutAction } from "@/app/actions/auth";
import { searchLeadsAction, type Lead } from "@/app/actions/leads";
import {
  getNotificationsAction,
  getUnreadNotificationCountAction,
  markAllNotificationsReadAction,
  type Notification,
} from "@/app/actions/notifications";
import { getUserData } from "@/app/actions/user";
import { useSidebarContext } from "@/lib/SidebarContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BiBell,
  BiBot,
  BiCalendar,
  BiChat,
  BiChevronDown,
  BiCog,
  BiGridAlt,
  BiLogOut,
  BiSearch,
  BiUser,
  BiUserPin,
  BiWallet,
} from "react-icons/bi";

interface User {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
  companyName?: string | null;
}

type SearchPage = {
  label: string;
  href: string;
  icon: typeof BiGridAlt;
};

const SEARCH_PAGES: SearchPage[] = [
  { label: "Dashboard",        href: "/dashboard",       icon: BiGridAlt },
  { label: "Leads",            href: "/leads",            icon: BiUserPin },
  { label: "Chats",            href: "/chats",            icon: BiChat },
  { label: "AI",               href: "/ai",               icon: BiBot },
  { label: "Train AI",         href: "/train-ai",         icon: BiBot },
  { label: "Appointments",     href: "/appointments",     icon: BiCalendar },
  { label: "Settings",         href: "/settings",         icon: BiCog },
  { label: "Account Settings", href: "/user-settings",    icon: BiUser },
  { label: "Widget Settings",  href: "/widget-settings",  icon: BiCog },
  { label: "Billing",          href: "/billing",          icon: BiWallet },
];

const Topbar = ({ isTeamMember = false }: { isTeamMember?: boolean }) => {
  const { isExpanded } = useSidebarContext();
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [leadResults, setLeadResults] = useState<Lead[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const matchedPages = searchQuery.trim()
    ? SEARCH_PAGES.filter((page) =>
        page.label.toLowerCase().includes(searchQuery.trim().toLowerCase()),
      )
    : [];

  // Debounce the lead search so we don't hit the API on every keystroke.
  // The empty-query case is handled at render time (matchedPages/leadResults
  // are only shown when searchQuery is non-empty) rather than by clearing
  // state synchronously here.
  useEffect(() => {
    const query = searchQuery.trim();
    if (!query) {
      return;
    }
    let cancelled = false;
    const timeout = setTimeout(() => {
      setSearchLoading(true);
      searchLeadsAction(query).then((res) => {
        if (cancelled) return;
        setLeadResults(res.ok && res.data ? res.data : []);
        setSearchLoading(false);
      });
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [searchQuery]);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToPage = (href: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(href);
  };

  const goToLead = (lead: Lead) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    router.push(`/leads?leadId=${lead.id}`);
  };

  // ── Notifications ──────────────────────────────────────────────────────
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [now, setNow] = useState<number | null>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Capture "now" via an effect (not at render time) so relative-time labels
  // stay pure during render; ticks every minute to keep them fresh.
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const timeout = setTimeout(tick, 0);
    const interval = setInterval(tick, 60000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  // Poll for the unread count every 30s so the bell badge stays near-real-time
  // without the cost/complexity of a persistent websocket connection.
  useEffect(() => {
    const fetchCount = async () => {
      const res = await getUnreadNotificationCountAction();
      if (res.ok && typeof res.count === "number") {
        setUnreadCount(res.count);
      }
    };
    fetchCount();
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close notifications dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOpenNotifications = async () => {
    const nextOpen = !isNotifOpen;
    setIsNotifOpen(nextOpen);
    if (!nextOpen) return;

    setNotifLoading(true);
    const res = await getNotificationsAction();
    setNotifications(res.ok && res.data ? res.data : []);
    setNotifLoading(false);

    // Seeing the dropdown counts as "read" — clear the badge and persist it.
    if (unreadCount > 0) {
      setUnreadCount(0);
      await markAllNotificationsReadAction();
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    setIsNotifOpen(false);
    if (notification.lead_id) {
      router.push(`/leads?leadId=${notification.lead_id}`);
    }
  };

  const formatNotifTime = (iso: string, nowMs: number) => {
    const diffMs = nowMs - new Date(iso).getTime();
    const minutes = Math.floor(diffMs / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  // Get current route name
  const getCurrentRoute = () => {
    const pathSegments = pathname.split("/").filter(Boolean);

    // If the path is just "/" or empty, return Dashboard
    if (pathSegments.length === 0) {
      return "Dashboard";
    }

    // For paths like /chat, /leads, /dashboard/chat, /dashboard/leads
    // We want to get the main section (not "dashboard")
    let mainSection = pathSegments[0];

    // If first segment is "dashboard", get the next segment
    if (mainSection === "dashboard" && pathSegments.length > 1) {
      mainSection = pathSegments[1];
    }

    // If we're exactly on /dashboard, show Dashboard
    if (mainSection === "dashboard") {
      return "Dashboard";
    }

    // Map routes to their parent sections
    const routeMap: { [key: string]: string } = {
      // Settings sub-routes
      "user-profile": "Settings",
      "user-settings": "Settings",
      "chat-widget-update": "Settings",
      "create-chat-widget": "Settings",
      settings: "Settings",
      profile: "Settings",

      // AI sub-routes
      "train-ai": "AI",
      apps: "AI",
      appointments: "AI",
      "unknown-questions": "AI",
      "ai-intelligence": "AI",
      ai: "AI",

      // Main routes
      chats: "Chats",
      chat: "Chat",
      leads: "Leads",
      dashboard: "Dashboard",
    };

    // Check if the route has a custom mapping
    if (routeMap[mainSection]) {
      return routeMap[mainSection];
    }

    // Capitalize first letter as fallback
    return mainSection.charAt(0).toUpperCase() + mainSection.slice(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        if (response.ok && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    setIsDropdownOpen(false);
    await signoutAction();
  };

  return (
    <div
      className="fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 transition-all duration-300"
      style={{ left: isExpanded ? "256px" : "80px" }}
    >
      {/* Current Route */}
      <div className="flex items-center">
        <span className="text-lg font-semibold text-gray-900">
          {getCurrentRoute()}
        </span>
      </div>

      {/* Right side - Search, Notifications and User */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative w-80" ref={searchRef}>
          <BiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages or leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
          />

          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute left-0 right-0 mt-2 max-h-96 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
              {matchedPages.length > 0 && (
                <div className="border-b border-gray-100 py-1">
                  <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                    Pages
                  </p>
                  {matchedPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.href}
                        onClick={() => goToPage(page.href)}
                        className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Icon className="h-4 w-4 text-gray-400" />
                        {page.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="py-1">
                <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Leads
                </p>
                {searchLoading ? (
                  <p className="px-3 py-2 text-sm text-gray-400">Searching…</p>
                ) : leadResults.length > 0 ? (
                  leadResults.map((lead) => (
                    <button
                      key={lead.id}
                      onClick={() => goToLead(lead)}
                      className="flex w-full items-center gap-3 px-3 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      <BiUserPin className="h-4 w-4 shrink-0 text-gray-400" />
                      <span className="min-w-0">
                        <span className="block truncate font-medium text-gray-900">
                          {lead.name || "Unnamed lead"}
                        </span>
                        <span className="block truncate text-xs text-gray-500">
                          {lead.email || lead.phone || "No contact info"}
                        </span>
                      </span>
                    </button>
                  ))
                ) : (
                  <p className="px-3 py-2 text-sm text-gray-400">No leads found</p>
                )}
              </div>

              {matchedPages.length === 0 &&
                !searchLoading &&
                leadResults.length === 0 && (
                  <p className="px-3 py-3 text-sm text-gray-400">
                    No results for &ldquo;{searchQuery}&rdquo;
                  </p>
                )}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={handleOpenNotifications}
            className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <BiBell size={20} />
            {unreadCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-3 w-80 max-h-96 overflow-y-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2">
                <p className="text-sm font-semibold text-gray-900">
                  Notifications
                </p>
              </div>

              {notifLoading ? (
                <p className="px-4 py-6 text-center text-sm text-gray-400">
                  Loading…
                </p>
              ) : notifications.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-gray-400">
                  No notifications yet
                </p>
              ) : (
                notifications.map((notification) => (
                  <button
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="flex w-full flex-col items-start gap-0.5 px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-50 last:border-0"
                  >
                    <div className="flex w-full items-center justify-between gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </span>
                      {!notification.is_read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      {notification.message}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {now !== null
                        ? formatNotifTime(notification.created_at, now)
                        : ""}
                    </p>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-3 focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 overflow-hidden relative border border-gray-200">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-white">
                  {(user?.companyName || user?.name || "U")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>
            <BiChevronDown
              className={`text-gray-500 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.companyName || user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || ""}
                </p>
              </div>
              <Link
                href="/user-settings"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BiUser className="mr-3 h-5 w-5 text-gray-400" />
                Profile
              </Link>
              <Link
                href="/billing"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BiWallet className="mr-3 h-5 w-5 text-gray-400" />
                Billing
              </Link>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <BiLogOut className="mr-3 h-5 w-5 text-gray-400" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
