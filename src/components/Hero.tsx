"use client";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import {useRef} from "react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const main = useRef(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        const ego = document.getElementById("ego");
        gsap.to("#hand", {
            rotate: 30,
            duration: 0.3,
            yoyo: true,
            repeat: 11,
            transformOrigin: "130% 130%",
            ease: "power1.inOut",
            onComplete: () => {gsap.to("#theghost", {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
            })}
        });
        const tl = gsap.timeline({})
        tl.to("#ego", {
            rotate: 5,
            scale: 2,
            duration: 3,
            yoyo: true,
            repeat: 1,
            transformOrigin: "130% 130%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                //markers: true,
                endTrigger: "#avatar",
                end: "+=50",
                scrub: 4,
                onEnter: () => {
                    ego?.classList.add("text-gradient");
                },
                onScrubComplete: () => {

                    ego?.classList.remove("text-gradient");
                },
            }
        });



    }, {scope: main});

    return (
        <>
            <section 
                ref={main} 
                id="hero" 
                className="w-full flex flex-col items-center text-center min-h-screen"
                aria-label="Hovedsektion - Chresten Soelberg"
            >
                <div className="w-full" id="navtrigger">
                    <div className="z-50 flex flex-col md:flex-row items-center min-h-screen justify-center text-center md:text-left gap-12 mx-auto md:ml-20 w-full">
                        <div className="mt-20 md:mt-0 flex md:hidden">
                            <div className="flex-1">
                                <Image
                                    src="/avatar.png"
                                    alt="Chresten Soelberg - Frontend Udvikler"
                                    width={200}
                                    height={200}
                                    className="flex md:hidden rounded-full w-50 h-50 object-fit mx-auto"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <header>
                                <h2
                                    id="theghost" 
                                    className="hidden md:flex md:mb-5 md:text-2xl font-bold md:flex-row text-black/75"
                                    aria-label="Hilsen"
                                >
                                    <span className="font-inter mr-5">Hej</span>
                                    <span 
                                        id="hand" 
                                        role="img" 
                                        aria-label="vinkende hånd"
                                        className="inline-block"
                                    >
                                        👋🏻
                                    </span>
                                </h2>
                                <h2 className="text-4xl md:text-7xl mb-10 pb-2 bg-gradient-to-br from-black from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text font-bold leading-[1] tracking-tight text-transparent">
                                    <span className="md:hidden">Hej, </span>
                                    Jeg hedder{" "}
                                    <span 
                                        className="text-4xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#A3F7BF] to-[#C5C9FF]" 
                                        id="titlespan"
                                        aria-label="Chresten Soelberg"
                                    >
                                        Chresten
                                    </span>
                                </h2>
                            </header>
                            <p className="text-2xl font-semibold text-black/90 mb-6 mx-10 md:mx-0">
                                Jeg er en average og{" "}
                                <span className="text-gradient-2 font-bold">kedelig</span>{" "}
                                HTX&apos;er med for mange interesser og alt for{" "}
                                <span 
                                    id="ego" 
                                    className="inline-block"
                                    aria-label="stort ego"
                                >
                                    stort
                                </span>{" "}
                                ego.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <button 
                                    className="rounded-md h-16 w-50 text-xl font-bold cursor-pointer transition delay-[25ms] bg-white/30 backdrop-blur-2xl border-black/30 border-1 text-black/90 hover:bg-black/30 hover:text-white/90 active:bg-black/30 active:text-white/90"
                                    aria-label="Kontakt Chresten Soelberg"
                                    onClick={() => {
                                        document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                >
                                    Giv mig et kald
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <Image
                                src="/avatar.png"
                                alt="Chresten Soelberg - Frontend Udvikler og HTX Elev"
                                id="avatar"
                                width={500}
                                height={500}
                                className="hidden md:flex w-125 h-125 object-fit mx-auto"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero