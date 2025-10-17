import Hero from "@/components/ChresserComponents/Hero";
import OmMig from "@/components/ChresserComponents/OmMig";
import Kontakt from "@/components/ChresserComponents/Kontakt";
import Script from "next/script";
import Quote from "@/components/ChresserComponents/Quote";

export const metadata = {
  title: "Chresten Soelberg - Frontend Udvikler & HTX'er",
  description:
      "Jeg er en kreativ HTX-elev og frontend udvikler med ekspertise i React, Python, SQL og moderne webteknologier.",
  keywords: [
    "Chresten Soelberg",
    "Frontend udvikler",
    "HTX elev",
    "React udvikler",
    "Next.js udvikler",
    "TypeScript udvikler",
    "Webdesign",
    "Webudvikling",
    "Portfolio",
    "Frontend",
    "JavaScript",
    "CSS",
    "HTML",
    "Tailwind CSS",
    "Figma",
    "Webdesigner",
    "Programmør",
    "Software udvikler",
    "Dansk udvikler",
    "udvikler"
  ],
  robots: "index, follow",
  openGraph: {
    title: "Chresten Soelberg - Frontend Udvikler & HTX'er",
    description:
        "Jeg er en kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier.",
    url: "https://www.chrestensoelberg.dk",
    siteName: "Chresten Soelberg",
    images: [
    ],
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Chresten Soelberg - Frontend Udvikler & HTX'er",
    description:
        "Kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js og moderne webteknologier.",
    images: [],
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
              "https://github.com/chrestensoelberg",
              "https://linkedin.com/in/chrestensoelberg"
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
          <Quote/>
          <OmMig/>
          <Kontakt/>
        </main>
    </>
  );
}
