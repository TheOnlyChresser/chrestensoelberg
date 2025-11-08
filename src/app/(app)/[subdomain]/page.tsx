//TODO: tilføj parent til den f.eks. /s/a/b/[subdomain] så man ikke kan gå ind på chrestensoelberg.dk/[subdomain] hvor den ikke giver fejl. husk at tilføj / til middleware når det "erstattes"

"use client"
import {useState} from "react";
import {Input} from "@/components/ChresserComponents/ui/Input";
import Button from "@/components/ChresserComponents/ui/Button";
import AttentionSpan from "@/components/ChresserComponents/ui/Attention";
import {HandCoins, Mail, PersonStanding, StickyNote, User} from "lucide-react";
import { RealtimeChat } from '@/components/realtime-chat'

export default function Page() {
    const [loggedIn, setLoggedIn] = useState(true)
    const [highlighted, setHighlighted] = useState(false)
    const [orders, setOrders] = useState([{orderId: "545445", name: "Poul", email: "Poul@gmail.com", money: "989", product:"Et online visitkort", comment:"jeg ville have ekstra information omkring bla bla bla",}])
    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full min-h-screen">
                {orders.map((order, index) => (
                    <div className="flex flex-col w-full min-h-screen" key={index}>
                    <div className="border-b mb-4 bg-white w-full flex flex-row justify-between p-4 pl-16">
                        <div>
                        <h1 className="text-xl font-bold text-gradient-subtle mb-1 mt-5 lg:text-wrap break-words hyphens-auto lg:break-normal">Ordre {order.orderId}</h1>
                        <p className="text-sm text-gray-500">{order.product}</p>
                        </div>
                        <div className="justify-center items-center flex flex-col">
                        <AttentionSpan className="!animate-none">Færdig</AttentionSpan>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4 p-4">
                        <div className="md:col-span-2 w-full">
                        <div className="w-full p-4 border bg-white rounded-md">
                            <span>Beskeder</span>
                            <RealtimeChat roomName={order.orderId} username={order.name}/>
                        </div>
                        </div>
                        <div className="w-full space-y-4">
                            <div className="w-full p-4 border bg-white rounded-md">
                                <h2 className="mb-1">Information</h2>
                                <hr/>
                                <div className="mt-3 space-y-2">
                                    <p className="flex flex-row text-gray-500 items-center text-sm"><User size={20}/> <span className="ml-2 text-black">{order.name}</span></p>
                                    <p className="flex flex-row text-gray-500 items-center text-sm"><Mail size={20}/> <span className="ml-2 text-black">{order.email}</span></p>
                                    <p className="flex flex-row text-gray-500 items-center text-sm"><HandCoins size={20}/> <span className="ml-2 text-black">{order.money}<span className="text-xs">kr</span></span></p>
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