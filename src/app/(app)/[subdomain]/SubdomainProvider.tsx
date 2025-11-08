'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@/lib/client'

// cookie
const CUSTOMER_COOKIE_NAME = 'customer_session'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function setCookie(name: string, value: string, maxAge: number = COOKIE_MAX_AGE) {
    if (typeof document !== 'undefined') {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`
    }
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
    if (typeof document !== 'undefined') {
        document.cookie = `${name}=; path=/; max-age=0`
    }
}

interface SubdomainContextType {
    subdomain: string | undefined
    subdomainValid: boolean | null
    subdomainError: string | null
    loggedIn: boolean
    setLoggedIn: (value: boolean) => void
    loginLoading: boolean
    loginError: string | null
    setLoginError: (error: string | null) => void
    username: string
    setUsername: (value: string) => void
    password: string
    setPassword: (value: string) => void
    handleLogin: (e: React.FormEvent) => Promise<void>
    handleLogout: () => void
    isLoading: boolean
    highlighted: boolean
    setHighlighted: (value: boolean) => void
}

const SubdomainContext = createContext<SubdomainContextType | undefined>(undefined)

export function useSubdomain() {
    const context = useContext(SubdomainContext)
    if (!context) {
        throw new Error('useSubdomain must be used within SubdomainProvider')
    }
    return context
}

export function SubdomainProvider({ children }: { children: ReactNode }) {
    const params = useParams()
    const subdomain = params?.subdomain as string | undefined
    const supabase = createClient()

    const [subdomainValid, setSubdomainValid] = useState<boolean | null>(null)
    const [subdomainError, setSubdomainError] = useState<string | null>(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)
    const [loginError, setLoginError] = useState<string | null>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [highlighted, setHighlighted] = useState(false)

    // se om det er korrekt url
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

            // customer med uuid findes?
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

                // subdomain er korrekt
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

    // se om login er der
    useEffect(() => {
        const checkLoginSession = async () => {
            // tjek hvis subdomain findes
            if (!subdomainValid || !subdomain) {
                setLoggedIn(false)
                setIsLoading(false)
                return
            }

            const customerSession = getCookie(CUSTOMER_COOKIE_NAME)
            if (customerSession) {
                try {
                    const sessionData = JSON.parse(customerSession)
                    // matcher hinanden
                    if (sessionData.customerName && sessionData.customerId) {
                        // tjek
                        if (sessionData.customerId !== subdomain) {
                            // fjern cookie
                            deleteCookie(CUSTOMER_COOKIE_NAME)
                            setLoggedIn(false)
                            setIsLoading(false)
                            return
                        }

                        const { data: customerData, error } = await supabase
                            .from('customers')
                            .select('id, customer_name')
                            .eq('id', sessionData.customerId)
                            .eq('customer_name', sessionData.customerName)
                            .single()

                        if (customerData && !error && customerData.id === subdomain) {
                            // det virker
                            setLoggedIn(true)
                        } else {
                            // customer findes ikke, slet cookie
                            deleteCookie(CUSTOMER_COOKIE_NAME)
                            setLoggedIn(false)
                        }
                    } else {
                        // dårlig session, fjern cookie
                        deleteCookie(CUSTOMER_COOKIE_NAME)
                        setLoggedIn(false)
                    }
                } catch (error) {
                    // dårlig cookie, fjern den
                    deleteCookie(CUSTOMER_COOKIE_NAME)
                    setLoggedIn(false)
                }
            } else {
                setLoggedIn(false)
            }
            setIsLoading(false)
        }

        // tjek session efter valid subdomain
        if (subdomainValid !== null) {
            checkLoginSession()
        }
    }, [supabase, subdomainValid, subdomain])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoginError(null)
        setLoginLoading(true)

        try {
            // verify subdomaine
            if (!subdomainValid || !subdomain) {
                setLoginError('Ugyldig subdomain. Kan ikke logge ind.')
                setLoginLoading(false)
                return
            }

            // customer by navn
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

            // customerid=uuid
            if (customerData.id !== subdomain) {
                setLoginError('Denne bruger matcher ikke subdomain. Forkert subdomain.')
                setLoginLoading(false)
                return
            }

            // simpel password comparison senere hasing
            if (customerData.password !== password.trim()) {
                setLoginError('Forkert brugernavn eller adgangskode')
                setLoginLoading(false)
                return
            }

            // Login virker, tilføj cookie
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
            console.error('Login error:', error)
            setLoginError('Der opstod en fejl. Prøv igen.')
        } finally {
            setLoginLoading(false)
        }
    }

    const handleLogout = () => {
        deleteCookie(CUSTOMER_COOKIE_NAME)
        setLoggedIn(false)
        setUsername('')
        setPassword('')
    }

    const value: SubdomainContextType = {
        subdomain,
        subdomainValid,
        subdomainError,
        loggedIn,
        setLoggedIn,
        loginLoading,
        loginError,
        setLoginError,
        username,
        setUsername,
        password,
        setPassword,
        handleLogin,
        handleLogout,
        isLoading,
        highlighted,
        setHighlighted,
    }

    return <SubdomainContext.Provider value={value}>{children}</SubdomainContext.Provider>
}

