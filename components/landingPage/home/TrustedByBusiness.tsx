"use client";

const LOGOS = [
  { icon: "⬡", name: "Northwind" },
  { icon: "◆", name: "Vertex Labs" },
  { icon: "●", name: "Brightside Co." },
  { icon: "▲", name: "Alderan" },
  { icon: "■", name: "Lumen Group" },
  { icon: "◈", name: "Crestline" },
  { icon: "✦", name: "Solace Retail" },
];

const TrustedByBusiness = () => {
  return (
    <section className="bg-gray-50 py-8 lg:py-10">
      <style jsx global>{`
        @keyframes logoScroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="mb-6 text-center text-sm font-extrabold uppercase tracking-wide text-thunder-black sm:text-base">
          Trusted by Business Worldwide
        </h2>

        <div className="overflow-hidden bg-gray-100/80 py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-[logoScroll_26s_linear_infinite] items-center gap-14 px-8 hover:[animation-play-state:paused]">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap text-base font-bold text-gray-500 sm:text-lg"
              >
                <span className="text-lg text-gray-500 sm:text-xl">
                  {logo.icon}
                </span>
                {logo.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedByBusiness;
