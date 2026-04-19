"use client";

import {
  getWidgetSettingsAction,
  updateWidgetSettingsAction,
  type WidgetSettingsResponse,
} from "@/app/actions/widgetSettings";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiPencil, BiRefresh, BiSave, BiX } from "react-icons/bi";
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

type ViewState = "loading" | "setup" | "editor";

const WidgetSettingView = () => {
  const [viewState, setViewState] = useState<ViewState>("loading");
  const [companyId, setCompanyId] = useState<string>("");
  const [settings, setSettings] = useState<WidgetSettingsForm>(defaultSettings);
  const [form, setForm] = useState<WidgetSettingsForm>(defaultSettings);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const hasChanges = JSON.stringify(form) !== JSON.stringify(settings);

  // Fetch saved settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      const res = await getWidgetSettingsAction();
      if (res.ok && res.data) {
        const formData = toFormData(res.data);
        setSettings(formData);
        setForm(formData);
        setCompanyId(res.data.company_id);
        setViewState("editor");
      } else {
        setViewState("setup");
      }
    };
    fetchSettings();
  }, []);

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

  // ── Setup ──────────────────────────────────────────────────────────────────
  if (viewState === "setup") {
    return <WidgetSetup onSetupComplete={handleSetupComplete} />;
  }

  // ── Editor ─────────────────────────────────────────────────────────────────
  return (
    <div>
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
              className="flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/30"
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
                className="flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
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
