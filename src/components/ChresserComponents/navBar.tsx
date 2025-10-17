"use client"

import Image from "next/image";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/all"
import Link from "next/link";

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
        <nav className="fixed justify-center items-center w-full flex-col z-1000">
            <div className="justify-between px-2 pt-2 items-center flex flex-row w-full 2xl:px-[12.5vw]">
                <Link href="/public" className="mb-2 flex items-center justify-center cursor-pointer">
                    <Image
                    width={50}
                    height={50}
                    src="/avatar.png"
                    alt="Chresten Avatar"
                    className="w-15 h-15"
                    />
                </Link>
                <div className="group">
                    <Link href="/noter" className="navLink">Noter</Link>
                    <Link href="/projekter" className="navLink">Projekter</Link>
                    <Link href="/public#skills" className="navLink" >Skills</Link>
                    <Link href="/public#kontakt" className="navLink">Kontakt</Link>
                </div>
            </div>
        </nav>
    )
}