import React from "react";
import Link from "next/link";
import Image from "next/image"
import {Pointer} from "@/components/ui/pointer";
import {CursorFollow, CursorProvider} from "@/components/ui/shadcn-io/animated-cursor";
import Navbar from "@/components/ChresserComponents/navBar";

export default function Page() {
    return (
        <>
        <Navbar/>
        <div className="bg-gradient-to-tr from-white via-blue-50 to-green-50 dark:from-black dark:via-[#050A1F] dark:to-[#041F12] flex-center w-full">
            <div className="min-h-screen w-full mb-20 md:mb-4 flex flex-col items-center">
                <div className="mt-16 md:mt-12 mb-4 flex-center text-8xl text-gradient font-bold h-30">
                    <div className="prose dark:prose-invert max-w-none">
                        <h1 className="font-inter">Projekter</h1>
                    </div>
                </div>

                <div className="mx-4 sm:mx-8 lg:mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
                    <Link className="z-50 col-span-3 group relative glass-box hover:cursor-pointer hover:bg-sky-500/40 hover:border-sky-500/80 hover:text-white overflow-visible transition-transform hover:scale-[0.98] hover:shadow-sky-500/40" href="https://jatzy.vercel.app/">
                        <div className="p-4 pt-0">
                            <div className="prose font-bold mb-4">
                                <h3>
                                    <span
                                        className="-m-4 font-inter no-underline break-all not-prose text-black dark:text-gray-50 group-hover:text-white line-clamp-3 md:line-clamp-2 p-1"
                                    >
                                        Yatzy
                                    </span>
                                </h3>
                            </div>
                            <div className="flex w-full max-h-48 md:max-h-56 lg:max-h-64 border border-gray-500 group-active:border-sky-500 group-hover:border-sky-500 rounded-md">
                                <Image
                                    src="/yatzy.png"
                                    alt="Yatzy Game"
                                    className="rounded-md object-contain"
                                    width={500}
                                    height={100}
                                />
                            </div>

                            <div className="uppercase text-sm mt-4 flex items-center italic">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["HTX", "Programmering", "NextJS", "Flask", "Typescript", "Python", "SQL", "Supabase", "Multiplayer"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="dark:text-gray-200 font-inter bg-blue-500/10 dark:bg-blue-400/20 group-hover:bg-white/10 border border-black/20 dark:border-white/20 rounded-full px-3 py-1 text-xs uppercase italic"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <CursorProvider>
                            <CursorFollow>
                                <div className="w-64 dark:bg-black dark:text-gray-50 bg-white border-2 border-sky-500 border-dashed text-sm text-black rounded-lg p-4 ">
                                    <p>
                                        Yatzy lavet med Flask og Next.js. Brugere kan oprette en server, dele et link og spille sammen online med live opdatering af point og et tur-system. Projektet kombinerer Python backend og NextJS frontend.
                                    </p>
                                </div>
                            </CursorFollow>
                        </CursorProvider>

                    </Link>
                    <Link className="col-span-3 group relative glass-box hover:cursor-pointer hover:bg-sky-500/40 hover:border-sky-500/80 hover:text-white overflow-visible transition-transform hover:scale-[0.98] hover:shadow-sky-500/40" href="https://newtonsmethod.vercel.app/">
                        <div className="p-4 pt-0">
                            <div className="prose font-bold mb-4">
                                <h3>
                                    <span
                                        className="-m-4 font-inter no-underline break-all not-prose text-black dark:text-gray-50 group-hover:text-white line-clamp-3 md:line-clamp-2 p-1"
                                    >
                                        Newtons metode
                                    </span>
                                </h3>
                            </div>
                            <div className="flex w-full max-h-48 md:max-h-56 lg:max-h-64 border border-gray-500 group-active:border-sky-500 group-hover:border-sky-500 rounded-md">
                                <Image
                                    src="/newtonsmethod.png"
                                    alt="Newtons metode hjemmeside"
                                    className="rounded-md object-contain"
                                    width={500}
                                    height={100}
                                />
                            </div>

                            <div className="uppercase text-sm mt-4 flex items-center italic">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {["HTX", "Matematik", "Programmering", "SRC", "NextJS", "MathJax", "Typescript", "MathJS", "GSAP", "MUI X Charts"].map((tag) => (
                                        <span
                                            key={tag}
                                            className="dark:text-gray-200 font-inter bg-blue-500/10 dark:bg-blue-400/20 group-hover:bg-white/10 border border-black/20 dark:border-white/20 rounded-full px-3 py-1 text-xs uppercase italic"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <CursorProvider>
                            <CursorFollow>
                                <div className="w-64 bg-white dark:bg-black dark:text-gray-50 border-2 border-sky-500 border-dashed text-sm text-black rounded-lg p-4 ">
                                    <p>
                                        En moderne hjemmeside lavet med NextJS som inkludere animationer og mere. Efter at udfylde de relevante parametre bliver man sendt til /resultater hvor du kan se nulpunktet for den givne funktion, en graf og meget mere.
                                    </p>
                                </div>
                            </CursorFollow>
                        </CursorProvider>

                    </Link>
                </div>
            </div>
        </div>
        </>
    );
}
