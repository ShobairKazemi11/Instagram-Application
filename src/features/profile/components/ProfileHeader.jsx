// src/features/profile/components/ProfileHeader.jsx
import { Card, Group, Avatar, Text, Stack, Button, Grid, Paper } from '@mantine/core'
import { IconCamera, IconEdit, IconMapPin, IconCalendar } from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'
import { usePostsStore } from '../../posts/store/posts.store'
import { useThemeStore } from '../../ui/store/theme.store'

const ProfileHeader = () => {
  const { user } = useAuthStore()
  const { posts } = usePostsStore()
  const { colorScheme } = useThemeStore()

  const userPosts = posts.filter(post => post.userId === user.id)
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = userPosts.reduce((sum, post) => sum + post.comments.length, 0)

  const stats = [
    { label: 'Posts', value: userPosts.length },
    { label: 'Likes', value: totalLikes },
    { label: 'Comments', value: totalComments },
  ]

  return (
    <Card p="xl" radius="lg" className="glass-card">
      <Stack gap="lg">
        {/* Header Section */}
        <Group justify="space-between" align="flex-start">
          <Group gap="xl" align="flex-start">
            <div style={{ position: 'relative' }}>
              <Avatar 
                src={user.avatar} 
                size={120} 
                radius="50%" 
              />
              <Button 
                variant="light" 
                color="blue" 
                size="xs" 
                style={{ 
                  position: 'absolute', 
                  bottom: 8, 
                  right: 8 
                }}
              >
                <IconCamera size={16} />
              </Button>
            </div>
            
            <Stack gap="xs" style={{ flex: 1 }}>
              <Group gap="md" align="center">
                <Text size="xl" fw={700}>{user.name}</Text>
                <Button 
                  variant="light" 
                  size="sm" 
                  leftSection={<IconEdit size={16} />}
                >
                  Edit Profile
                </Button>
              </Group>
              
              <Group gap="lg">
                <Group gap={4}>
                  <IconMapPin size={16} />
                  <Text size="sm" c="dimmed">New York, USA</Text>
                </Group>
                <Group gap={4}>
                  <IconCalendar size={16} />
                  <Text size="sm" c="dimmed">Joined March 2024</Text>
                </Group>
              </Group>
              
              <Text style={{ maxWidth: 400, lineHeight: 1.6 }}>
                {user.bio}
              </Text>
            </Stack>
          </Group>
        </Group>

        {/* Stats Section */}
        <Group gap="xl" justify="center">
          {stats.map((stat, index) => (
            <Paper 
              key={index}
              p="md" 
              radius="md" 
              style={{ 
                background: colorScheme === 'dark' 
                  ? 'rgba(255,255,255,0.05)' 
                  : 'rgba(255,255,255,0.2)',
                textAlign: 'center',
                minWidth: 100,
              }}
            >
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
              <Text size="sm" c="dimmed">
                {stat.label}
              </Text>
            </Paper>
          ))}
        </Group>
      </Stack>
    </Card>
  )
}

export default ProfileHeader