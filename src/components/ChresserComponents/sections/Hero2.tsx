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
    PriceBlockUndertitle, PriceBlockTextWrapper
} from "@/components/ChresserComponents/ui/Priceblock";
import {BlurFade} from "@/components/ui/blur-fade";

export default function Hero() {
    return (
        <main className="min-h-screen w-full items-center md:bg-[hsla(82,0%,100%,1)] md:bg-[radial-gradient(at_45%_55%,hsla(1,0%,100%,1)_0px,transparent_30%),radial-gradient(at_36%_6%,hsla(181,100%,89%,1)_0px,transparent_25%),radial-gradient(at_2%_11%,hsla(155,100%,85%,1)_0px,transparent_20%)]">
            <div className="bg-[hsla(82,0%,100%,1)] bg-[radial-gradient(at_45%_55%,hsla(1,0%,100%,1)_0px,transparent_30%),radial-gradient(at_36%_6%,hsla(181,100%,89%,1)_0px,transparent_25%),radial-gradient(at_2%_11%,hsla(155,100%,85%,1)_0px,transparent_20%)] px-4 flex flex-col pt-40 md:pt-0 md:mt-0 md:justify-center items-center min-h-screen">
                <BlurFade delay={0.25*4} inView>
                <span className="cursor-pointer bg-gradient-to-r from-lime-100 via-emerald-100 to-teal-100 text-emerald-900 border border-emerald-400 px-4 py-2 rounded-md text-sm md:text-base font-semibold shadow-sm tracking-wide animate-pulse text-center hover:animate-none">🎉 KICKSTART KAMPAGNE: FÅ ET GRATIS ONLINE VISITKORT ×2 🎉</span>
                </BlurFade>
                <BlurFade delay={0.25} inView>
                    <h1 className="text-5xl px-4 md:text-7xl font-bold leading-tight text-center md:max-w-[60vw]">Hjemmesider, som passer til dig</h1>
                </BlurFade>
                <BlurFade delay={0.25*2} inView>
                    <p className="px-4 text-md md:text-xl text-center mt-6 text-gray-500 md:max-w-[72vw] wrap-words md:px-0">Alt er lavet kun til dig uden brug af færdiglavet løsninger eller AI. Uden brug af usikre løsninger, som Wordpress. Alt er skrevet fra bunden af.</p>
                </BlurFade>
                <BlurFade delay={0.25*3} inView className="w-full">
                    <div className="mt-12 flex flex-col md:flex-row w-full items-center justify-center">
                        <a href="/#priser" className="mr-16 mb-4 md:mb-0"><Button button="normal" size="form-md" className="max-w-64">Få din pris</Button></a>
                        <p className="group cursor-pointer text-black/80 text-xl flex items-center font-semibold transition-colors duration-300 hover:text-black">Læs mere<span className="inline-block ml-2 transform transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:-translate-y-0"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"/></svg></span></p>
                    </div>
                </BlurFade>
            </div>
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
            <div className="flex flex-col items-center justify-center mb-20">
            <Quote person="Chresten Soelberg">Jeg stræber efter at give dig den bedste oplevelse</Quote>
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="scroll-mt-24 bg-gray-100/40 mb-40 grid grid-cols-1 md:grid-cols-3 p-8 place-content-center w-full gap-y-4 md:gap-y-0 place-items-center" id="priser">
                <PriceBlockWrappper>
                    <PriceBlockTextWrapper>
                    <PriceBlockTextWrapper>
                        <PriceBlockTitle>
                            Klippekort
                        </PriceBlockTitle>
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
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Køb for 500kr</Button>
                </PriceBlockWrappper>
                <PriceBlockWrappper>
                <PriceBlockTextWrapper className="scale-102">
                    <PriceBlockTextWrapper>
                        <PriceBlockTitle>
                            Online visitkort
                        </PriceBlockTitle>
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
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Køb for 989 kr</Button>
                </PriceBlockWrappper>
                <PriceBlockWrappper>
                <PriceBlockTextWrapper>
                    <PriceBlockTextWrapper>
                        <PriceBlockTitle>
                            Hjemmeside
                        </PriceBlockTitle>
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
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Kontakt for pris</Button>
                </PriceBlockWrappper>
            </div>
            </div>
        </main>
    )
}