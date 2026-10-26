// Fallback for every dashboard page that has no loading.tsx of its own. Without
// it, clicking a sidebar/profile link shows nothing until the page's server
// work finishes, so the click feels dead and people click again.

export default function DashboardLoading() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading">
      <div className="h-7 w-48 animate-pulse rounded-full bg-gray-200" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
    </div>
  );
}
