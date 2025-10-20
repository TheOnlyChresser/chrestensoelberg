"use client"

import {HTMLAttributes, ReactNode} from "react";
import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import {useGSAP} from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText)

type FeatureProps = HTMLAttributes<HTMLDivElement> & {
    className?: string;
    children: ReactNode;
    color?: FeatureColor;
    size?: FeatureSize;
    overskrift: string;
};

type FeatureColor = "blue" | "black" | "green" | "red";
type FeatureSize = "sm" | "md" | "lg" | "xl";

export default function Feature ({className = "", children, color = "green", size = "md", overskrift, ...props}: FeatureProps) {
    useGSAP(()=>{
        const features = gsap.utils.toArray<HTMLElement>(".feature");
        const tl = gsap.timeline({
            scrollTrigger: "feature",
        });

        tl.fromTo(features,
            { y: 30, opacity: 0, filter: "blur(8px)" },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.25,
            }
        );

        features.forEach(feature => {
            const svg = feature.querySelector("svg");
            const h3 = feature.querySelector("h3");
            const p = feature.querySelector("p");

            if (svg) {
                gsap.fromTo(svg,
                    { scale: 0.8, opacity: 0, rotate: -10 },
                    {
                        scale: 1,
                        opacity: 1,
                        rotate: 0,
                        duration: 1,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: feature,
                            start: "top 85%",
                        },
                        delay: 0.2
                    }
                )
            }

            if (h3) {
                const h3Split = new SplitText(h3, {type: "lines"});
                gsap.from(h3Split.lines, {
                    opacity: 0,
                    y: 20,
                    filter: "blur(6px)",
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.15,
                    delay: 0.4,
                    scrollTrigger: {
                        trigger: feature,
                        start: "top 85%",
                    },
                })
            }

            if (p) {
                const pSplit = new SplitText(p, {type: "lines"});
                gsap.from(pSplit.lines, {
                    opacity: 0,
                    y: 15,
                    filter: "blur(4px)",
                    duration: 1,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: 0.6,
                    scrollTrigger: {
                        trigger: feature,
                        start: "top 85%",
                    },
                })
            }
        })
    })
    const colorClass: Record<FeatureColor, string> = {
        blue: "text-blue-500",
        black: "text-black/80",
        green: "text-green-500 dark:text-green-600",
        red: "text-red-500",
    }
    const sizeClass: Record<FeatureSize, string> = {
        sm: "",
        md: "",
        lg: "",
        xl: "",
    }
    return (
        <div className={`flex items-center flex-col feature ${colorClass[color]} ${sizeClass[size]} ${className}`} {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-12">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"/>
            </svg>
            <h3 className="text-lg font-bold text-black/80 dark:text-gray-200 text-center">
                {overskrift}
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400 text-center max-w-[44vw] md:max-w-[20vw]">
                {children}
            </p>
        </div>
    )
}