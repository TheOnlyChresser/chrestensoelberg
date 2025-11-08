'use client'

import { createClient } from '@/lib/client'
import { useCallback, useEffect, useState } from 'react'

interface UseRealtimeChatProps {
  roomName: string // This should be the order_id (UUID) from the orders table
  username: string
}

export interface ChatMessage {
  id: string
  content: string
  user: {
    name: string
  }
  createdAt: string
}

const EVENT_MESSAGE_TYPE = 'message'

export function useRealtimeChat({ roomName, username }: UseRealtimeChatProps) {
  const supabase = createClient()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [channel, setChannel] = useState<ReturnType<typeof supabase.channel> | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load existing messages from database
  useEffect(() => {
    async function loadMessages() {
      try {
        // First, get the order UUID from the order_id (roomName might be the order_id string)
        // If roomName is already a UUID, use it directly. Otherwise, look it up.
        let orderUuid = roomName

        // If roomName is not a UUID format, try to find the order by order_id
        if (!roomName.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .select('id')
            .eq('order_id', roomName)
            .single()

          if (orderError || !orderData) {
            console.error('Error finding order:', orderError)
            // If orders table doesn't exist, set empty messages
            if (orderError?.code === 'PGRST116' || orderError?.message?.includes('permission denied')) {
              console.warn('Orders table may not exist or RLS is blocking access. Please check your database setup.')
            }
            setIsLoading(false)
            setMessages([])
            return
          }
          orderUuid = orderData.id
        }

        // Load messages for this order
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .eq('order_id', orderUuid)
          .order('created_at', { ascending: true })

        if (error) {
          console.error('Error loading messages:', error)
          // If table doesn't exist or RLS is blocking, set empty messages
          if (error.code === 'PGRST116' || error.message?.includes('permission denied')) {
            console.warn('Messages table may not exist or RLS is blocking access. Please check your database setup.')
            setMessages([])
          }
        } else if (data) {
          // Transform database messages to ChatMessage format
          const formattedMessages: ChatMessage[] = data.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            user: {
              name: msg.username,
            },
            createdAt: msg.created_at,
          }))
          setMessages(formattedMessages)
        } else {
          // No messages found, set empty array
          setMessages([])
        }
      } catch (error) {
        console.error('Error in loadMessages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()
  }, [roomName, supabase])

  // Set up realtime subscription for database changes
  useEffect(() => {
    if (isLoading) return

    let isMounted = true
    let currentChannel: ReturnType<typeof supabase.channel> | null = null

    async function setupRealtime() {
      // Get the order UUID
      let orderUuid = roomName
      if (!roomName.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
        const { data: orderData } = await supabase
          .from('orders')
          .select('id')
          .eq('order_id', roomName)
          .single()

        if (orderData) {
          orderUuid = orderData.id
        } else {
          return
        }
      }

      if (!isMounted) return

      // Subscribe to database changes on messages table
      currentChannel = supabase
        .channel(`messages:${orderUuid}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `order_id=eq.${orderUuid}`,
          },
          (payload) => {
            if (!isMounted) return
            const newMessage = payload.new as any
            const chatMessage: ChatMessage = {
              id: newMessage.id,
              content: newMessage.content,
              user: {
                name: newMessage.username,
              },
              createdAt: newMessage.created_at,
            }
            setMessages((current) => {
              // Avoid duplicates
              if (current.some((m) => m.id === chatMessage.id)) {
                return current
              }
              return [...current, chatMessage]
            })
          }
        )
        .subscribe((status) => {
          if (!isMounted) return
          if (status === 'SUBSCRIBED') {
            setIsConnected(true)
          } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
            setIsConnected(false)
          }
        })

      if (isMounted && currentChannel) {
        setChannel(currentChannel as any)
      }
    }

    setupRealtime()

    return () => {
      isMounted = false
      if (currentChannel) {
        supabase.removeChannel(currentChannel)
      }
    }
  }, [roomName, supabase, isLoading])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!isConnected || isLoading) return

      try {
        // Get the order UUID
        let orderUuid = roomName
        if (!roomName.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
          const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .select('id')
            .eq('order_id', roomName)
            .single()

          if (orderError || !orderData) {
            console.error('Error finding order:', orderError)
            return
          }
          orderUuid = orderData.id
        }

        // Save message to database
        const { data, error } = await supabase
          .from('messages')
          .insert([
            {
              order_id: orderUuid,
              content: content.trim(),
              username: username,
            },
          ])
          .select()
          .single()

        if (error) {
          console.error('Error saving message:', error)
          // Check if it's a table/permission error
          if (error.code === 'PGRST116' || error.message?.includes('permission denied')) {
            console.error('Messages table may not exist or RLS is blocking access. Please check your database setup.')
            alert('Kunne ikke sende besked. Tjek venligst at databasen er korrekt opsat.')
          } else {
            // Still update local state for optimistic UI for other errors
            const optimisticMessage: ChatMessage = {
              id: crypto.randomUUID(),
              content,
              user: {
                name: username,
              },
              createdAt: new Date().toISOString(),
            }
            setMessages((current) => [...current, optimisticMessage])
          }
        }
        // If successful, the realtime subscription will handle adding the message
      } catch (error) {
        console.error('Error in sendMessage:', error)
      }
    },
    [isConnected, isLoading, roomName, username, supabase]
  )

  return { messages, sendMessage, isConnected, isLoading }
}
