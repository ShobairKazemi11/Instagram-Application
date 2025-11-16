// src/features/chat/store/chat.store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useChatStore = create(
  persist(
    (set, get) => ({
      messages: [
        {
          id: 1,
          userId: 2,
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          },
          text: 'Hey! Loved your recent post about React optimization!',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: 2,
          userId: 1,
          user: {
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          },
          text: 'Thanks Sarah! I was working on some performance improvements.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 60000).toISOString(),
        },
        {
          id: 3,
          userId: 2,
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          },
          text: 'Do you have any tips for reducing bundle size?',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 120000).toISOString(),
        },
      ],
      onlineUsers: [1, 2, 3],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      markAsRead: (messageId) => set((state) => ({
        messages: state.messages.map(msg =>
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      })),
    }),
    {
      name: 'chat-storage',
    }
  )
)