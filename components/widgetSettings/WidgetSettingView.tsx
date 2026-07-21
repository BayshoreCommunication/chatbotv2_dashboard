"use client";

import {
  getWidgetSettingsAction,
  updateWidgetSettingsAction,
  type WidgetSettingsResponse,
} from "@/app/actions/widgetSettings";
import {
  getSubscriptionAction,
  type SubscriptionData,
} from "@/app/actions/subscriptions";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiPencil, BiRefresh, BiSave, BiX } from "react-icons/bi";
import { BsArrowRight, BsExclamationTriangle } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ChatbotPreview from "./ChatbotPreview";
import WidgetSettingUpdate, {
  defaultSettings,
  WidgetSettingsForm,
} from "./WidgetSettingUpdate";
import WidgetSetup from "./WidgetSetup";

function toFormData(data: WidgetSettingsResponse): WidgetSettingsForm {
  return {
    bot_name: data.bot_name,
    theme: data.theme,
    behavior: data.behavior,
    content: data.content,
    launcher: data.launcher,
  };
}

function trialDaysLeft(trialEnd: string | null): number {
  if (!trialEnd) return 0;
  const ms = new Date(trialEnd).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

type ViewState = "loading" | "activating" | "paywall" | "setup" | "editor";

const WidgetSettingView = () => {
  const searchParams = useSearchParams();
  const successToastFired = useRef(false);
  const initRan = useRef(false);

  const [viewState, setViewState] = useState<ViewState>("loading");
  const [companyId, setCompanyId] = useState<string>("");
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [settings, setSettings] = useState<WidgetSettingsForm>(defaultSettings);
  const [form, setForm] = useState<WidgetSettingsForm>(defaultSettings);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(settings);

  // Fetch subscription + widget settings on mount.
  // When arriving from checkout (?subscription=success), Stripe's webhook may
  // not have written to MongoDB yet — poll up to 5 times (2 s apart) so
  // trial users aren't incorrectly shown the paywall.
  useEffect(() => {
    if (initRan.current) return;
    initRan.current = true;

    const justSubscribed =
      searchParams.get("subscription") === "success";

    const init = async () => {
      const [subRes, widgetRes] = await Promise.all([
        getSubscriptionAction(),
        getWidgetSettingsAction(),
      ]);

      let sub = subRes.ok && subRes.data ? subRes.data : null;

      // If arriving from checkout and the subscription isn't active yet
      // (Stripe webhook may still be in flight), poll briefly before giving up.
      if (justSubscribed && (!sub || !sub.is_active)) {
        setViewState("activating");
        for (let i = 0; i < 5; i++) {
          await new Promise((r) => setTimeout(r, 2000));
          const retry = await getSubscriptionAction();
          if (retry.ok && retry.data?.is_active) {
            sub = retry.data;
            break;
          }
        }
      }

      setSubscription(sub);

      // Only hard-block on statuses that are definitively inactive.
      // A missing subscription doc (null) means the user is new or the webhook
      // hasn't synced yet — do NOT block them, just proceed.
      // "trialing" and "active" pass through automatically.
      const BLOCKED: string[] = [
        "canceled",
        "unpaid",
        "incomplete_expired",
        "paused",
      ];
      const isBlocked =
        sub !== null && BLOCKED.includes(sub.subscription_status);

      if (isBlocked) {
        setViewState("paywall");
        return;
      }

      if (widgetRes.ok && widgetRes.data) {
        const formData = toFormData(widgetRes.data);
        setSettings(formData);
        setForm(formData);
        setCompanyId(widgetRes.data.company_id);
        setViewState("editor");
      } else {
        setViewState("setup");
      }
    };

    init();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Show success toast once after checkout redirect
  useEffect(() => {
    if (successToastFired.current) return;
    if (searchParams.get("subscription") === "success") {
      successToastFired.current = true;
      toast.success("You're all set! Your subscription is now active.", {
        duration: 5000,
      });
    }
  }, [searchParams]);

  const handleSetupComplete = async () => {
    // Re-fetch after setup so state matches DB
    const res = await getWidgetSettingsAction();
    if (res.ok && res.data) {
      const formData = toFormData(res.data);
      setSettings(formData);
      setForm(formData);
      setCompanyId(res.data.company_id);
    }
    setViewState("editor");
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = async () => {
    if (!hasChanges) {
      setEditing(false);
      return;
    }

    setSaving(true);
    try {
      const res = await updateWidgetSettingsAction(form);
      if (res.ok && res.data) {
        const saved = toFormData(res.data);
        setSettings(saved);
        setForm(saved);
        toast.success("Settings successfully saved and live.");
        setEditing(false);
      } else {
        toast.error(res.error || "Failed to save settings.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setForm(settings);
  };

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (viewState === "loading") {
    return (
      <div className="animate-pulse">
        {/* Header bar skeleton */}
        <div className="mb-6 flex items-center justify-between rounded border border-gray-200 bg-white p-5 shadow-sm">
          <div className="space-y-2">
            <div className="h-6 w-48 rounded-lg bg-gray-200" />
            <div className="h-3.5 w-72 rounded-lg bg-gray-100" />
          </div>
          <div className="h-10 w-32 rounded-md bg-gray-200" />
        </div>

        <div className="flex gap-6">
          {/* Left panel skeleton */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Section 1 */}
            <div className="rounded border border-gray-200 bg-white p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-200" />
                <div className="h-5 w-40 rounded-lg bg-gray-200" />
              </div>
              <div className="grid gap-7 xl:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="h-3 w-16 rounded bg-gray-200" />
                    <div className="h-11 rounded-xl bg-gray-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="h-3 w-20 rounded bg-gray-200" />
                      <div className="h-11 rounded-xl bg-gray-100" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-3 w-20 rounded bg-gray-200" />
                      <div className="h-11 rounded-xl bg-gray-100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <div className="h-3 w-16 rounded bg-gray-200" />
                      <div className="h-11 rounded-xl bg-gray-100" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="h-3 w-16 rounded bg-gray-200" />
                      <div className="h-11 rounded-xl bg-gray-100" />
                    </div>
                  </div>
                </div>
                <div className="h-[220px] rounded border-2 border-dashed border-gray-200 bg-gray-50" />
              </div>
            </div>

            {/* Section 2 */}
            <div className="rounded border border-gray-200 bg-white p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-200" />
                <div className="h-5 w-36 rounded-lg bg-gray-200" />
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 rounded border border-gray-100 bg-gray-50"
                  />
                ))}
              </div>
            </div>

            {/* Section 3 */}
            <div className="rounded border border-gray-200 bg-white p-7 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gray-200" />
                <div className="h-5 w-32 rounded-lg bg-gray-200" />
              </div>
              <div className="grid gap-7 xl:grid-cols-2">
                <div className="space-y-4">
                  <div className="h-12 rounded-xl bg-gray-100" />
                  <div className="h-24 rounded-xl bg-gray-100" />
                  <div className="h-11 rounded-xl bg-gray-100" />
                </div>
                <div className="h-[260px] rounded border-2 border-dashed border-gray-200 bg-gray-50" />
              </div>
            </div>
          </div>

          {/* Right preview skeleton */}
          <div className="hidden w-[420px] lg:block xl:w-[480px] sticky top-0 self-start">
            <div className="h-[600px] w-full rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
              <div className="h-16 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-28 rounded-xl bg-gray-100" />
                <div className="flex gap-2">
                  <div className="h-7 w-7 rounded-full bg-gray-200 shrink-0" />
                  <div className="h-16 flex-1 rounded-2xl bg-gray-100" />
                </div>
                <div className="flex justify-end gap-2">
                  <div className="h-10 w-40 rounded-2xl bg-gray-200" />
                  <div className="h-7 w-7 rounded-full bg-gray-200 shrink-0" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-14 border-t border-gray-100 bg-white" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Activating (webhook not synced yet right after checkout) ─────────────
  if (viewState === "activating") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Setting up your subscription…
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          This usually takes just a few seconds.
        </p>
      </div>
    );
  }

  // ── Paywall ────────────────────────────────────────────────────────────────
  if (viewState === "paywall") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
          <BsExclamationTriangle className="h-7 w-7 text-gray-500" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscription required
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            Widget settings are available on the Professional and Advanced plans.
            Start your 14-day free trial — your card won&apos;t be charged until the trial ends.
          </p>
        </div>
        <Link
          href="/pricing"
          className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
        >
          View plans
          <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    );
  }

  // ── Setup ──────────────────────────────────────────────────────────────────
  if (viewState === "setup") {
    return <WidgetSetup onSetupComplete={handleSetupComplete} />;
  }

  // Trial banner (shown above the editor when user is in the free trial)
  const daysLeft = trialDaysLeft(subscription?.trial_end ?? null);
  const trialBanner = subscription?.is_in_trial ? (
    <div className="mb-5 flex flex-col gap-1 rounded-xl border border-primary/20 bg-primary/10 px-5 py-3.5 dark:border-primary/40 dark:bg-primary/20 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-primary-dark dark:text-primary">
          Free trial — {daysLeft} day{daysLeft !== 1 ? "s" : ""} remaining
        </p>
        <p className="text-xs text-primary-dark/80 dark:text-primary">
          Your card will be charged automatically when the trial ends. Cancel anytime before then.
        </p>
      </div>
      <Link
        href="/pricing"
        className="mt-2 shrink-0 text-xs font-semibold text-primary-dark underline underline-offset-2 hover:text-primary dark:text-primary sm:mt-0"
      >
        Manage subscription
      </Link>
    </div>
  ) : null;

  // ── Editor ─────────────────────────────────────────────────────────────────
  return (
    <div>
      {trialBanner}
      <div className="z-20 mb-6 flex flex-col gap-4 rounded border border-gray-200 bg-white/90 p-5 shadow-sm backdrop-blur-md md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Widget Personalization
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Design how the AI assistant looks and behaves on your website.
          </p>
        </div>
        <div>
          {!editing ? (
            <button
              type="button"
              onClick={handleEdit}
              className="flex items-center gap-2 rounded-md bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-thunder-black/20 transition-all hover:bg-thunder-black/90 hover:shadow-thunder-black/30"
            >
              <BiPencil size={18} /> Edit Widget
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                <BiX size={18} /> Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="flex items-center gap-2 rounded-md bg-thunder-black px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-thunder-black/20 transition-all hover:bg-thunder-black/90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? (
                  <BiRefresh className="animate-spin" size={18} />
                ) : (
                  <BiSave size={18} />
                )}
                {saving ? "Saving..." : "Save Configuration"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-1 min-w-0">
          <WidgetSettingUpdate
            form={form}
            setForm={setForm}
            settings={settings}
            editing={editing}
          />
        </div>

        {/* Right Side: Live Chatbot Preview (Sticky) */}
        <div className="hidden w-[420px] lg:block xl:w-[480px] sticky top-0 self-start h-screen">
          <ChatbotPreview data={form} companyId={companyId} />
        </div>
      </div>
    </div>
  );
};

export default WidgetSettingView;
