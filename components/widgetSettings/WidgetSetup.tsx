"use client";

import { useState } from "react";
import { BiBot, BiCheck, BiCodeAlt, BiMessageRoundedDots, BiPalette, BiRefresh, BiRocket } from "react-icons/bi";
import { updateWidgetSettingsAction } from "@/app/actions/widgetSettings";
import { defaultSettings } from "./WidgetSettingUpdate";

interface WidgetSetupProps {
  onSetupComplete: () => void;
}

const STEPS = [
  {
    icon: <BiPalette size={22} />,
    title: "Appearance",
    desc: "Custom colors, fonts & brand logo",
  },
  {
    icon: <BiMessageRoundedDots size={22} />,
    title: "Content",
    desc: "Welcome message & video highlight",
  },
  {
    icon: <BiCodeAlt size={22} />,
    title: "Embed",
    desc: "One script tag on any website",
  },
];

const DEFAULTS = [
  "Bot name: BayAI Assistant",
  "Theme color: #807045",
  "Launcher: Bottom right",
  "Welcome message enabled",
  "Auto-open: Disabled",
];

const WidgetSetup = ({ onSetupComplete }: WidgetSetupProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSetup = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await updateWidgetSettingsAction(defaultSettings);
      if (res.ok) {
        onSetupComplete();
      } else {
        setError(res.error || "Setup failed. Please try again.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl">

        {/* Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30">
            <BiBot size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Set Up Your Chat Widget
          </h1>
          <p className="mt-3 max-w-md text-sm text-gray-500 leading-relaxed">
            Get your AI assistant live in seconds. We&apos;ll apply smart defaults — fully customizable after setup.
          </p>
        </div>

        {/* Steps row */}
        <div className="mb-8 grid grid-cols-3 gap-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex flex-col items-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {step.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{step.title}</p>
                <p className="mt-0.5 text-xs text-gray-400">{step.desc}</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
                Step {i + 1}
              </span>
            </div>
          ))}
        </div>

        {/* Defaults card */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
            Default configuration
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 sm:grid-cols-3">
            {DEFAULTS.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <BiCheck size={12} />
                </div>
                <span className="text-xs text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* CTA */}
        <button
          type="button"
          onClick={handleSetup}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-blue-600 py-4 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <BiRefresh className="animate-spin" size={18} />
              Setting up your widget...
            </>
          ) : (
            <>
              <BiRocket size={18} />
              Set Up Widget Now
            </>
          )}
        </button>

        <p className="mt-3 text-center text-xs text-gray-400">
          You can edit or reset these settings at any time.
        </p>
      </div>
    </div>
  );
};

export default WidgetSetup;
