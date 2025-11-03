"use client"

//TODO: tilføj "typer" til priceblocks så der står f.eks. ORD i siden ligesom tabeller
//TODO: find ud af hvor mange af top 100 virksomheder som bruger samme framework/tailwind til hjemmeside

import Button from "../ui/Button";
import Feature from "@/components/ChresserComponents/ui/Features";
import {
    PriceBlockWrappper,
    PriceBlockTitle,
    PriceBlockFeatures,
    PriceBlockUndertitle, PriceBlockTextWrapper, PriceBlockPrice, PriceBlockExtra
} from "@/components/ChresserComponents/ui/Priceblock";
import {BlurFade} from "@/components/ui/blur-fade";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {AsideWrapper, AsideText, AsideImage} from "@/components/ChresserComponents/ui/Aside";
import Timeline from "../Timeline"
import {ChangeEvent, useState} from "react";
import AttentionSpan from "@/components/ChresserComponents/ui/Attention";
import Kontakt from "@/components/ChresserComponents/sections/Kontakt";
import {Heading, Subheading} from "@/components/ChresserComponents/ui/Text";
import {Input, Textarea} from "@/components/ChresserComponents/ui/Input";
import send from "../send";

export default function Hero() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [highlighted, setHighlighted] = useState<boolean>(false);
    const [step, setStep] = useState<number | null>(null);
    const [ordered, setOrdered] = useState<boolean>(false);
    const [productName, setProductName] = useState<string>("");
    const [customerName, setCustomerName] = useState<string>("");
    const [customerEmail, setCustomerEmail] = useState<string>("");
    const [customerMessage, setCustomerMessage] = useState<string>("");
    const [selectedProduct, setSelectedProduct] = useState<string>("");
    const [notification, setNotification] = useState<boolean>(false);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch("/api/kampagne/tilslut", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (data.error) console.error(data.error);
        else setSubmitted(true);
        setLoading(false);
    };


    return (
        <main className="font-dm-sans min-h-screen w-full items-center bg-white dark:bg-gray-950">
            <div className="bg-white bg-[hsla(82,0%,100%,1)] bg-[radial-gradient(at_45%_55%,hsla(1,0%,100%,1)_0px,transparent_30%),radial-gradient(at_36%_6%,hsla(181,100%,89%,1)_0px,transparent_25%),radial-gradient(at_2%_11%,hsla(155,100%,85%,1)_0px,transparent_20%)] dark:bg-none w-full">
            <div className="dark:bg-gradient-to-b dark:from-gray-900 dark:via-gray-950 dark:to-gray-950 px-4 flex flex-col pt-40 md:pt-0 md:mt-0 md:justify-center items-center min-h-screen">
                <BlurFade delay={0.25} inView>
                <div className="flex flex-col justify-center items-center">
                    <AttentionSpan onClick={() => setOpen(true)} color="green" size="lg" >
                        🎉 KICKSTART KAMPAGNE: FÅ ET GRATIS ONLINE VISITKORT 🎉
                    </AttentionSpan>
                </div>
                    <Heading color="black" size="xl" position="center">En billig og personlig hjemmeside</Heading>
                </BlurFade>
                <BlurFade delay={0.25*2} inView>
                    <Subheading size="md" color="black" position="center">Få en personlig hjemmeside, som både er SEO optimeret og skrevet fra bunden af uden Wordpress. Perfekt til privatpersoner, som søger en billig og personlig hjemmeside.</Subheading>
                    <div className="mt-12 flex flex-col md:flex-row w-full items-center justify-center">
                        <a href="/#priser" className="md:mr-16 mb-6 md:mb-0"><Button button="normal" size="form-md" className="max-w-64">Få din pris</Button></a>
                        <a href="/#tekstsektion">
                            <p className="text-center group cursor-pointer dark:text-gray-50 dark:hover:text-white text-black/80 text-xl flex items-center font-semibold transition-colors duration-300 hover:text-black ml-2 md:ml-0">
                                Læs mere
                                <span className="inline-block ml-2 transform transition-all duration-300 md:opacity-0 group-hover:opacity-100 md:-translate-x-2 md:translate-y-2 group-hover:translate-x-0 group-hover:-translate-y-0">
                                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/>
                                    </svg>
                                </span>
                            </p>
                        </a>
                    </div>
                </BlurFade>
            </div>
            </div>
            <section className="">
                <div className="flex flex-col items-center mb-40 bg-gray-100/64 dark:bg-gray-900/64 py-24 w-full relative">
                    <div className="absolute top-0 w-full bg-gradient-to-b from-white dark:from-gray-950 to-transparent h-20"></div>
                    <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-white dark:to-gray-950 h-20"></div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 gap-y-8 w-full">
                        <Feature overskrift="Billig">
                            Professionel hjemmeside fra kun 989kr med lav vedligeholdelse.
                        </Feature>
                        <Feature overskrift="Sikker">
                            Ingen usikre systemer som WordPress eller plugins.
                        </Feature>
                        <Feature overskrift="Hurtig">
                            Du får på under en måned hele din hjemmeside oppe at køre.
                        </Feature>
                        <Feature overskrift="Personlig">
                            Jeg programmere alt fra bunden til dig.
                        </Feature>
                        <Feature overskrift="SEO">
                            Alle hjemmesider er SEO-optimeret for bedre synlighed.
                        </Feature>
                        <Feature overskrift="Dansk service">
                            2 timers gratis support, til rådgivning og små justeringer.
                        </Feature>
                    </div>
                </div>
            </section>
            <section id="tekstsektion">
                <AsideWrapper color="black">
                    <AsideImage src="/happy.png" alt="avatar" className="md:hidden" />
                    <AsideText>
                        <h3 className="text-5xl font-bold text-gradient-subtle mb-1 mt-5 mx-5 ml-1 p-4 lg:text-wrap break-words hyphens-auto lg:break-normal">
                            Hvad du får hos mig
                        </h3>
                        <p className="text-lg mb-4 px-4">
                            Jeg fokuserer på gennemsigtighed og selvfølgelig kvalitet. Ingen skjulte gebyrer og ingen hurtige løsninger –
                            kun <strong>håndskreven kode</strong> og design, så du kan bruge din tid, hvor den virkelig tæller.
                        </p>
                        <ul className="list-disc pl-8 space-y-1">
                            <li>Værdi for pengene</li>
                            <li>10 klip af et kvarter</li>
                            <li>Gyldigt i tre år</li>
                            <li>Fleksibel booking</li>
                            <li>Telefonsamtaler eller chat</li>
                        </ul>
                    </AsideText>
                    <AsideImage src="/happy.png" alt="avatar" type="right" className="hidden md:flex" />
                </AsideWrapper>

                <AsideWrapper>
                    <AsideImage src="/forest.jpg" alt="avatar" />
                    <AsideText>
                        <h3 className="text-5xl font-bold text-gradient-subtle mb-1 mt-5 mx-5 ml-1 p-4 lg:text-wrap break-words hyphens-auto lg:break-normal">
                            Hvad du kan forvente
                        </h3>
                        <p className="text-lg mb-4 px-4">
                            Jeg bygger alt fra bunden med fokus på ydeevne, sikkerhed og design, der afspejler din identitet.
                            Du får ikke en færdiglavet skabelon, men et <strong>unikt produkt</strong>, som er lavet til at vokse sammen med dig.
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
                <AsideWrapper color="black">
                    <AsideImage src="/code.jpg" alt="WordPress vs Next.js illustration" className="md:hidden" />
                    <AsideText>
                        <h3 className="text-5xl font-bold text-gradient-subtle mb-1 mt-5 mx-5 ml-1 p-4 lg:text-wrap break-words hyphens-auto lg:break-normal">
                            WordPress vs. Next.js
                        </h3>
                        <p className="text-lg mb-4 px-4">
                            Mange hjemmesider bygges stadig i <strong>WordPress</strong> som er et meget populært system med tusindvis af plugins.
                            Men i dag vælger flere og flere moderne virksomheder, såsom Nike og Starbucks, <strong>Next.js</strong> for bedre ydeevne, sikkerhed og fleksibilitet.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 mt-6">
                            <div className="p-4">
                                <h4 className="font-semibold text-2xl mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px" className="inline-block"><path fill="#fff" d="M24 4.050000000000001A19.95 19.95 0 1 0 24 43.95A19.95 19.95 0 1 0 24 4.050000000000001Z"/><path fill="#01579b" d="M8.001,24c0,6.336,3.68,11.806,9.018,14.4L9.385,17.488C8.498,19.479,8.001,21.676,8.001,24z M34.804,23.194c0-1.977-1.063-3.35-1.67-4.412c-0.813-1.329-1.576-2.437-1.576-3.752c0-1.465,1.471-2.84,3.041-2.84 c0.071,0,0.135,0.006,0.206,0.008C31.961,9.584,28.168,8,24.001,8c-5.389,0-10.153,2.666-13.052,6.749 c0.228,0.074,0.307,0.039,0.611,0.039c1.669,0,4.264-0.2,4.264-0.2c0.86-0.057,0.965,1.212,0.099,1.316c0,0-0.864,0.105-1.828,0.152 l5.931,17.778l3.5-10.501l-2.603-7.248c-0.861-0.046-1.679-0.152-1.679-0.152c-0.862-0.056-0.762-1.375,0.098-1.316 c0,0,2.648,0.2,4.217,0.2c1.675,0,4.264-0.2,4.264-0.2c0.861-0.057,0.965,1.212,0.104,1.316c0,0-0.87,0.105-1.832,0.152l5.891,17.61 l1.599-5.326C34.399,26.289,34.804,24.569,34.804,23.194z M24.281,25.396l-4.8,13.952c1.436,0.426,2.95,0.652,4.52,0.652 c1.861,0,3.649-0.324,5.316-0.907c-0.04-0.071-0.085-0.143-0.118-0.22L24.281,25.396z M38.043,16.318 c0.071,0.51,0.108,1.059,0.108,1.645c0,1.628-0.306,3.451-1.219,5.737l-4.885,14.135C36.805,35.063,40,29.902,40,24 C40,21.219,39.289,18.604,38.043,16.318z"/><path fill="#01579b" d="M4,24c0,11.024,8.97,20,19.999,20C35.03,44,44,35.024,44,24S35.03,4,24,4S4,12.976,4,24z M5.995,24 c0-9.924,8.074-17.999,18.004-17.999S42.005,14.076,42.005,24S33.929,42.001,24,42.001C14.072,42.001,5.995,33.924,5.995,24z"/></svg> WordPress</h4>
                                <ul className="list-disc pl-6 space-y-1 text-lg">
                                    <li>Bruger PHP og plugins</li>
                                    <li>Kræver et dyrt Webhotel</li>
                                    <li>Afhængig af temaer og tredjepart</li>
                                    <li>Kan blive langsom med mange tilføjelser</li>
                                    <li>Kræver løbende opdatering og vedligeholdelse</li>
                                    <li>Let at starte men svært at skalere</li>
                                </ul>
                            </div>
                            <div className="p-4">
                                <h4 className="font-semibold text-2xl mb-2">
                                    <svg className="inline-block" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#212121" d="M18.974,31.5c0,0.828-0.671,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-14c0-0.653,0.423-1.231,1.045-1.43 c0.625-0.198,1.302,0.03,1.679,0.563l16.777,23.704C40.617,36.709,44,30.735,44,24c0-11-9-20-20-20S4,13,4,24s9,20,20,20 c3.192,0,6.206-0.777,8.89-2.122L18.974,22.216V31.5z M28.974,16.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v13.84l-3-4.227 V16.5z"/></svg> Next.js</h4>
                                <ul className="list-disc pl-6 space-y-1 text-lg">
                                    <li>Bygget på React og moderne JavaScript</li>
                                    <li>Billigere at holde kørende</li>
                                    <li>Ingen tunge plugins, alt er skræddersyet</li>
                                    <li>Meget hurtigere loadtider (godt for SEO)</li>
                                    <li>Bedre sikkerhed og stabilitet</li>
                                    <li>Perfekt til skræddersyede løsninger</li>
                                </ul>
                            </div>
                        </div>
                        <p className="text-lg mt-6 px-4">
                            Hos mig får du en <strong>Next.js-hjemmeside</strong>, der er bygget fra bunden uden alle de unødige plugins, hurtig som lynet
                            og optimeret til Google. Det betyder din hjemmeside kræver er billigere at vedligeholde, har højere hastighed og bedre synlighed online.
                            Du kan læse mere om NextJS <a href="https://nextjs.org/" className="underline hover:no-underline underline-offset-2 active:no-underline decoration-2 decoration-sky-500 text-black dark:text-white/80">her</a> og mere om Wordpress <a href="https://wordpress.com/" className="underline hover:no-underline underline-offset-2 active:no-underline decoration-2 decoration-sky-500 text-black dark:text-white/80">her</a>
                        </p>
                    </AsideText>
                    <AsideImage src="/code.jpg" alt="WordPress vs Next.js illustration" type="right" className="hidden md:flex" />
                </AsideWrapper>

            </section>
            <div className="flex flex-col items-center justify-center">
            <section className="min-h-screen scroll-mt-8 mb-40 grid grid-cols-1 md:grid-cols-3 p-8 place-content-center w-full gap-y-4 md:gap-y-0 place-items-center" id="priser">
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
                        <ul className="list-disc list-inside marker:text-sky-500 text-base text-gray-700 dark:text-gray-200 space-y-1">
                            <li>Værdi for pengene</li>
                            <li>10 klip</li>
                            <li>Gyldigt i tre år</li>
                            <li>Fleksibel booking</li>
                            <li>Telefonsamtaler eller chat</li>
                        </ul>
                    </PriceBlockFeatures>
                    </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm" onClick={()=> {
                        setProductName("et klippekort");
                        setSelectedProduct("klippekort")
                        setStep(1);
                        setOpen(false);
                        setNotification(false)
                        console.log("Klippekort");
                    }}>
                        Bestil
                    </Button>
                </PriceBlockWrappper>
                <PriceBlockWrappper className="scale-104">
                <PriceBlockTextWrapper>
                    <PriceBlockTextWrapper>
                        <PriceBlockExtra>
                            ✨ Anbefalet ✨
                        </PriceBlockExtra>
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
                        <ul className="list-disc list-inside marker:text-sky-500 text-base text-gray-700 dark:text-gray-200 space-y-1">
                            <li>Responsivt design</li>
                            <li>Skræddersyet design</li>
                            <li>1-2 sider</li>
                            <li>Animationer m.m.</li>
                            <li>SEO optimeret</li>
                            <li>Maks 200 ord</li>
                        </ul>
                    </PriceBlockFeatures>
            </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm" onClick={()=> {
                        setProductName("et online visitkort");
                        setSelectedProduct("online visitkort")
                        setStep(1);
                        setOpen(false);
                        setNotification(false)
                        console.log("Online visitkort");
                    }}>
                        Bestil
                    </Button>
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
                        <ul className="list-disc list-inside marker:text-sky-500 text-base text-gray-700 dark:text-gray-200 space-y-1">
                        <li>Responsivt design</li>
                        <li>Skræddersyet design</li>
                        <li>Op til 10 sider og CMS</li>
                        <li>Animationer m.m.</li>
                        <li>SEO optimeret</li>
                        <li>Ubegrænset ord</li>
                        </ul>
                    </PriceBlockFeatures>
            </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm" onClick={()=> {
                        setProductName("en hjemmeside");
                        setSelectedProduct("hjemmeside")
                        setStep(1);
                        setOpen(false);
                        setNotification(false)
                        console.log("Hjemmeside");
                    }}>
                        Kontakt
                    </Button>
                </PriceBlockWrappper>
            </section>
                <section className="bg-gray-100/40 dark:bg-gray-900/40 pb-16">
                    <Timeline/>
                </section>
            </div>
            <section className="md:pt-40 mt-20">
                <Kontakt/>
            </section>
            <section id="faq" className="md:px-8 px-4 w-full mb-24">
                <h2 className="text-gradient-subtle text-5xl font-bold text-center p-2 mb-12 tracking-tight">
                    Ofte stillede spørgsmål
                </h2>
                <Accordion type="single" collapsible className="w-full max-w-5xl mx-auto px-0 md:px-16 lg:px-32">
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="dark:text-gray-50 text-2xl font-semibold dark:hover:text-white/60 hover:text-primary transition-colors">
                            Hvad bruger du til at lave hjemmesider?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] dark:text-gray-200 text-lg leading-relaxed p-2">
                            <p>
                                Jeg bruger primært Next.js og Tailwind CSS.
                                Next.js er et framework bygget oven på React.
                            </p>
                            <p>
                                React er et JavaScript-framework udviklet af Facebook, der gør det lettere at genbruge komponenter.
                                Det bruges af mange af verdens bedste hjemmesider. Tailwind CSS gør udviklingen hurtigere ved at lade
                                mig style direkte i markup’en, så alt forbliver overskueligt og effektivt.
                            </p>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                        <AccordionTrigger className="dark:text-gray-50 text-2xl font-semibold hover:text-primary dark:hover:text-white/60 transition-colors">
                            Hvordan har du lært at programmere?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] text-lg dark:text-gray-200 leading-relaxed p-2">
                            <p>
                                Jeg har brugt hundredevis af timer på at lære programmering og informatik og ikke gennem korte kurser,
                                men gennem vedvarende, praktisk erfaring og undervisning.
                            </p>
                            <p>
                                Det sikrer, at du får høj kvalitet og gennemtænkte løsninger.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                        <AccordionTrigger className="dark:text-gray-50 text-2xl font-semibold dark:hover:text-white/60 hover:text-primary transition-colors">
                            Bliver jeg inddraget i design processen?
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-[#171717] dark:text-gray-200 text-lg leading-relaxed p-2">
                            <p>
                                Det er helt op til dig om du vil inddrages i design processen. Normalt ville jeg spørge dig om dine behov og evt farver.
                                Ved mindre du betaler ekstra skal du dog sende alt tekst der skal være på din hjemmeside. Hvis du køber et online visitkort kan der være op til 200 ord på din hjemmeside.
                            </p>
                            <p>
                                Det sikrer, at du får høj kvalitet og gennemtænkte løsninger.
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>
            {open && !submitted && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/5 flex justify-center items-center dark:text-gray-50">
                    <form onSubmit={handleSubmit} className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg w-100 md:w-120 relative">
                        <button className="cursor-pointer text-black hover:text-blue-500 active:scale-92 absolute top-0 right-0 m-4 dark:text-gray-50" onClick={()=>{setOpen(false);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <div className="w-full items-center justify-center flex mb-4">
                        <AttentionSpan className="mx-8 mb-1">😬 SLUTTER D. 3 MAJ 😬</AttentionSpan>
                        </div>
                        <h2 className="text-lg font-semibold mb-1 text-center dark:text-gray-50">
                            🎉 Tilmeld dig kampagnen 🎉
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-md text-center pb-6">
                            Få en chance for at få pengene tilbage fra købet af et online visitkort.<span className="mb-1 cursor-default hover:text-blue-300" onMouseEnter={()=> {setHighlighted(true)}} onMouseLeave={()=>{setHighlighted(false)}}>*</span>
                        </p>
                        <Input type="text" className="mb-2" value={formData.name || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })} required>
                            Dit navn
                        </Input>
                        <Input type="email" className="mb-4" value={formData.email || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })} required>
                            Din email
                        </Input>
                        <Button type="submit" disabled={loading} className="px-4 py-2" button="normal" size="form-md">
                            {submitted ? "Tilmeldt ✅" : "Tilmeld"}
                        </Button>
                        <p className="text-sm p-2 text-gray-400"><span className={highlighted ? ("text-blue-300"): ("")}>*</span> Du skal have købt dit online visitkort indenfor de seneste 4 måneder</p>
                    </form>
                </div>
            )}
            {step !== null && !ordered && productName && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/5 flex justify-center items-center dark:text-gray-50">
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        send({
                            name: customerName,
                            email: customerEmail,
                            message: customerMessage,
                            product: selectedProduct,
                        }).then((result) => {
                            if (result.success) {
                            setStep(null);
                            setOrdered(true);
                            setNotification(true)}
                        })
                    }} className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg w-100 md:w-120 relative">
                        <button className="cursor-pointer text-black hover:text-blue-500 active:scale-92 absolute top-0 right-0 m-4 dark:text-gray-50" onClick={()=>{setStep(null);}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold mb-1 text-center dark:text-gray-50">
                            🛒 Bestil {productName} 🛒
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-md text-center pb-6">
                            Bestil {productName} ved at udfylde alle felterne. Du ville få en e-mail med yderligere info derefter.
                        </p>
                        <Input type="text" name="name" autoComplete="name" className="mb-2" value={customerName || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomerName(e.target.value)} required>
                            Dit navn
                        </Input>
                        <Input type="email" className="mb-4" name="email" autoComplete="email" value={customerEmail || ""} onChange={(e: ChangeEvent<HTMLInputElement>) => setCustomerEmail(e.target.value)} required>
                            Din email
                        </Input>
                        <Textarea className="mb-4" value={customerMessage || ""} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCustomerMessage(e.target.value)}>Evt kommentar</Textarea>
                        <Button type="submit" disabled={loading} className="px-4 py-2" button="normal" size="form-sm">
                            {ordered ? "Bestilt ✅" : "Bestil"}
                        </Button>
                    </form>
                </div>
            )}
            {step === null && ordered && productName && notification && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/5 flex justify-center items-center dark:text-gray-50">
                    <div className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg w-100 md:w-120 relative">
                        <button className="cursor-pointer text-black hover:text-blue-500 active:scale-92 absolute top-0 right-0 m-4 dark:text-gray-50" onClick={()=>{setNotification(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                            </svg>
                        </button>
                        <h2 className="text-lg font-semibold mb-1 text-center dark:text-gray-50">
                            🎉 Du har nu bestilt {productName} 🎉
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-md text-center pb-6">
                            Du kan tjekke din e-mail for mere info.
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}