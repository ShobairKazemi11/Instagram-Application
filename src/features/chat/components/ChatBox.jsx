// src/features/chat/components/ChatBox.jsx
import { useState, useRef, useEffect } from 'react'
import { 
  Paper, 
  TextInput, 
  Button, 
  Stack, 
  Group, 
  Avatar, 
  Text, 
  ScrollArea,
  ActionIcon
} from '@mantine/core'
import { IconSend, IconMoodSmile } from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'
import { useChatStore } from '../store/chat.store'

const ChatBox = () => {
  const [newMessage, setNewMessage] = useState('')
  const { user } = useAuthStore()
  const { messages, addMessage } = useChatStore()
  const viewport = useRef(null)

  const scrollToBottom = () => {
    viewport.current?.scrollTo({ top: viewport.current.scrollHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        userId: user.id,
        user: {
          name: user.name,
          avatar: user.avatar,
        },
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
      }
      addMessage(message)
      setNewMessage('')
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <Paper 
      className="glass-card"
      style={{ 
        height: '600px', 
        display: 'flex', 
        flexDirection: 'column',
        padding: '1rem'
      }}
    >
      {/* Messages Area */}
      <ScrollArea 
        viewportRef={viewport}
        style={{ flex: 1 }}
        offsetScrollbars
      >
        <Stack gap="md" style={{ padding: '0.25rem' }}>
          {messages.map((message) => {
            const isOwnMessage = message.userId === user.id
            
            return (
              <Group 
                key={message.id} 
                justify={isOwnMessage ? 'flex-end' : 'flex-start'}
                align="flex-start"
                gap="xs"
              >
                {!isOwnMessage && (
                  <Avatar 
                    src={message.user.avatar} 
                    size="sm" 
                    radius="xl" 
                  />
                )}
                
                <Stack gap={2} style={{ maxWidth: '70%' }}>
                  {!isOwnMessage && (
                    <Text className="text-white font-semibold text-sm">
                      {message.user.name}
                    </Text>
                  )}
                  <Paper
                    style={{
                      padding: '0.75rem',
                      background: isOwnMessage
                        ? 'linear-gradient(135deg, #667eea, #764ba2)'
                        : 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: isOwnMessage ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                      border: isOwnMessage ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                  >
                    <Text className="text-white text-sm" style={{ lineHeight: 1.4 }}>
                      {message.text}
                    </Text>
                  </Paper>
                  <Text 
                    className="text-white-60 text-xs"
                    style={{ textAlign: isOwnMessage ? 'right' : 'left' }}
                  >
                    {formatTime(message.timestamp)}
                  </Text>
                </Stack>

                {isOwnMessage && (
                  <Avatar 
                    src={message.user.avatar} 
                    size="sm" 
                    radius="xl" 
                  />
                )}
              </Group>
            )
          })}
        </Stack>
      </ScrollArea>

      {/* Message Input */}
      <Group gap="sm" style={{ marginTop: '1rem' }} align="flex-end">
        <ActionIcon variant="subtle" className="text-white-60" size="lg">
          <IconMoodSmile size={20} />
        </ActionIcon>
        
        <TextInput
          placeholder="Type a message..."
          value={newMessage}
          onChange={(event) => setNewMessage(event.currentTarget.value)}
          onKeyPress={handleKeyPress}
          style={{ flex: 1 }}
          className="glass-input"
          styles={{
            input: {
              height: '44px',
              fontSize: '1rem',
            }
          }}
        />
        
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="gradient-button"
          size="md"
          style={{ height: '44px' }}
        >
          <IconSend size={18} />
        </Button>
      </Group>
    </Paper>
  )
}

export default ChatBox