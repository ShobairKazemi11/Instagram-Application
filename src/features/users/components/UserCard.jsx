// src/features/users/components/UserCard.jsx
import { Card, Avatar, Text, Button, Group, Stack, Badge, Paper } from '@mantine/core'
import { IconUserPlus, IconMessage, IconUserCheck, IconStar } from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'
import { usePostsStore } from '../../posts/store/posts.store'
import { useThemeStore } from '../../ui/store/theme.store'

const UserCard = ({ user, onMessage }) => {
  const { user: currentUser } = useAuthStore()
  const { posts } = usePostsStore()
  const { colorScheme } = useThemeStore()

  const userPosts = posts.filter(post => post.userId === user.id)
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0)
  const isCurrentUser = user.id === currentUser.id

  const engagementRate = userPosts.length > 0 
    ? Math.round((totalLikes / userPosts.length) * 10) / 10 
    : 0

  return (
    <Card className="glass-card user-card" style={{ padding: '2rem', textAlign: 'center' }}>
      <Stack gap="lg" align="center">
        {/* Avatar with Status Indicator */}
        <div style={{ position: 'relative' }}>
          <Avatar 
            src={user.avatar} 
            size={90} 
            radius="50%"
            className="user-avatar"
            style={{ border: '3px solid rgba(255,255,255,0.3)' }}
          />
          <div className="online-status" style={{ 
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '16px',
            height: '16px',
            background: '#00ff00',
            borderRadius: '50%',
            border: `3px solid ${colorScheme === 'dark' ? '#1a1a2e' : '#fff'}`,
            boxShadow: '0 0 15px rgba(0, 255, 0, 0.6)',
          }} />
        </div>
        
        {/* User Info */}
        <Stack gap="xs" align="center" style={{ width: '100%' }}>
          <Group gap="xs" justify="center">
            <Text className="user-name text-xl font-bold">
              {user.name}
            </Text>
            {engagementRate > 5 && (
              <IconStar size={18} color="gold" fill="gold" />
            )}
          </Group>
          
          <Text className="text-white-60 text-sm" style={{ lineHeight: 1.4, minHeight: '40px' }}>
            {user.bio}
          </Text>

          {/* Stats */}
          <Group gap="md" justify="center" style={{ marginTop: '0.5rem' }}>
            <Paper 
              className="user-stats"
              style={{ 
                padding: '0.75rem',
                textAlign: 'center',
                minWidth: '80px',
              }}
            >
              <Text className="font-bold text-white text-sm">{userPosts.length}</Text>
              <Text className="text-white-60 text-xs">Posts</Text>
            </Paper>
            <Paper 
              className="user-stats"
              style={{ 
                padding: '0.75rem',
                textAlign: 'center',
                minWidth: '80px',
              }}
            >
              <Text className="font-bold text-white text-sm">{totalLikes}</Text>
              <Text className="text-white-60 text-xs">Likes</Text>
            </Paper>
          </Group>
        </Stack>

        {/* Action Buttons */}
        <Group gap="sm" grow style={{ width: '100%' }}>
          {!isCurrentUser ? (
            <>
              <Button 
                className="glass-button"
                size="md"
                leftSection={<IconUserPlus size={18} />}
              >
                Follow
              </Button>
              <Button 
                className="gradient-button"
                size="md"
                leftSection={<IconMessage size={18} />}
                onClick={() => onMessage(user)}
              >
                Message
              </Button>
            </>
          ) : (
            <Button 
              className="glass-button"
              size="md"
              leftSection={<IconUserCheck size={18} />}
              disabled
            >
              This is you
            </Button>
          )}
        </Group>
      </Stack>
    </Card>
  )
}

export default UserCard