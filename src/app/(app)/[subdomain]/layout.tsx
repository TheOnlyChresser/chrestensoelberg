"use client"
import {SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ChresserComponents/app-sidebar"
import { SubdomainProvider, useSubdomain } from "./SubdomainProvider"
import { Input } from "@/components/ChresserComponents/ui/Input"
import Button from "@/components/ChresserComponents/ui/Button"
import { LogOut } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

function LayoutContent({ children }: { children: React.ReactNode }) {
    const { subdomainValid, subdomainError, loggedIn, loginLoading, loginError, username, setUsername, password, setPassword, handleLogin, handleLogout, highlighted, setHighlighted } = useSubdomain()
    const pathname = usePathname()

    // fejl hvis invalid subdomain
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

    // loader hvis tjekker
    if (subdomainValid === null) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Validerer...</p>
            </div>
        )
    }

    return (
        <SidebarProvider className="font-montserrat">
            <AppSidebar />
            <main className="w-full min-h-screen flex flex-col bg-gray-50">
                <div className="fixed bg-white/40 border rounded-sm backdrop-blur-sm ml-2 mt-2 z-50">
                    <SidebarTrigger />
                </div>

                {children}

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
            </main>
        </SidebarProvider>
    )
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SubdomainProvider>
            <LayoutContent>{children}</LayoutContent>
        </SubdomainProvider>
    )
}