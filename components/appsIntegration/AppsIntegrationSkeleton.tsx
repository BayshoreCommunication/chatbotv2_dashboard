// Same layout as the real Apps & Integrations page (header, three channel
// cards, "How it works"), so loading → loaded only fills in content instead
// of jumping between different-looking placeholders.

function Bar({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-full bg-gray-200 ${className}`} />;
}

export default function AppsIntegrationSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true" aria-label="Loading">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2.5">
          <Bar className="h-5 w-52" />
          <Bar className="h-3 w-80 max-w-full" />
        </div>
        <Bar className="h-7 w-36" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between">
              <div className="h-11 w-11 animate-pulse rounded-xl bg-gray-200" />
              <Bar className="h-5 w-20" />
            </div>
            <Bar className="mt-4 h-4 w-28" />
            <div className="mt-3 space-y-2">
              <Bar className="h-3 w-full" />
              <Bar className="h-3 w-2/3" />
            </div>
            <div className="mt-4 h-9 animate-pulse rounded-lg bg-gray-100" />
            <div className="mt-4 h-9 animate-pulse rounded-lg bg-gray-200" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <Bar className="h-4 w-28" />
        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex gap-3">
              <div className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-gray-200" />
              <div className="flex-1 space-y-2">
                <Bar className="h-3.5 w-32" />
                <Bar className="h-3 w-full" />
                <Bar className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
