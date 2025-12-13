//TODO: tilføj tekst og billede upload evt via "dropzone" i beskeder eller seperat

"use client"
import {ChangeEvent, useEffect, useState} from "react";
import {Input} from "@/components/ChresserComponents/ui/Input";
import Button from "@/components/ChresserComponents/ui/Button";
import AttentionSpan from "@/components/ChresserComponents/ui/Attention";
import {BookUser, HandCoins, Mail, NotebookTabs, PersonStanding, StickyNote, Tag, User} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {RealtimeChat} from "@/components/realtime-chat";
import {createClient} from "@/lib/client";
import {router} from "next/client";

export default function Page() {
    const supabase = createClient()
    const [loggedIn, setLoggedIn] = useState(false)
    const [password, setPassword] = useState("")
    const [highlighted, setHighlighted] = useState(false)
    const falseDeadline: string = new Date(Date.now() + 30*24*60*60*1000).toISOString();
    const [orders, setOrders] = useState<any[]>([{
        id: "545445",
        customerId: "reet-4433-bgfb-3535",
        timeTaken: "4",
        expectedTime: "10",
        updatedAt: "",
        createdAt: "",
        design: "",
        productName: "et online visitkort",
        productPrice: "989",
        status:"Et online visitkort",
        comment:"jeg ville have ekstra information omkring bla bla bla",
        deadline: falseDeadline,
        totalClip: "10",
        clipsUsed: "0"
    }])
    const [customer, setCustomer] = useState({
        id: "reet-4433-bgfb-3535",
        customerName: "Poul",
        customerEmail: "Poul@gmail.com"
    })
    const [timeEntries, setTimeEntries] = useState<Record<string, number>>({})
    const [expectedTime, setExpectedTime] = useState<number>(10)
    const [timeTaken, setTimeTaken] = useState<number>(7)
    const [orderCreatedAt, setOrderCreatedAt] = useState<number>(Date.now())
    const [deadline, setDeadline] = useState<number>(Date.now() + 30 * 24 * 60 * 60 * 1000)
    const [daysBack, setDaysBack] = useState<number>(Math.floor((deadline - Date.now()) / (1000 * 60 * 60 * 24)))
    const [expectedDaysBack, setExpectedDaysBack] = useState<number>(Math.floor(((expectedTime-timeTaken)/expectedTime)*30))
    const [id, setId] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const host = window.location.host;
            const subdomain = host.split(".")[0];
            setId(subdomain);
        }
    }, []);

    useEffect(()=> {
        console.log(orders)
        console.log(customer)
    }, [orders, customer])

    useEffect(()=> {
        const cachedLoggedIn = localStorage.getItem("loggedIn") === "true";
        const cachedCustomer = localStorage.getItem("customer");
        const cachedOrders = localStorage.getItem("orders");

        if (cachedLoggedIn && cachedCustomer && cachedOrders) {
            setLoggedIn(true);
            setCustomer(JSON.parse(cachedCustomer));
            setOrders(JSON.parse(cachedOrders));
        }
    }, [])

    useEffect(() => {
        if (loggedIn) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("customer", JSON.stringify(customer));
            localStorage.setItem("orders", JSON.stringify(orders));
            
            // fetcher tid for alle ordre
            const fetchTimeEntries = async () => {
                const { data } = await supabase
                    .from("time_entries")
                    .select("order_id, hours_spent")
                    .eq("customer_id", customer.id);
                
                if (data) {
                    const entriesByOrder: Record<string, number> = {};
                    data.forEach((entry: any) => {
                        if (!entriesByOrder[entry.order_id]) {
                            entriesByOrder[entry.order_id] = 0;
                        }
                        entriesByOrder[entry.order_id] += entry.hours_spent;
                    });
                    setTimeEntries(entriesByOrder);
                }
            };
            
            fetchTimeEntries();
        }
    }, [loggedIn, customer, orders]);
    return (
        <div className="w-full relative bg-gray-50 dark:bg-gray-950">
            <div className="w-full h-screen overflow-y-auto">
                {orders.map((order, index) => (
                    <div className="min-h-screen"
                         key={index}>
                        <div className="z-100 border-b border-t mb-4 bg-white/64 dark:bg-gray-900/64 backdrop-blur-sm w-full flex sticky top-0 flex-row justify-between py-4 px-8">
                            <div>
                                <h1 className="text-xl font-bold text-gradient-subtle dark:text-white/90 mb-1 mt-5 lg:text-wrap break-words hyphens-auto lg:break-normal">
                                    Ordre {order.id}
                                </h1>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {order.productName}
                                </p>
                            </div>
                            <div className="justify-center items-center flex flex-col">
                                <AttentionSpan color="blue"
                                               className="!animate-none !from-blue-100 !via-blue-100 !to-blue-100 !cursor-default"
                                               title="Status">
                                    {order.status}
                                </AttentionSpan>
                            </div>
                        </div>
                        <div className="items-center justify-center w-full">
                        <div className="grid md:grid-cols-3 gap-4 p-4 mx-4 md:mx-0 pb-24 md:pb-0">
                            <div className="shadow-xs md:col-span-2 w-full p-4 pb-6 border dark:border-gray-800 bg-white dark:bg-gray-900 max-h-[80vh] md:max-h-[60vh] overflow-y-hidden">
                                <span className="dark:text-white/90">
                                    Beskeder
                                </span>
                                <RealtimeChat
                                    roomName={order.id}
                                    username={customer.customerName}
                                />
                            </div>
                            <div className="w-full md:grid md:grid-rows-3 space-y-4">
                                <div className="shadow-xs w-full p-4 border dark:border-gray-800 bg-white dark:bg-gray-900 md:row-span-2">
                                    <h2 className="mb-1 dark:text-white/90">
                                        Ordre information
                                    </h2>
                                    <div className="mt-3 space-y-2 cursor-default">
                                        <p className="flex flex-row text-gray-500 dark:text-gray-400 items-center text-sm"
                                           title="Bruger ID">
                                            <BookUser size={20}/>
                                            <span className="ml-2 text-black dark:text-white/90">
                                                {order.customerId}
                                            </span>
                                        </p>
                                        <p className="flex flex-row text-gray-500 dark:text-gray-400 items-center text-sm"
                                           title="Brugernavn">
                                            <User size={20}/>
                                            <span className="ml-2 text-black dark:text-white/90">
                                                {customer.customerName}
                                            </span>
                                        </p>
                                        <p className="flex flex-row text-gray-500 dark:text-gray-400 items-center text-sm"
                                           title="E-mail">
                                            <Mail size={20}/>
                                            <span className="ml-2 text-black dark:text-white/90">
                                                {customer.customerEmail}
                                            </span>
                                        </p>
                                        <p className="flex flex-row text-gray-500 dark:text-gray-400 items-center text-sm" title="Ordre ID"><NotebookTabs size={20}/> <span className="ml-2 text-black dark:text-white/90">{order.id}</span></p>
                                        <p className="flex flex-row text-gray-500 dark:text-gray-400 items-center text-sm" title="Produkt"><Tag size={20}/> <span className="ml-2 text-black dark:text-white/90">{order.productName}</span></p>
                                        <p className="flex flex-row text-gray-500 dark:text-gray-400 items-center text-sm" title="Pris"><HandCoins size={20}/> <span className="ml-2 text-black dark:text-white/90">{order.productPrice}{ !isNaN(Number(order.productPrice)) && (<span className="text-xs">kr</span>)}</span></p>
                                    </div>
                                </div>
                                <div className="shadow-xs w-full p-4 border dark:border-gray-800 bg-white dark:bg-gray-900">
                                    <h2 className="mb-1 dark:text-white/90">{order.productName === "et klippekort" ? ("Antal klip"):("Forventet tid")}</h2>
                                    <div className="mt-3 space-y-2">
                                        <Progress value={order.productName === "et klippekort" ? (parseInt(order.clipsUsed)/parseInt(order.totalClip)): ((timeEntries[order.id] || 0) / (order.expectedTime || 1)) * 100}/>
                                        {order.productName === "et klippekort" ? (
                                            <div className="flex flex-row justify-between text-sm text-gray-500 dark:text-gray-400">
                                                <p>klip tilbage: {parseInt(order.totalClip)-parseInt(order.clipsUsed)}</p>
                                            </div>
                                        ):(
                                            <div className="flex flex-row justify-between text-sm text-gray-500 dark:text-gray-400">
                                                <p>ca. {order.expectedTime ? Math.ceil(((order.expectedTime - (timeEntries[order.id] || 0)) / order.expectedTime) * 30) : 0} dage tilbage</p>
                                                <p>maks. {Math.ceil((new Date(order.deadline.split(".")[0] + "Z").getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dage tilbage</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                            { order.productName !== "et klippekort" && order.design && order.design !== "" && (
                        <div className="flex flex-col w-full items-center justify-center">
                            <div className="my-8 flex flex-col items-center justify-center border dark:border-gray-800 bg-white dark:bg-gray-900 p-4 max-w-7xl mx-auto min-h-[300px] shadow-xs">
                                {order.design && order.design !== "" ? (
                                    <img
                                        src={order.design}
                                        alt="billede af design"
                                        className="w-full max-w-[1200px] h-auto object-contain rounded shadow-md"
                                    />
                                ) : (
                                    <p className="w-full text-center text-sm text-gray-500 dark:text-gray-400 sm:text-base px-16 lg:px-24">
                                        Designet ville blive vist her når det er færdigt.
                                    </p>
                                )}
                            </div>
                        </div>)}


                        </div>
                    </div>
                ))}
            </div>
            {!loggedIn && (
                <div className="z-1000 inset-0 w-full h-[100dvh] fixed bg-gray-50 dark:bg-gray-950 flex flex-col items-center pt-32">
                    <div className="bg-gray-100/64 dark:bg-gray-950/40 rounded-2xl p-8 shadow-lg w-100 md:w-120 relative border-1 border-black/40 dark:border-black/40">
                        <h2 className="text-lg font-semibold mb-1 text-center dark:text-gray-50">
                            Log ind
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-md text-center pb-6">
                            Log ind med adgangskoden sendt på e-mailen.
                            <span className="mb-1 cursor-default hover:text-blue-300"
                                  onMouseEnter={()=> {setHighlighted(true)}}
                                  onMouseLeave={()=>{setHighlighted(false)}}
                            >
                            *
                        </span>
                        </p>
                        <Input
                            type="password"
                            className="mb-4"
                            value={password}
                            onChange={
                            (e: ChangeEvent<HTMLInputElement>) =>
                                setPassword(e.target.value)}
                            required>
                            Din adgangskode
                        </Input>
                        <Button
                            type="submit"
                            className="px-4 py-2"
                            button="normal"
                            size="form-md"
                            onClick={async ()=>{
                            const {data: customerData, error: customerError} = await supabase
                                .from("customers")
                                .select()
                                .eq("id", id)
                                .eq("password", password)
                            if (!customerError && customerData.length > 0) {
                                const {data: orderData, error: orderError} = await supabase
                                    .from("orders")
                                    .select()
                                    .eq("customerId", id)
                                if (orderError) {
                                    console.error("Fejl med database:", orderError)
                                }
                                if (orderData && customerData) {
                                setOrders(orderData);
                                setCustomer(customerData[0]);
                                setLoggedIn(true)}
                            }
                        }}>
                            Log ind
                        </Button>
                        <p className="text-sm p-2 text-gray-500 dark:text-gray-400">
                            <span className={highlighted ? ("text-blue-300"): ("")}>*</span>
                            E-mailen du blev sendt, hvor der også stod linket til denne hjemmeside.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}