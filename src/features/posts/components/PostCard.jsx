// src/features/posts/components/PostCard.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Card,
  Group,
  Avatar,
  Text,
  Image,
  ActionIcon,
  Textarea,
  Button,
  Stack,
  Divider,
  Menu,
} from '@mantine/core'
import { 
  IconMessage, 
  IconShare,
  IconDots,
  IconMoodHeart,
} from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'
import { usePostsStore } from '../store/posts.store'
import ReactionGroup from './ReactionGroup'
import CommentList from './CommentList'

const PostCard = ({ post }) => {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState('')
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { addComment } = usePostsStore()

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        userId: user.id,
        user: {
          name: user.name,
          avatar: user.avatar,
        },
        text: newComment.trim(),
        timestamp: new Date().toISOString(),
      }
      addComment(post.id, comment)
      setNewComment('')
    }
  }

  const handlePostClick = () => {
    navigate(`/post/${post.id}`)
  }

  return (
    <Card className="glass-card post-card">
      {/* Post Header */}
      <Group justify="space-between" align="flex-start" style={{ marginBottom: '1rem' }}>
        <Group gap="sm">
          <Avatar src={post.user.avatar} size="md" radius="xl" />
          <div>
            <Text className="text-white font-semibold">{post.user.name}</Text>
            <Text className="text-white-60 text-sm">{formatTime(post.timestamp)}</Text>
          </div>
        </Group>
        
        <Menu position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="subtle" size="sm" className="text-white-70">
              <IconDots size={16} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item>Save Post</Menu.Item>
            <Menu.Item>Report</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      {/* Post Content */}
      <div style={{ cursor: 'pointer' }} onClick={handlePostClick}>
        <Text style={{ marginBottom: '1rem', lineHeight: 1.6, color: 'white' }}>
          {post.content}
        </Text>

        {/* Post Image */}
        {post.image && (
          <Image
            src={post.image}
            radius="md"
            style={{ marginBottom: '1rem', maxHeight: 400, objectFit: 'cover' }}
          />
        )}
      </div>

      {/* Post Stats */}
      <Group justify="space-between" style={{ marginBottom: '0.5rem' }}>
        <Group gap={4}>
          <IconMoodHeart size={16} color="#f87171" />
          <Text className="text-white-60 text-sm">{post.likes} likes</Text>
        </Group>
        <Text className="text-white-60 text-sm">{post.comments.length} comments</Text>
      </Group>

      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* Action Buttons */}
      <Group gap={0} grow style={{ marginTop: '0.5rem' }}>
        <ReactionGroup post={post} />
        
        <ActionIcon
          variant="subtle"
          color={showComments ? 'blue' : 'gray'}
          onClick={() => setShowComments(!showComments)}
          size="lg"
          className="text-white-70"
        >
          <IconMessage size={20} />
        </ActionIcon>

        <ActionIcon variant="subtle" className="text-white-70" size="lg">
          <IconShare size={20} />
        </ActionIcon>
      </Group>

      {/* Comments Section */}
      {showComments && (
        <div style={{ marginTop: '1rem' }}>
          <CommentList comments={post.comments} />
          
          {/* Add Comment */}
          <Group gap="sm" style={{ marginTop: '1rem' }} align="flex-end">
            <Avatar src={user.avatar} size="sm" radius="xl" />
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(event) => setNewComment(event.currentTarget.value)}
              style={{ flex: 1 }}
              className="glass-input"
              styles={{
                input: {
                  minHeight: '40px',
                  fontSize: '0.9rem',
                }
              }}
            />
            <Button 
              size="sm" 
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="gradient-button"
            >
              Post
            </Button>
          </Group>
        </div>
      )}
    </Card>
  )
}

export default PostCard