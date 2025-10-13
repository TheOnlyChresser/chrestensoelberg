import { Quote as QuoteIcon } from "lucide-react";

export default function Quote() {
    return (
        <section className="max-w-[1000px] px-40 pb-40 flex flex-col items-center text-center">
            <div className="relative">
                <QuoteIcon className="absolute -top-8 -left-6 text-gray-300 w-12 h-12" />
                <blockquote className="text-3xl md:text-4xl font-serif italic text-black/80 leading-relaxed">
                    “Videns største fjende er ikke uvidenhed, det er illusionen om viden.”
                </blockquote>
            </div>
            <footer className="mt-6 text-lg text-black/60 font-medium">
                - Stephen Hawking
            </footer>
        </section>
    );
}
