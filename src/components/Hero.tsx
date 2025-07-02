"use client";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";
import {useRef} from "react";

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
        });
        const tl = gsap.timeline({})
        tl.to("#ego", {
            rotate: 5,
            scale: 5,
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
                    ego.classList.add("text-gradient");
                },
                onScrubComplete: () => {

                    ego.classList.remove("text-gradient");
                },
            }
        });



    }, {scope: main});

    return (
        <>
            <section ref={main} id="hero" className="w-full noisy bg-[#FDFDFD] flex flex-col items-center text-center min-h-screen">
                <div className="w-full">
                    <div className="z-50 flex flex-col md:flex-row items-center min-h-screen justify-center text-center md:text-left gap-12 mx-auto md:ml-20 w-full">
                        <div className="mt-20 md:mt-0 flex md:hidden">
                            <div className="flex-1">
                                <img
                                    src="/apple-touch-icon.png"
                                    alt="Avatar"
                                    className="flex md:hidden rounded-full w-100 h-100 object-fit mx-auto"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <h1
                                className="hidden md:block md:mb-10 md:text-7xl font-bold md:flex-row"
                            ><span className="font-inter mr-5">Hej</span><span id="hand">👋🏻</span></h1>
                            <h2 className="text-7xl mb-10 bg-gradient-to-br from-black from-30% via-[#d5d8f6] via-80% to-[#fdf7fe] bg-clip-text font-bold leading-[1] tracking-tight text-transparent">
                                <span className="md:hidden">Hej, </span>Jeg hedder <span className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#A3F7BF] to-[#C5C9FF]" id="titlespan">Chresten</span>
                            </h2>
                            <p className="text-2xl font-semibold text-muted-foreground mb-6">
                                Jeg er en average og <span className="text-yellow-500 font-bold">kedelig</span> HTX&apos;er med for mange interesser og alt for <span id="ego" className="inline-block">stort</span> ego.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <button className="rounded-md h-16 w-50 text-xl font-bold cursor-pointer transition delay-[25ms] bg-white border-black border-1 text-black hover:bg-black hover:text-white">
                                    Giv mig et kald
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <img
                                src="/apple-touch-icon.png"
                                alt="Avatar"
                                id="avatar"
                                className="hidden md:flex w-125 h-125 object-fit mx-auto"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero