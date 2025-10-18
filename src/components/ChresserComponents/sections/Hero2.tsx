import Button from "../ui/Button";
import Feature from "@/components/ChresserComponents/ui/Features";
import Quote from "@/components/ChresserComponents/sections/Quote";
import {
    PriceBlockWrappper,
    PriceBlockTitle,
    PriceBlockFeatures,
    PriceBlockUndertitle, PriceBlockTextWrapper
} from "@/components/ChresserComponents/ui/Priceblock";

export default function Hero() {
    return (
        <main className="min-h-screen w-full items-center bg-[hsla(82,0%,100%,1)] bg-[radial-gradient(at_45%_55%,hsla(1,0%,100%,1)_0px,transparent_30%),radial-gradient(at_36%_6%,hsla(181,100%,89%,1)_0px,transparent_25%),radial-gradient(at_2%_11%,hsla(155,100%,85%,1)_0px,transparent_20%)]">
            <div className="flex flex-col justify-center items-center min-h-screen">
                <h1 className="text-7xl font-bold leading-tight text-center max-w-[60vw]">Hjemmesider, som passer til dig</h1>
                <p className="text-xl text-center mt-6 text-gray-500 max-w-[72vw] wrap-words">Alt er lavet kun til dig uden brug af færdiglavet løsninger eller AI. Uden brug af usikre løsninger, som Wordpress. Alt er skrevet fra bunden af.</p>
                <div className="mt-12 flex flex-row w-full items-center justify-center">
                    <Button button="normal" size="form-md" className="max-w-64 mr-8">Få din pris</Button>
                    <p className="group cursor-pointer text-black/80 text-xl flex items-center font-semibold transition-colors duration-300 hover:text-black">Lær mere<span className="inline-block ml-2 transform transition-all duration-300 group-hover:translate-x-1"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6"><path d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"/></svg></span></p>
                </div>
            </div>
            <div className="flex flex-col items-center mb-40 bg-gray-100 py-8">
                <div className="grid grid-cols-3 gap-4 gap-y-8">
                    <Feature overskrift="Billig">Det koster blot 989kr for en hjemmeside!</Feature>
                    <Feature overskrift="Sikker">Ingen usikre system, som Wordpress brugt.</Feature>
                    <Feature overskrift="Hurtig">Du får på under en måned hele din hjemmeside oppe at køre.</Feature>
                    <Feature overskrift="Personlig">Jeg programmere alt fra bunden til dig.</Feature>
                    <Feature overskrift="SEO">Hjemmesider jeg laver er SEO optimeret.</Feature>
                    <Feature overskrift="Service">Du får 2 timers gratis support m.m. til de små justeringer.</Feature>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mb-20">
            <Quote person="eksempel.dk">Jeg har aldrig haft problemer siden jeg købte min hjemmeside hos ham</Quote>
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="mb-40 grid grid-cols-1 md:grid-cols-3 px-8 place-content-center place-items-center w-[92vw]">
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
                <PriceBlockTextWrapper>
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
                        <li>Kontaktformular</li>
                        <li>SEO optimeret</li>
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
                        <li>Kontaktformular</li>
                        <li>SEO optimeret</li>
                    </PriceBlockFeatures>
            </PriceBlockTextWrapper>
                    <Button size="form-md" button="reverse" className="w-2xs !rounded-sm">Kontakt for pris</Button>
                </PriceBlockWrappper>
            </div>
            </div>
        </main>
    )
}