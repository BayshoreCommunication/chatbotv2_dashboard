"use client";

import {
  otpSigninAction,
  requestLoginOtpAction,
  signinAction,
  signupAction,
  verifyOTPAction,
} from "@/app/actions/auth";
import {
  getKnowledgeStatusAction,
  trainKnowledgeBaseAction,
  type FoundItem,
  type MissingInfoItem,
  type TrainProgress,
  type TrainResult,
  type TrainStatus,
} from "@/app/actions/knowledgeBase";
import { getUserData } from "@/app/actions/user";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BiBuilding,
  BiCategory,
  BiCheckCircle,
  BiEnvelope,
  BiGlobe,
  BiLoaderAlt,
  BiPhone,
  BiShield,
  BiX,
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

// Polls the backend DIRECTLY from the browser (not via a Next.js Server
// Action) — Server Actions are designed for one-off calls, not a tight
// repeated polling loop, and were not reliably completing every tick here.
// The backend already allows this: CORS is wide open (allow_origins=["*"])
// and GET /knowledge/progress/{id} requires no auth.
const KB_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.bayshorecommunication.com";

async function fetchLiveProgress(
  companyId: string,
): Promise<TrainProgress | null> {
  try {
    const res = await fetch(
      `${KB_API_URL}/api/v1/knowledge/progress/${companyId}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as TrainProgress;
  } catch {
    return null;
  }
}

function qualityLabel(score: number): string {
  if (score >= 75) return "excellent";
  if (score >= 45) return "good";
  return "needs improvement";
}

const COMPANY_TYPE_LABELS: Record<string, string> = {
  "tech-company": "Tech Company",
  "law-firm": "Law Firm",
  "healthcare-company": "Healthcare",
  "realestate-company": "Real Estate",
  "consultancy-company": "Consultancy",
  "agency-company": "Agency",
  other: "Other",
};

// Live linear extrapolation from elapsed time + percent so far, recalculated
// on every poll tick — this is a real-time estimate, not a fixed guess, so it
// tightens up automatically as more of *this* site's actual training
// progresses (a fast small site converges quickly; a large slow one adjusts
// upward). Below 10% the sample is too small to extrapolate reliably, so we
// just say "estimating…" rather than show a wildly swinging number.
function estimateRemaining(elapsedSeconds: number, percent: number): string {
  if (percent < 10) return "estimating…";
  if (percent >= 100) return "almost done";
  const totalEstimate = (elapsedSeconds / percent) * 100;
  const remaining = Math.max(0, Math.round(totalEstimate - elapsedSeconds));
  if (remaining < 5) return "a few seconds left";
  if (remaining < 60) return `about ${remaining}s left`;
  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  return `about ${mins}m ${secs}s left`;
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
    missingInfo: result.missing_info || [],
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

// Live training progress, lifted up so the right-side chatbot mockup can
// show "where data was found" while this form is mid-training.
export interface LiveProgress {
  isTraining: boolean;
  percent: number;
  stage: string | null;
  message: string | null;
  found: FoundItem[];
  elapsed: number;
  // Company details shown on the right panel while training runs
  trainCompanyName?: string;
  trainWebsite?: string;
  trainCompanyType?: string;
  trainEmail?: string;
  trainPhone?: string;
}

interface TrainLeftSideFormProps {
  session: Session | null;
  companyName: string;
  setCompanyName: (name: string) => void;
  onTrainingComplete?: (data: TrainingData) => void;
  onCompanyIdFound?: (id: string) => void;
  onProgressUpdate?: (progress: LiveProgress) => void;
}

const TrainLeftSideForm = ({
  session,
  companyName,
  setCompanyName,
  onTrainingComplete,
  onCompanyIdFound,
  onProgressUpdate,
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
  const [success, setSuccess] = useState<string | null>(null);
  const [existingKB, setExistingKB] = useState<any>(null);

  // Live training progress — polled from a separate connection while the
  // training POST request is in flight (see startTraining below). Only
  // percent/elapsed are rendered locally; stage/message/found are relayed
  // to the parent via onProgressUpdate for the right-side chatbot mockup.
  const [trainPercent, setTrainPercent] = useState(0);
  const [trainElapsed, setTrainElapsed] = useState(0);
  // True until the first real poll response arrives — distinguishes "no
  // data yet" from "genuinely 0%" so the card can show a skeleton instead
  // of a misleading static "0%".
  const [hasLiveData, setHasLiveData] = useState(false);
  // True for the brief "✓ 100% Complete" confirmation hold before the
  // success summary is revealed (see startTraining below).
  const [isComplete, setIsComplete] = useState(false);
  const [trainingResult, setTrainingResult] = useState<{
    totalSources?: number;
    quality?: string;
    qualityPercentage?: number;
    missingInfo?: MissingInfoItem[];
  } | null>(null);

  // Account fields — only needed for non-logged-in users to sign up while training
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // Not collected from the user anymore — generated automatically at signup
  // time so the backend's signup/signin calls still have a password to use.
  const [password, setPassword] = useState("");

  // OTP verification state — "signup" creates a brand new account;
  // "login" is used when the email already has an account (passwordless
  // sign-in instead of erroring out on "Email already registered").
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpTimer, setOtpTimer] = useState(0);
  const [otpMode, setOtpMode] = useState<"signup" | "login">("signup");

  const isUserLoggedIn = !!session?.user;
  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const startOtpCountdown = () => {
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Users often type a bare domain ("example.com") with no scheme — the
  // input is now plain text (not type="url") so that's accepted instead of
  // blocked by the browser's native "Please enter a URL" validation, and
  // this fills in https:// before the value is used anywhere downstream.
  const normalizeWebsiteUrl = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return trimmed;
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  };

  // Shared field styles — clean modern SaaS input.
  const inputClasses =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400";
  // Input with left icon padding
  const inputIconClasses =
    "w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400";
  const labelClasses =
    "mb-1.5 block text-xs font-semibold text-gray-600 dark:text-gray-400";
  const primaryButtonClasses =
    "w-full rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200";

  // For logged-in users: fetch profile and pre-fill fields (profile > draft > empty)
  useEffect(() => {
    if (!isUserLoggedIn) {
      // Non-logged-in: restore from localStorage draft only
      try {
        const draft = JSON.parse(localStorage.getItem(FORM_DRAFT_KEY) || "{}");
        if (draft.companyName && !companyName)
          setCompanyName(draft.companyName);
        if (draft.website && !website) setWebsite(draft.website);
        if (draft.companyType) setCompanyType(draft.companyType);
      } catch {}
      return;
    }
    getUserData().then((res) => {
      if (res.data) {
        if (res.data.companyName) setCompanyName(res.data.companyName);
        if (res.data.website) setWebsite(res.data.website);
        if (res.data.companyType) setCompanyType(res.data.companyType);
        if (res.data.email) setEmail(res.data.email);
        if (res.data.phoneNumber) setPhoneNumber(res.data.phoneNumber);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save draft whenever fields change (used for non-logged-in users)
  useEffect(() => {
    if (isUserLoggedIn) return;
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
   * Handle training form submission — for non-logged-in users this also
   * creates the account (signup + OTP) before training starts.
   */
  const handleLoggedInTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!companyName || !website) {
      setError("Please fill all required fields");
      return;
    }

    const normalizedWebsite = normalizeWebsiteUrl(website);
    setWebsite(normalizedWebsite);

    setError(null);
    setSuccess(null);

    if (!isUserLoggedIn) {
      if (!email || !phoneNumber) {
        setError("Please fill all required fields");
        return;
      }

      // No password field in this form — generate one so signup/signin still work.
      const generatedPassword =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      setPassword(generatedPassword);

      setIsLoading(true);
      try {
        const result = await signupAction({
          company_name: companyName,
          company_type: companyType,
          company_website: normalizedWebsite,
          phone_number: phoneNumber,
          email,
          password: generatedPassword,
        });
        if (!result.success) {
          const message =
            typeof result.message === "string"
              ? result.message
              : JSON.stringify(result.message);

          // Email already has an account — switch to passwordless sign-in
          // instead of just erroring out.
          if (message.toLowerCase().includes("already registered")) {
            const otpResult = await requestLoginOtpAction(email);
            if (!otpResult.success) {
              setError(otpResult.message || "Failed to send sign-in code.");
              return;
            }
            setOtpMode("login");
            setSuccess(
              otpResult.message || "Sign-in code sent! Check your email.",
            );
            setShowOTPModal(true);
            setOtpTimer(120);
            startOtpCountdown();
            return;
          }

          setError(message);
          return;
        }
        setOtpMode("signup");
        setSuccess(result.message || "OTP sent! Check your email.");
        setShowOTPModal(true);
        setOtpTimer(120);
        startOtpCountdown();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Failed to send OTP");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const cid = resolveCompanyId();
    if (!cid) {
      setError("Please log in again");
      return;
    }

    await startTraining(cid, normalizedWebsite);
  };

  /**
   * Verify OTP — "signup" creates the account then signs in; "login" signs
   * into the existing account directly (passwordless). Either way, once we
   * have a company id we check existing KB status before starting training.
   */
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let cid: string | undefined;

      if (otpMode === "login") {
        const signinForm = new FormData();
        signinForm.set("email", email);
        signinForm.set("otp_code", otp);
        signinForm.set("callbackUrl", "/dashboard");
        const signinResult = await otpSigninAction({ ok: false }, signinForm);
        if (!signinResult.ok) {
          setError(signinResult.error || "Invalid or expired code.");
          return;
        }

        // Session cookie is now set, but the page's Server Components (e.g.
        // the landing layout's Navbar) won't know that without this — there's
        // no full page navigation in this flow to pick it up automatically.
        router.refresh();

        // Fetch the profile to get the company id.
        const profile = await getUserData();
        cid = profile.data?.id;
        if (!cid) {
          setError(
            "Signed in, but could not load your account. Please refresh and try again.",
          );
          return;
        }
      } else {
        const result = await verifyOTPAction(email, otp);
        if (!result.success || !result.user_id) {
          setError(
            typeof result.message === "string"
              ? result.message
              : "OTP verification failed",
          );
          return;
        }

        // Establish a real NextAuth session so the dashboard works after training.
        const signinForm = new FormData();
        signinForm.set("email", email);
        signinForm.set("password", password);
        signinForm.set("callbackUrl", "/dashboard");
        await signinAction({ ok: false }, signinForm);

        // Same reasoning as the login branch above — refresh so the Navbar
        // (and any other Server Component reading the session) updates now.
        router.refresh();

        cid = result.user_id;
      }

      setShowOTPModal(false);
      onCompanyIdFound?.(cid);

      // Existing account may already have a trained knowledge base.
      const statusRes = await getKnowledgeStatusAction(cid);
      if (statusRes.ok && statusRes.data?.is_trained) {
        const kb = statusToKB(statusRes.data, companyName);
        setExistingKB(kb);
        setStep("already-trained");
        onTrainingComplete?.({ ...kb, alreadyTrained: true });
        return;
      }

      await startTraining(cid, website, companyName, companyType);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Resend OTP — re-requests a code via whichever flow is active.
   */
  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (otpMode === "login") {
        const otpResult = await requestLoginOtpAction(email);
        if (!otpResult.success) {
          setError(otpResult.message || "Failed to resend code.");
          return;
        }
        setSuccess(otpResult.message || "Code resent!");
        setOtpTimer(120);
        startOtpCountdown();
        return;
      }

      const result = await signupAction({
        company_name: companyName,
        company_type: companyType,
        company_website: website,
        phone_number: phoneNumber,
        email,
        password,
      });
      if (!result.success) {
        setError(
          typeof result.message === "string"
            ? result.message
            : JSON.stringify(result.message),
        );
        return;
      }
      setSuccess(result.message || "OTP resent!");
      setOtpTimer(120);
      startOtpCountdown();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to resend OTP");
    } finally {
      setIsLoading(false);
    }
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

    setTrainPercent(0);
    setTrainElapsed(0);
    setHasLiveData(false);
    setIsComplete(false);

    let elapsedSeconds = 0;
    let lastFound: FoundItem[] = [];
    onProgressUpdate?.({
      isTraining: true,
      percent: 0,
      stage: null,
      message: null,
      found: [],
      elapsed: 0,
    });

    // Polls the live progress endpoint DIRECTLY from the browser (see
    // fetchLiveProgress above) on a separate connection while the training
    // POST call below is in flight — purely additive UI, doesn't affect the
    // actual training call or its result.
    const progressInterval = setInterval(async () => {
      const data = await fetchLiveProgress(cid);
      if (!data) return;
      setHasLiveData(true);
      setTrainPercent(data.percent);
      lastFound = data.found;
      onProgressUpdate?.({
        isTraining: true,
        percent: data.percent,
        stage: data.stage,
        message: data.message,
        found: data.found,
        elapsed: elapsedSeconds,
      });
    }, 1500);
    const elapsedInterval = setInterval(() => {
      elapsedSeconds += 1;
      setTrainElapsed(elapsedSeconds);
    }, 1000);

    try {
      const res = await trainKnowledgeBaseAction(cid, siteUrl, name, type);
      clearInterval(progressInterval);
      clearInterval(elapsedInterval);

      if (!res.ok) {
        addLog(`❌ Training failed: ${res.error}`);
        setError(res.error || "Training failed");
        setIsLoading(false);
        onProgressUpdate?.({
          isTraining: false,
          percent: trainPercent,
          stage: "error",
          message: res.error || "Training failed",
          found: lastFound,
          elapsed: elapsedSeconds,
        });
        return;
      }

      const result = resultToTraining(res.data!);
      addLog("✅ Knowledge base created successfully!");
      addLog(`📚 Total entries: ${result.totalSources}`);
      addLog(`📊 Quality: ${result.quality} (${result.qualityPercentage}%)`);

      // Hold a "✓ 100% Complete" confirmation for a beat before revealing
      // the success summary — both sides transition together afterward.
      setTrainPercent(100);
      setIsComplete(true);
      onProgressUpdate?.({
        isTraining: true,
        percent: 100,
        stage: "done",
        message: "✓ Training complete! Finalizing your chatbot…",
        found: lastFound,
        elapsed: elapsedSeconds,
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      setTrainingResult(result);
      setStep("success");
      setIsComplete(false);
      onProgressUpdate?.({
        isTraining: false,
        percent: 100,
        stage: "done",
        message: "Training complete!",
        found: lastFound,
        elapsed: elapsedSeconds,
      });
      try {
        localStorage.removeItem(FORM_DRAFT_KEY);
      } catch {}
      onTrainingComplete?.({ ...result, companyName, alreadyTrained: false });
      onCompanyIdFound?.(cid);
      setIsLoading(false);
    } catch (error: unknown) {
      clearInterval(progressInterval);
      clearInterval(elapsedInterval);
      addLog(
        `❌ Error: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      setError("Training failed");
      setIsLoading(false);
      onProgressUpdate?.({
        isTraining: false,
        percent: trainPercent,
        stage: "error",
        message: "Training failed",
        found: lastFound,
        elapsed: elapsedSeconds,
      });
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
          className="mb-10 text-center lg:text-left"
        >
          {step === "training-form" && !isUserLoggedIn ? (
            <>
              <h2 className="mb-2.5 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Tell us about your company
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                We&apos;ll use these details to train your AI assistant and set
                up your account. It only takes a minute.
              </p>
            </>
          ) : step === "training" || step === "checking" ? (
            <>
              <h2 className="mb-2.5 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {step === "checking"
                  ? "Checking your account"
                  : "Training in progress"}
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {step === "checking"
                  ? "One moment — looking up your existing knowledge base."
                  : "Sit tight — your AI is learning your business from the details below."}
              </p>
            </>
          ) : (
            <>
              <h2 className="mb-2.5 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
                Train your AI knowledge base
              </h2>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                {isUserLoggedIn
                  ? "Check your existing knowledge base or train new data"
                  : "Start by providing your company details"}
              </p>
            </>
          )}
        </motion.div>
      )}

      {/* Form Step */}
      {step === "form" && (
        <motion.div variants={fadeInUp}>
          <div className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-transparent">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
                <BiBuilding className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              </div>
              <h3 className="mb-1.5 text-lg font-semibold text-gray-900 dark:text-white">
                Check knowledge base
              </h3>
              <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                Check if you have existing training data or start fresh
              </p>
            </div>

            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/10 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={handleStartLoggedInUser}
              disabled={isLoading}
              className={primaryButtonClasses}
            >
              {isLoading ? "Checking…" : "Check knowledge base"}
            </button>
          </div>
        </motion.div>
      )}

      {/* Training Form Step - For logged-in users to input company details */}
      {step === "training-form" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          {isUserLoggedIn && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                Please provide your company details to start training your AI
                chatbot
              </p>
            </div>
          )}

          <form onSubmit={handleLoggedInTrainingSubmit} className="space-y-6">
            {/* Company Name */}
            <div className="space-y-1">
              <label className={labelClasses}>
                <BiBuilding /> Company Name{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="e.g., Acme Corporation"
                className={inputClasses}
                required
              />
            </div>

            {/* Company Type */}
            <div className="space-y-1">
              <label className={labelClasses}>
                <BiCategory /> Company Type{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={companyType}
                  onChange={(e) => setCompanyType(e.target.value)}
                  className={`${inputClasses} appearance-none`}
                  required
                >
                  <option value="tech-company">Tech Company</option>
                  <option value="law-firm">Law Firm</option>
                  <option value="healthcare-company">Healthcare</option>
                  <option value="realestate-company">Real Estate</option>
                  <option value="consultancy-company">Consultancy</option>
                  <option value="agency-company">Agency</option>
                  <option value="other">Other</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Website URL */}
            <div className="space-y-1">
              <label className={labelClasses}>
                <BiGlobe /> Company Website{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                onBlur={(e) => setWebsite(normalizeWebsiteUrl(e.target.value))}
                placeholder="example.com"
                className={inputClasses}
                required
              />
            </div>

            {/* Email & Phone Number — pre-filled from the account when logged in */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1">
                <label className={labelClasses}>
                  <BiEnvelope /> Work Email{" "}
                  {!isUserLoggedIn && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className={`${inputClasses} ${isUserLoggedIn ? "cursor-not-allowed opacity-70" : ""}`}
                  readOnly={isUserLoggedIn}
                  required={!isUserLoggedIn}
                />
              </div>

              <div className="space-y-1">
                <label className={labelClasses}>
                  <BiPhone /> Phone Number{" "}
                  {!isUserLoggedIn && <span className="text-red-500">*</span>}
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className={`${inputClasses} ${isUserLoggedIn ? "cursor-not-allowed opacity-70" : ""}`}
                  readOnly={isUserLoggedIn}
                  required={!isUserLoggedIn}
                />
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/40 dark:bg-red-900/10 dark:text-red-400">
                {error}
              </div>
            )}

            {success && !showOTPModal && (
              <div className="rounded-lg border border-green-100 bg-green-50 p-3 text-sm text-green-600 dark:border-green-900/40 dark:bg-green-900/10 dark:text-green-400">
                {success}
              </div>
            )}

            <button type="submit" disabled={isLoading} className={primaryButtonClasses}>
              {isLoading
                ? isUserLoggedIn
                  ? "Starting training…"
                  : "Creating account…"
                : "Start training"}
            </button>
          </form>

          {/* Logs */}
          {logs.length > 0 && (
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-gray-200 bg-gray-50 p-4 text-left text-sm dark:border-gray-800 dark:bg-gray-900/50">
              {logs.map((log, i) => (
                <div key={i} className="mb-1 text-gray-600 dark:text-gray-400">
                  {log}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Checking Step */}
      {step === "checking" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-3 py-8 text-center"
        >
          <BiLoaderAlt className="h-6 w-6 animate-spin text-gray-400" />
        </motion.div>
      )}

      {/* Training Step */}
      {step === "training" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {/* Loaded From Your Details */}
          <div>
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Loaded from your details
            </p>
            <div className="divide-y divide-gray-100 rounded-2xl border border-gray-200 bg-white dark:divide-gray-900 dark:border-gray-800 dark:bg-transparent">
              {[
                { label: "Company name", value: companyName },
                {
                  label: "Company type",
                  value: COMPANY_TYPE_LABELS[companyType] || companyType,
                },
                { label: "Website URL", value: website },
                { label: "Work email", value: email },
                { label: "Phone number", value: phoneNumber },
              ]
                .filter((row) => row.value)
                .map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-3 px-4 py-3.5"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <BiCheckCircle className="h-4 w-4 shrink-0 text-green-500" />
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">{row.label}</p>
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
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
          </div>

          {/* Progress Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-transparent">
            {!hasLiveData ? (
              // Skeleton — shown until the first real poll response arrives,
              // so this never looks like a misleading static "0%".
              <div className="animate-pulse space-y-3">
                <div className="mx-auto h-4 w-40 rounded bg-gray-100 dark:bg-gray-900" />
                <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-900" />
                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-gray-100 dark:bg-gray-900" />
                  <div className="h-3 w-20 rounded bg-gray-100 dark:bg-gray-900" />
                </div>
              </div>
            ) : isComplete ? (
              // ✓ 100% confirmation — held briefly before the success step.
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.1, duration: 0.4 }}
                  className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20"
                >
                  <BiCheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </motion.div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  100% complete
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Finalizing your chatbot…
                </p>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-green-100 dark:bg-green-900/20">
                  <div className="h-full w-full rounded-full bg-green-500" />
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                  <BiLoaderAlt className="h-4 w-4 animate-spin text-gray-400" />
                  Training… {trainPercent}%
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-900">
                  <motion.div
                    className="h-full rounded-full bg-gray-900 dark:bg-white"
                    animate={{ width: `${trainPercent}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400">
                  <span>{formatTime(trainElapsed)} elapsed</span>
                  <span>{estimateRemaining(trainElapsed, trainPercent)}</span>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}

      {/* Already Trained Step */}
      {step === "already-trained" && existingKB && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
              <BiCheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Already trained
            </h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Your AI is ready with{" "}
              <strong className="font-semibold text-gray-900 dark:text-white">
                {existingKB.companyName}
              </strong>{" "}
              knowledge base
            </p>
          </div>

          {/* Training Summary Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-transparent">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Knowledge base summary
            </h4>

            <div className="space-y-4">
              {/* Sources */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Total sources
                </span>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {existingKB.totalSources}
                </span>
              </div>

              {/* Quality Score - Prominent Display */}
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Quality score
                  </span>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {existingKB.qualityPercentage}%
                    </div>
                    <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      {existingKB.quality}
                    </div>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
                  <div
                    className="h-full rounded-full bg-gray-900 transition-all duration-700 dark:bg-white"
                    style={{ width: `${existingKB.qualityPercentage}%` }}
                  />
                </div>
              </div>

              {/* Last Trained Date */}
              {existingKB.updatedAt && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Last trained
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
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
          <div className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="mt-1 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-green-500" />
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <strong className="font-semibold text-gray-900 dark:text-white">
                Your AI is active.
              </strong>{" "}
              You can start chatting with your AI assistant on the right side
              or retrain to add more knowledge.
            </p>
          </div>
        </motion.div>
      )}

      {/* Success Step */}
      {step === "success" && trainingResult && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="space-y-6"
        >
          {/* Success Header */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20">
              <BiCheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Training complete
            </h3>
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Your chatbot is now powered by{" "}
              <strong className="font-semibold text-gray-900 dark:text-white">
                {trainingResult.totalSources}
              </strong>{" "}
              {trainingResult.totalSources === 1 ? "source" : "sources"}.
            </p>
          </div>

          {/* Quality Score Card */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-transparent">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Quality score
              </span>
              <div className="text-right">
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {trainingResult.qualityPercentage}%
                </div>
                <div className="text-xs font-medium uppercase tracking-wide text-gray-400">
                  {trainingResult.quality}
                </div>
              </div>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${trainingResult.qualityPercentage}%` }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="h-full rounded-full bg-gray-900 dark:bg-white"
              />
            </div>
          </div>

          {/* Missing Info Alerts */}
          {trainingResult.missingInfo &&
            trainingResult.missingInfo.length > 0 && (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-900/10">
                <div className="mb-3 flex items-center gap-2">
                  <span className="text-base">⚠️</span>
                  <span className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                    Missing important information
                  </span>
                </div>
                <p className="mb-3 text-xs leading-relaxed text-amber-800 dark:text-amber-300">
                  The following info was not found on your website. Add it to
                  improve your chatbot&apos;s answers:
                </p>
                <ul className="space-y-2">
                  {trainingResult.missingInfo.map((item) => (
                    <li
                      key={item.key}
                      className="flex items-start gap-2 rounded-lg border border-amber-100 bg-white px-3 py-2 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-900/20 dark:text-amber-200"
                    >
                      <span className="mt-0.5 shrink-0 text-amber-500">•</span>
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {/* Info Card */}
          <div className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900/50">
            <div className="mt-1 h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-blue-500" />
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <strong className="font-semibold text-gray-900 dark:text-white">
                Your AI is ready.
              </strong>{" "}
              You can now start chatting with your AI assistant on the right
              side. Try asking questions about {companyName}!
            </p>
          </div>
        </motion.div>
      )}

      {/* OTP Verification Modal — confirms email & creates the account */}
      <AnimatePresence>
        {showOTPModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => !isLoading && setShowOTPModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div
                className="relative w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl"
                style={{ colorScheme: "light" }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => !isLoading && setShowOTPModal(false)}
                  disabled={isLoading}
                  className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
                >
                  <BiX className="h-5 w-5" />
                </button>

                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <BiShield className="h-6 w-6 text-gray-700" />
                  </div>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900">
                    {otpMode === "login" ? "Welcome back" : "Verify your email"}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">
                    {otpMode === "login"
                      ? "This email already has an account — "
                      : ""}
                    We&apos;ve sent a 6-digit code to{" "}
                    <strong className="font-medium text-gray-700">{email}</strong>
                  </p>
                </div>

                <form onSubmit={handleVerifyOtp} className="space-y-6">
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, ""))
                      }
                      maxLength={6}
                      required
                      style={{ colorScheme: "light" }}
                      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-4 text-center text-2xl font-semibold tracking-widest text-gray-900 placeholder-gray-400 transition-all focus:border-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-gray-100"
                    />

                    <div className="flex items-center justify-between text-sm">
                      {otpTimer > 0 ? (
                        <p className="text-gray-500">
                          Code expires in {formatTime(otpTimer)}
                        </p>
                      ) : (
                        <p className="text-red-600">Code expired</p>
                      )}
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isLoading || otpTimer > 0}
                        className="font-semibold text-gray-900 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Resend code
                      </button>
                    </div>
                  </div>

                  {(error || success) && (
                    <div
                      className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                        error
                          ? "border-red-100 bg-red-50 text-red-600"
                          : "border-green-100 bg-green-50 text-green-600"
                      }`}
                    >
                      {error || success}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className={primaryButtonClasses}
                  >
                    {isLoading
                      ? "Verifying…"
                      : otpMode === "login"
                        ? "Verify & continue"
                        : "Verify & start training"}
                  </button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrainLeftSideForm;
