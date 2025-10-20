"use client"

import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/all"
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Navbar () {
    gsap.registerPlugin(ScrollTrigger)
    useGSAP(() => {
        gsap.to("nav", {
            backdropFilter: "blur(8px)",
            duration: 2,
            borderBottom: "1px solid rgba(17, 24, 39, 0.1)",
            backgroundColor: "rgba(17, 24, 39, 0.02)",
            scrollTrigger: {
                trigger: "#navtrigger",
                start: "top top",
                endTrigger: "#navtrigger",
                end: "+=200",
                scrub: 1,
            }
        })
    })
    return (
        <nav className="fixed justify-center items-center w-full flex-col z-1000 font-montserrat py-2">
            <div className="justify-between px-2 pt-2 items-center flex flex-row w-full 2xl:px-[12.5vw]">
                <Link href="/" className="mb-2 flex items-center justify-center cursor-pointer">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transition-transform duration-300 hover:scale-105 cursor-pointer dark:text-white">Chresten</h2>
                </Link>
                <div className="group">
                    { usePathname() === "/noter" || usePathname().startsWith("/noter/") &&
                        (<Link href="/noter" className="navLink">Noter</Link>)}
                    <Link href="/projekter" className="navLink">Projekter</Link>
                    <Link href="/#priser" className="navLink" >Priser</Link>
                    <Link href="/#kontakt" className="navLink">Kontakt</Link>
                </div>
            </div>
        </nav>
    )
}