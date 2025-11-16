// src/features/posts/pages/FeedPage.jsx
import { Container, Stack, TextInput, ActionIcon, Group, Card, Avatar } from '@mantine/core'
import { IconSearch, IconSend } from '@tabler/icons-react'
import { useState } from 'react'
import PostCard from '../components/PostCard'
import { usePostsStore } from '../store/posts.store'
import { useAuthStore } from '../../auth/store/auth.store'

const FeedPage = () => {
  const { posts, addPost } = usePostsStore()
  const { user } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [newPost, setNewPost] = useState('')

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        userId: user.id,
        user: {
          name: user.name,
          avatar: user.avatar,
        },
        content: newPost.trim(),
        image: null,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        userReactions: {},
      }
      addPost(post)
      setNewPost('')
    }
  }

  return (
    <Container size="sm" style={{ padding: 0 }}>
      <Stack gap="md">
        {/* Search Bar */}
        <TextInput
          placeholder="Search posts..."
          leftSection={<IconSearch size={18} style={{ color: 'rgba(255,255,255,0.7)' }} />}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          className="glass-input"
          styles={{
            input: {
              height: '48px',
              fontSize: '1rem',
            }
          }}
        />

        {/* Create Post */}
        <Card className="glass-card" style={{ padding: '1rem' }}>
          <Group gap="sm" align="flex-end">
            <Avatar src={user.avatar} size="md" radius="xl" />
            <TextInput
              placeholder={`What's on your mind, ${user.name}?`}
              value={newPost}
              onChange={(event) => setNewPost(event.currentTarget.value)}
              style={{ flex: 1 }}
              className="glass-input"
              styles={{
                input: {
                  height: '44px',
                  fontSize: '1rem',
                }
              }}
            />
            <ActionIcon 
              className="gradient-button"
              size="lg"
              onClick={handleAddPost}
              disabled={!newPost.trim()}
              style={{ 
                width: '44px', 
                height: '44px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
              }}
            >
              <IconSend size={18} />
            </ActionIcon>
          </Group>
        </Card>

        {/* Posts Feed */}
        <Stack gap="md">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </Stack>
      </Stack>
    </Container>
  )
}

export default FeedPage