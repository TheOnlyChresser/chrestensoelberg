"use client"
import {useGSAP} from "@gsap/react";
import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"
gsap.registerPlugin(ScrollTrigger, SplitText)
export default function BlogAnimations() {
    useGSAP(() => {
        const pelement = document.querySelectorAll(".prose p")
        const h1element = document.querySelectorAll(".prose h1")
        const h2element = document.querySelectorAll(".prose h2")
        const h3element = document.querySelectorAll(".prose h3")
        const h4element = document.querySelectorAll(".prose h4")
        const h5element = document.querySelectorAll(".prose h5")
        const olelement = document.querySelectorAll(".prose ol")
        document.fonts.ready.then(() => {
            h1element.forEach((h1) => {

                const h1split = new SplitText(h1, {type: "chars"})

                gsap.from(h1split.chars, {
                    duration: 2,
                    ease: "expo.out",
                    y: -100,
                    opacity: 0,
                    scrollTrigger: h1,
                    stagger: 0.01,
                })
            })
            h2element.forEach((h2) => {
                const h2split = new SplitText(h2, {type: "chars"})

                gsap.from(h2split.chars, {
                    duration: 2,
                    ease: "expo.out",
                    y: -20,
                    opacity: 0,
                    scrollTrigger: h2,
                    stagger: 0.02,
                })
            })
            h3element.forEach((h3) => {
                const h3split = new SplitText(h3, {type: "chars"})

                gsap.from(h3split.chars, {
                    duration: 2,
                    ease: "expo.out",
                    y: -20,
                    opacity: 0,
                    scrollTrigger: h3,
                    stagger: 0.02,
                })
            })
            h4element.forEach((h4) => {
                const h4split = new SplitText(h4, {type: "chars"})

                gsap.from(h4split.chars, {
                    duration: 2,
                    ease: "expo.out",
                    y: -20,
                    opacity: 0,
                    scrollTrigger: h4,
                    stagger: 0.02,
                })
            })
            h5element.forEach((h5) => {
                const h5split = new SplitText(h5, {type: "chars"})

                gsap.from(h5split.chars, {
                    duration: 2,
                    ease: "expo.out",
                    y: -20,
                    opacity: 0,
                    scrollTrigger: h5,
                    stagger: 0.02,
                })
            })
            pelement.forEach((p) => {
                const psplit = new SplitText(p, {type: "lines"})

                gsap.from(psplit.lines, {
                    delay: 0.2,
                    duration: 2,
                    ease: "expo.out",
                    xPercent: -100,
                    autoAlpha: 0,
                    scrollTrigger: p,
                    stagger: 0.1,
                })
            })
            olelement.forEach((ol) => {
                const olsplit = new SplitText(ol, {type: "lines"})

                gsap.from(olsplit.lines, {
                    duration: 2,
                    ease: "expo.out",
                    xPercent: -100,
                    autoAlpha: 0,
                    scrollTrigger: ol,
                    stagger: 0.1,
                })
            })
        })
    })
    return(
        <></>
    )
}