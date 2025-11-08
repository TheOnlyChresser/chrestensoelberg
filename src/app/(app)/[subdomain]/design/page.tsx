"use client"
import { useState, useEffect } from "react"
import { useSubdomain } from "../SubdomainProvider"
import { createClient } from '@/lib/client'

export default function Page() {
    const { loggedIn, subdomain } = useSubdomain()
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchDesign() {
            if (!loggedIn || !subdomain) {
                setIsLoading(false)
                return
            }

            try {
                // tjek om feltet findes
                const { data: ordersData, error: ordersError } = await supabase
                    .from('orders')
                    .select('*')
                    .eq('customer_id', subdomain)
                    .limit(1)
                    .single()

                if (ordersError) {
                    // hvis fejl find felt med det
                    console.log('Ingen ordre:', ordersError)
                } else if (ordersData) {
                    // tjek for feltet
                    const imageUrlField = (ordersData as any).image_url || (ordersData as any).design_url || null
                    setImageUrl(imageUrlField)
                }
            } catch (error) {
                console.error('Fejl i fetchDesign:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDesign()
    }, [loggedIn, subdomain, supabase])

    if (!loggedIn) {
        return null // login
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen p-8">
                <p className="text-gray-500">Indlæser...</p>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Design</h1>
            
            {imageUrl ? (
                <div className="bg-white rounded-lg shadow-sm border p-6 max-w-4xl">
                    <h2 className="text-lg font-semibold mb-4">Dit design</h2>
                    <div className="mb-4">
                        <img 
                            src={imageUrl} 
                            alt="Design" 
                            className="max-w-full h-auto rounded-lg border"
                            onError={(e) => {
                                console.error('Image load error:', e)
                                setImageUrl(null)
                            }}
                        />
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Billede URL:</p>
                        <p className="text-sm font-mono break-all">{imageUrl}</p>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">Der er endnu ikke et design tilgængeligt.</p>
                    <p className="text-sm text-gray-500 mt-2">Dit design vil blive vist her, når det er klar.</p>
                </div>
            )}
        </div>
    )
}