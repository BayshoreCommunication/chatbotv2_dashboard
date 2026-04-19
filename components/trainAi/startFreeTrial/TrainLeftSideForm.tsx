"use client";

import {
  getKnowledgeStatusAction,
  trainKnowledgeBaseAction,
  type TrainResult,
  type TrainStatus,
} from "@/app/actions/knowledgeBase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiBuilding,
  BiCheckCircle,
  BiGlobe,
  BiLoaderAlt,
} from "react-icons/bi";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// --- Helpers ---
function qualityLabel(score: number): string {
  if (score >= 75) return "excellent";
  if (score >= 45) return "good";
  return "needs improvement";
}

function statusToKB(status: TrainStatus, name: string) {
  return {
    companyName: status.company_name || name,
    totalSources: status.entries_stored,
    quality: qualityLabel(status.quality_score),
    qualityPercentage: Math.round(status.quality_score),
    updatedAt: status.last_updated,
  };
}

function resultToTraining(result: TrainResult) {
  return {
    totalSources: result.entries_stored,
    quality: qualityLabel(result.quality_score),
    qualityPercentage: Math.round(result.quality_score),
  };
}

// --- Interfaces ---
interface Session {
  user?: {
    id?: string;
    email?: string | null;
    name?: string | null;
    accessToken?: string;
  };
}

interface TrainingData {
  totalSources?: number;
  quality?: string;
  qualityPercentage?: number;
  companyName?: string;
  alreadyTrained?: boolean;
}

interface TrainLeftSideFormProps {
  session: Session | null;
  companyName: string;
  setCompanyName: (name: string) => void;
  onTrainingComplete?: (data: TrainingData) => void;
  onCompanyIdFound?: (id: string) => void;
}

const TrainLeftSideForm = ({
  session,
  companyName,
  setCompanyName,
  onTrainingComplete,
  onCompanyIdFound,
}: TrainLeftSideFormProps) => {
  const router = useRouter();
  const FORM_DRAFT_KEY = "free_trial_draft";

  const [website, setWebsite] = useState(() => {
    if (typeof window === "undefined") return "";
    try {
      return (
        JSON.parse(localStorage.getItem(FORM_DRAFT_KEY) || "{}").website || ""
      );
    } catch {
      return "";
    }
  });
  const [companyType, setCompanyType] = useState(() => {
    if (typeof window === "undefined") return "other";
    try {
      return (
        JSON.parse(localStorage.getItem(FORM_DRAFT_KEY) || "{}").companyType ||
        "other"
      );
    } catch {
      return "other";
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<
    | "form"
    | "checking"
    | "training"
    | "training-form"
    | "already-trained"
    | "success"
  >(session?.user ? "form" : "training-form");
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [existingKB, setExistingKB] = useState<any>(null);
  const [trainingResult, setTrainingResult] = useState<{
    totalSources?: number;
    quality?: string;
    qualityPercentage?: number;
  } | null>(null);

  const isUserLoggedIn = !!session?.user;
  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  // Restore companyName from draft on first render
  useEffect(() => {
    if (companyName) return;
    try {
      const draft = JSON.parse(localStorage.getItem(FORM_DRAFT_KEY) || "{}");
      if (draft.companyName) setCompanyName(draft.companyName);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save draft whenever fields change
  useEffect(() => {
    if (!website && !companyName && companyType === "other") return;
    try {
      localStorage.setItem(
        FORM_DRAFT_KEY,
        JSON.stringify({ companyName, website, companyType }),
      );
    } catch {}
  }, [companyName, website, companyType]);

  const resolveCompanyId = (): string => {
    if (session?.user?.id) return session.user.id;
    return "";
  };

  const PENDING_KEY = "free_trial_pending";

  /**
   * On mount: restore pending training data (post-login redirect) OR auto-check KB
   */
  useEffect(() => {
    const init = async () => {
      const cid = session?.user?.id;

      // Restore saved form data after sign-in/sign-up redirect
      if (isUserLoggedIn && cid) {
        const raw = sessionStorage.getItem(PENDING_KEY);
        if (raw) {
          try {
            const pending = JSON.parse(raw) as {
              companyName: string;
              website: string;
              companyType: string;
            };
            sessionStorage.removeItem(PENDING_KEY);
            setCompanyName(pending.companyName);
            setWebsite(pending.website);
            setCompanyType(pending.companyType);
            onCompanyIdFound?.(cid);
            await startTraining(
              cid,
              pending.website,
              pending.companyName,
              pending.companyType,
            );
            return;
          } catch {
            sessionStorage.removeItem(PENDING_KEY);
          }
        }
      }

      // Normal auto-check for logged-in users
      if (!isUserLoggedIn || step !== "form") return;
      if (!cid) return;

      setIsLoading(true);
      setStep("checking");
      try {
        const res = await getKnowledgeStatusAction(cid);
        if (res.ok && res.data?.is_trained) {
          const kb = statusToKB(res.data, companyName);
          setExistingKB(kb);
          setStep("already-trained");
          onTrainingComplete?.({ ...kb, alreadyTrained: true });
          onCompanyIdFound?.(cid);
        } else {
          setStep("training-form");
        }
      } catch {
        setStep("training-form");
      } finally {
        setIsLoading(false);
      }
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Handle start - for logged in users
   */
  const handleStartLoggedInUser = async () => {
    setIsLoading(true);
    setStep("checking");
    addLog("🔐 Authenticated user detected");

    const cid = session?.user?.id;
    if (!cid) {
      setError("Please log in again");
      setIsLoading(false);
      return;
    }

    try {
      addLog("🔍 Checking existing knowledge base...");
      const res = await getKnowledgeStatusAction(cid);

      if (res.ok && res.data?.is_trained) {
        const kb = statusToKB(res.data, companyName);
        setExistingKB(kb);
        setStep("already-trained");
        addLog(`✅ Found existing knowledge base: ${kb.companyName}`);
        addLog(`📊 Quality: ${kb.quality} (${kb.qualityPercentage}%)`);
        addLog(`📚 Sources: ${kb.totalSources} entries`);
        onTrainingComplete?.({ ...kb, alreadyTrained: true });
        onCompanyIdFound?.(cid);
      } else {
        addLog("📝 No existing knowledge base found");
        addLog("✨ Please provide your company details to start training");
        setStep("training-form");
      }
    } catch (error: unknown) {
      addLog(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setError("Failed to check knowledge base");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle training form submission — redirect to sign-in if not authenticated
   */
  const handleLoggedInTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !website) {
      setError("Please fill all required fields");
      return;
    }

    setError(null);

    if (!isUserLoggedIn) {
      sessionStorage.setItem(
        PENDING_KEY,
        JSON.stringify({ companyName, website, companyType }),
      );
      router.push(
        `/sign-in?callbackUrl=${encodeURIComponent("/start-free-trial")}`,
      );
      return;
    }

    const cid = resolveCompanyId();
    if (!cid) {
      setError("Please log in again");
      return;
    }

    await startTraining(cid);
  };

  /**
   * Start knowledge base training
   */
  const startTraining = async (
    cid: string,
    siteUrl = website,
    name = companyName,
    type = companyType,
  ) => {
    setStep("training");
    setIsLoading(true);
    addLog("🚀 Starting knowledge base training...");
    addLog(`🏢 Company: ${name}`);
    addLog(`🌐 Website: ${siteUrl}`);

    try {
      const res = await trainKnowledgeBaseAction(cid, siteUrl, name, type);

      if (!res.ok) {
        addLog(`❌ Training failed: ${res.error}`);
        setError(res.error || "Training failed");
        setIsLoading(false);
        return;
      }

      const result = resultToTraining(res.data!);
      addLog("✅ Knowledge base created successfully!");
      addLog(`📚 Total entries: ${result.totalSources}`);
      addLog(`📊 Quality: ${result.quality} (${result.qualityPercentage}%)`);

      setTrainingResult(result);
      setStep("success");
      try {
        localStorage.removeItem(FORM_DRAFT_KEY);
      } catch {}
      onTrainingComplete?.({ ...result, companyName, alreadyTrained: false });
      onCompanyIdFound?.(cid);
      setIsLoading(false);
    } catch (error: unknown) {
      addLog(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setError("Training failed");
      setIsLoading(false);
    }
  };

  /**
   * Handle retrain for already trained users
   */
  const handleRetrain = async () => {
    const cid = resolveCompanyId();
    if (!cid) {
      setError("Authentication required");
      return;
    }
    setLogs([]);
    await startTraining(cid);
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="w-full"
    >
      {/* Hide title when showing already-trained or success steps */}
      {step !== "already-trained" && step !== "success" && (
        <motion.div
          variants={fadeInUp}
          className="mb-8 text-center lg:text-left"
        >
          <h2 className="mb-3 text-4xl font-bold leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
              Train Your AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Knowledge Base
            </span>
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-300">
            {isUserLoggedIn
              ? "Check your existing knowledge base or train new data"
              : "Start by providing your company details"}
          </p>
        </motion.div>
      )}

      {/* Form Step */}
      {step === "form" && (
        <motion.div variants={fadeInUp}>
          <div className="space-y-5">
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-800 dark:bg-blue-900/20">
              <BiBuilding className="mx-auto mb-3 h-12 w-12 text-blue-600 dark:text-blue-400" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Check Knowledge Base
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check if you have existing training data or start fresh
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleStartLoggedInUser}
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Checking..." : "Check Knowledge Base"}
            </button>
          </div>
        </motion.div>
      )}

      {/* Training Form Step - For logged-in users to input company details */}
      {step === "training-form" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Please provide your company details to start training your AI
              chatbot
            </p>
          </div>

          <form onSubmit={handleLoggedInTrainingSubmit} className="space-y-5">
            {/* Company Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company Name *
              </label>
              <div className="relative">
                <BiBuilding className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g., Acme Corporation"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Website URL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company Website *
              </label>
              <div className="relative">
                <BiGlobe className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-12 pr-4 text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
                  required
                />
              </div>
            </div>

            {/* Company Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Company Type *
              </label>
              <select
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-white py-3.5 pl-4 pr-4 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                required
              >
                <option value="saas">Law Firms</option>
                <option value="real_estate">Real Estate</option>
                <option value="healthcare">Clinics</option>
                <option value="agency">Agency</option>
                <option value="consultancy">Consultancy</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
            >
              {isLoading ? "Starting Training..." : "Start Training"}
            </button>
          </form>

          {/* Logs */}
          {logs.length > 0 && (
            <div className="mt-5 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-left text-sm dark:border-gray-700 dark:bg-gray-800">
              {logs.map((log, i) => (
                <div key={i} className="mb-1 text-gray-700 dark:text-gray-300">
                  {log}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Checking/Training Step */}
      {(step === "checking" || step === "training") && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <BiLoaderAlt className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
            {step === "checking" ? "Checking..." : "Training AI..."}
          </h3>

          <div className="mt-5 max-h-64 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-left text-sm dark:border-gray-700 dark:bg-gray-800">
            {logs.map((log, i) => (
              <div key={i} className="mb-1 text-gray-700 dark:text-gray-300">
                {log}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Already Trained Step */}
      {step === "already-trained" && existingKB && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg">
              <BiCheckCircle className="h-12 w-12 text-white" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Already Trained!
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Your AI is ready with{" "}
              <strong className="text-gray-900 dark:text-white">
                {existingKB.companyName}
              </strong>{" "}
              knowledge base
            </p>
          </div>

          {/* Training Summary Card */}
          <div className="rounded-xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Knowledge Base Summary
            </h4>

            <div className="space-y-4">
              {/* Sources */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Total Sources:
                </span>
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {existingKB.totalSources}
                </span>
              </div>

              {/* Quality Score - Prominent Display */}
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    Quality Score:
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {existingKB.qualityPercentage}%
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                      {existingKB.quality}
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-200 dark:bg-blue-900/40">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                    style={{ width: `${existingKB.qualityPercentage}%` }}
                  />
                </div>
              </div>

              {/* Last Trained Date */}
              {existingKB.updatedAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Last Trained:
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {new Date(existingKB.updatedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
              <span className="text-sm font-semibold text-green-900 dark:text-green-200">
                Your AI is Active!
              </span>
            </div>
            <p className="text-sm text-green-800 dark:text-green-300">
              You can start chatting with your AI assistant on the right side or
              retrain to add more knowledge.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-xl border-2 border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Dashboard
              </button>
              <button
                onClick={handleRetrain}
                className="rounded-xl border-2 border-blue-600 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100 dark:border-blue-400 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/40"
              >
                Retrain
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Success Step */}
      {step === "success" && trainingResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg">
              <BiCheckCircle className="h-12 w-12 text-white" />
            </div>
            <h3 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Training Complete!
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Your chatbot is now powered by{" "}
              <strong className="text-gray-900 dark:text-white">
                {trainingResult.totalSources}
              </strong>{" "}
              {trainingResult.totalSources === 1 ? "source" : "sources"}.
            </p>
          </div>

          {/* Quality Score Card */}
          <div className="rounded-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-6 dark:border-green-800 dark:from-green-900/20 dark:to-emerald-900/20">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Quality Score:
              </span>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {trainingResult.qualityPercentage}%
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-green-600 dark:text-green-400">
                  {trainingResult.quality}
                </div>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-green-200 dark:bg-green-900/40">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trainingResult.qualityPercentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-800 dark:bg-blue-900/20">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
              <span className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                Your AI is Ready!
              </span>
            </div>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              You can now start chatting with your AI assistant on the right
              side. Try asking questions about {companyName}!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {/* <button
              onClick={() => {
                // Try to focus chat input if available
                const chatInput = document.querySelector(
                  'input[placeholder*="message"], textarea[placeholder*="message"]'
                ) as HTMLInputElement | HTMLTextAreaElement;
                if (chatInput) {
                  chatInput.focus();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-indigo-700"
            >
              Start Chatting →
            </button> */}
            <button
              onClick={() => router.push("/dashboard")}
              className="w-full rounded-xl border-2 border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TrainLeftSideForm;
