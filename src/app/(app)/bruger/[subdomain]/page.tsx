//TODO: tilføj tekst og billede upload evt via "dropzone" i beskeder eller seperat

"use client"
import {useState} from "react";
import {Input} from "@/components/ChresserComponents/ui/Input";
import Button from "@/components/ChresserComponents/ui/Button";
import AttentionSpan from "@/components/ChresserComponents/ui/Attention";
import {BookUser, HandCoins, Mail, NotebookTabs, PersonStanding, StickyNote, Tag, User} from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Page() {
    const expected_hours = 10
    const hours_spend = 5
    const created_at = Date.now();
    const end_at = Date.now() + 30 * 24 * 60 * 60 * 1000;
    const created = new Date(created_at);
    const expectedEnd = new Date(end_at)
    const [loggedIn, setLoggedIn] = useState(true)
    const [highlighted, setHighlighted] = useState(false)
    const daysBack = Math.floor((end_at - Date.now()) / (1000 * 60 * 60 * 24));
    const expectedDaysBack = Math.floor(((expected_hours-hours_spend)/expected_hours)*30)
    const [orders, setOrders] = useState([{orderId: "545445", name: "Poul", email: "Poul@gmail.com", money: "989", product:"Et online visitkort", comment:"jeg ville have ekstra information omkring bla bla bla", userId:"reet-4433-bgfb-3535"}])
    return (
        <div className="w-full relative bg-gray-50">
            <div className="w-full h-screen overflow-y-auto">
                {orders.map((order, index) => (
                    <div className="" key={index}>
                        <div className="z-100 border-b mb-4 bg-white/64 backdrop-blur-sm w-full flex sticky top-0 flex-row justify-between py-4 px-8">
                            <div>
                                <h1 className="text-xl font-bold text-gradient-subtle mb-1 mt-5 lg:text-wrap break-words hyphens-auto lg:break-normal">Ordre {order.orderId}</h1>
                                <p className="text-sm text-gray-500">{order.product}</p>
                            </div>
                            <div className="justify-center items-center flex flex-col">
                                <AttentionSpan color="blue" className="!animate-none !from-blue-100 !via-blue-100 !to-blue-100 !cursor-default" title="Status">Behandles</AttentionSpan>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 p-4">
                            <div className="md:col-span-2 w-full">
                                <div className="shadow-xs w-full p-4 border bg-white">
                                    <span>Beskeder</span>
                                </div>
                            </div>
                            <div className="w-full space-y-4">
                                <div className="shadow-xs w-full p-4 border bg-white">
                                    <h2 className="mb-1">Ordre information</h2>
                                    <div className="mt-3 space-y-2 cursor-default">
                                        <p className="flex flex-row text-gray-500 items-center text-sm" title="Bruger ID"><BookUser size={20}/> <span className="ml-2 text-black">{order.userId}</span></p>
                                        <p className="flex flex-row text-gray-500 items-center text-sm" title="Brugernavn"><User size={20}/> <span className="ml-2 text-black">{order.name}</span></p>
                                        <p className="flex flex-row text-gray-500 items-center text-sm" title="E-mail"><Mail size={20}/> <span className="ml-2 text-black">{order.email}</span></p>
                                        <p className="flex flex-row text-gray-500 items-center text-sm" title="Ordre ID"><NotebookTabs size={20}/> <span className="ml-2 text-black">{order.orderId}</span></p>
                                        <p className="flex flex-row text-gray-500 items-center text-sm" title="Produkt"><Tag size={20}/> <span className="ml-2 text-black">{order.product}</span></p>
                                        <p className="flex flex-row text-gray-500 items-center text-sm" title="Pris"><HandCoins size={20}/> <span className="ml-2 text-black">{order.money}<span className="text-xs">kr</span></span></p>
                                    </div>
                                </div>
                                <div className="shadow-xs w-full p-4 border bg-white">
                                    <h2 className="mb-1">Forventet tid</h2>
                                    <div className="mt-3 space-y-2">
                                        <Progress value={(hours_spend/expected_hours)*100}/>
                                        <div className="flex flex-row justify-between text-sm text-gray-500">
                                        <p>ca. {expectedDaysBack} dage tilbage</p>
                                        <p>maks. {daysBack} dage tilbage</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
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
        </div>
    )
}