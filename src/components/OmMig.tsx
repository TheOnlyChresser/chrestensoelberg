import Line from "@/components/Line"
import SkillCard from "@/components/SkillCard";

export default function OmMig () {
    return (
        <>
            <section className="min-h-screen w-full flex-center flex-col">
                <Line/>
                <div className="flex-center flex-col">
                    <h1 className="text-center text-4xl md:text-7xl text-glass h-50">Om mig</h1>
                </div>
                <div className="flex-col md:flex-row flex-center w-full">
                    <div className="flex items-center w-[40%] flex-col m-5 glass-box">
                        <div className="flex items-center flex-col">
                            <h1 className="text-black/95 text-4xl font-semibold">HTX&apos;er med flair for hjemmesideudvikling</h1>
                            <div className="m-5"/>
                            <p className="text-black/90 font-thin">Selvstændig og nysgerrig HTX’er med flair for hjemmesideudvikling og et skarpt øje for detaljen. Jeg kombinerer teknisk kunnen med kreativ tænkning og brænder for at skabe brugervenlige, moderne og visuelt indbydende webløsninger – altid med fokus på performance, funktion og æstetik.</p>
                        </div>
                    </div>
                    <div className="glass-box flex items-center flex-col w-[40%] m-5">
                        <h1 className="text-gradient text-4xl text-center font-semibold">Mine skills</h1>
                        <div className="m-5"/>
                        <div className="flex-center flex-wrap gap-4">
                            <SkillCard name="Tailwind CSS" icon="devicon:tailwindcss" />
                            <SkillCard name="Next.js" icon="devicon:nextjs" />
                            <SkillCard name="Laravel" icon="devicon:laravel" />
                            <SkillCard name="React" icon="devicon:react" />
                            <SkillCard name="Vite.js" icon="devicon:vitejs" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}