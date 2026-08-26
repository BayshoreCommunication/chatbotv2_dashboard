"use client";

import { motion } from "framer-motion";

// ============================================================================
// SVG Custom Icons for Deployment Cards
// ============================================================================

// Website Widget Icon (Speech bubble with 3 dots)
function WebsiteWidgetIcon() {
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="24" fill="#00b2ad" />
        <path
          d="M16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24C32 28.4183 28.4183 32 24 32C22.25 32 20.63 31.44 19.3 30.5L16 31.5L17.1 28.3C16.4 27.04 16 25.57 16 24Z"
          fill="white"
          fillOpacity="0.2"
        />
        <circle cx="19" cy="24" r="2" fill="white" />
        <circle cx="24" cy="24" r="2" fill="white" />
        <circle cx="29" cy="24" r="2" fill="white" />
      </svg>
    </div>
  );
}

// Facebook & Instagram Overlapping Logos Icon
function SocialLogosIcon() {
  return (
    <div className="relative flex items-center justify-center w-16 h-16">
      {/* Facebook Icon (Left) */}
      <div className="absolute left-0 top-1 w-10 h-10 rounded-2xl bg-[#1877F2] flex items-center justify-center text-white shadow-md z-10">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C20.112 23.027 24 18.062 24 12.073z" />
        </svg>
      </div>

      {/* Instagram Gradient Icon (Right, Overlapping) */}
      <div className="absolute right-0 bottom-1 w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] flex items-center justify-center text-white shadow-md z-20 border-2 border-white">
        <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      </div>
    </div>
  );
}

// Text Messaging Icon (Bubble with lines)
function TextMessagingIcon() {
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="16" fill="#00b2ad" />
        <path
          d="M14 16C14 13.7909 15.7909 12 18 12H30C32.2091 12 34 13.7909 34 16V26C34 28.2091 32.2091 30 30 30H20L14 34V16Z"
          fill="white"
          fillOpacity="0.2"
        />
        <line x1="19" y1="18" x2="29" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="19" y1="23" x2="27" y2="23" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

// Mobile App Smartphone Icon
function MobileAppIcon() {
  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-14 h-14" viewBox="0 0 48 48" fill="none">
        <rect x="14" y="8" width="20" height="32" rx="4" fill="white" stroke="#00b2ad" strokeWidth="3" />
        <rect x="17" y="13" width="14" height="20" rx="2" fill="#00b2ad" />
        <circle cx="24" cy="36" r="1.5" fill="#00b2ad" />
      </svg>
    </div>
  );
}

const deploymentCards = [
  {
    id: "01",
    icon: WebsiteWidgetIcon,
    title: "Website widget",
    description: "Capture leads in real time with a seamless chat experience.",
  },
  {
    id: "02",
    icon: SocialLogosIcon,
    title: "Facebook & Instagram",
    description: "Answer inquiries from the world's largest social platforms.",
  },
  {
    id: "03",
    icon: TextMessagingIcon,
    title: "Text messaging",
    description: "Connect instantly via SMS and never miss a potential new client.",
  },
  {
    id: "04",
    icon: MobileAppIcon,
    title: "Mobile app",
    description: "Manage leads and respond on the go from anywhere, anytime.",
  },
];

export default function DeploymentSection() {
  return (
    <section className="relative bg-white py-8 lg:py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 sm:mb-18 text-center"
        >
          {/* Kicker Badge */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary-dark sm:text-sm">
              DEPLOYMENT
            </span>
            <span className="h-0.5 w-6 sm:w-10 bg-primary-dark/80" />
          </div>

          {/* Headline */}
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-[46px] leading-tight sm:leading-tight max-w-3xl mx-auto">
            Meet prospective clients <br className="hidden sm:inline" />
            wherever they <span className="text-primary-dark">reach out.</span>
          </h2>

          {/* Subtitle Description */}
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg font-normal">
            Email, text, and live chat—our omnichannel system works across every channel people use to find your firm.
          </p>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4 CARDS ROW WITH EXACT MATCH DOTTED CONNECTORS */}
        {/* ========================================================================= */}
        <div className="relative mx-auto max-w-6xl">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch relative z-10">
            {deploymentCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center justify-between text-center rounded-2xl sm:rounded-3xl border border-gray-100/90 bg-white p-7 sm:p-8 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.04)] hover:shadow-xl hover:border-gray-200 transition-all duration-300"
                >
                  {/* Dotted Node Connector Line to Next Card (Desktop) */}
                  {index < 3 && (
                    <div className="hidden lg:block pointer-events-none absolute -right-[24px] xl:-right-[32px] top-19 sm:top-20 -translate-y-1/2 w-[48px] xl:w-[64px] z-30 overflow-visible">
                      <svg className="w-full h-4 overflow-visible" viewBox="0 0 64 16">
                        <defs>
                          <style>{`
                            @keyframes flowDeploymentDash {
                              0% { stroke-dashoffset: 24; }
                              100% { stroke-dashoffset: 0; }
                            }
                            .animated-deploy-line {
                              animation: flowDeploymentDash 1.6s linear infinite;
                            }
                          `}</style>
                        </defs>
                        <line
                          x1="6"
                          y1="8"
                          x2="58"
                          y2="8"
                          stroke="#00b2ad"
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="animated-deploy-line opacity-90"
                        />
                        {/* Node Ring Dot Left */}
                        <circle cx="6" cy="8" r="3.5" fill="white" stroke="#00b2ad" strokeWidth="2" />
                        {/* Node Ring Dot Right */}
                        <circle cx="58" cy="8" r="3.5" fill="white" stroke="#00b2ad" strokeWidth="2" />
                      </svg>
                    </div>
                  )}

                  {/* Top Floating Particles & Icon Circle */}
                  <div className="relative mb-6 flex flex-col items-center">
                    {/* Decorative Background Bubbles */}
                    <span className="absolute -top-1 -right-2 h-2.5 w-2.5 rounded-full bg-teal-300/50" />
                    <span className="absolute -bottom-1 -left-2 h-2 w-2 rounded-full bg-teal-300/40" />

                    {/* Circular Light Teal Icon Container */}
                    <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full bg-[#edf8f8] border border-teal-100/60 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                      <Icon />
                    </div>
                  </div>

                  {/* Card Title & Description */}
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl leading-snug group-hover:text-primary-dark transition-colors duration-300">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Horizontal Teal Line Accent */}
                  <div className="mt-6 flex justify-center w-full">
                    <div className="h-0.5 w-12 rounded-full bg-primary-dark/60 transition-all duration-300 group-hover:w-20 group-hover:bg-primary-dark" />
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
