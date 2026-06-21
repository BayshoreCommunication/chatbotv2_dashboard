import { motion } from "framer-motion";

export function BillingCycleToggle({
  isYearly,
  onChange,
}: {
  isYearly: boolean;
  onChange: (isYearly: boolean) => void;
}) {
  return (
    <div className="mb-5 flex items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center gap-1 rounded-full border border-gray-200 bg-gray-50 p-1.5"
        layout
      >
        <motion.button
          onClick={() => onChange(false)}
          className="relative z-10 rounded-full px-5 py-2 text-sm font-semibold transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {!isYearly && (
            <motion.div
              layoutId="billingActiveTab"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 ${!isYearly ? "text-white" : "text-gray-600"}`}
          >
            Monthly
          </span>
        </motion.button>

        <motion.button
          onClick={() => onChange(true)}
          className="relative z-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isYearly && (
            <motion.div
              layoutId="billingActiveTab"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span
            className={`relative z-10 ${isYearly ? "text-white" : "text-gray-600"}`}
          >
            Yearly
          </span>
          <motion.span
            className="relative z-10 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white shadow-sm"
            animate={{ scale: isYearly ? [1, 1.1, 1] : 1 }}
            transition={{
              duration: 0.5,
              repeat: isYearly ? Infinity : 0,
              repeatDelay: 2,
            }}
          >
            Save 17%
          </motion.span>
        </motion.button>
      </motion.div>
    </div>
  );
}
