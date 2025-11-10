'use client'

import { createClient } from '@/lib/client'
import { useCallback, useEffect, useState } from 'react'

interface UseRealtimeChatProps {
  roomName: string
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

  useEffect(() => {
    const loadAndSubscribeToMessages = async () => {
      try {
        setIsLoading(true)

        const { data: existingMessages, error: fetchError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_name', roomName)
          .order('created_at', { ascending: true })

        if (fetchError) {
          console.error('Error fetching initial messages:', fetchError)
        } else if (existingMessages) {
          const formattedMessages: ChatMessage[] = existingMessages.map((msg: any) => ({
            id: msg.id,
            content: msg.content,
            user: {
              name: msg.user_name,
            },
            createdAt: msg.created_at,
          }))
          setMessages(formattedMessages)
        }
      } catch (error) {
        console.error('Error loading initial messages:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAndSubscribeToMessages()
  }, [roomName, supabase])

  useEffect(() => {
    const newChannel = supabase.channel(roomName)

    newChannel
      .on('broadcast', { event: EVENT_MESSAGE_TYPE }, (payload) => {
        setMessages((current) => [...current, payload.payload as ChatMessage])
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true)
        } else {
          setIsConnected(false)
        }
      })

    setChannel(newChannel)

    return () => {
      supabase.removeChannel(newChannel)
    }
  }, [roomName, username, supabase])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channel || !isConnected) return

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        user: {
          name: username,
        },
        createdAt: new Date().toISOString(),
      }

      // Update local state immediately for the sender
      setMessages((current) => [...current, message])

      try {
        await supabase.from('chat_messages').insert([
          {
            id: message.id,
            content: message.content,
            room_name: roomName,
            user_name: message.user.name,
            created_at: message.createdAt,
          },
        ])
      } catch (error) {
        console.error('Error saving message to Supabase:', error)
      }

      await channel.send({
        type: 'broadcast',
        event: EVENT_MESSAGE_TYPE,
        payload: message,
      })
    },
    [channel, isConnected, username, roomName, supabase]
  )

  return { messages, sendMessage, isConnected, isLoading }
}
