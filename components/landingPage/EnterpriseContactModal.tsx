"use client";

import { submitEnterpriseInquiryAction } from "@/app/actions/salesLeads";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  BiBuilding,
  BiEnvelope,
  BiGroup,
  BiPhone,
  BiUser,
  BiX,
} from "react-icons/bi";
import { BsArrowRight, BsBriefcase } from "react-icons/bs";

const COMPANY_SIZE_OPTIONS = [
  { value: "1-10", label: "1–10 employees" },
  { value: "11-50", label: "11–50 employees" },
  { value: "51-200", label: "51–200 employees" },
  { value: "201-500", label: "201–500 employees" },
  { value: "500+", label: "500+ employees" },
];

interface EnterpriseContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function EnterpriseContactModal({ open, onClose }: EnterpriseContactModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClasses =
    "w-full rounded-lg border border-gray-200 bg-gray-50/50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10";
  const labelClasses =
    "mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const result = await submitEnterpriseInquiryAction({
      full_name: form.get("fullName") as string,
      email: form.get("email") as string,
      company_name: form.get("companyName") as string,
      company_size: form.get("companySize") as string,
      phone: (form.get("phoneNumber") as string) || undefined,
      message: (form.get("message") as string) || undefined,
    });

    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    toast.success("Thanks! Our team will reach out within 1 business day.");
    e.currentTarget.reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => !submitting && onClose()}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative w-full max-w-xl rounded-2xl border border-white/20 bg-white p-8 shadow-2xl"
              style={{ colorScheme: "light" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => !submitting && onClose()}
                disabled={submitting}
                className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:opacity-50"
              >
                <BiX className="h-5 w-5" />
              </button>

              {/* Header */}
              <div className="mb-6 text-left">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BsBriefcase className="h-5 w-5 text-primary-dark" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Talk to Sales
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                  Tell us a bit about your business and we&apos;ll put
                  together a plan that fits — usually within 1 business day.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className={labelClasses} htmlFor="ent-full-name">
                      <BiUser /> Full name
                    </label>
                    <input
                      id="ent-full-name"
                      name="fullName"
                      type="text"
                      placeholder="Jane Doe"
                      required
                      disabled={submitting}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="ent-email">
                      <BiEnvelope /> Work email
                    </label>
                    <input
                      id="ent-email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      disabled={submitting}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="ent-company">
                      <BiBuilding /> Company name
                    </label>
                    <input
                      id="ent-company"
                      name="companyName"
                      type="text"
                      placeholder="Acme Inc."
                      required
                      disabled={submitting}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label className={labelClasses} htmlFor="ent-size">
                      <BiGroup /> Company size
                    </label>
                    <div className="relative">
                      <select
                        id="ent-size"
                        name="companySize"
                        defaultValue=""
                        required
                        disabled={submitting}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" disabled>
                          Select company size
                        </option>
                        {COMPANY_SIZE_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className={labelClasses} htmlFor="ent-phone">
                      <BiPhone /> Phone number
                    </label>
                    <input
                      id="ent-phone"
                      name="phoneNumber"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      disabled={submitting}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses} htmlFor="ent-message">
                    What are you looking to achieve?
                  </label>
                  <textarea
                    id="ent-message"
                    name="message"
                    rows={3}
                    placeholder="Tell us about your use case, expected volume, or anything else that'd help us prepare…"
                    disabled={submitting}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                {error ? (
                  <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-thunder-black px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-thunder-black/25 transition-all hover:-translate-y-0.5 hover:bg-thunder-black/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {submitting ? (
                    "Sending…"
                  ) : (
                    <>
                      Send Inquiry
                      <BsArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-gray-400">
                  We&apos;ll only use this to reach out about your Enterprise plan.
                </p>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EnterpriseContactModal;
