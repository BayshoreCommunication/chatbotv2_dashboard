"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// ============================================================================
// Brand SVG Logos
// ============================================================================

// Go Converto Central Hub Icon
function GoConvertoHubLogo() {
  return (
    <svg className="w-12 h-12 text-white" viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill="currentColor" fillOpacity="0.01" />
      <path
        d="M20 6C12.268 6 6 12.268 6 20C6 27.732 12.268 34 20 34C23.2 34 26.14 32.93 28.5 31.12L33 32.5L31.62 28C33.12 25.64 34 22.92 34 20C34 12.268 27.732 6 20 6Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M20 8C13.3726 8 8 13.3726 8 20C8 26.6274 13.3726 32 20 32C22.76 32 25.3 31.06 27.32 29.48L31 30.5L29.98 26.82C31.26 24.8 32 22.48 32 20C32 13.3726 26.6274 8 20 8Z"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23 15C22.1 14.37 20.9 14 19.5 14C16.46 14 14 16.46 14 19.5C14 22.54 16.46 25 19.5 25C20.9 25 22.1 24.63 23 24"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M22 20H26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Clio Logo
function ClioLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill="#00a86b" />
      <path
        d="M10 16.5L14 20.5L22 11.5"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// HubSpot Logo
function HubSpotLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5 8.5C21.8807 8.5 23 7.38071 23 6C23 4.61929 21.8807 3.5 20.5 3.5C19.1193 3.5 18 4.61929 18 6C18 6.44 18.11 6.85 18.31 7.21L13.84 10.93C13.1 10.35 12.18 10 11.17 10C8.68 10 6.67 12.01 6.67 14.5C6.67 16.99 8.68 19 11.17 19C12.3 19 13.32 18.58 14.09 17.89L19.46 21.47C19.29 22.03 19.2 22.62 19.2 23.24C19.2 26.42 21.78 29 24.96 29C28.14 29 30.72 26.42 30.72 23.24C30.72 20.06 28.14 17.48 24.96 17.48C23.75 17.48 22.63 17.85 21.7 18.49L16.27 14.87C16.38 14.43 16.44 13.97 16.44 13.5C16.44 12.87 16.32 12.27 16.1 11.72L20.61 7.97C20.89 8.3 21.28 8.5 20.5 8.5ZM24.96 20.5C26.47 20.5 27.7 21.73 27.7 23.24C27.7 24.75 26.47 25.98 24.96 25.98C23.45 25.98 22.22 24.75 22.22 23.24C22.22 21.73 23.45 20.5 24.96 20.5ZM11.17 13.02C11.99 13.02 12.65 13.68 12.65 14.5C12.65 15.32 11.99 15.98 11.17 15.98C10.35 15.98 9.69 15.32 9.69 14.5C9.69 13.68 10.35 13.02 11.17 13.02Z"
        fill="#FF7A59"
      />
    </svg>
  );
}

// Gmail Logo
function GmailLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <path
        d="M6 24V10.5L16 17.5L26 10.5V24C26 25.1 25.1 26 24 26H8C6.9 26 6 25.1 6 24Z"
        fill="#EA4335"
      />
      <path d="M26 10.5L16 17.5L6 10.5V8C6 6.9 6.9 6 8 6H24C25.1 6 26 6.9 26 8V10.5Z" fill="#4285F4" />
      <path d="M6 10.5L16 17.5V26H8C6.9 26 6 25.1 6 24V10.5Z" fill="#34A853" />
      <path d="M26 10.5L16 17.5V26H24C25.1 26 26 25.1 26 24V10.5Z" fill="#FBBC04" />
    </svg>
  );
}

// Outlook Logo
function OutlookLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="20" rx="3" fill="#0078D4" />
      <path d="M4 10L16 18L28 10" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="12" cy="16" r="4" fill="white" />
      <text x="12" y="18.5" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#0078D4">
        O
      </text>
    </svg>
  );
}

// Google Calendar Logo
function GoogleCalendarLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <rect x="5" y="5" width="22" height="22" rx="4" fill="white" stroke="#E5E7EB" strokeWidth="1" />
      <path d="M5 11H27V23C27 25.2 25.2 27 23 27H9C6.8 27 5 25.2 5 23V11Z" fill="#4285F4" opacity="0.1" />
      <rect x="5" y="5" width="22" height="7" rx="3" fill="#4285F4" />
      <text x="16" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#4285F4">
        31
      </text>
    </svg>
  );
}

// Zapier Logo
function ZapierLogo() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 4L18.5 13.5H28L20 19L23 28L16 22.5L9 28L12 19L4 13.5H13.5L16 4Z"
        fill="#FF4F00"
      />
    </svg>
  );
}

// SMS Logo
function SmsLogo() {
  return (
    <svg className="w-5 h-5 text-[#00b2ad]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

// Verizon Logo
function VerizonLogo() {
  return (
    <svg className="w-5 h-5 text-[#cd040b]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 4L9 19L3.5 12L6 10.5L9 14.5L18 4H20.5Z" />
    </svg>
  );
}

// AT&T Logo
function AttLogo() {
  return (
    <svg className="w-5 h-5 text-[#00a8e0]" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="9" fill="#00a8e0" />
      <path d="M6 12H18M7.5 8H16.5M7.5 16H16.5" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

// Twilio Logo
function TwilioLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" fill="#F22F46" />
      <circle cx="8.5" cy="8.5" r="2" fill="white" />
      <circle cx="15.5" cy="8.5" r="2" fill="white" />
      <circle cx="8.5" cy="15.5" r="2" fill="white" />
      <circle cx="15.5" cy="15.5" r="2" fill="white" />
    </svg>
  );
}

// Dropbox Logo
function DropboxLogo() {
  return (
    <svg className="w-5 h-5 text-[#0061ff]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 3L12 7L6 11L0 7L6 3ZM18 3L24 7L18 11L12 7L18 3ZM0 15L6 11L12 15L6 19L0 15ZM24 15L18 11L12 15L18 19L24 15ZM6 20.5L12 16.5L18 20.5L12 24.5L6 20.5Z" />
    </svg>
  );
}

// Google Drive Logo
function GoogleDriveLogo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <path d="M8 3L1 15H8L15 3H8Z" fill="#FFC107" />
      <path d="M15 3L8 15L12 22L19 10L15 3Z" fill="#2196F3" />
      <path d="M1 15L5 22H19L15 15H1Z" fill="#4CAF50" />
    </svg>
  );
}

// Microsoft 365 Logo
function Microsoft365Logo() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

export default function IntegrationsSection() {
  return (
    <section className="relative bg-white py-8 lg:py-10 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Split Layout: Left Text & Right Connected Nodes Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 lg:mb-20">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: Section Copy */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            {/* Top Line Kicker */}
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-0.5 w-6 bg-primary-dark" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary-dark sm:text-sm">
                INTEGRATIONS
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl leading-tight sm:leading-tight">
              Works with the tools <br className="hidden sm:inline" />
              your firm <span className="text-primary-dark">already uses.</span>
            </h2>

            {/* Subtitle Description */}
            <p className="text-sm leading-relaxed text-gray-500 sm:text-base md:text-lg max-w-md font-normal">
              Connect Go Converto to your existing stack and keep every case, message, and update in sync.
            </p>
          </motion.div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: Hub & Spoke Connection Graphic with Dotted Lines */}
          {/* ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex justify-center"
          >
            <div className="relative w-full max-w-[560px] h-[380px] sm:h-[420px] mx-auto flex items-center justify-center">
              
              {/* Subtle Concentric Background Circles */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 opacity-30">
                <div className="w-[340px] h-[340px] rounded-full border border-teal-200 animate-pulse" />
                <div className="absolute w-[240px] h-[240px] rounded-full border border-teal-100/80" />
              </div>

              {/* Dotted Connecting Lines SVG Canvas with Infinite Flow Animation */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 560 420">
                <defs>
                  <style>{`
                    @keyframes infiniteNodeFlow {
                      0% {
                        stroke-dashoffset: 24;
                      }
                      100% {
                        stroke-dashoffset: 0;
                      }
                    }
                    .animated-node-path {
                      animation: infiniteNodeFlow 1.6s linear infinite;
                    }
                  `}</style>
                </defs>

                {/* Top-Left: Clio to Central Hub */}
                <path
                  d="M 145 65 H 195 Q 210 65 210 80 V 170 Q 210 185 225 185 H 238"
                  stroke="#00b2ad"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animated-node-path opacity-80"
                />
                {/* Middle-Left: HubSpot to Central Hub */}
                <path
                  d="M 130 210 H 238"
                  stroke="#00b2ad"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animated-node-path opacity-80"
                />
                {/* Bottom-Left: Gmail to Central Hub */}
                <path
                  d="M 145 355 H 195 Q 210 355 210 340 V 250 Q 210 235 225 235 H 238"
                  stroke="#00b2ad"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animated-node-path opacity-80"
                />

                {/* Top-Right: Outlook to Central Hub */}
                <path
                  d="M 415 65 H 365 Q 350 65 350 80 V 170 Q 350 185 335 185 H 322"
                  stroke="#00b2ad"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animated-node-path opacity-80"
                />
                {/* Middle-Right: Google Calendar to Central Hub */}
                <path
                  d="M 430 210 H 322"
                  stroke="#00b2ad"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animated-node-path opacity-80"
                />
                {/* Bottom-Right: Zapier to Central Hub */}
                <path
                  d="M 415 355 H 365 Q 350 355 350 340 V 250 Q 350 235 335 235 H 322"
                  stroke="#00b2ad"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  fill="none"
                  className="animated-node-path opacity-80"
                />
              </svg>

              {/* Central Hub Box (Go Converto) */}
              <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#00b2ad] text-white shadow-[0_12px_35px_rgba(0,178,173,0.35)] flex items-center justify-center transition-transform hover:scale-105 duration-300">
                <Image
                  src="/assets/logo/go-converto-logo-short.png"
                  alt="Go Converto Logo"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-sm"
                />
              </div>

              {/* Card 1: Top-Left (Clio) */}
              <div className="absolute top-3 left-3 sm:left-6 z-10">
                <div className="relative flex flex-col items-center justify-center w-26 h-22 sm:w-30 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <ClioLogo />
                  <span className="mt-1.5 text-xs font-bold text-gray-800">Clio</span>
                  {/* Infinite Pulsating Node Dot on Right Edge */}
                  <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-[#00b2ad]/50 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#00b2ad] border-2 border-white shadow-xs" />
                  </span>
                </div>
              </div>

              {/* Card 2: Middle-Left (HubSpot) */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-2 z-10">
                <div className="relative flex flex-col items-center justify-center w-26 h-22 sm:w-30 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <HubSpotLogo />
                  <span className="mt-1.5 text-xs font-bold text-gray-800">HubSpot</span>
                  {/* Infinite Pulsating Node Dot on Right Edge */}
                  <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-[#00b2ad]/50 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#00b2ad] border-2 border-white shadow-xs" />
                  </span>
                </div>
              </div>

              {/* Card 3: Bottom-Left (Gmail) */}
              <div className="absolute bottom-3 left-3 sm:left-6 z-10">
                <div className="relative flex flex-col items-center justify-center w-26 h-22 sm:w-30 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <GmailLogo />
                  <span className="mt-1.5 text-xs font-bold text-gray-800">Gmail</span>
                  {/* Infinite Pulsating Node Dot on Right Edge */}
                  <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-[#00b2ad]/50 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#00b2ad] border-2 border-white shadow-xs" />
                  </span>
                </div>
              </div>

              {/* Card 4: Top-Right (Outlook) */}
              <div className="absolute top-3 right-3 sm:right-6 z-10">
                <div className="relative flex flex-col items-center justify-center w-26 h-22 sm:w-30 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Infinite Pulsating Node Dot on Left Edge */}
                  <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-[#00b2ad]/50 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#00b2ad] border-2 border-white shadow-xs" />
                  </span>
                  <OutlookLogo />
                  <span className="mt-1.5 text-xs font-bold text-gray-800">Outlook</span>
                </div>
              </div>

              {/* Card 5: Middle-Right (Google Calendar) */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-2 z-10">
                <div className="relative flex flex-col items-center justify-center w-26 h-22 sm:w-30 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Infinite Pulsating Node Dot on Left Edge */}
                  <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-[#00b2ad]/50 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#00b2ad] border-2 border-white shadow-xs" />
                  </span>
                  <GoogleCalendarLogo />
                  <span className="mt-1.5 text-xs font-bold text-gray-800">Google Calendar</span>
                </div>
              </div>

              {/* Card 6: Bottom-Right (Zapier) */}
              <div className="absolute bottom-3 right-3 sm:right-6 z-10">
                <div className="relative flex flex-col items-center justify-center w-26 h-22 sm:w-30 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-[0_8px_25px_rgba(0,0,0,0.06)] p-3 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Infinite Pulsating Node Dot on Left Edge */}
                  <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <span className="absolute w-3 h-3 rounded-full bg-[#00b2ad]/50 animate-ping" />
                    <span className="relative w-3 h-3 rounded-full bg-[#00b2ad] border-2 border-white shadow-xs" />
                  </span>
                  <ZapierLogo />
                  <span className="mt-1.5 text-xs font-bold text-gray-800">Zapier</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM INTEGRATION APP PILLS (8 Horizontal Pills) */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-6xl mx-auto"
        >
          {/* Pill 1: SMS */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <SmsLogo />
            <span>SMS</span>
          </div>

          {/* Pill 2: Verizon */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <VerizonLogo />
            <span><strong className="font-extrabold text-black">verizon</strong><span className="text-gray-400 font-normal ml-1">Verizon</span></span>
          </div>

          {/* Pill 3: AT&T */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <AttLogo />
            <span>AT&T</span>
          </div>

          {/* Pill 4: Twilio */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <TwilioLogo />
            <span>twilio</span>
          </div>

          {/* Pill 5: Dropbox */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <DropboxLogo />
            <span>Dropbox</span>
          </div>

          {/* Pill 6: Google Drive */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <GoogleDriveLogo />
            <span>Google Drive</span>
          </div>

          {/* Pill 7: Microsoft 365 */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-800 transition-all hover:border-gray-300 hover:shadow-xs">
            <Microsoft365Logo />
            <span>Microsoft 365</span>
          </div>

          {/* Pill 8: + and many more */}
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white px-4 py-2 sm:px-5 sm:py-2.5 shadow-2xs text-xs sm:text-sm font-semibold text-gray-600 transition-all hover:border-gray-300 hover:shadow-xs">
            <span className="text-primary-dark font-bold text-base sm:text-lg leading-none">+</span>
            <span>and many more</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
