"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import emailjs from '@emailjs/browser';
import Line from "@/components/Line";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/all"
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger)

function Kontakt() {
    const [userInput, setUserInput] = useState<{
        name: string;
        email: string;
        message: string;
    }>({
        name: "",
        email: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const userID = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        if (!serviceID || !templateID || !userID) {
            toast.error("Email service er ikke konfigureret korrekt.");
            return;
        }
        try {
            const emailParams = {
                name: userInput.name,
                email: userInput.email,
                message: userInput.message
            };

            const res = await emailjs.send(serviceID, templateID, emailParams, userID);

            if (res.status === 200) {
                toast.success("Beskeden er blevet sendt!");
                setUserInput({
                    name: "",
                    email: "",
                    message: ""
                });
            }
        } catch {
            toast.error("Kunne ikke sende beskeden. Prøv igen senere.");
        }
    };
    useGSAP(() => {
        gsap.from(".kontakt", {
            autoAlpha: 0,
            y: 100,
            scrollTrigger: {
                trigger: ".kontakt",
                start: "center bottom",
            }
        })
    })
    return (
        <section
            className="min-h-screen w-full flex-center flex-col overflow-hidden"
            id="kontakt"
            aria-label="Kontakt Chresten Soelberg"
        >
            <Line/>
            <div className="flex-center flex-col">
                <h2 className="text-center text-6xl md:text-7xl text-gradient-subtle font-bold h-20">
                    Kontakt mig
                </h2>
            </div>
            <form
                onSubmit={handleSubmit}
                className="kontakt glass-box p-8 rounded-2xl backdrop-blur-md bg-white/10 shadow-lg ring-1 ring-white/20 flex flex-col gap-6 w-[90%] max-w-xl mt-10 mb-20"
                aria-label="Kontaktformular"
            >
                <div>
                    <label
                        htmlFor="name"
                        className="text-black/80 font-semibold mb-1 block"
                    >
                        Dit navn:
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={userInput.name}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-black/80 placeholder-black/60 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-white/80"
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="Indtast dit navn"
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="text-black/80 font-semibold mb-1 block"
                    >
                        Din email:
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-black/80 placeholder-black/60 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-white/80"
                        value={userInput.email}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="din@email.dk"
                    />
                </div>
                <div>
                    <label
                        htmlFor="message"
                        className="text-black/80 font-semibold mb-1 block"
                    >
                        Din besked:
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="bg-white/20 backdrop-blur-sm border border-white/30 text-black/80 placeholder-black/60 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-1 focus:ring-white/80"
                        value={userInput.message}
                        onChange={handleChange}
                        required
                        aria-required="true"
                        placeholder="Skriv din besked her..."
                    />
                </div>
                <div className="w-full flex-center">
                    <button
                        type="submit"
                        className="rounded-md h-10 text-center w-60 text-xl font-bold cursor-pointer transition delay-[25ms] bg-white/30 backdrop-blur-2xl border-black/30 border-1 text-black/90 hover:bg-black/30 hover:text-white/90 active:bg-black/30 active:text-white/90"
                        aria-label="Send besked til Chresten Soelberg"
                    >
                        Send Besked
                    </button>
                </div>
            </form>
        </section>
    );
}

export default Kontakt;