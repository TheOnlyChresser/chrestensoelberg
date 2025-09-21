import Hero from "@/components/Hero";
import OmMig from "@/components/OmMig";
import Kontakt from "@/components/Kontakt";
import Script from "next/script";

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
      {
        url: "/avatar.png",
        width: 1000,
        height: 1000,
        alt: "Chresten Soelberg - Frontend Udvikler",
      },
    ],
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chresten Soelberg - Frontend Udvikler & HTX'er",
    description:
        "Kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js og moderne webteknologier.",
    images: ["/avatar.png"],
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
            "image": "https://www.chrestensoelberg.dk/avatar.png",
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
      <div className="bg-standard flex-center w-full">
        <div className="noisy w-full flex justify-center">
          <main className="w-full min-h-screen flex-col flex justify-center text-black">
            <Hero/>
            <OmMig/>
            <Kontakt/>
          </main>
        </div>
      </div>
    </>
  );
}
