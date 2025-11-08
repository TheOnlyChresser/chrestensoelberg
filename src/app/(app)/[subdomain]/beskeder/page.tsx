"use client"
import { useState, useEffect } from "react"
import { useSubdomain } from "../SubdomainProvider"
import { createClient } from '@/lib/client'

interface Message {
    id: string
    content: string
    username: string
    created_at: string
    order_id: string
}

export default function Page() {
    const { loggedIn, subdomain } = useSubdomain()
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function fetchMessages() {
            if (!loggedIn || !subdomain) {
                setIsLoading(false)
                return
            }

            try {
                // først find alle ordre
                const { data: ordersData, error: ordersError } = await supabase
                    .from('orders')
                    .select('id')
                    .eq('customer_id', subdomain)

                if (ordersError || !ordersData || ordersData.length === 0) {
                    setMessages([])
                    setIsLoading(false)
                    return
                }

                const orderIds = ordersData.map((o: any) => o.id)

                // beskeder fra ordre
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .in('order_id', orderIds)
                    .order('created_at', { ascending: false })

                if (error) {
                    console.error('Error fetching messages:', error)
                } else if (data) {
                    setMessages(data)
                }
            } catch (error) {
                console.error('Error in fetchMessages:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchMessages()
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
            <h1 className="text-2xl font-bold mb-6">Beskeder</h1>
            
            {messages.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-6">
                    <p className="text-gray-600">Ingen beskeder endnu.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className="bg-white rounded-lg shadow-sm border p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <p className="font-semibold text-sm">{message.username}</p>
                                    <p className="text-xs text-gray-500">
                                        {new Date(message.created_at).toLocaleString('da-DK', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <p className="text-gray-700 mt-2">{message.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}