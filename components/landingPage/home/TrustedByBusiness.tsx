"use client";

import Image from "next/image";
import Container from "@/components/shared/Container";

const LOGOS = [
  { file: "Golden-Wealth.png", name: "Golden Wealth" },
  { file: "Hess@2x.png", name: "Hess" },
  { file: "MC-Culloch-Law.png", name: "McCulloch Law" },
  { file: "NOVASTRA-OFFICIAL.png", name: "Novastra" },
  { file: "Prestige.png", name: "Prestige" },
  { file: "Tampa-Motion1.png", name: "Tampa Motion" },
  { file: "Tripathi-Vongsyprasom.png", name: "Tripathi Vongsyprasom" },
  { file: "aci-logo.png", name: "ACI" },
  { file: "aireserv.svg", name: "Aire Serv" },
  { file: "apex.svg", name: "Apex" },
  { file: "bully-projects.png", name: "Bully Projects" },
  { file: "butterfly-foundation.svg", name: "Butterfly Foundation" },
  { file: "carter-injury-law.png", name: "Carter Injury Law" },
  { file: "elite-spa.svg", name: "Elite Spa" },
  { file: "embark-logo.png", name: "Embark" },
  { file: "essence-VFX.png", name: "Essence VFX" },
  { file: "fitly-logo.png", name: "Fitly" },
  { file: "huraia.svg", name: "Huraia" },
  { file: "klothen.svg", name: "Klothen" },
  { file: "letmates-logo.png", name: "Letmates" },
  { file: "melamed-law.png", name: "Melamed Law" },
  { file: "nazara.svg", name: "Nazara" },
  { file: "robert-johnson.svg", name: "Robert Johnson" },
  { file: "sheba-logo.png", name: "Sheba" },
  { file: "super-equestrian.svg", name: "Super Equestrian" },
  { file: "the-cat-flix.svg", name: "The Cat Flix" },
  { file: "tiki-travel.png", name: "Tiki Travel" },
  { file: "trip-law.svg", name: "Trip Law" },
  { file: "zarin-associates.png", name: "Zarin Associates" },
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

      <Container>
        <h2 className="mb-6 text-center text-sm font-extrabold uppercase tracking-wide text-thunder-black sm:text-base">
          Trusted by Business Worldwide
        </h2>

        <div className="overflow-hidden bg-gray-100/80 py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-[logoScroll_50s_linear_infinite] items-center gap-12 px-8 hover:[animation-play-state:paused]">
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <span
                key={`${logo.file}-${i}`}
                className="relative h-9 w-28 shrink-0 grayscale opacity-60 transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-10 sm:w-32"
                title={logo.name}
              >
                <Image
                  src={`/assets/client-logo/${logo.file}`}
                  alt={logo.name}
                  fill
                  sizes="128px"
                  className="object-contain"
                />
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrustedByBusiness;
