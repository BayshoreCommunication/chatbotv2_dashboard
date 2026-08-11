"use client";

import {
  fillMissingInfoAction,
  getKnowledgeStatusAction,
  getMissingInfoAction,
  trainKnowledgeBaseAction,
  type FillMissingItem,
  type FoundItem,
  type MissingInfoItem,
  type TrainResult,
  type TrainStatus,
} from "@/app/actions/knowledgeBase";
import { getUserData } from "@/app/actions/user";
import { AnimatePresence, motion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  BiBuilding,
  BiCategory,
  BiCheckCircle,
  BiData,
  BiGlobe,
  BiLoaderAlt,
  BiRefresh,
  BiStar,
  BiTime,
} from "react-icons/bi";

// ── Live-progress polling (same pattern as the free-trial form) ────────────────

const KB_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

async function fetchLiveProgress(companyId: string) {
  try {
    const res = await fetch(
      `${KB_API_URL}/api/v1/knowledge/progress/${companyId}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as {
      percent: number;
      message: string | null;
      stage: string | null;
      found: FoundItem[];
    };
  } catch {
    return null;
  }
}

function estimateRemaining(elapsed: number, percent: number): string {
  if (percent < 10) return "estimating…";
  if (percent >= 100) return "almost done";
  const remaining = Math.max(
    0,
    Math.round((elapsed / percent) * 100 - elapsed),
  );
  if (remaining < 5) return "a few seconds left";
  if (remaining < 60) return `~${remaining}s left`;
  const m = Math.floor(remaining / 60);
  const s = remaining % 60;
  return `~${m}m ${s}s left`;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function buildFoundLine(item: FoundItem): string {
  return `✓ Found ${item.category}${item.label ? ` — ${item.label}` : ""}${
    item.source_url && item.source_url !== "web_search"
      ? ` on ${item.source_url}`
      : ""
  }`;
}

// ── Types ──────────────────────────────────────────────────────────────────────

type Props = {
  companyId: string;
  companyName?: string;
  companyType?: string;
  websiteUrl?: string;
};

type FormState = {
  companyName: string;
  companyType: string;
  websiteUrl: string;
};

const COMPANY_TYPE_OPTIONS = [
  { value: "tech-company", label: "Tech Company" },
  { value: "law-firm", label: "Law Firm" },
  { value: "healthcare-company", label: "Healthcare" },
  { value: "realestate-company", label: "Real Estate" },
  { value: "consultancy-company", label: "Consultancy" },
  { value: "agency-company", label: "Agency" },
  { value: "other", label: "Other" },
];

function formatCompanyType(value: string) {
  return (
    COMPANY_TYPE_OPTIONS.find((opt) => opt.value === value)?.label ??
    value.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 75
      ? "border-green-200 bg-green-50 text-green-700"
      : score >= 45
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-red-200 bg-red-50 text-red-700";
  const label = score >= 75 ? "Excellent" : score >= 45 ? "Good" : "Needs work";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}
    >
      <BiStar className="h-3 w-3" />
      {score.toFixed(1)} / 100 · {label}
    </span>
  );
}

function StatCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: string | number;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="roundedborder border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        {icon && <span className="text-gray-400">{icon}</span>}
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </p>
      </div>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
    </div>
  );
}

function FieldShell({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-gray-600">
        {label}
      </label>
      {icon ? (
        <div className="relative">
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}

function MissingInfoPanel({
  companyId,
  items,
  onResolved,
}: {
  companyId: string;
  items: MissingInfoItem[];
  onResolved: (remaining: MissingInfoItem[]) => void;
}) {
  const [overrides, setOverrides] = useState<Record<string, string>>({});
  const [isSaving, startSave] = useTransition();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const values = useMemo(
    () =>
      Object.fromEntries(
        items.map((item) => [item.key, overrides[item.key] ?? ""]),
      ),
    [items, overrides],
  );

  const filledItems = items.filter((item) => values[item.key]?.trim());

  const handleConfirm = () => {
    if (!filledItems.length) return;
    setSaveError(null);
    setSaveSuccess(null);

    const payload: FillMissingItem[] = filledItems.map((item) => ({
      key: item.key,
      label: item.label,
      content: values[item.key].trim(),
    }));

    startSave(async () => {
      const res = await fillMissingInfoAction(companyId, payload);
      if (!res.ok) {
        setSaveError(res.error || "Failed to save missing information.");
        return;
      }
      setSaveSuccess(res.data?.message || "Information saved successfully.");
      onResolved(res.data?.remaining_missing ?? []);
    });
  };

  if (!items.length) return null;

  return (
    <div className="roundedborder border-amber-200 bg-amber-50 p-6">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-amber-900">
            Missing website details
          </h3>
          <p className="mt-0.5 text-xs text-amber-700">
            We could not find these on your website. Add them so your AI answers
            with better company context.
          </p>
        </div>
        <span className="inline-flex w-fit rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold text-amber-700">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.key} className="space-y-1.5">
            <label className="block text-xs font-semibold text-amber-800">
              {item.label}
            </label>
            <input
              type="text"
              value={values[item.key] ?? ""}
              onChange={(e) =>
                setOverrides((prev) => ({
                  ...prev,
                  [item.key]: e.target.value,
                }))
              }
              placeholder={`Enter ${item.label.toLowerCase()}`}
              disabled={isSaving}
              className="w-full rounded-xl border border-amber-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>
        ))}
      </div>

      {saveError ? (
        <div className="mt-4 rounded-xl border border-red-100 bg-white px-4 py-3 text-sm text-red-600">
          {saveError}
        </div>
      ) : null}

      {saveSuccess ? (
        <div className="mt-4 rounded-xl border border-green-100 bg-white px-4 py-3 text-sm text-green-600">
          {saveSuccess}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleConfirm}
        disabled={isSaving || !filledItems.length}
        className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving
          ? "Saving details..."
          : `Confirm and save ${filledItems.length}/${items.length}`}
      </button>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function TrainKnowledgeBase({
  companyId,
  companyName = "",
  companyType = "other",
  websiteUrl = "",
}: Props) {
  const [form, setForm] = useState<FormState>({
    companyName,
    companyType: companyType || "other",
    websiteUrl,
  });
  const [error, setError] = useState<string | null>(null);
  const [profileNotice, setProfileNotice] = useState<string | null>(null);
  const [trainResult, setTrainResult] = useState<TrainResult | null>(null);
  const [status, setStatus] = useState<TrainStatus | null>(null);
  const [missingInfo, setMissingInfo] = useState<MissingInfoItem[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);

  // Live training progress
  const [trainPercent, setTrainPercent] = useState(0);
  const [trainElapsed, setTrainElapsed] = useState(0);
  const [hasLiveData, setHasLiveData] = useState(false);
  const [trainMessage, setTrainMessage] = useState<string | null>(null);
  const [trainFound, setTrainFound] = useState<FoundItem[]>([]);
  const [typedCount, setTypedCount] = useState(0);
  const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const elapsedIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );
  const elapsedRef = useRef(0);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (!companyId) {
        if (active) setIsBootstrapping(false);
        return;
      }

      setIsBootstrapping(true);

      const [userRes, statusRes, missingRes] = await Promise.all([
        getUserData(),
        getKnowledgeStatusAction(companyId),
        getMissingInfoAction(companyId),
      ]);

      if (!active) return;

      if (userRes.ok && userRes.data) {
        setProfileNotice(null);
        setForm((prev) => ({
          companyName:
            userRes.data?.companyName?.trim() ||
            prev.companyName ||
            companyName,
          websiteUrl:
            userRes.data?.website?.trim() || prev.websiteUrl || websiteUrl,
          companyType:
            userRes.data?.companyType?.trim() ||
            prev.companyType ||
            companyType ||
            "other",
        }));
        setProfileLoaded(true);
      } else if (!userRes.ok && !companyName && !websiteUrl) {
        setProfileNotice(
          userRes.error || "Could not load company data from your profile.",
        );
      }

      if (statusRes.ok && statusRes.data) {
        setStatus(statusRes.data);
        if (statusRes.data.company_name?.trim()) {
          setForm((prev) => ({
            ...prev,
            companyName:
              prev.companyName || statusRes.data?.company_name || companyName,
          }));
        }
      }

      if (missingRes.ok && missingRes.data) {
        setMissingInfo(missingRes.data.missing_info);
      }

      setIsBootstrapping(false);
    };

    loadData();
    return () => {
      active = false;
    };
  }, [companyId, companyName, companyType, websiteUrl]);

  const updatesLeft = status
    ? (status.update_limit ?? 10) - (status.update_count ?? 0)
    : null;
  const isTrained = status?.is_trained ?? false;
  const trainingDisabled = isTraining || !form.websiteUrl.trim();

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const stopPolling = () => {
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    if (elapsedIntervalRef.current) clearInterval(elapsedIntervalRef.current);
    progressIntervalRef.current = null;
    elapsedIntervalRef.current = null;
  };

  // Reveal found items one at a time (same pattern as free-trial right panel)
  const foundLength = trainFound.length;
  useEffect(() => {
    if (foundLength === 0) setTypedCount(0);
  }, [foundLength]);
  useEffect(() => {
    if (typedCount >= foundLength) return;
    const t = setTimeout(() => setTypedCount((c) => c + 1), 220);
    return () => clearTimeout(t);
  }, [typedCount, foundLength]);

  const handleTrain = async () => {
    setError(null);
    setTrainResult(null);

    if (!form.companyName.trim()) {
      setError("Company name is required.");
      return;
    }
    if (!form.websiteUrl.trim()) {
      setError("Website URL is required.");
      return;
    }
    try {
      new URL(form.websiteUrl.trim());
    } catch {
      setError("Please enter a valid website URL, e.g. https://example.com.");
      return;
    }

    // Reset live progress counters
    setTrainPercent(0);
    setTrainElapsed(0);
    setHasLiveData(false);
    setTrainMessage(null);
    setTrainFound([]);
    setTypedCount(0);
    elapsedRef.current = 0;
    stopPolling();
    setIsTraining(true);

    // Poll progress endpoint every 1.5 s while training POST is in-flight
    progressIntervalRef.current = setInterval(async () => {
      const data = await fetchLiveProgress(companyId);
      if (!data) return;
      setHasLiveData(true);
      setTrainPercent(data.percent);
      setTrainMessage(data.message);
      setTrainFound(data.found ?? []);
    }, 1500);

    elapsedIntervalRef.current = setInterval(() => {
      elapsedRef.current += 1;
      setTrainElapsed(elapsedRef.current);
    }, 1000);

    const res = await trainKnowledgeBaseAction(
      companyId,
      form.websiteUrl.trim(),
      form.companyName.trim(),
      form.companyType || "other",
    );

    stopPolling();

    if (!res.ok) {
      setError(res.error || "Training failed.");
      setIsTraining(false);
      return;
    }

    // Commit success immediately — UI transitions to result view right away.
    setTrainPercent(100);
    setTrainResult(res.data ?? null);
    setMissingInfo(res.data?.missing_info ?? []);
    setIsTraining(false);

    // Refresh status in the background (updates stat cards / quality score).
    getKnowledgeStatusAction(companyId).then((statusRes) => {
      if (statusRes.ok && statusRes.data) setStatus(statusRes.data);
    });
  };

  // ── Bootstrapping skeleton ──────────────────────────────────────────────────

  if (isBootstrapping) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse roundedborder border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-4 w-16 rounded-full bg-gray-100" />
          <div className="mt-3 h-6 w-64 rounded-lg bg-gray-100" />
          <div className="mt-2 h-4 w-80 rounded bg-gray-100" />
        </div>
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="animate-pulse roundedborder border-gray-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="h-12 rounded-xl bg-gray-100" />
              <div className="h-12 rounded-xl bg-gray-100" />
            </div>
            <div className="mt-4 h-12 rounded-xl bg-gray-100" />
            <div className="mt-6 h-12 w-36 rounded-xl bg-gray-100" />
          </div>
          <div className="animate-pulse roundedbg-gray-900/5 p-6">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-100" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Main render ─────────────────────────────────────────────────────────────

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="space-y-6">
      {/* ── Page header ──────────────────────────────────────────────────────── */}
      <div className="roundedborder border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
              Train AI
            </span>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900">
              Build your AI knowledge base
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">
              Train your chatbot from your company website so it can answer
              customer questions automatically.
            </p>
          </div>

          {isTrained && (
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <ScoreBadge score={status?.quality_score ?? 0} />
              <button
                type="button"
                onClick={handleTrain}
                disabled={
                  isTraining || (updatesLeft !== null && updatesLeft <= 0)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <BiRefresh className="h-4 w-4" />
                {isTraining ? "Retraining…" : "Retrain"}
              </button>
            </div>
          )}
        </div>

        {profileNotice ? (
          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {profileNotice}
          </div>
        ) : null}
      </div>

      {/* ── Training form / in-progress ─────────────────────────────────────── */}
      {!isTrained &&
        !trainResult &&
        (isTraining ? (
          /* ── Training in progress ── */
          <div className="grid gap-6 lg:grid-cols-[1fr_0.75fr]">
            {/* Left — data rows + progress card (mirrors free-trial layout) */}
            <div className="space-y-4">
              {/* Section label */}
              <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Loaded from your details
              </p>

              {/* Data rows */}
              <div className="divide-y divide-gray-100 roundedborder border-gray-200 bg-white">
                {[
                  { label: "Company name", value: form.companyName },
                  {
                    label: "Company type",
                    value: formatCompanyType(form.companyType),
                  },
                  { label: "Website URL", value: form.websiteUrl },
                ]
                  .filter((r) => r.value)
                  .map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 px-4 py-3.5"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <BiCheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400">{row.label}</p>
                          <p className="truncate text-sm font-medium text-gray-900">
                            {row.value}
                          </p>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs font-medium text-gray-400">
                        Loaded
                      </span>
                    </div>
                  ))}
              </div>

              {/* Progress card */}
              <div className="roundedborder border-gray-200 bg-white p-6">
                {!hasLiveData ? (
                  <div className="animate-pulse space-y-3">
                    <div className="mx-auto h-4 w-40 rounded bg-gray-100" />
                    <div className="h-1.5 w-full rounded-full bg-gray-100" />
                    <div className="flex justify-between">
                      <div className="h-3 w-16 rounded bg-gray-100" />
                      <div className="h-3 w-20 rounded bg-gray-100" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gray-900">
                      <BiLoaderAlt className="h-4 w-4 animate-spin text-gray-400" />
                      Training… {trainPercent}%
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-gray-900 transition-all duration-500 ease-out"
                        style={{ width: `${trainPercent}%` }}
                      />
                    </div>
                    <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400">
                      <span>{formatTime(trainElapsed)} elapsed</span>
                      <span>
                        {estimateRemaining(trainElapsed, trainPercent)}
                      </span>
                    </div>
                    {trainMessage && (
                      <p className="mt-3 text-center text-xs leading-relaxed text-gray-400">
                        {trainMessage}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Right — live findings feed (mirrors free-trial right panel, no phone) */}
            <div className="flex flex-col roundedborder border-gray-200 bg-white shadow-sm">
              {/* Card header */}
              <div className="flex items-center gap-2 border-b border-gray-100 px-5 py-4">
                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  Scanning your website
                </p>
              </div>

              {/* Feed area */}
              <div
                className="flex-1 overflow-y-auto px-5 py-4"
                style={{ minHeight: "280px", maxHeight: "360px" }}
              >
                {trainFound.length === 0 ? (
                  /* Shimmer stays until the first real finding lands */
                  <div className="flex flex-col gap-2.5 pt-1">
                    {[
                      "w-5/6",
                      "w-full",
                      "w-2/3",
                      "w-full",
                      "w-3/4",
                      "w-1/2",
                    ].map((w, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                        className={`relative h-2.5 overflow-hidden rounded bg-gray-100 ${w}`}
                      >
                        <motion.div
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/80 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 0.12,
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  /* Findings revealed one at a time */
                  <AnimatePresence initial={false}>
                    {trainFound.slice(0, typedCount).map((item, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="mb-2 whitespace-pre-wrap wrap-break-word text-xs leading-relaxed text-gray-600"
                      >
                        {buildFoundLine(item)}
                      </motion.p>
                    ))}
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Training form */
          <div className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="roundedborder border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Training details
                    </h3>
                    <p className="mt-0.5 text-xs text-gray-500">
                      Review and update your details before starting.
                    </p>
                  </div>
                  {profileLoaded && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-green-100 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      <BiCheckCircle className="h-3 w-3" />
                      Profile synced
                    </span>
                  )}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FieldShell
                    label="Company name"
                    icon={<BiBuilding size={15} />}
                  >
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) =>
                        handleFieldChange("companyName", e.target.value)
                      }
                      placeholder="Your company name"
                      disabled={isTraining}
                      className={inputClass}
                    />
                  </FieldShell>

                  <FieldShell
                    label="Company type"
                    icon={<BiCategory size={15} />}
                  >
                    <select
                      value={form.companyType}
                      onChange={(e) =>
                        handleFieldChange("companyType", e.target.value)
                      }
                      disabled={isTraining}
                      className={`${inputClass} appearance-none`}
                    >
                      {COMPANY_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </FieldShell>
                </div>

                <div className="mt-4">
                  <FieldShell
                    label="Company website"
                    icon={<BiGlobe size={15} />}
                  >
                    <input
                      type="url"
                      value={form.websiteUrl}
                      onChange={(e) =>
                        handleFieldChange("websiteUrl", e.target.value)
                      }
                      placeholder="https://example.com"
                      disabled={isTraining}
                      className={inputClass}
                    />
                  </FieldShell>
                </div>

                {error ? (
                  <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                ) : null}

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={handleTrain}
                    disabled={trainingDisabled}
                    className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Start training
                  </button>
                  <p className="text-xs text-gray-500">
                    Usually takes 1–3 minutes depending on your website size.
                  </p>
                </div>
              </div>

              {/* Tips card */}
              <div className="roundedbg-linear-to-br from-gray-900 via-gray-800 to-thunder-black p-6 text-white shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Before you start
                </p>
                <h3 className="mt-3 text-base font-semibold leading-snug">
                  Strong profile data improves chatbot answers
                </h3>
                <div className="mt-5 space-y-3">
                  {[
                    {
                      title: "Company name",
                      desc: "Helps the AI answer brand-specific questions naturally.",
                    },
                    {
                      title: "Website URL",
                      desc: "The source we crawl to build the knowledge base.",
                    },
                    {
                      title: "Company type",
                      desc: "Gives the AI better industry context during training.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <p className="text-sm font-medium text-white">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-gray-300">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* How training works */}
            <div className="roundedborder border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-sm font-semibold text-gray-900">
                How training works
              </h3>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    icon: <BiGlobe className="h-5 w-5 text-primary-dark" />,
                    iconBg: "bg-primary/10",
                    title: "1. We crawl your site",
                    desc: "Your website is scanned for company details, services, and FAQs.",
                  },
                  {
                    icon: <BiData className="h-5 w-5 text-green-600" />,
                    iconBg: "bg-green-100",
                    title: "2. AI extracts key facts",
                    desc: "Relevant information is turned into structured knowledge entries.",
                  },
                  {
                    icon: <BiCheckCircle className="h-5 w-5 text-purple-600" />,
                    iconBg: "bg-purple-100",
                    title: "3. Your chatbot gets smarter",
                    desc: "The AI uses this knowledge to answer customer questions automatically.",
                  },
                ].map((step) => (
                  <div key={step.title} className="text-center">
                    <div
                      className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full ${step.iconBg}`}
                    >
                      {step.icon}
                    </div>
                    <h4 className="mb-1 text-sm font-medium text-gray-900">
                      {step.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-gray-500">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

      {/* ── Trained — stat cards + status card ────────────────────────────────── */}
      {isTrained && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Facts stored"
              value={status?.entries_stored ?? 0}
              hint="Knowledge entries for the chatbot"
              icon={<BiData size={16} />}
            />
            <StatCard
              label="Pages crawled"
              value={status?.pages_crawled ?? 0}
              hint="Website pages processed"
              icon={<BiGlobe size={16} />}
            />
            <StatCard
              label="Runs left"
              value={`${updatesLeft ?? 0} / ${status?.update_limit ?? 10}`}
              hint="Remaining retraining runs in your plan"
              icon={<BiRefresh size={16} />}
            />
            <StatCard
              label="Last updated"
              value={
                status?.last_updated
                  ? new Date(status.last_updated).toLocaleDateString()
                  : "Not available"
              }
              hint="Most recent successful training"
              icon={<BiTime size={16} />}
            />
          </div>

          <div className="roundedborder border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Knowledge base status
                </h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  Your AI is trained and ready. Use the usage data below to
                  decide when to retrain.
                </p>
              </div>
              <ScoreBadge score={status?.quality_score ?? 0} />
            </div>

            <div className="mt-5 rounded-xl bg-gray-50 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Training usage</span>
                <span className="font-semibold text-gray-700">
                  {status?.update_count ?? 0} / {status?.update_limit ?? 10}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-gray-900 transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      ((status?.update_count ?? 0) /
                        (status?.update_limit ?? 10)) *
                        100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            {status?.categories?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {status.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium capitalize text-gray-600"
                  >
                    {category}
                  </span>
                ))}
              </div>
            ) : null}

            {updatesLeft !== null && updatesLeft <= 0 ? (
              <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                Training limit reached. Upgrade your plan to continue
                retraining.
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* ── Train result success card ─────────────────────────────────────────── */}
      {trainResult ? (
        <div className="roundedborder border-green-200 bg-green-50 p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
              <BiCheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-green-900">
                Training complete
              </h3>
              <p className="text-xs text-green-700">
                Latest run finished successfully.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Pages crawled"
              value={trainResult.pages_crawled}
              hint="Pages included in this run"
            />
            <StatCard
              label="Search results"
              value={trainResult.search_results}
              hint="Relevant results found"
            />
            <StatCard
              label="Facts stored"
              value={trainResult.entries_stored}
              hint="Knowledge saved from this run"
            />
            <StatCard
              label="Quality score"
              value={trainResult.quality_score.toFixed(1)}
              hint="Estimated quality of trained data"
            />
          </div>

          {trainResult.categories.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {trainResult.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-green-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-green-700"
                >
                  {category}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ── Missing info panel ────────────────────────────────────────────────── */}
      {missingInfo.length > 0 ? (
        <MissingInfoPanel
          companyId={companyId}
          items={missingInfo}
          onResolved={(remaining) => setMissingInfo(remaining)}
        />
      ) : null}
    </div>
  );
}
