"use client"

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import {useGSAP} from "@gsap/react"

gsap.registerPlugin(ScrollTrigger);

export default function Timeline () {
    useGSAP(() => {
        const timelineItems = document.querySelectorAll(".timeline-item")
        timelineItems.forEach((item) => {
            gsap.fromTo(item,
                {
                    opacity: 0,
                    filter: "blur(4px)",
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    const items = [
        {
            title: "Planlægning",
            description:
                "Vi starter med at snakke sammen om hvad dine behov er og hvordan vi kan få dem udfyldt. Det er også her du indsender teksten du har skrevet.",
        },
        {
            title: "Design",
            description:
                "En prototype bliver lavet i Figma så du kan se om der skal foretages evt ændringer.",
        },
        {
            title: "Betaling",
            description:
                "Efter designet er færdig og du har bekræftet det er sådan du ville have hjemmesiden ser ud betaler du 10% af beløbet."
        },
        {
            title: "Udvikling",
            description:
                "Hjemmesiden bliver kodet med NextJS og TailwindCSS for at sikre hurtig performance og responsivt design.",
        },
        {
            title: "Test",
            description:
                "Jeg tester hjemmesiden grundigt for fejl, responsivitet og brugervenlighed på alle enheder.",
        },
        {
            title: "Lancering og betaling",
            description:
                "Hjemmesiden bliver lanceret, og du får en kort introduktion til administration og vedligeholdelse efter at betale det resterende beløb.",
        },
    ];

    return (
        <div className="relative min-h-[200vh] flex md:items-center md:justify-center p-8 my-20">
            <div className="absolute h-full w-2 bg-blue-500 dark:bg-blue-700 rounded-xl"/>
            <ul className="border-gray-300 dark:border-gray-700 w-full md:grid md:grid-cols-2 gap-16">
                {items.map((item, index) => { if (index % 2 === 0) { return [
                    <div key={index+100}></div>,
                    <li key={index} className="mb-24 col-start-2 relative timeline-item">
                        <div className="md:w-12 w-4 md:-ml-8 mt-4 h-2 bg-blue-500 dark:bg-blue-700 absolute rounded-xl"></div>
                        <h3 className="dark:text-gray-50 ml-6 text-3xl font-bold">{item.title}</h3>
                        <p className="ml-6 mt-2 text-gray-700 dark:text-gray-200 text-lg">{item.description}</p>
                    </li>
                ]}
                else {
                    return [
                        <li key={index} className="mb-24 col-start-1 relative timeline-item">
                            <div className="w-4 md:w-12 md:-mr-8 mt-4 h-2 bg-blue-500 dark:bg-blue-700 absolute rounded-xl md:right-0"></div>
                            <h3 className="dark:text-gray-50 ml-6 md:mr-6 md:ml-0 text-3xl font-bold">{item.title}</h3>
                            <p className="md:mr-6 ml-6 md:ml-0 mt-2 text-gray-700 dark:text-gray-200 text-lg">{item.description}</p>
                        </li>,
                        <div key={index+100}></div>
                    ]
                }
                })}
            </ul>
        </div>
    );
};
