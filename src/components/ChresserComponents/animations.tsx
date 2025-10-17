"use client"

import gsap from "gsap"
import { ScrollTrigger, SplitText } from "gsap/all"
import {useGSAP} from "@gsap/react";
gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Animations() {
    useGSAP(() => {
    const glasstitle = document.querySelectorAll(".glass-title")
    const glasstext = document.querySelectorAll(".glass-text")
    glasstitle.forEach(title => {
        const titlesplit = new SplitText(title, {type: "words"})
            gsap.from(titlesplit.words, {
                opacity: 0,
                stagger: 0.1,
                y: -10,
                scrollTrigger: {
                    start: "center bottom",
                }
            })
        })
        const textsplit = new SplitText(".glass-text", {type: "lines", mask: "lines", linesClass: "lines++",})
        gsap.from(textsplit.lines, {
            autoAlpha: 0,
            mask: "lines",
            stagger: 0.1,
            y: -10,
            scrollTrigger: {
                start: "center bottom",
            }
        })
    })
    return (
        <></>
    )
}