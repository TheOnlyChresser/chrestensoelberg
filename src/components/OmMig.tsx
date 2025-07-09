import Line from "@/components/Line"
import SkillCard from "@/components/SkillCard";

export default function OmMig () {
    return (
        <>
            <section 
                className="min-h-screen w-full flex-center flex-col" 
                id="ommig"
                aria-label="Om Chresten Soelberg"
            >
                <Line/>
                <div className="flex-center flex-col">
                    <h2 className="text-center text-6xl md:text-7xl text-gradient-subtle font-bold h-50">
                        Om mig
                    </h2>
                </div>
                <div className="flex-col md:flex-row flex-center w-full">
                    <article className="flex items-center px-5 w-full md:w-[40%] flex-col m-5 md:glass-box">
                        <div className="flex items-center flex-col w-full">
                            <h1 className="text-black/95 md:text-wrap md:text-left text-center text-3xl md:text-4xl font-semibold px-5 md:px-0">
                                HTX&apos;er med flair for hjemmesider
                            </h1>
                            <div className="m-5"/>
                            <p className="text-black/90 font-base md:text-left md:text-wrap text-center px-5 md:px-0">
                                Jeg er en nysgerrig HTX&apos;er med flair for hjemmesideudvikling og et skarpt øje for detaljen. 
                                Jeg kombinerer teknisk kunnen fra HTX med kreativ tænkning og brænder for at skabe brugervenlige, 
                                moderne og visuelt indbydende hjemmesider med fokus på performance, funktion og æstetik.
                            </p>
                            <p className="mt-5 text-black/90 font-base md:text-left md:text-wrap text-center px-5 md:px-0">
                                Udover webudvikling interesserer jeg mig også for brugeroplevelse (UX), UI-design og hvordan 
                                teknologi kan forenkle hverdagen. Jeg elsker at lære nye værktøjer og frameworks og går op i 
                                skalerbarhed og at levere løsninger, der både er effektive og æstetisk tilfredsstillende.
                            </p>
                        </div>
                    </article>
                    <aside className="md:glass-box px-5 md:px-0 flex items-center flex-col md:w-[40%] m-5">
                        <h3 className="text-gradient text-4xl text-center font-semibold">
                            Mine skills
                        </h3>
                        <div className="m-5"/>
                        <div className="flex-center flex-wrap gap-4" role="list" aria-label="Tekniske færdigheder">
                            <SkillCard 
                                name="Tailwind CSS" 
                                icon="devicon:tailwindcss" 
                                website="https://tailwindcss.com/"
                                description="Et utility-first CSS framework der giver mig hurtig og fleksibel styling med foruddefinerede klasser. Perfekt til at bygge moderne og responsive designs."
                            />
                            <SkillCard 
                                name="Next.js" 
                                icon="devicon:nextjs" 
                                website="https://nextjs.org/"
                                description="React framework med server-side rendering og statisk site generation. Giver mig mulighed for at bygge hurtige og SEO-optimerede webapplikationer."
                            />
                            <SkillCard 
                                name="Laravel" 
                                icon="devicon:laravel" 
                                website="https://laravel.com/"
                                description="PHP framework med elegant syntax og kraftfulde værktøjer. Perfekt til at bygge robuste backend-systemer og API'er."
                            />
                            <SkillCard 
                                name="React" 
                                icon="devicon:react" 
                                website="https://react.dev/"
                                description="JavaScript library til at bygge brugergrænseflader. Giver mig mulighed for at skabe interaktive og dynamiske webapplikationer."
                            />
                            <SkillCard 
                                name="Vite.js" 
                                icon="devicon:vitejs" 
                                website="https://vite.dev/"
                                description="Moderne build tool der giver hurtig udvikling og optimeret produktion. Perfekt til at fremskynde min udviklingsproces."
                            />
                            <SkillCard 
                                name="Figma" 
                                icon="devicon:figma" 
                                website="https://figma.com/"
                                description="Collaborative design tool til UI/UX design. Hjælper mig med at skabe visuelle prototyper og designs før implementering."
                            />
                            <SkillCard 
                                name="Python" 
                                icon="devicon:python" 
                                website="https://python.org/"
                                description="Versatil programmeringssprog med ren syntax. Perfekt til dataanalyse, automatisering og backend-udvikling."
                            />
                            <SkillCard 
                                name="JavaScript" 
                                icon="devicon:javascript" 
                                website="https://javascript.com/"
                                description="Dynamisk programmeringssprog der er grundlaget for moderne webudvikling. Giver mig mulighed for at skabe interaktive oplevelser."
                            />
                            <SkillCard 
                                name="TypeScript" 
                                icon="devicon:typescript" 
                                website="https://typescriptlang.org/"
                                description="Typed superset af JavaScript der giver mig bedre kodekvalitet og udvikleroplevelse gennem statisk type checking."
                            />
                            <SkillCard 
                                name="Wordpress" 
                                icon="devicon:wordpress" 
                                website="https://wordpress.com/"
                                description="Content management system der giver mig mulighed for at bygge hjemmesider hurtigt og effektivt."
                            />
                        </div>
                    </aside>
                </div>
            </section>
        </>
    )
}