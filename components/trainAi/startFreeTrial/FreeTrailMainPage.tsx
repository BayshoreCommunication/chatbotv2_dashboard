"use client";

import { getSubscriptionAction } from "@/app/actions/subscriptions";
import { getWidgetSettingsAction } from "@/app/actions/widgetSettings";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-toastify";
import ChatbotRightSideView from "./ChatbotRighSIdeView";
import TrainLeftSideForm, { type LiveProgress } from "./TrainLeftSideForm";

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
  const searchParams = useSearchParams();
  const [companyName, setCompanyName] = useState("");
  const [trainingData, setTrainingData] = useState<TrainingData | null>(null);
  const [isTrainingComplete, setIsTrainingComplete] = useState(false);
  const [companyId, setCompanyId] = useState(session?.user?.id || "");
  const [liveProgress, setLiveProgress] = useState<LiveProgress | null>(null);
  const [conversationCount, setConversationCount] = useState(0);
  const [hasActiveSub, setHasActiveSub] = useState(false);
  const [widgetReady, setWidgetReady]   = useState<boolean | null>(null);
  const [navigating, setNavigating]     = useState(false);

  const isPaymentReturn = searchParams.get("payment") === "success";

  // Pre-fetch subscription + widget status in parallel on mount so button
  // click navigates instantly without an extra round-trip.
  useEffect(() => {
    Promise.all([getSubscriptionAction(), getWidgetSettingsAction()]).then(
      ([sub, ws]) => {
        if (sub.ok && sub.data?.is_active && sub.data.subscription_tier !== "free")
          setHasActiveSub(true);
        setWidgetReady(!!(ws.ok && ws.data));
      }
    );
  }, []);

  // After payment return: once widgetReady is resolved, show toast and navigate.
  useEffect(() => {
    if (!isPaymentReturn || widgetReady === null) return;
    toast.success("Payment confirmed! Setting up your workspace…");
    router.replace(widgetReady ? "/dashboard" : "/widget-settings");
  }, [isPaymentReturn, widgetReady, router]);

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

  return (
    <div className={isDashboard ? "w-full" : "min-h-screen w-full bg-white text-gray-900 dark:bg-black dark:text-white pt-32"}>
      {/* Main Content Container */}
      <div className={isDashboard ? "w-full py-6" : "relative z-10 mx-auto min-h-screen max-w-7xl px-6 py-12 sm:px-8 lg:px-10"}>
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Training Form */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col"
          >
            <TrainLeftSideForm
              session={session}
              companyName={companyName}
              setCompanyName={setCompanyName}
              onTrainingComplete={handleTrainingComplete}
              onCompanyIdFound={setCompanyId}
              onProgressUpdate={setLiveProgress}
            />
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
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mx-auto mt-20 flex max-w-md flex-col items-center gap-4 border-t border-gray-100 pt-12 text-center dark:border-gray-900"
          >
            <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
              Your chatbot is trained and ready. Add it to your website in just
              a few minutes to start chatting with your visitors.
            </p>
            <button
              type="button"
              onClick={() => void handleSetupClick()}
              disabled={navigating}
              className="group inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-700 disabled:opacity-60 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FreeTrailMainPage;
