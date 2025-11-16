// src/features/posts/pages/PostPage.jsx
import { useParams, Navigate } from 'react-router'
import { Container, Stack, Button } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import PostCard from '../components/PostCard'
import { usePostsStore } from '../store/posts.store'

const PostPage = () => {
  const { id } = useParams()
  const { posts } = usePostsStore()

  const post = posts.find(p => p.id === parseInt(id))

  if (!post) {
    return <Navigate to="/feed" replace />
  }

  return (
    <Container size="sm" style={{ padding: 0 }}>
      <Stack gap="md">
        <Button 
          className="glass-button"
          leftSection={<IconArrowLeft size={16} />}
          onClick={() => window.history.back()}
          style={{ alignSelf: 'flex-start' }}
        >
          Back to Feed
        </Button>
        
        <PostCard post={post} />
      </Stack>
    </Container>
  )
}

export default PostPage