"use client"
//TODO: tilføj "typer" til priceblocks så der står f.eks. ORD i siden ligesom tabeller
//TODO: find ud af hvor mange af top 100 virksomheder som bruger samme framework/tailwind til hjemmeside
//TODO: tilføj styling til dark mode
//TODO: gsap animation til features evt med stagger og evt også i stedet for nuværende blur fade for bedre performance

import Button from "../ui/Button";
import Feature from "@/components/ChresserComponents/ui/Features";
import Quote from "@/components/ChresserComponents/sections/Quote";
import {
    PriceBlockWrappper,
    PriceBlockTitle,
    PriceBlockFeatures,
    PriceBlockUndertitle, PriceBlockTextWrapper, PriceBlockPrice
} from "@/components/ChresserComponents/ui/Priceblock";
import {BlurFade} from "@/components/ui/blur-fade";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {AsideWrapper, AsideText, AsideImage} from "@/components/ChresserComponents/ui/Aside";
import Timeline from "../ui/Timeline"
import {useState} from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL || "";
const supabaseAnonKey: string = process.env.SUPABASE_ANON_KEY || "";

const supabase = createClient(supabaseUrl, supabaseAnonKey);


export default function Hero() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true)
        const { error } = await supabase
            .from("signups")
            .insert([{ name: formData.name, email: formData.email }]);
        if (error) {
            console.error(error);
            setLoading(false)
        } else {
            setSubmitted(true);
            setLoading(false)
        }
    };

    return (
        <main className="font-montserrat min-h-screen w-full items-center bg-white">
            <div className="bg-[hsla(82,0%,100%,1)] bg-[radial-gradient(at_45%_55%,hsla(1,0%,100%,1)_0px,transparent_30%),radial-gradient(at_36%_6%,hsla(181,100%,89%,1)_0px,transparent_25%),radial-gradient(at_2%_11%,hsla(155,100%,85%,1)_0px,transparent_20%)] px-4 flex flex-col pt-40 md:pt-0 md:mt-0 md:justify-center items-center min-h-screen">
                <BlurFade delay={0.25*4} inView>
                <span onClick={() => setOpen(true)} className="cursor-pointer bg-gradient-to-r from-lime-100 via-emerald-100 to-teal-100 text-emerald-900 border border-emerald-400 px-4 py-2 rounded-md text-sm md:text-base font-semibold shadow-sm tracking-wide animate-pulse text-center hover:animate-none text-wrap">🎉 KICKSTART KAMPAGNE: FÅ ET GRATIS ONLINE VISITKORT ×2 🎉</span>
                </BlurFade>
                <BlurFade delay={0.25} inView>
                    <h1 className="text-5xl px-4 md:text-7xl font-bold leading-tight tracking-tight text-center md:max-w-[60vw]">Hjemmesider, som passer til dig</h1>
                </BlurFade>
                <BlurFade delay={0.25*2} inView>
                    <p className="px-4 text-md md:text-xl text-center mt-6 text-gray-500 md:max-w-[72vw] wrap-words md:px-0">Alt er lavet kun til dig uden brug af færdiglavet løsninger eller AI. Uden brug af usikre løsninger, som Wordpress. Alt er skrevet fra bunden af.</p>
                </BlurFade>
                <BlurFade delay={0.25*3} inView className="w-full">
                    <div className="mt-12 flex flex-col md:flex-row w-full items-center justify-center">
                        <a href="/#priser" className="md:mr-16 mb-6 md:mb-0"><Button button="normal" size="form-md" className="max-w-64">Få din pris</Button></a>
                        <p className="text-center group cursor-pointer text-black/80 text-xl flex items-center font-semibold transition-colors duration-300 hover:text-black ml-2 md:ml-0">Læs mere<span className="inline-block ml-2 transform transition-all duration-300 md:opacity-0 group-hover:opacity-100 md:-translate-x-2 md:translate-y-2 group-hover:translate-x-0 group-hover:-translate-y-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/></svg></span></p>
                    </div>
                </BlurFade>
            </div>
            <section className="md:bg-[hsla(82,0%,100%,1)] md:bg-[radial-gradient(at_45%_55%,hsla(1,0%,100%,1)_0px,transparent_30%),radial-gradient(at_20%_21%,hsla(155,100%,85%,1)_0px,transparent_40%)]">
            <div className="flex flex-col items-center mb-40 bg-gray-100/40 py-8 w-full">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 w-full">
                    <Feature overskrift="Billig">Det koster blot 989kr for en hjemmeside! Den har også billig vedligholdelse.</Feature>
                    <Feature overskrift="Sikker">Ingen usikre system, som Wordpress brugt.</Feature>
                    <Feature overskrift="Hurtig">Du får på under en måned hele din hjemmeside oppe at køre.</Feature>
                    <Feature overskrift="Personlig">Jeg programmere alt fra bunden til dig.</Feature>
                    <Feature overskrift="SEO">Hjemmesider jeg laver er SEO optimeret.</Feature>
                    <Feature overskrift="Service">Du får 2 timers gratis support m.m. til de små justeringer.</Feature>
                </div>
            </div>
            </section>
            <div className="flex flex-col items-center justify-center mb-20">
            <Quote person="Chresten Soelberg">Jeg stræber efter at give dig den bedste oplevelse</Quote>
            </div>
            <AsideWrapper color="black">
                <AsideImage src="/happy.png" alt="avatar" className="md:hidden" />
                <AsideText>
                    <h3 className="text-5xl font-bold text-gradient-subtle mb-1 mt-5 mx-5 ml-1 p-4 lg:text-wrap break-words hyphens-auto lg:break-normal">
                        Hvad du får hos mig
                    </h3>
                    <p className="text-lg mb-4 px-4">
                        Jeg fokuserer på gennemsigtighed og selvfølgelig kvalitet. Ingen skjulte gebyrer og ingen hurtige løsninger –
                        kun håndskreven kode og design, så du kan bruge din tid, hvor den virkelig tæller.
                    </p>
                    <ul className="list-disc pl-8 space-y-1">
                        <li>Værdi for pengene</li>
                        <li>10 klip af et kvarter</li>
                        <li>Gyldigt i tre år</li>
                        <li>Fleksibel booking</li>
                        <li>Telefonsamtaler eller chat</li>
                    </ul>
                </AsideText>
                <AsideImage src="/happy.png" alt="avatar" className="hidden md:flex" />
            </AsideWrapper>

            <AsideWrapper>
                <AsideImage src="/forest.jpg" alt="avatar" />
                <AsideText>
                    <h3 className="text-5xl font-bold text-gradient-subtle mb-1 mt-5 mx-5 ml-1 p-4 lg:text-wrap break-words hyphens-auto lg:break-normal">
                        Hvad du kan forvente
                    </h3>
                    <p className="text-lg mb-4 px-4">
                        Jeg bygger alt fra bunden med fokus på ydeevne, sikkerhed og design, der afspejler din identitet.
                        Du får ikke en færdiglavet skabelon, men et unikt produkt, som er lavet til at vokse sammen med dig.
                    </p>
                    <ul className="list-disc pl-8 space-y-1">
                        <li>Responsivt design, der virker overalt</li>
                        <li>Hurtig levering uden at gå på kompromis</li>
                        <li>Personlig dialog og ærlig rådgivning</li>
                        <li>Gratis support på små ændringer</li>
                        <li>Langsigtet samarbejde og tryghed</li>
                    </ul>
                </AsideText>
            </AsideWrapper>

            <div className="flex flex-col items-center justify-center">
            <div className="min-h-screen scroll-mt-8 bg-gray-100/40 mb-40 grid grid-cols-1 md:grid-cols-3 p-8 place-content-center w-full gap-y-4 md:gap-y-0 place-items-center" id="priser">
                <PriceBlockWrappper>
                    <PriceBlockTextWrapper>
                    <PriceBlockTextWrapper>
                        <PriceBlockTitle>
                            Klippekort
                        </PriceBlockTitle>
                        <PriceBlockPrice>
                            500
                        </PriceBlockPrice>
                        <PriceBlockUndertitle>
                            Et klippekort af 10 sessioner af en varighed på et kvarter
                        </PriceBlockUndertitle>
                    </PriceBlockTextWrapper>
                    <PriceBlockFeatures>
                        <li>Værdi for pengene</li>
                        <li>10 klip</li>
                        <li>Gyldigt i tre år</li>
                        <li>Fleksibel booking</li>
                        <li>Telefonsamtaler eller chat</li>
                    </PriceBlockFeatures>
                    </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Bestil</Button>
                </PriceBlockWrappper>
                <PriceBlockWrappper className="scale-102">
                <PriceBlockTextWrapper>
                    <PriceBlockTextWrapper>
                        <PriceBlockTitle>
                            Online visitkort
                        </PriceBlockTitle>
                        <PriceBlockPrice>
                            989
                        </PriceBlockPrice>
                        <PriceBlockUndertitle>
                            Et online visitkort for at styrke din synlighed online
                        </PriceBlockUndertitle>
                    </PriceBlockTextWrapper>
                    <PriceBlockFeatures>
                        <li>Responsivt design</li>
                        <li>Skræddersyet design</li>
                        <li>1-2 sider</li>
                        <li>Animationer m.m.</li>
                        <li>SEO optimeret</li>
                        <li>Maks 200 ord</li>
                        <li>Betal først efter du har set det færdige design</li>
                    </PriceBlockFeatures>
            </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Bestil</Button>
                </PriceBlockWrappper>
                <PriceBlockWrappper>
                <PriceBlockTextWrapper>
                    <PriceBlockTextWrapper>
                        <PriceBlockTitle>
                            Hjemmeside
                        </PriceBlockTitle>
                        <PriceBlockPrice>
                            Op til 10000
                        </PriceBlockPrice>
                        <PriceBlockUndertitle>
                            En komplet hjemmeside til virksomhed eller privatperson
                        </PriceBlockUndertitle>
                    </PriceBlockTextWrapper>
                    <PriceBlockFeatures>
                        <li>Responsivt design</li>
                        <li>Skræddersyet design</li>
                        <li>Op til 10 sider og CMS</li>
                        <li>Animationer m.m.</li>
                        <li>SEO optimeret</li>
                        <li>Ubegrænset ord</li>
                    </PriceBlockFeatures>
            </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Kontakt</Button>
                </PriceBlockWrappper>
            </div>
                <div>
                    <Timeline/>

                </div>
            </div>
            <section id="faq" className="px-8 w-full mb-40">
                <h2 className="text-gradient-subtle text-5xl font-bold text-center p-2 mb-12 tracking-tight">Ofte stillede spørgsmål</h2>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full max-w-5xl mx-auto px-6 md:px-16 lg:px-32"
                >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-2xl font-semibold hover:text-primary transition-colors">
                            Hvorfor er det så billigt?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] text-lg leading-relaxed p-2">
                            <p>
                                Det er fordi jeg er ung og endnu ikke har mange års erfaring.
                            </p>
                            <p>
                                Du får derfor mere for pengene — kvalitet til en lavere pris.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-2xl font-semibold hover:text-primary transition-colors">
                            Hvad bruger du til at lave hjemmesider?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] text-lg leading-relaxed p-2">
                            <p>
                                Jeg bruger primært Next.js og Tailwind CSS.
                                Next.js er et framework bygget oven på React.
                            </p>
                            <p>
                                React er et JavaScript-framework udviklet af Facebook, der gør det lettere at genbruge komponenter —
                                det bruges af mange af verdens bedste hjemmesider. Tailwind CSS gør udviklingen hurtigere ved at lade
                                mig style direkte i markup’en, så alt forbliver overskueligt og effektivt.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-2xl font-semibold hover:text-primary transition-colors">
                            Hvordan har du lært at programmere?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] text-lg leading-relaxed p-2">
                            <p>
                                Jeg har brugt hundredevis af timer på at lære programmering og informatik — ikke gennem korte kurser,
                                men gennem vedvarende, praktisk erfaring og undervisning.
                            </p>
                            <p>
                                Det sikrer, at du får høj kvalitet og gennemtænkte løsninger.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="text-2xl font-semibold hover:text-primary transition-colors">
                            Bliver jeg inddraget i design processen?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] text-lg leading-relaxed p-2">
                            <p>
                                Det er helt op til dig om du vil inddrages i design processen. Normalt ville jeg spørge dig om dine behov og evt farver.
                                Ved mindre du betaler ekstra skal du dog sende alt tekst der skal være på din hjemmeside. Hvis du køber et online visitkort kan du få op til 200 ord på din hjemmeside.
                            </p>
                            <p>
                                Det sikrer, at du får høj kvalitet og gennemtænkte løsninger.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
            {open && !submitted && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/5 flex justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white rounded-2xl p-6 shadow-lg w-80"
                    >
                        <h2 className="text-lg font-semibold mb-3 text-center">
                            Tilmeld kampagnen 🎉
                        </h2>
                        <input
                            type="text"
                            placeholder="Dit navn"
                            className="w-full border rounded-md p-2 mb-2"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                        />
                        <input
                            type="email"
                            placeholder="Din email"
                            className="w-full border rounded-md p-2 mb-4"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2"
                            button="normal"
                            size="form-md"
                        >
                            {submitted ? "Tilmeldt ✅" : "Tilmeld"}
                        </Button>
                    </form>
                </div>
            )}
        </main>
    )
}