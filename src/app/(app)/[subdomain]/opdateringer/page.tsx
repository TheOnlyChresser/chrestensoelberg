"use client"
import { useState, useEffect } from "react"
import { useSubdomain } from "../SubdomainProvider"
import { createClient } from '@/lib/client'

interface Update {
    id: string
    order_id: string
    product: string
    status: string
    updated_at: string
    created_at: string
}

export default function Page() {
    const { loggedIn, subdomain } = useSubdomain()
    const [updates, setUpdates] = useState<Update[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchUpdates() {
            if (!loggedIn || !subdomain) {
                setIsLoading(false)
                return
            }

            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select('id, order_id, product, status, updated_at, created_at')
                    .eq('customer_id', subdomain)
                    .order('updated_at', { ascending: false })

                if (error) {
                    console.error('Error fetching updates:', error)
                } else if (data) {
                    setUpdates(data)
                }
            } catch (error) {
                console.error('Error in fetchUpdates:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUpdates()
    }, [loggedIn, subdomain, supabase])

    if (!loggedIn) {
        return null // Login handled by layout
    }

    if (isLoading) {
        return (
            <div className="w-full min-h-screen p-8">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'completed':
                return 'Færdig'
            case 'in_progress':
                return 'I gang'
            case 'pending':
                return 'Afventer'
            default:
                return status
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-700'
            case 'in_progress':
                return 'bg-blue-100 text-blue-700'
            case 'pending':
                return 'bg-yellow-100 text-yellow-700'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    return (
        <div className="w-full min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6">Opdateringer</h1>
            
            {updates.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">Ingen opdateringer endnu.</p>
                </div>
            ) : (
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    
                    <div className="space-y-6">
                        {updates.map((update, index) => (
                            <div key={update.id} className="relative flex items-start gap-4">
                                {/* Timeline dot */}
                                <div className={`relative z-10 w-4 h-4 rounded-full border-2 border-white ${
                                    index === 0 ? 'bg-blue-500' : 'bg-gray-400'
                                }`}></div>
                                
                                <div className="flex-1 bg-white rounded-lg shadow-sm border p-4 ml-4">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-semibold text-lg">Ordre {update.order_id}</h3>
                                            <p className="text-sm text-gray-600">{update.product}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(update.status)}`}>
                                            {getStatusLabel(update.status)}
                                        </span>
                                    </div>
                                    
                                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                                        <p>
                                            <span className="font-medium">Oprettet:</span>{' '}
                                            {new Date(update.created_at).toLocaleString('da-DK', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                        {update.updated_at !== update.created_at && (
                                            <p>
                                                <span className="font-medium">Opdateret:</span>{' '}
                                                {new Date(update.updated_at).toLocaleString('da-DK', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}