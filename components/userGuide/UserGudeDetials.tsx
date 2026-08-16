import Link from "next/link";
import { Download, Lightbulb } from "lucide-react";
import Container from "@/components/shared/Container";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import UserGuideFAQ from "@/components/userGuide/UserGuideFAQ";
import {
  USER_GUIDE_FAQS,
  USER_GUIDE_INTRO,
  USER_GUIDE_PHASES,
  USER_GUIDE_PREREQUISITES,
} from "@/lib/userGuideData";

// Laid out to read as the same document as the downloadable PDF (see
// components/userGuide/UserGuidePdfDocument.tsx) — same intro copy, same
// phase/step/tip/FAQ content and order, just HTML instead of PDF primitives.
// Keep the two in sync by editing lib/userGuideData.ts, not this file.
const UserGudeDetials = () => {
  return (
    <section className="bg-gray-50 py-10 lg:py-16">
      <Container>
        <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="mb-8 flex flex-col gap-4 border-b border-gray-100 pb-8 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-sm leading-relaxed text-gray-500">
              {USER_GUIDE_INTRO}
            </p>
            <a
              href="/api/user-guide/pdf"
              download="go-converto-user-guide.pdf"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Download as PDF
            </a>
          </div>

          <div className="mb-10 rounded-xl bg-gray-50 p-5">
            <h2 className="mb-3 text-sm font-bold text-gray-900">
              What you&apos;ll need before you start
            </h2>
            <ul className="flex flex-col gap-2">
              {USER_GUIDE_PREREQUISITES.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                  <HiOutlineCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-10">
            {USER_GUIDE_PHASES.map((phase) => (
              <div key={phase.title}>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {phase.eyebrow}
                </span>
                <h2 className="mt-1 text-lg font-extrabold text-gray-900 sm:text-xl">
                  {phase.title}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {phase.description}
                </p>

                <div className="mt-5 flex flex-col gap-5">
                  {phase.steps.map((step) => (
                    <div
                      key={step.id}
                      className="border-l-2 border-gray-200 pl-4"
                    >
                      <h3 className="text-sm font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-gray-500">
                        {step.description}
                      </p>
                      {step.tip && (
                        <p className="mt-2 flex items-start gap-1.5 rounded-lg bg-primary/5 px-3 py-2 text-xs leading-relaxed text-primary-dark">
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                          {step.tip}
                        </p>
                      )}
                      <Link
                        href={step.href}
                        className="mt-2 inline-block text-sm font-semibold text-primary hover:underline"
                      >
                        {step.linkLabel} →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {USER_GUIDE_FAQS.length > 0 && (
            <div className="mt-12 border-t border-gray-100 pt-8">
              <h2 className="mb-2 text-lg font-extrabold text-gray-900 sm:text-xl">
                Common questions
              </h2>
              <UserGuideFAQ />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default UserGudeDetials;
