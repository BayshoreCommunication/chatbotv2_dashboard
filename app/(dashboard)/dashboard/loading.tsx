function Pulse({ className }: { className: string }) {
  return <div className={`animate-pulse rounded bg-gray-200 ${className}`} />;
}

function StatCardSkeleton() {
  return (
    <div className="rounded border border-gray-200 bg-white p-5">
      <Pulse className="h-3.5 w-24 mb-3" />
      <Pulse className="h-8 w-16 mb-2" />
      <Pulse className="h-3 w-32" />
    </div>
  );
}

function NotifRowSkeleton() {
  return (
    <div className="flex items-start gap-2.5 p-2.5 @7xl:gap-3 @7xl:p-3">
      <Pulse className="h-9 w-9 rounded-lg shrink-0 @7xl:h-10 @7xl:w-10" />
      <div className="flex-1 space-y-2">
        <Pulse className="h-3.5 w-3/4" />
        <Pulse className="h-2.5 w-1/3" />
      </div>
    </div>
  );
}

function ValueTileSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-white/70 p-3">
      <Pulse className="h-9 w-9 rounded-lg shrink-0" />
      <div className="flex-1 space-y-2">
        <Pulse className="h-3.5 w-32" />
        <Pulse className="h-2.5 w-40" />
      </div>
    </div>
  );
}

function ValueBannerSkeleton() {
  return (
    <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <Pulse className="h-3 w-40" />
          <Pulse className="h-8 w-48" />
        </div>
        <Pulse className="h-8 w-24 rounded-full" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <ValueTileSkeleton />
        <ValueTileSkeleton />
      </div>
    </div>
  );
}

function CategoryRowSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Pulse className="h-3.5 w-36 shrink-0" />
      <Pulse className="h-6 flex-1" />
      <Pulse className="h-3.5 w-8 shrink-0" />
      <Pulse className="h-3 w-16 shrink-0" />
    </div>
  );
}

export default function DashboardLoading() {
  return (
    <div className="@container">
      <div className="flex flex-col gap-6 @5xl:flex-row bg-gray-50 min-h-[calc(100vh-115px)]">
      {/* Main content */}
      <div className="min-w-0 flex-1 overflow-hidden">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between rounded border border-gray-200 bg-white p-6">
          <Pulse className="h-7 w-32" />
          <Pulse className="h-8 w-8 rounded-lg" />
        </div>

        {/* Cost vs. Value banner */}
        <ValueBannerSkeleton />

        {/* Stat cards */}
        <div className="mb-6 grid grid-cols-2 gap-5 @7xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>

        {/* What people are asking about */}
        <div className="mb-6 rounded border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between gap-2">
            <Pulse className="h-4 w-52" />
            <Pulse className="h-3 w-24" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => <CategoryRowSkeleton key={i} />)}
          </div>
        </div>

        {/* Chart card */}
        <div className="rounded border border-gray-200 bg-white p-6">
          {/* Chart tabs + period selector */}
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-6 border-b border-gray-200 pb-3">
              <Pulse className="h-4 w-20" />
              <Pulse className="h-4 w-24" />
            </div>
            <div className="flex gap-4">
              <Pulse className="h-4 w-20" />
              <Pulse className="h-4 w-20" />
            </div>
          </div>
          {/* Chart area — mirrors the real area chart's line + gradient wash */}
          <div className="h-80 flex flex-col justify-between @7xl:h-96">
            <div className="flex-1 animate-pulse pb-4">
              <svg
                viewBox="0 0 400 160"
                preserveAspectRatio="none"
                className="h-full w-full"
              >
                <defs>
                  <linearGradient id="skeletonGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e5e7eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#e5e7eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <path
                  d="M0,120 C40,90 60,110 100,80 C140,50 160,90 200,70 C240,50 260,100 300,60 C340,20 360,60 400,40 V160 H0 Z"
                  fill="url(#skeletonGradient)"
                />
                <path
                  d="M0,120 C40,90 60,110 100,80 C140,50 160,90 200,70 C240,50 260,100 300,60 C340,20 360,60 400,40"
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {/* X-axis labels */}
            <div className="flex gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <Pulse key={i} className="flex-1 h-3" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar — side-by-side when stacked below the main content,
          stacked vertically once it becomes the narrow right column (@5xl+). */}
      <div className="w-full shrink-0 flex flex-row gap-5 @5xl:w-72 @5xl:flex-col @7xl:w-80">
        <div className="min-w-0 flex-1 rounded border border-gray-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 @7xl:px-6 @7xl:py-4">
            <Pulse className="h-4 w-28" />
          </div>
          <div className="p-3 space-y-1 @7xl:p-4">
            {Array.from({ length: 5 }).map((_, i) => <NotifRowSkeleton key={i} />)}
          </div>
        </div>

        <div className="min-w-0 flex-1 rounded border border-gray-200 bg-white overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 @7xl:px-6 @7xl:py-4">
            <Pulse className="h-4 w-16" />
          </div>
          <div className="p-3 space-y-1 @7xl:p-4">
            {Array.from({ length: 5 }).map((_, i) => <NotifRowSkeleton key={i} />)}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
