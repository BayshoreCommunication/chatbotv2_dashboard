"use client";

import { getSubscriptionAction } from "@/app/actions/subscriptions";
import { navigationConfig, NavItem } from "@/config/navigation";
import { useSidebarContext } from "@/lib/SidebarContext";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiChevronDown,
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronUp,
  BiErrorCircle,
  BiTime,
} from "react-icons/bi";

function daysUntil(dateString: string | null): number {
  if (!dateString) return 0;
  const ms = new Date(dateString).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

// How close to the period end before a canceled-but-still-active
// subscription starts showing the "access ending" reminder.
const ENDING_SOON_THRESHOLD_DAYS = 3;

type BillingReminder =
  | { kind: "trial"; days: number }
  | { kind: "ending"; days: number };

const Sidebar = () => {
  const pathname = usePathname();
  const { isExpanded, toggleSidebar } = useSidebarContext();
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [reminder, setReminder] = useState<BillingReminder | null>(null);

  // Billing reminder — global to the sidebar so it's visible from every
  // dashboard page, not just widget-settings. Two cases: still in the free
  // trial, or a paid plan that's canceled and about to lapse.
  useEffect(() => {
    let active = true;
    getSubscriptionAction().then((res) => {
      if (!active || !res.ok || !res.data) return;
      const sub = res.data;

      if (sub.is_in_trial) {
        setReminder({ kind: "trial", days: daysUntil(sub.trial_end) });
        return;
      }

      if (sub.cancel_at_period_end && sub.current_period_end) {
        const days = daysUntil(sub.current_period_end);
        if (days <= ENDING_SOON_THRESHOLD_DAYS) {
          setReminder({ kind: "ending", days });
        }
      }
    });
    return () => {
      active = false;
    };
  }, []);

  // Toggle sub-menu
  const toggleSubMenu = (itemId: string) => {
    setOpenMenus((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId],
    );
  };

  // Check if current path matches the item or its sub-items
  const isItemActive = (item: NavItem) => {
    if (pathname === item.href) return true;
    if (item.sub) {
      return item.sub.some((subItem) => pathname === subItem.href);
    }
    return false;
  };

  // Check if sub-item is active
  const isSubItemActive = (href: string) => pathname === href;

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300",
        isExpanded ? "w-64" : "w-20",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-4 ml-3">
        <Link
          href="/dashboard"
          className="flex flex-shrink-0 items-center transition-opacity hover:opacity-80"
        >
          {isExpanded ? (
            <Image
              src="/assets/logo/go-converto-logo-black.png"
              alt="Go Converto"
              width={1387}
              height={312}
              priority
              className="h-8 w-auto"
            />
          ) : (
            <Image
              src="/assets/logo/go-converto-logo-short.png"
              alt="Go Converto"
              width={412}
              height={311}
              priority
              className="h-9 w-auto"
            />
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 py-6 px-3 overflow-y-auto overflow-x-hidden">
        {navigationConfig.map((item) => {
          const isActive = isItemActive(item);
          const isOpen = openMenus.includes(item.id);
          const hasSub = item.sub && item.sub.length > 0;

          return (
            <div key={item.id}>
              {/* Main nav item */}
              {hasSub ? (
                <button
                  onClick={() => isExpanded && toggleSubMenu(item.id)}
                  className={cn(
                    "group relative flex w-full items-center gap-3 rounded transition-all",
                    isExpanded ? "px-4 py-3" : "justify-center p-3",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>

                  {isExpanded && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                      {isOpen ? (
                        <BiChevronUp size={16} className="flex-shrink-0" />
                      ) : (
                        <BiChevronDown size={16} className="flex-shrink-0" />
                      )}
                    </>
                  )}

                  {!isExpanded && item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
                      {item.badge}
                    </span>
                  )}

                  {isActive && !isExpanded && (
                    <div className="absolute -right-3 top-1/2 h-6 w-1 -translate-y-1/2 transform rounded-l-full bg-gray-900" />
                  )}

                  {/* Tooltip - only show when collapsed */}
                  {!isExpanded && (
                    <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {item.title}
                    </div>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded transition-all",
                    isExpanded ? "px-4 py-3" : "justify-center p-3",
                    isActive
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>

                  {isExpanded && (
                    <>
                      <span className="text-sm font-medium flex-1">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-xs text-white">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}

                  {!isExpanded && item.badge && (
                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-900 text-[10px] text-white">
                      {item.badge}
                    </span>
                  )}

                  {isActive && !isExpanded && (
                    <div className="absolute -right-3 top-1/2 h-6 w-1 -translate-y-1/2 transform rounded-l-full bg-gray-900" />
                  )}

                  {/* Tooltip - only show when collapsed */}
                  {!isExpanded && (
                    <div className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                      {item.title}
                    </div>
                  )}
                </Link>
              )}

              {/* Sub-menu items */}
              {hasSub && isExpanded && isOpen && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 pl-4">
                  {item.sub?.map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.href}
                      className={cn(
                        "flex items-center gap-3 rounded px-3 py-2 text-sm transition-all",
                        isSubItemActive(subItem.href)
                          ? "bg-gray-100 text-gray-900 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      <span className="flex-shrink-0">{subItem.icon}</span>
                      <span>{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Billing reminder — pinned to the bottom of the sidebar. Shown for
          the free trial, or for a canceled paid plan about to lapse. */}
      {reminder && (
        <div className={cn(isExpanded ? "p-3" : "p-2")}>
          {isExpanded ? (
            <div
              className={cn(
                "rounded-lg border px-3 py-2.5",
                reminder.kind === "trial"
                  ? "border-primary/20 bg-primary/10"
                  : "border-amber-200 bg-amber-50",
              )}
            >
              <div className="flex items-center gap-1.5">
                {reminder.kind === "trial" ? (
                  <BiTime size={14} className="shrink-0 text-primary-dark" />
                ) : (
                  <BiErrorCircle size={14} className="shrink-0 text-amber-600" />
                )}
                <p
                  className={cn(
                    "text-xs font-semibold",
                    reminder.kind === "trial" ? "text-primary-dark" : "text-amber-700",
                  )}
                >
                  {reminder.kind === "trial"
                    ? `Free trial — ${reminder.days} day${reminder.days !== 1 ? "s" : ""} left`
                    : `Access ending — ${reminder.days} day${reminder.days !== 1 ? "s" : ""} left`}
                </p>
              </div>
              <p
                className={cn(
                  "mt-1 text-[11px] leading-relaxed",
                  reminder.kind === "trial" ? "text-primary-dark/80" : "text-amber-700/80",
                )}
              >
                {reminder.kind === "trial"
                  ? "Your card will be charged automatically when the trial ends."
                  : "Your subscription is set to cancel. Resubscribe to keep your AI assistant live."}
              </p>
              <Link
                href="/pricing"
                className={cn(
                  "mt-1.5 block text-[11px] font-semibold underline underline-offset-2",
                  reminder.kind === "trial"
                    ? "text-primary-dark hover:text-primary"
                    : "text-amber-700 hover:text-amber-800",
                )}
              >
                {reminder.kind === "trial" ? "Manage subscription" : "Resubscribe"}
              </Link>
            </div>
          ) : (
            <Link
              href="/pricing"
              title={
                reminder.kind === "trial"
                  ? `Free trial — ${reminder.days} day${reminder.days !== 1 ? "s" : ""} left`
                  : `Access ending — ${reminder.days} day${reminder.days !== 1 ? "s" : ""} left`
              }
              className={cn(
                "flex items-center justify-center rounded-lg border p-2.5",
                reminder.kind === "trial"
                  ? "border-primary/20 bg-primary/10 text-primary-dark hover:bg-primary/20"
                  : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
              )}
            >
              {reminder.kind === "trial" ? (
                <BiTime size={18} />
              ) : (
                <BiErrorCircle size={18} />
              )}
            </Link>
          )}
        </div>
      )}

      {/* Toggle Button - Centered vertically on right edge */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 hover:border-gray-900 hover:text-gray-900 transition-all duration-300 z-50"
        style={{ left: isExpanded ? "244px" : "68px" }}
      >
        {isExpanded ? (
          <BiChevronsLeft size={14} />
        ) : (
          <BiChevronsRight size={14} />
        )}
      </button>
    </div>
  );
};

export default Sidebar;
