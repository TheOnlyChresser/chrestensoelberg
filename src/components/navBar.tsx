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
            backdropFilter: "blur(10px)",
            duration: 2,
            scrollTrigger: {
                trigger: "#navtrigger",
                start: "top top",
                endTrigger: "#navtrigger",
                end: "100% top",
                scrub: 1,
            }
        })
    })
    return (
        <nav className="fixed justify-center items-center w-full flex-col z-1000">
            <div className="justify-between px-2 pt-2 items-center flex flex-row w-full">
                <Link href="/" className="mb-2 flex items-center justify-center cursor-pointer">
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
                    <Link href="/#skills" className="navLink" >Skills</Link>
                    <Link href="/#kontakt" className="navLink">Kontakt</Link>
                </div>
            </div>
        </nav>
    )
}