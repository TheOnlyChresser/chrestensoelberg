"use client"
import { useState, useEffect } from "react"
import { useSubdomain } from "../SubdomainProvider"
import { createClient } from '@/lib/client'
import { User, Mail } from "lucide-react"

export default function Page() {
    const { loggedIn, subdomain } = useSubdomain()
    const [customer, setCustomer] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchCustomer() {
            if (!loggedIn || !subdomain) {
                setIsLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('customers')
                    .select('*')
                    .eq('id', subdomain)
                    .single()

                if (error) {
                    console.error('Error fetching customer:', error)
                } else if (data) {
                    setCustomer(data)
                }
            } catch (error) {
                console.error('Error in fetchCustomer:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCustomer()
    }, [loggedIn, subdomain, supabase])

    if (!loggedIn) {
        return null // login
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen p-8">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Indstillinger</h1>
            
            {customer && (
                <div className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl">
                    <h2 className="text-lg font-semibold mb-4">Din information</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <User size={20} className="text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Navn</p>
                                <p className="text-base font-medium">{customer.customer_name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail size={20} className="text-gray-500" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="text-base font-medium">{customer.customer_email}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t">
                            <p className="text-sm text-gray-500">Konto oprettet</p>
                            <p className="text-base font-medium">
                                {new Date(customer.created_at).toLocaleDateString('da-DK', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}