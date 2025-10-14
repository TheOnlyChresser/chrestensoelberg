"use client"
import {useGSAP} from "@gsap/react";
import gsap from "gsap"
import {ScrollTrigger, SplitText} from "gsap/all"
gsap.registerPlugin(ScrollTrigger, SplitText)
export default function BlogAnimations() {
    useGSAP(() => {
        const pelement = document.querySelectorAll(".prose p:not(:has(hr))")
        const h1element = document.querySelectorAll(".prose h1")
        const h2element = document.querySelectorAll(".prose h2")
        const h3element = document.querySelectorAll(".prose h3")
        const h4element = document.querySelectorAll(".prose h4")
        const h5element = document.querySelectorAll(".prose h5")
        const olelement = document.querySelectorAll(".prose ol")
        const blockselement = document.querySelectorAll(".blocks")
        document.fonts.ready.then(() => {
            h1element.forEach((h1) => {

                gsap.from(h1, {
                    duration: 2,
                    ease: "expo.out",
                    y: -40,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: h1,
                        start: "top bottom"
                    },
                    stagger: 0.01,
                })
            })
            h2element.forEach((h2) => {

                gsap.from(h2, {
                    duration: 2,
                    ease: "expo.out",
                    y: -10,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: h2,
                        start: "top bottom"
                    },
                    stagger: 0.02,
                })
            })
            h3element.forEach((h3) => {

                gsap.from(h3, {
                    duration: 2,
                    ease: "expo.out",
                    y: -10,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: h3,
                        start: "top bottom"
                    },
                    stagger: 0.02,
                })
            })
            h4element.forEach((h4) => {

                gsap.from(h4, {
                    duration: 2,
                    ease: "expo.out",
                    y: -10,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: h4,
                        start: "top bottom"
                    },
                    stagger: 0.02,
                })
            })
            h5element.forEach((h5) => {

                gsap.from(h5, {
                    duration: 2,
                    ease: "expo.out",
                    y: -10,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: h5,
                        start: "top bottom"
                    },
                    stagger: 0.02,
                })
            })
            pelement.forEach((p) => {

                gsap.from(p, {
                    delay: 0.2,
                    duration: 1,
                    ease: "expo.out",
                    xPercent: -2,
                    autoAlpha: 0,
                    scrollTrigger: {
                        trigger: p,
                        start: "top bottom"
                    },
                    stagger: 0.1,
                })
            })
            olelement.forEach((ol) => {

                gsap.from(ol, {
                    duration: 1,
                    ease: "expo.out",
                    xPercent: -4,
                    autoAlpha: 0,
                    scrollTrigger: {
                        trigger: ol,
                        start: "top bottom"
                    },
                    stagger: 0.01,
                })
            })
            blockselement.forEach((block) => {

                gsap.from(block, {
                    duration: 1,
                    ease: "expo.out",
                    xPercent: -4,
                    autoAlpha: 0,
                    scrollTrigger: {
                        trigger: block,
                        start: "top bottom"
                    },
                    stagger: 0.1,
                })
            })
        })
    })
    return(
        <></>
    )
}