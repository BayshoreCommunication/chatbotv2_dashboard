"use client";

import { getSubscriptionAction } from "@/app/actions/subscriptions";
import { getWidgetSettingsAction } from "@/app/actions/widgetSettings";
import Container from "@/components/shared/Container";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCheckCircle, BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight, BsShieldCheck, BsStopwatch } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import ChatbotRightSideView from "./ChatbotRighSIdeView";
import TrainLeftSideForm, { type LiveProgress } from "./TrainLeftSideForm";

const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] as const },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const TRUST_ITEMS = [
  { icon: BsStopwatch, label: "Live in under 5 minutes" },
  { icon: BsShieldCheck, label: "No credit card required" },
  { icon: BiCheckCircle, label: "Cancel anytime" },
];

// --- Training Data Interface ---
interface TrainingData {
  totalSources?: number;
  quality?: string;
  qualityPercentage?: number;
  companyName?: string;
  alreadyTrained?: boolean;
}

// --- Session Interface ---
interface Session {
  user?: {
    id?: string;
    email?: string | null;
    name?: string | null;
    accessToken?: string;
  };
}

// --- Main Component ---
const FreeTrailMainPage = ({
  session,
  isDashboard = false,
}: {
  session: Session | null;
  isDashboard?: boolean;
}) => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [companyId, setCompanyId] = useState(session?.user?.id || "");
  const [liveProgress, setLiveProgress] = useState<LiveProgress | null>(null);
  const [conversationCount, setConversationCount] = useState(0);
  const [hasActiveSub, setHasActiveSub] = useState(false);
  const [widgetReady, setWidgetReady] = useState<boolean | null>(null);
  const [navigating, setNavigating] = useState(false);

  // Pre-fetch subscription + widget status in parallel on mount so button
  // click navigates instantly without an extra round-trip.
  useEffect(() => {
    Promise.all([getSubscriptionAction(), getWidgetSettingsAction()]).then(
      ([sub, ws]) => {
        if (
          sub.ok &&
          sub.data?.is_active &&
          sub.data.subscription_tier !== "free"
        )
          setHasActiveSub(true);
        setWidgetReady(!!(ws.ok && ws.data));
      },
    );
  }, []);

  const handleTrainingComplete = (data: TrainingData) => {
    setTrainingData(data);
    setIsTrainingComplete(true);
  };

  const handleSetupClick = () => {
    if (navigating) return;
    setNavigating(true);
    if (hasActiveSub) {
      // widgetReady is already known from the mount fetch — instant navigation.
      router.push(widgetReady ? "/dashboard" : "/widget-settings");
    } else {
      router.push("/pricing?redirect=start-free-trial");
    }
  };

  const content = (
    <>
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column - Training Form */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary via-primary-dark to-purple-400" />
            <TrainLeftSideForm
              session={session}
              companyName={companyName}
              setCompanyName={setCompanyName}
              onTrainingComplete={handleTrainingComplete}
              onCompanyIdFound={setCompanyId}
              onProgressUpdate={setLiveProgress}
            />
          </div>
        </motion.div>

        {/* Right Column - Chatbot Preview */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center justify-start lg:sticky lg:top-8"
        >
          <ChatbotRightSideView
            companyId={companyId || session?.user?.id || ""}
            companyName={companyName}
            isTrainingComplete={isTrainingComplete}
            trainingData={trainingData}
            liveProgress={liveProgress}
            onConversationCountChange={setConversationCount}
          />
        </motion.div>
      </div>

      {trainingData && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mx-auto mt-20 max-w-7xl overflow-hidden rounded-3xl border border-gray-200 bg-[#EAF7FC]"
        >
          <div className="flex flex-col sm:flex-row sm:items-stretch">
            <div className="relative h-56 w-full shrink- sm:h-auto sm:w-80">
              <Image
                src="/assets/widget-setup.png"
                alt=""
                fill
                sizes="(min-width: 640px) 320px, 100vw"
                className="object-contain p-4"
              />
            </div>

            <div className="grid flex-1 grid-cols-1 items-center gap-6 p-8 sm:grid-cols-[1fr_auto] sm:gap-10 sm:p-10">
              <div className="text-center sm:text-left">
                <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                  <BiCheckCircle className="h-3.5 w-3.5" />
                  Training complete
                </span>
                <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-thunder-black">
                  One step left — go live on your site
                </h3>
                <p className="mb-4 max-w-md text-sm leading-relaxed text-gray-600">
                  Paste a single snippet into your website and your AI assistant
                  starts chatting with real visitors immediately.
                </p>
                <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs font-semibold text-gray-500 sm:justify-start">
                  {[
                    "No coding required",
                    "Live in under 5 minutes",
                    "Works on any website",
                  ].map((label) => (
                    <li key={label} className="flex items-center gap-1.5">
                      <BiCheckCircle className="h-3.5 w-3.5 text-primary-dark" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => void handleSetupClick()}
                disabled={navigating}
                className="group flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-thunder-black px-4 font-semibold text-white transition-colors hover:bg-thunder-black/90 disabled:opacity-60"
              >
                {navigating ? (
                  <>
                    <BiLoaderAlt className="h-4 w-4 animate-spin" />
                    Please wait…
                  </>
                ) : (
                  <>
                    Set up on your website
                    <BsArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );

  if (isDashboard) {
    return <div className="w-full py-6">{content}</div>;
  }

  return (
    <div className="relative min-h-screen w-full bg-white">
      {/* Hero intro — overflow-hidden is scoped to just this band so the
          decorative blobs don't clip, without breaking `lg:sticky` on the
          chatbot preview column further down (an overflow-hidden ancestor
          disables position:sticky for its descendants). */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(0,224,218,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,224,218,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(circle_at_top,#000_35%,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-24 right-[-8%] h-[380px] w-[380px] rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute left-[-10%] top-24 h-[320px] w-[320px] rounded-full bg-purple-300/15 blur-3xl" />

        <Container className="relative pt-[90px] sm:pt-[120px]">
          {/* Hero intro */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-[7px] text-[13px] font-semibold text-primary-dark"
            >
              <HiSparkles className="h-4 w-4 text-primary" />
              Free Trial · No credit card required
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mb-4 text-4xl font-extrabold leading-[1.1] tracking-tight text-thunder-black sm:text-5xl"
            >
              Train your AI in{" "}
              <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text italic text-transparent">
                minutes
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mx-auto mb-8 max-w-lg text-base text-gray-600 sm:text-lg"
            >
              Point it at your website — we&apos;ll read your pages, train your
              assistant, and have it live and chatting in minutes.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              {TRUST_ITEMS.map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700"
                >
                  <item.icon className="h-3.5 w-3.5 text-primary-dark" />
                  {item.label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <Container className="relative pb-12 sm:pb-16">{content}</Container>
    </div>
  );
};

export default FreeTrailMainPage;
