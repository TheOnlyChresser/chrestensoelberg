//TODO: tilføj parent til den f.eks. /s/a/b/[subdomain] så man ikke kan gå ind på chrestensoelberg.dk/[subdomain] hvor den ikke giver fejl. husk at tilføj / til middleware når det "erstattes"

"use client"
import {useState} from "react";
import {Input} from "@/components/ChresserComponents/ui/Input";
import Button from "@/components/ChresserComponents/ui/Button";

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(true)
    const [highlighted, setHighlighted] = useState(false)
    return (
        <>
            <div className="w-full min-h-screen"></div>
            {!loggedIn && (
                <div className="inset-0 w-full h-screen fixed bg-[#c999ff] bg-[radial-gradient(at_43%_6%,hsla(145,66%,78%,1)_0px,transparent_50%),radial-gradient(at_41%_43%,hsla(323,63%,61%,1)_0px,transparent_50%),radial-gradient(at_87%_76%,hsla(342,94%,60%,1)_0px,transparent_50%),radial-gradient(at_72%_35%,hsla(203,65%,61%,1)_0px,transparent_50%),radial-gradient(at_72%_77%,hsla(72,62%,61%,1)_0px,transparent_50%),radial-gradient(at_17%_3%,hsla(134,73%,61%,1)_0px,transparent_50%),radial-gradient(at_70%_17%,hsla(111,84%,64%,1)_0px,transparent_50%)] flex flex-col items-center pt-32">
                        <form className="bg-white/64 dark:bg-black/40 rounded-2xl p-8 shadow-lg w-100 md:w-120 relative border-1 border-white/40 dark:border-black/40">
                            <h2 className="text-lg font-semibold mb-1 text-center dark:text-gray-50">
                                Log ind
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-md text-center pb-6">
                                Log ind med brugernavn og adgangskoden sendt på e-mailen.<span className="mb-1 cursor-default hover:text-blue-300" onMouseEnter={()=> {setHighlighted(true)}} onMouseLeave={()=>{setHighlighted(false)}}>*</span>
                            </p>
                            <Input type="text" className="mb-2" required>
                                Dit brugernavn
                            </Input>
                            <Input type="email" className="mb-4" required>
                                Din adgangskode
                            </Input>
                            <Button type="submit" className="px-4 py-2" button="normal" size="form-md">
                                Log ind
                            </Button>
                            <p className="text-sm p-2 text-gray-500"><span className={highlighted ? ("text-blue-300"): ("")}>*</span> E-mailen du blev sendt, hvor der også stod linket til denne hjemmeside.</p>
                        </form>
                </div>
            )}
        </>
    )
}