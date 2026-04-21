// Shown automatically by Next.js while page.tsx awaits server data

function SkeletonLine({ w = "w-full", h = "h-3" }: { w?: string; h?: string }) {
  return <div className={`${w} ${h} rounded-full bg-gray-200 animate-pulse`} />;
}

function SessionSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 border-b border-gray-100">
      <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonLine w="w-2/3" h="h-3.5" />
        <SkeletonLine w="w-full" h="h-3" />
      </div>
    </div>
  );
}

function MessageSkeleton({ align }: { align: "left" | "right" }) {
  return (
    <div className={`flex ${align === "right" ? "justify-end" : "justify-start"}`}>
      {align === "left" && (
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse mr-2 flex-shrink-0" />
      )}
      <div className={`space-y-1.5 ${align === "right" ? "items-end flex flex-col" : ""}`}>
        <div className="h-10 w-52 rounded-2xl bg-gray-200 animate-pulse" />
        <div className="h-2.5 w-20 rounded-full bg-gray-100 animate-pulse" />
      </div>
    </div>
  );
}

function NotifSkeleton() {
  return (
    <div className="flex items-start gap-3 p-3">
      <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <SkeletonLine w="w-3/4" h="h-3.5" />
        <SkeletonLine w="w-1/3" h="h-2.5" />
      </div>
    </div>
  );
}

export default function ChatsLoading() {
  return (
    <div className="flex h-[calc(100vh-100px)] bg-gray-50 rounded overflow-hidden">
      {/* Left — session list */}
      <div className="w-80 border border-gray-200 bg-white flex flex-col h-full">
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <SkeletonLine w="w-28" h="h-5" />
            <div className="w-8 h-8 rounded-lg bg-gray-200 animate-pulse" />
          </div>
          <div className="h-9 w-full rounded-lg bg-gray-200 animate-pulse" />
          <div className="flex justify-between">
            <SkeletonLine w="w-16" h="h-3" />
            <SkeletonLine w="w-14" h="h-3" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => <SessionSkeleton key={i} />)}
        </div>
      </div>

      {/* Center — chat body */}
      <div className="flex flex-1 flex-col bg-white border border-gray-200">
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
            <SkeletonLine w="w-32" h="h-4" />
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-24 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-8 w-20 rounded-lg bg-gray-200 animate-pulse" />
            <div className="h-8 w-28 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>
        {/* Messages */}
        <div className="flex-1 bg-gray-50 p-6 space-y-4 overflow-hidden">
          <MessageSkeleton align="left" />
          <MessageSkeleton align="right" />
          <MessageSkeleton align="left" />
          <MessageSkeleton align="right" />
          <MessageSkeleton align="left" />
          <MessageSkeleton align="right" />
        </div>
        {/* Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <div className="flex gap-3">
            <div className="flex-1 h-10 rounded-lg bg-gray-200 animate-pulse" />
            <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Right — notifications */}
      <div className="flex items-start pl-4">
        <div className="w-80 flex flex-col gap-5">
          <div className="rounded border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <SkeletonLine w="w-28" h="h-4" />
            </div>
            <div className="p-4 space-y-1">
              {Array.from({ length: 4 }).map((_, i) => <NotifSkeleton key={i} />)}
            </div>
          </div>
          <div className="rounded border border-gray-200 bg-white overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <SkeletonLine w="w-20" h="h-4" />
            </div>
            <div className="p-4 space-y-1">
              {Array.from({ length: 3 }).map((_, i) => <NotifSkeleton key={i} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
