import Line from "@/components/Line"
import SkillCard from "@/components/SkillCard";

export default function OmMig () {
    return (
        <>
            <section className="min-h-screen w-full flex-center flex-col" id="ommig">
                <Line/>
                <div className="flex-center flex-col">
                    <h2 className="text-center text-6xl md:text-7xl text-gradient-subtle font-bold h-50">Om mig</h2>
                </div>
                <div className="flex-col md:flex-row flex-center w-full">
                    <div className="flex items-center px-5 w-full md:w-[40%] flex-col m-5 md:glass-box">
                        <div className="flex items-center flex-col w-full">
                            <h1 className="text-black/95 md:text-wrap md:text-left text-center text-3xl md:text-4xl font-semibold px-5 md:px-0">HTX&apos;er med flair for hjemmesideudvikling</h1>
                            <div className="m-5"/>
                            <p className="text-black/90 font-thin md:text-left md:text-wrap text-center px-5 md:px-0">Selvstændig og nysgerrig HTX’er med flair for hjemmesideudvikling og et skarpt øje for detaljen. Jeg kombinerer teknisk kunnen med kreativ tænkning og brænder for at skabe brugervenlige, moderne og visuelt indbydende webløsninger – altid med fokus på performance, funktion og æstetik.</p>
                        </div>
                    </div>
                    <div className="md:glass-box px-5 md:px-0 flex items-center flex-col md:w-[40%] m-5">
                        <h2 className="text-gradient text-4xl text-center font-semibold">Mine skills</h2>
                        <div className="m-5"/>
                        <div className="flex-center flex-wrap gap-4">
                            <SkillCard name="Tailwind CSS" icon="devicon:tailwindcss" website="https://tailwindcss.com/"/>
                            <SkillCard name="Next.js" icon="devicon:nextjs" website="https://nextjs.org/"/>
                            <SkillCard name="Laravel" icon="devicon:laravel" website="https://laravel.com/"/>
                            <SkillCard name="React" icon="devicon:react" website="https://react.dev/"/>
                            <SkillCard name="Vite.js" icon="devicon:vitejs" website="https://vite.dev/"/>
                            <SkillCard name="Figma" icon="devicon:figma" website="https://figma.com/"/>
                            <SkillCard name="Python" icon="devicon:python" website="https://python.org/"/>
                            <SkillCard name="JavaScript" icon="devicon:javascript" website="https://javascript.com/"/>
                            <SkillCard name="TypeScript" icon="devicon:typescript" website="https://typescriptlang.org/"/>
                            <SkillCard name="Wordpress" icon="devicon:wordpress" website="https://wordpress.com/"/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}