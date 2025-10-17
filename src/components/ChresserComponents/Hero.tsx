"use client"

import Image from "next/image"
import Button from "./ui/Button";

export default function Home() {
    return (
        <main
            className="min-h-screen w-full max-w-[1200px] flex flex-col pt-64 pb-40 md:pt-24 px-8 md:px-20 md:grid md:grid-cols-2 md:items-start">
            <div className="flex flex-col items-center justify-center h-80 -mt-8 md:mt-8">
                <div className="md:hidden flex justify-center mb-12 md:mt-0">
                    <Image src="/avatar.png" height={200} width={200} alt="Avatar" aria-placeholder="Avatar" />
                </div>
                <h1 className="text-center text-black/80 text-4xl font-semibold bg-white/80 rounded-md p-2">
                    Hej.
                </h1>
                <h1 className="mt-2 text-center text-black/80 text-4xl font-semibold bg-white/80 rounded-md p-2">
                    Jeg hedder Chresten
                </h1>
                <p className="text-center mt-4 text-md text-neutral-500 bg-white/60 rounded-md p-1">
                    Jeg er en average og <span className="bg-clip-text bg-gradient-to-tr from-red-500 to-purple-500 text-transparent font-semibold">kedelig</span> HTX'er med for mange interesser.
                </p>
                <Button size="md" className="mt-8" onClick={() => { document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' }); }}>
                    Giv mig et kald
                </Button>
            </div>
            <div className="hidden md:flex justify-center mt-24 md:mt-0">
                <Image src="/avatar.png" height={400} width={400} alt="Avatar" aria-placeholder="Avatar" />
            </div>
        </main>
    );
}
