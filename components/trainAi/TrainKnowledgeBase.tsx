"use client";

import {
  fillMissingInfoAction,
  getKnowledgeStatusAction,
  getMissingInfoAction,
  trainKnowledgeBaseAction,
  type FillMissingItem,
  type MissingInfoItem,
  type TrainResult,
  type TrainStatus,
} from "@/app/actions/knowledgeBase";
import { getUserData } from "@/app/actions/user";
import {
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";

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
    COMPANY_TYPE_OPTIONS.find((option) => option.value === value)?.label ??
    value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())
  );
}

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 75
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : score >= 45
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700";

  const label = score >= 75 ? "Excellent" : score >= 45 ? "Good" : "Needs work";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}
    >
      {score.toFixed(1)} / 100 {label}
    </span>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function SectionLabel({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  );
}

function FieldShell({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
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
    <div className="rounded-md border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <SectionLabel
          title="Missing website details"
          description="We could not find these details on your website. Add them here so your AI can answer with better company context."
        />
        <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <FieldShell key={item.key} label={item.label}>
            <input
              type="text"
              value={values[item.key] ?? ""}
              onChange={(event) =>
                setOverrides((prev) => ({
                  ...prev,
                  [item.key]: event.target.value,
                }))
              }
              placeholder={`Enter ${item.label.toLowerCase()}`}
              disabled={isSaving}
              className="w-full rounded-2xl border border-amber-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 focus:ring-4 focus:ring-amber-100 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </FieldShell>
        ))}
      </div>

      {saveError ? (
        <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {saveError}
        </div>
      ) : null}

      {saveSuccess ? (
        <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {saveSuccess}
        </div>
      ) : null}

      <button
        type="button"
        onClick={handleConfirm}
        disabled={isSaving || !filledItems.length}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-amber-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSaving
          ? "Saving details..."
          : `Confirm and save ${filledItems.length}/${items.length}`}
      </button>
    </div>
  );
}

function ProfileSummary({
  form,
  profileLoaded,
}: {
  form: FormState;
  profileLoaded: boolean;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SectionLabel
          title="Company information"
          description={
            profileLoaded
              ? "Loaded from your account profile. You can adjust anything before training."
              : "Fill in your company details before starting training."
          }
        />
        <span className="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
          {profileLoaded ? "Profile synced" : "Manual entry"}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white bg-white px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Company
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">
            {form.companyName || "Not set"}
          </p>
        </div>
        <div className="rounded-2xl border border-white bg-white px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Website
          </p>
          <p className="mt-2 truncate text-sm font-medium text-slate-800">
            {form.websiteUrl || "Not set"}
          </p>
        </div>
        <div className="rounded-2xl border border-white bg-white px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
            Type
          </p>
          <p className="mt-2 text-sm font-medium text-slate-800">
            {formatCompanyType(form.companyType)}
          </p>
        </div>
      </div>
    </div>
  );
}

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
  const [isPending, startTransition] = useTransition();
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState(false);

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
  const trainingDisabled = isPending || !form.websiteUrl.trim();

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTrain = () => {
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
      setError(
        "Please enter a valid website URL, for example https://example.com.",
      );
      return;
    }

    startTransition(async () => {
      const res = await trainKnowledgeBaseAction(
        companyId,
        form.websiteUrl.trim(),
        form.companyName.trim(),
        form.companyType || "other",
      );

      if (!res.ok) {
        setError(res.error || "Training failed.");
        return;
      }

      setTrainResult(res.data ?? null);
      setMissingInfo(res.data?.missing_info ?? []);

      const statusRes = await getKnowledgeStatusAction(companyId);
      if (statusRes.ok && statusRes.data) {
        setStatus(statusRes.data);
      }
    });
  };

  if (isBootstrapping) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-5 w-40 rounded bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
          </div>
          <div className="h-40 rounded-3xl bg-slate-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-600">
              Train AI
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
              Build a cleaner knowledge base from your company website
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              We use your company profile and website to train the chatbot with
              business-specific information. Review the details below before you
              start.
            </p>
          </div>

          {isTrained ? (
            <div className="flex flex-wrap items-center gap-3">
              <ScoreBadge score={status?.quality_score ?? 0} />
              <button
                type="button"
                onClick={handleTrain}
                disabled={
                  isPending || (updatesLeft !== null && updatesLeft <= 0)
                }
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Retraining..." : "Retrain knowledge base"}
              </button>
            </div>
          ) : null}
        </div>

        {profileNotice ? (
          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            {profileNotice}
          </div>
        ) : null}
      </div>

      {!isTrained && !trainResult ? (
        <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <SectionLabel
              title="Training details"
              description="These values are prefilled from `getUserData` when available. Update them if needed before starting."
            />

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <FieldShell label="Company name">
                <input
                  type="text"
                  value={form.companyName}
                  onChange={(event) =>
                    handleFieldChange("companyName", event.target.value)
                  }
                  placeholder="Your company name"
                  disabled={isPending}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FieldShell>

              <FieldShell label="Company type">
                <select
                  value={form.companyType}
                  onChange={(event) =>
                    handleFieldChange("companyType", event.target.value)
                  }
                  disabled={isPending}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {COMPANY_TYPE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </FieldShell>
            </div>

            <div className="mt-4">
              <FieldShell label="Company website">
                <input
                  type="url"
                  value={form.websiteUrl}
                  onChange={(event) =>
                    handleFieldChange("websiteUrl", event.target.value)
                  }
                  placeholder="https://example.com"
                  disabled={isPending}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </FieldShell>
            </div>

            {error ? (
              <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={handleTrain}
                disabled={trainingDisabled}
                className="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isPending ? "Training knowledge base..." : "Start training"}
              </button>
              <p className="text-sm text-slate-500">
                Training usually takes 1 to 3 minutes depending on your website.
              </p>
            </div>
          </div>

          <div className="rounded-md border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-200">
              Before you start
            </p>
            <h3 className="mt-3 text-xl font-semibold">
              Strong profile data improves chatbot answers
            </h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Company name</p>
                <p className="mt-1 text-sm text-slate-300">
                  Helps the AI answer brand-specific questions more naturally.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Website URL</p>
                <p className="mt-1 text-sm text-slate-300">
                  This is the source we crawl to build the knowledge base.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white">Company type</p>
                <p className="mt-1 text-sm text-slate-300">
                  Gives the assistant better industry context during training.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {isTrained ? (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Facts stored"
              value={status?.entries_stored ?? 0}
              hint="Knowledge entries saved for the chatbot"
            />
            <StatCard
              label="Pages crawled"
              value={status?.pages_crawled ?? 0}
              hint="Website pages successfully processed"
            />
            <StatCard
              label="Runs left"
              value={`${updatesLeft ?? 0} / ${status?.update_limit ?? 10}`}
              hint="Available retraining runs in your plan"
            />
            <StatCard
              label="Last updated"
              value={
                status?.last_updated
                  ? new Date(status.last_updated).toLocaleDateString()
                  : "Not available"
              }
              hint="Most recent successful training"
            />
          </div>

          <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <SectionLabel
                title="Knowledge base status"
                description="Your AI is trained and ready. Use the progress data below to decide when to retrain."
              />
              <ScoreBadge score={status?.quality_score ?? 0} />
            </div>

            <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>Training usage</span>
                <span className="font-semibold text-slate-700">
                  {status?.update_count ?? 0} / {status?.update_limit ?? 10}
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-slate-900 transition-all"
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

              {status?.categories?.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {status.categories.map((category) => (
                    <span
                      key={category}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium capitalize text-slate-600"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            {updatesLeft !== null && updatesLeft <= 0 ? (
              <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                Training limit reached. Upgrade your plan to continue
                retraining.
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {trainResult ? (
        <div className="rounded-md border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm">
          <SectionLabel
            title="Training complete"
            description="Your latest training run finished successfully. Here is the result from the most recent crawl."
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Pages crawled"
              value={trainResult.pages_crawled}
              hint="Pages included in this run"
            />
            <StatCard
              label="Search results"
              value={trainResult.search_results}
              hint="Relevant website results found"
            />
            <StatCard
              label="Facts stored"
              value={trainResult.entries_stored}
              hint="Knowledge saved from this run"
            />
            <StatCard
              label="Quality score"
              value={trainResult.quality_score.toFixed(1)}
              hint="Estimated quality of the trained data"
            />
          </div>

          {trainResult.categories.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {trainResult.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1 text-xs font-semibold capitalize text-emerald-700"
                >
                  {category}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}

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
