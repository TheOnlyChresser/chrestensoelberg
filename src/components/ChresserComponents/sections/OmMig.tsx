"use client"

import SkillCard from "@/components/ChresserComponents/SkillCard";
import Animations from "@/components/ChresserComponents/animations";
import { Marquee } from "@/components/ui/marquee";

export default function OmMig() {
    return (
        <>
            <Animations />
            <section
                className="min-h-screen w-full flex-center flex-col -mt-40 md:-mt-64"
                id="skills"
                aria-label="Chresten Soelberg - Skills"
            >
                <div className="flex-col md:flex-row flex-center w-full">
                    <aside className="animation-box2 flex items-center flex-col w-full">
                            <Marquee pauseOnHover className="[--duration:30s]">
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
                            </Marquee>
                    </aside>
                </div>
            </section>
        </>
    );
}
