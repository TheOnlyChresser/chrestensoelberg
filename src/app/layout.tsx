import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navBar";
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chresten Soelberg - Frontend Udvikler & HTX Elev",
    template: "%s | Chresten Soelberg"
  },
  description: "Chresten Soelberg er en kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier. Se mit portfolio med projekter og færdigheder.",
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
    "Software udvikler"
  ],
  authors: [{ name: "Chresten Soelberg" }],
  creator: "Chresten Soelberg",
  publisher: "Chresten Soelberg",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://chrestensoelberg.dk'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'da_DK',
    url: 'https://chrestensoelberg.dk',
    title: 'Chresten Soelberg - Frontend Udvikler & HTX Elev',
    description: 'Chresten Soelberg er en kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier.',
    siteName: 'Chresten Soelberg Portfolio',
    images: [
      {
        url: '/avatar.png',
        width: 1200,
        height: 630,
        alt: 'Chresten Soelberg - Frontend Udvikler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chresten Soelberg - Frontend Udvikler & HTX Elev',
    description: 'Kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js og moderne webteknologier.',
    images: ['/avatar.png'],
    creator: '@theonlychresser',
  },
  verification: {
    google: 'xk8n21FDaVX0VSKtqZpfOKYN2I39yXJCuG-4uDtZgaE',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
    <head>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/avatar.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Website",
              "name": "Chresten Soelberg Portfolio",
              "description": "Chresten Soelberg er en kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier.",
              "url": "https://chrestensoelberg.dk",
              "author": {
                "@type": "Person",
                "name": "Chresten Soelberg",
                "jobTitle": "Frontend Udvikler",
                "description": "Kreativ HTX-elev og frontend udvikler med ekspertise i React, Next.js, TypeScript og moderne webteknologier",
                "image": "https://chrestensoelberg.dk/avatar.png",
                "sameAs": [
                  "https://github.com/TheOnlyChresser",
                  "https://linkedin.com/in/chresten-soelberg-4577b2272"
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
                  "name": "HTX Roskilde"
                },
                "worksFor": {
                  "@type": "Organization",
                  "name": "Freelance"
                }
              },
              "potentialAction": {
                "@type": "ContactAction",
                "target": "https://chrestensoelberg.dk#kontakt",
                "description": "Kontakt Chresten Soelberg"
              }
            })
          }}
        />
    </head>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <SpeedInsights/>
    <Navbar/>
        {children}
      </body>
    </html>
  );
}
