import Hero from "@/components/Hero";
import OmMig from "@/components/OmMig";

export const metadata = {
  title: "Chresten – Portfolio",
  description:
      "Hej! Jeg hedder Chresten, og jeg er en nysgerrig HTX’er med passion for hjemmesideudvikling, performance og kreative weboplevelser.",
  keywords: [
    "Chresten",
    "Frontend udvikler",
    "HTX elev",
    "Next.js portfolio",
    "React udvikler",
    "Webdesign",
    "Tailwind CSS",
    "Webudvikling",
    "TypeScript",
    "Figma design",
  ],
  robots: "index, follow",
  openGraph: {
    title: "Chresten – Kreativ HTX'er og Webudvikler",
    description:
        "Chresten's Portfolio – En kreativ HTX-elev med fokus på moderne frontend, performance og brugervenligt design.",
    url: "https://chrestensoelberg.dk",
    siteName: "Chresten Portfolio",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Chresten Portfolio Preview",
      },
    ],
    locale: "da_DK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chresten – Portfolio",
    description:
        "HTX’er med flair for moderne webudvikling – Se mine evner med blandt andet React, Next.js og Tailwind CSS.",
    images: ["/preview.png"],
  },
};

export default function Home() {
  return (
    <div className="bg-standard flex-center w-full">
      <div className="noisy w-full flex justify-center">
        <main className="w-full max-w-400 min-h-screen flex-col flex justify-center text-black">
          <Hero/>
          <OmMig/>
        </main>
      </div>
    </div>
  );
}
