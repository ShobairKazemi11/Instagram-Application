// src/features/posts/components/CommentList.jsx
import { Group, Avatar, Text, Stack, ActionIcon } from '@mantine/core'
import { IconTrash } from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'

const CommentList = ({ comments }) => {
  const { user } = useAuthStore()

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <Stack gap="md">
      {comments.map((comment) => (
        <Group key={comment.id} align="flex-start" gap="sm">
          <Avatar src={comment.user.avatar} size="sm" radius="xl" />
          <div style={{ flex: 1 }}>
            <Group gap="xs" align="center">
              <Text className="text-white font-semibold text-sm">{comment.user.name}</Text>
              <Text className="text-white-60 text-xs">{formatTime(comment.timestamp)}</Text>
            </Group>
            <Text className="text-white text-sm" style={{ lineHeight: 1.4 }}>
              {comment.text}
            </Text>
          </div>
          {comment.userId === user.id && (
            <ActionIcon variant="subtle" color="red" size="sm">
              <IconTrash size={14} />
            </ActionIcon>
          )}
        </Group>
      ))}
    </Stack>
  )
}

export default CommentList