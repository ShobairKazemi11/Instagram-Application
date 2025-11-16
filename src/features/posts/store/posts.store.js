// src/features/posts/store/posts.store.js
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const usePostsStore = create(
  persist(
    (set, get) => ({
      posts: [
        {
          id: 1,
          userId: 1,
          user: {
            name: 'John Doe',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          },
          content: 'Just launched my new React project! 🚀 So excited to share this with the community. #React #JavaScript',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 24,
          comments: [
            {
              id: 1,
              userId: 2,
              user: {
                name: 'Sarah Wilson',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
              },
              text: 'This looks amazing! Great work!',
              timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            }
          ],
          userReactions: {},
        },
        {
          id: 2,
          userId: 2,
          user: {
            name: 'Sarah Wilson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          },
          content: 'Beautiful sunset from my hike today. Nature always inspires my design work! 🌅',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          likes: 42,
          comments: [],
          userReactions: {},
        },
        {
          id: 3,
          userId: 3,
          user: {
            name: 'Mike Johnson',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          },
          content: 'Just optimized our API and reduced response time by 60%! Performance matters! 💪',
          image: null,
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
          likes: 18,
          comments: [
            {
              id: 2,
              userId: 1,
              user: {
                name: 'John Doe',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
              },
              text: 'Impressive work! What was the biggest bottleneck?',
              timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
            }
          ],
          userReactions: {},
        },
      ],
      addPost: (post) => set((state) => ({ 
        posts: [post, ...state.posts] 
      })),
      addComment: (postId, comment) => set((state) => ({
        posts: state.posts.map(post => 
          post.id === postId 
            ? { ...post, comments: [...post.comments, comment] }
            : post
        )
      })),
      toggleLike: (postId, userId) => set((state) => ({
        posts: state.posts.map(post => {
          if (post.id === postId) {
            const hasLiked = post.userReactions[userId] === 'like'
            return {
              ...post,
              likes: hasLiked ? post.likes - 1 : post.likes + 1,
              userReactions: {
                ...post.userReactions,
                [userId]: hasLiked ? null : 'like'
              }
            }
          }
          return post
        })
      })),
      addReaction: (postId, userId, reaction) => set((state) => ({
        posts: state.posts.map(post => {
          if (post.id === postId) {
            const currentReaction = post.userReactions[userId]
            const reactionCountChange = currentReaction === reaction ? -1 : 
                                      currentReaction ? 0 : 1
            
            return {
              ...post,
              likes: post.likes + reactionCountChange,
              userReactions: {
                ...post.userReactions,
                [userId]: currentReaction === reaction ? null : reaction
              }
            }
          }
          return post
        })
      })),
    }),
    {
      name: 'posts-storage',
    }
  )
)