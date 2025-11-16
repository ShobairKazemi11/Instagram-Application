// src/features/chat/components/OnlineUsers.jsx
import { Paper, Stack, Avatar, Text, Group, Badge } from '@mantine/core'
import { IconCircleFilled } from '@tabler/icons-react'
import { DUMMY_USERS } from '../../../utils/constants'
import { useAuthStore } from '../../auth/store/auth.store'
import { useChatStore } from '../store/chat.store'

const OnlineUsers = () => {
  const { user: currentUser } = useAuthStore()
  const { onlineUsers } = useChatStore()

  const onlineUsersList = DUMMY_USERS.filter(user => 
    onlineUsers.includes(user.id) && user.id !== currentUser.id
  )

  return (
    <Paper className="glass-card" style={{ padding: '1rem' }}>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text className="text-white font-semibold">Online Now</Text>
          <Badge variant="light" color="green" size="sm">
            {onlineUsersList.length}
          </Badge>
        </Group>

        <Stack gap="xs">
          {onlineUsersList.map((user) => (
            <Group key={user.id} gap="sm">
              <Avatar 
                src={user.avatar} 
                size="md" 
                radius="xl"
                style={{ position: 'relative' }}
              >
                <IconCircleFilled 
                  size={12} 
                  color="#00ff00" 
                  style={{ 
                    position: 'absolute', 
                    bottom: 2, 
                    right: 2,
                    filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.5))'
                  }} 
                />
              </Avatar>
              <div style={{ flex: 1 }}>
                <Text className="text-white font-medium text-sm">{user.name}</Text>
                <Text className="text-white-60 text-xs">Online</Text>
              </div>
            </Group>
          ))}
          
          {onlineUsersList.length === 0 && (
            <Text className="text-white-60 text-sm text-center" style={{ padding: '1rem 0' }}>
              No one else is online right now
            </Text>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default OnlineUsers