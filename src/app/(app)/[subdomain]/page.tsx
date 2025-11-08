//TODO: tilføj tooltip til logoer
"use client"
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import {Input} from "@/components/ChresserComponents/ui/Input";
import Button from "@/components/ChresserComponents/ui/Button";
import AttentionSpan from "@/components/ChresserComponents/ui/Attention";
import {HandCoins, Mail, PersonStanding, StickyNote, User, LogOut, Clock} from "lucide-react";
import { RealtimeChat } from '@/components/realtime-chat'
import { createClient } from '@/lib/client'

// cookie stuff
const CUSTOMER_COOKIE_NAME = 'customer_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // maks alder er 7 dage

function setCookie(name: string, value: string, maxAge: number = COOKIE_MAX_AGE) {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`
}

function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop()?.split(';').shift() || '')
    }
    return null
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`
}

interface Order {
    id: string
    orderId: string
    name: string
    email: string
    money: string | number
    product: string
    status: string
    timeSpent: number
    expectedTime: number | null
}

export default function Page() {
    const params = useParams()
    const subdomain = params?.subdomain as string | undefined
    
    const [loggedIn, setLoggedIn] = useState(false)
    const [highlighted, setHighlighted] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState<string | null>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [subdomainValid, setSubdomainValid] = useState<boolean | null>(null)
    const [subdomainError, setSubdomainError] = useState<string | null>(null)
    const supabase = createClient()

    // se om uuid i [subdomain] findes i database
    useEffect(() => {
        const validateSubdomain = async () => {
            if (!subdomain) {
                setSubdomainValid(false)
                setSubdomainError('Ingen subdomain fundet')
                setIsLoading(false)
                return
            }

            // se om det er korrekt format
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
            if (!uuidRegex.test(subdomain)) {
                setSubdomainValid(false)
                setSubdomainError('Ugyldig subdomain format. Subdomain skal være en UUID.')
                setIsLoading(false)
                return
            }

            // se om person med det uuid findes
            try {
                const { data: customerData, error } = await supabase
                    .from('customers')
                    .select('id, customer_name, customer_email')
                    .eq('id', subdomain)
                    .single()

                if (error || !customerData) {
                    setSubdomainValid(false)
                    setSubdomainError('Denne subdomain eksisterer ikke i databasen.')
                    setIsLoading(false)
                    return
                }

                // det findes
                setSubdomainValid(true)
                setSubdomainError(null)
            } catch (error) {
                console.error('Error validating subdomain:', error)
                setSubdomainValid(false)
                setSubdomainError('Der opstod en fejl ved validering af subdomain.')
                setIsLoading(false)
            }
        }

        validateSubdomain()
    }, [subdomain, supabase])

    // se om nogen er logget ind
    useEffect(() => {
        const checkLoginSession = async () => {
            // kun tjek hvis valid
            if (!subdomainValid || !subdomain) {
                setLoggedIn(false)
                return
            }

            const customerSession = getCookie(CUSTOMER_COOKIE_NAME)
            if (customerSession) {
                try {
                    const sessionData = JSON.parse(customerSession)
                    // se om person findesi database
                    // og customer id er lig med uuid
                    if (sessionData.customerName && sessionData.customerId) {
                        // samme som subdomain?
                        if (sessionData.customerId !== subdomain) {
                            // customer id matcher ikke [subdomain], fjern cookie
                            deleteCookie(CUSTOMER_COOKIE_NAME)
                            setLoggedIn(false)
                            return
                        }

                        const { data: customerData, error } = await supabase
                            .from('customers')
                            .select('id, customer_name')
                            .eq('id', sessionData.customerId)
                            .eq('customer_name', sessionData.customerName)
                            .single()

                        if (customerData && !error && customerData.id === subdomain) {
                            // session matcher subdomain
                            setLoggedIn(true)
                        } else {
                            // customer fidnes ikke
                            deleteCookie(CUSTOMER_COOKIE_NAME)
                            setLoggedIn(false)
                        }
                    } else {
                        // noget galt med session, fjern cookie
                        deleteCookie(CUSTOMER_COOKIE_NAME)
                        setLoggedIn(false)
                    }
                } catch (error) {
                    // dårlig cookie, fjern
                    deleteCookie(CUSTOMER_COOKIE_NAME)
                    setLoggedIn(false)
                }
            } else {
                setLoggedIn(false)
            }
        }

        // kun tjek session efter subdomain er valid
        if (subdomainValid !== null) {
            checkLoginSession()
        }
    }, [supabase, subdomainValid, subdomain])

    useEffect(() => {
        async function fetchOrders() {
            // kun få ordre hvis subdomain er korrekt
            if (!subdomainValid || !subdomain) {
                setIsLoading(false)
                return
            }

            try {
                // kun find dem for customer
                let { data, error } = await supabase
                    .from('orders')
                    .select(`
                        id,
                        order_id,
                        product,
                        status,
                        money,
                        time_spent,
                        expected_time,
                        created_at,
                        updated_at,
                        customer_id,
                        customers:customer_id (
                            customer_name,
                            customer_email
                        )
                    `)
                    .eq('customer_id', subdomain) // kun få ordre for den customer
                    .order('created_at', { ascending: false })

                // hvis det ikke virker så prøv noget andet
                if (error) {
                    const { data: altData, error: altError } = await supabase
                        .from('orders')
                        .select(`
                            id,
                            order_id,
                            product,
                            status,
                            money,
                            time_spent,
                            expected_time,
                            created_at,
                            updated_at,
                            customer_id
                        `)
                        .eq('customer_id', subdomain) // kun ordre for den customer
                        .order('created_at', { ascending: false })

                    if (altError) {
                        console.error('Error fetching orders:', altError)
                        // se om der er table error
                        if (altError.code === 'PGRST116' || altError.message?.includes('permission denied')) {
                            console.warn('Orders table may not exist or RLS is blocking access. Please check your database setup.')
                            setOrders([])
                        }
                        setIsLoading(false)
                        return
                    }

                    // ordre uden customer data, gør noget andet
                    if (altData && altData.length > 0) {
                        const customerIds = altData.map((o: any) => o.customer_id).filter(Boolean)
                        const { data: customersData } = await supabase
                            .from('customers')
                            .select('id, customer_name, customer_email')
                            .in('id', customerIds)

                        const customersMap = new Map(
                            (customersData || []).map((c: any) => [c.id, c])
                        )

                        const formattedOrders: Order[] = altData.map((order: any) => {
                            const customer = customersMap.get(order.customer_id)
                            // udregn forventet tid
                            let expectedTime = order.expected_time
                            if (!expectedTime) {
                                // altid 1 måned
                                expectedTime = 30 * 24 * 60 // 1 måned i minutter
                            }
                            return {
                                id: order.id,
                                orderId: order.order_id,
                                name: customer?.customer_name || 'Ukendt',
                                email: customer?.customer_email || '',
                                money: order.money || 0,
                                product: order.product || '',
                                status: order.status || 'pending',
                                timeSpent: order.time_spent || 0,
                                expectedTime: expectedTime,
                            }
                        })
                        setOrders(formattedOrders)
                    }
                } else if (data) {
                    // formattering
                    const formattedOrders: Order[] = data.map((order: any) => {
                        // håndter forskellige strukture
                        const customer = order.customers || order.customer || null
                        // udregn forventet tid
                        let expectedTime = order.expected_time
                        if (!expectedTime) {
                            // altid 1 måned
                            expectedTime = 30 * 24 * 60
                        }
                        return {
                            id: order.id,
                            orderId: order.order_id,
                            name: customer?.customer_name || 'Ukendt',
                            email: customer?.customer_email || '',
                            money: order.money || 0,
                            product: order.product || '',
                            status: order.status || 'pending',
                            timeSpent: order.time_spent || 0,
                            expectedTime: expectedTime,
                        }
                    })
                    setOrders(formattedOrders)
                }
            } catch (error) {
                console.error('Kunne ikke fetche orders:', error)
            } finally {
                setIsLoading(false)
            }
        }

        if (loggedIn && subdomainValid) {
            fetchOrders()
        } else {
            setIsLoading(false)
        }
    }, [loggedIn, supabase, subdomainValid, subdomain])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError(null)
        setLoginLoading(true)

        try {
            // se om subdomain er valid før login
            if (!subdomainValid || !subdomain) {
                setLoginError('Ugyldig subdomain. Kan ikke logge ind.')
                setLoginLoading(false)
                return
            }

            // find customer af customer_name
            const { data: customerData, error: customerError } = await supabase
                .from('customers')
                .select('id, customer_name, customer_email, password')
                .eq('customer_name', username.trim())
                .single()

            if (customerError || !customerData) {
                setLoginError('Forkert brugernavn eller adgangskode')
                setLoginLoading(false)
                return
            }

            // se om customer id matcher uuid
            if (customerData.id !== subdomain) {
                setLoginError('Denne bruger matcher ikke subdomain. Forkert subdomain.')
                setLoginLoading(false)
                return
            }

            // direkte comparison indtil kryptering tilføjes tilføjer hashing senere
            if (customerData.password !== password.trim()) {
                setLoginError('Forkert brugernavn eller adgangskode')
                setLoginLoading(false)
                return
            }

            // login virkede, tilføj cookie
            const sessionData = {
                customerId: customerData.id,
                customerName: customerData.customer_name,
                customerEmail: customerData.customer_email,
                loginTime: new Date().toISOString()
            }
            setCookie(CUSTOMER_COOKIE_NAME, JSON.stringify(sessionData))
            
            setLoggedIn(true)
            setUsername('')
            setPassword('')
        } catch (error) {
            console.error('Log ind fejl:', error)
            setLoginError('Der opstod en fejl. Prøv igen.')
        } finally {
            setLoginLoading(false)
        }
    }

    const handleLogout = () => {
        deleteCookie(CUSTOMER_COOKIE_NAME)
        setLoggedIn(false)
        setOrders([])
        setUsername('')
        setPassword('')
    }

    // vis error hvis invalid subdomain
    if (subdomainValid === false) {
        return (
            <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
                    <h1 className="text-2xl font-bold text-red-600 mb-4">Ugyldig Subdomain</h1>
                    <p className="text-gray-700 mb-2">{subdomainError || 'Denne subdomain eksisterer ikke.'}</p>
                    <p className="text-sm text-gray-500">
                        Subdomain skal være en gyldig UUID, der findes i databasen.
                    </p>
                </div>
            </div>
        )
    }

    // vis indlæsning imens tjek køres
    if (subdomainValid === null || isLoading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Validerer subdomain...</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="w-full min-h-screen">
                {isLoading ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <p className="text-gray-500">Indlæser ordre...</p>
                    </div>
                ) : orders.length === 0 && loggedIn ? (
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="text-center">
                            <p className="text-gray-500 mb-2">Ingen ordre fundet.</p>
                            <p className="text-sm text-gray-400">Bestil noget.</p>
                        </div>
                    </div>
                ) : (
                    orders.map((order) => (
                        <div className="flex flex-col w-full min-h-screen" key={order.id}>
                    <div className="border-b mb-4 bg-white w-full flex flex-row justify-between p-4 pl-16">
                        <div>
                        <h1 className="text-xl font-bold text-gradient-subtle mb-1 mt-5 lg:text-wrap break-words hyphens-auto lg:break-normal">Ordre {order.orderId}</h1>
                        <p className="text-sm text-gray-500">{order.product}</p>
                        </div>
                            <div className="flex flex-row gap-4 items-center">
                        <div className="justify-center items-center flex flex-col">
                            <AttentionSpan className="!animate-none">
                                {order.status === 'completed' ? 'Færdig' : 
                                 order.status === 'in_progress' ? 'I gang' : 
                                 'Afventer'}
                            </AttentionSpan>
                            </div>
                            <Button
                                onClick={handleLogout}
                                className="px-3 py-2 flex flex-row justify-center"
                                button="normal"
                                color="red"
                                size="sm"
                                title="Log ud"
                            >
                                <LogOut size={16} className="mr-2 flex"/>
                                Log ud
                            </Button >
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
                                        <p className="flex flex-row text-gray-500 items-center text-sm"><StickyNote size={20}/> <span className="ml-2 text-black">{order.timeSpent || 0} minutter</span></p>
                                        {order.expectedTime !== null && order.expectedTime !== undefined && order.expectedTime > 0 && (
                                            <div className="mt-3">
                                                <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                                                    <span>Fremgang</span>
                                                    <span>{order.timeSpent || 0} / {order.expectedTime} minutter</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                        style={{ 
                                                            width: `${Math.min(100, ((order.timeSpent || 0) / order.expectedTime) * 100)}%` 
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
            {!loggedIn && (
                <div className="z-[100] inset-0 w-full h-screen fixed bg-[#c999ff] bg-[radial-gradient(at_43%_6%,hsla(145,66%,78%,1)_0px,transparent_50%),radial-gradient(at_41%_43%,hsla(323,63%,61%,1)_0px,transparent_50%),radial-gradient(at_87%_76%,hsla(342,94%,60%,1)_0px,transparent_50%),radial-gradient(at_72%_35%,hsla(203,65%,61%,1)_0px,transparent_50%),radial-gradient(at_72%_77%,hsla(72,62%,61%,1)_0px,transparent_50%),radial-gradient(at_17%_3%,hsla(134,73%,61%,1)_0px,transparent_50%),radial-gradient(at_70%_17%,hsla(111,84%,64%,1)_0px,transparent_50%)] flex flex-col items-center pt-32">
                        <form onSubmit={handleLogin} className="bg-white/64 dark:bg-black/40 rounded-2xl p-8 shadow-lg w-100 md:w-120 relative border-1 border-white/40 dark:border-black/40">
                            <h2 className="text-lg font-semibold mb-1 text-center dark:text-gray-50">
                                Log ind
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-md text-center pb-6">
                                Log ind med brugernavn og adgangskoden sendt på e-mailen.<span className="mb-1 cursor-default hover:text-blue-300" onMouseEnter={()=> {setHighlighted(true)}} onMouseLeave={()=>{setHighlighted(false)}}>*</span>
                            </p>
                            {loginError && (
                                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md">
                                    <p className="text-sm text-red-700 dark:text-red-300">{loginError}</p>
                                </div>
                            )}
                            <Input 
                                type="text" 
                                className="mb-2" 
                                required
                                value={username}
                                onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
                                disabled={loginLoading}
                            >
                                Dit brugernavn
                            </Input>
                            <Input 
                                type="password" 
                                className="mb-4" 
                                required
                                value={password}
                                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
                                disabled={loginLoading}
                            >
                                Din adgangskode
                            </Input>
                            <Button 
                                type="submit" 
                                className="px-4 py-2" 
                                button="normal" 
                                size="form-md"
                                disabled={loginLoading}
                            >
                                {loginLoading ? 'Logger ind...' : 'Log ind'}
                            </Button>
                            <p className="text-sm p-2 text-gray-500"><span className={highlighted ? ("text-blue-300"): ("")}>*</span> E-mailen du blev sendt, hvor der også stod linket til denne hjemmeside.</p>
                        </form>
                </div>
            )}
        </div>
    )
}