"use client"

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import * as Icons from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
    useGSAP(() => {
        const items = document.querySelectorAll(".timeline-item");
        items.forEach((el) => {
            gsap.fromTo(
                el,
                { opacity: 0, y: 30, filter: "blur(4px)" },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    const steps = [
        { title: "Planlægning", description: "Vi starter med at gennemgå dine behov og målsætninger.", icon: "CalendarCheck" },
        { title: "Design", description: "Der udarbejdes en prototype i Figma, som du godkender.", icon: "PenTool" },
        { title: "Betaling", description: "Efter godkendt design betales 10% af beløbet.", icon: "CreditCard" },
        { title: "Udvikling", description: "Siden bygges i Next.js og Tailwind for høj performance.", icon: "Code2" },
        { title: "Test", description: "Alt testes grundigt på flere enheder.", icon: "CheckCircle2" },
        { title: "Lancering", description: "Siden går live, og du får en kort introduktion.", icon: "Rocket" },
    ];

    return (
        <div className="relative mx-auto max-w-3xl mt-20 px-6 space-y-16">
            <div className="absolute left-6 top-0 h-full w-1 bg-blue-500/40 rounded-full" />
            {steps.map((step, i) => {
                // @ts-ignore
                const Icon: any = Icons[step.icon];
                return (
                    <div key={i} className="timeline-item relative pl-20">
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-md rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-2">
                                <Icon className="w-6 h-6 text-blue-600" />
                                <h3 className="text-xl font-bold dark:text-gray-50">{step.title}</h3>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-base">{step.description}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
