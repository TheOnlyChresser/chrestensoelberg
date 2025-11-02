import Hero from "@/components/ChresserComponents/sections/Hero2";
import Script from "next/script";

export const metadata = {
  title: "Billig og Personlig Hjemmeside | Chresten Soelberg",
  description:
      "Få en billig, skræddersyet og SEO-optimeret hjemmeside bygget fra bunden. Perfekt til selvstændige og privatpersoner, der ønsker et professionelt design.",
  keywords: [
    "billig hjemmeside",
    "personlig webudvikler",
    "webdesigner Danmark",
    "skræddersyet hjemmeside",
    "webudvikling uden WordPress",
    "hjemmeside til små virksomheder",
    "billig webudvikling",
    "SEO optimeret hjemmeside",
    "Next.js udvikler",
    "Tailwind CSS udvikler",
    "hjemmeside udvikling",
    "frontend udvikler",
    "professionel hjemmeside",
    "dansk webdesigner",
    "webudvikler",
    "hjemmeside pris",
    "webdesign tilbud",
    "hurtig hjemmeside",
    "sikker hjemmeside",
    "Chresten Soelberg"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Billig og Personlig Hjemmeside | Chresten Soelberg",
    description:
        "Professionel, billig og SEO-optimeret hjemmeside bygget fra bunden. Få et unikt design uden WordPress som er perfekt til selvstændige.",
    url: "https://www.chrestensoelberg.dk",
    siteName: "Chresten Soelberg Webudvikling",
    locale: "da_DK",
    type: "website",
    images: [
      {
        url: "https://www.chrestensoelberg.dk/avatar.png",
        width: 1200,
        height: 630,
        alt: "Billig hjemmeside udviklet af Chresten Soelberg",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Billig & Personlig Hjemmeside | Chresten Soelberg",
    description:
        "Få en skræddersyet og SEO-optimeret hjemmeside uden WordPress. Jeg bygger alt fra bunden. Hurtigt, sikkert og prisvenligt.",
  },
  alternates: {
    canonical: "https://www.chrestensoelberg.dk",
  },
};

export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Chresten Soelberg",
            "jobTitle": "Frontend Udvikler",
            "description": "Kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier",
            "url": "https://www.chrestensoelberg.dk",
            "sameAs": [
              "https://github.com/theonlychresser",
            ],
            "knowsAbout": [
              "React",
              "Next.js",
              "TypeScript",
              "JavaScript",
              "HTML",
              "CSS",
              "Tailwind CSS",
              "Frontend Development",
              "Web Design",
              "UI/UX Design"
            ],
            "memberOf": {
              "@type": "EducationalOrganization",
              "name": "HTX"
            },
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            }
          })
        }}
      />
        <main className="w-full min-h-screen flex-center flex-col justify-center text-black font-inter">
          <Hero/>
          <footer className="w-full bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm py-4 px-6 md:px-12 flex justify-center items-center">
            <p className="text-center max-w-3xl">
              Jeg laver hjemmesider som hobby og ikke som en registreret virksomhed. Jeg gør altid mit bedste for at hjælpe, men kan ikke holdes ansvarlig for tekniske fejl, nedetid eller ændringer hos hostingudbydere.
            </p>
          </footer>
          <footer className="w-full bg-blue-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm py-4 px-6 md:px-12 flex justify-center items-center">
            <p className="text-center max-w-3xl">
              Kom du her for at se mine noter? Se dem <a href="/noter" className="underline hover:no-underline underline-offset-2 active:no-underline decoration-2 decoration-sky-500 text-black dark:text-white/80">her</a>
            </p>
          </footer>
        </main>
    </>
  );
}
