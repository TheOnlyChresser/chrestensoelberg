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

        console.log('Fetching messages for room:', roomName)

        const { data: existingMessages, error: fetchError } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_name', roomName)
          .order('created_at', { ascending: true })

        if (fetchError) {
          console.error('Error fetching initial messages:', fetchError)
          alert('Fejl ved hentning af beskeder: ' + fetchError.message)
        } else if (existingMessages) {
          console.log('Fetched messages:', existingMessages)
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
        alert('Fejl: ' + error)
      } finally {
        setIsLoading(false)
      }
    }

    loadAndSubscribeToMessages()
  }, [roomName, supabase])

  useEffect(() => {
    const newChannel = supabase.channel(roomName)

    console.log('Creating channel for room:', roomName)

    newChannel
      .on('broadcast', { event: EVENT_MESSAGE_TYPE }, (payload) => {
        console.log('Received broadcast message:', payload)
        setMessages((current) => [...current, payload.payload as ChatMessage])
      })
      .subscribe(async (status) => {
        console.log('Channel subscription status:', status, 'for room:', roomName)
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
      if (!channel || !isConnected) {
        console.error('Cannot send message:', { hasChannel: !!channel, isConnected })
        return
      }

      const message: ChatMessage = {
        id: crypto.randomUUID(),
        content,
        user: {
          name: username,
        },
        createdAt: new Date().toISOString(),
      }

      // opdater local state efter send
      setMessages((current) => [...current, message])

      try {
        console.log('Inserting message to database:', {
          id: message.id,
          content: message.content,
          room_name: roomName,
          user_name: message.user.name,
          created_at: message.createdAt,
        })

        const { data, error } = await supabase.from('chat_messages').insert([
          {
            id: message.id,
            content: message.content,
            room_name: roomName,
            user_name: message.user.name,
            created_at: message.createdAt,
          },
        ])

        if (error) {
          console.error('Error saving message to Supabase:', error)
          alert('Fejl ved sending af besked: ' + error.message)
        } else {
          console.log('Message saved successfully:', data)
        }
      } catch (error) {
        console.error('Unexpected error saving message:', error)
        alert('Fejl ved sending: ' + error)
      }

      try {
        await channel.send({
          type: 'broadcast',
          event: EVENT_MESSAGE_TYPE,
          payload: message,
        })
      } catch (error) {
        console.error('Error broadcasting message:', error)
      }
    },
    [channel, isConnected, username, roomName, supabase]
  )

  return { messages, sendMessage, isConnected, isLoading }
}
