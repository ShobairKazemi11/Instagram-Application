// src/features/auth/components/LoginForm.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Card,
  TextInput,
  Button,
  Title,
  Text,
  Avatar,
  Select,
  Group,
  Stack,
  Divider,
} from '@mantine/core'
import { IconUser, IconLogin } from '@tabler/icons-react'
import { useAuthStore } from '../store/auth.store'
import { DUMMY_USERS } from '../../../utils/constants'

const LoginForm = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [selectedUser, setSelectedUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleQuickLogin = (user) => {
    setLoading(true)
    setSelectedUser(user)
    
    setTimeout(() => {
      login(user)
      navigate('/feed')
      setLoading(false)
    }, 1000)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    if (selectedUser) {
      handleQuickLogin(selectedUser)
    }
  }

  return (
    <Card className="glass-card w-full max-w-md p-8 rounded-2xl">
      <Stack gap="lg">
        <div className="text-center">
          <Title className="text-3xl font-bold gradient-text mb-2">
            Welcome Back
          </Title>
          <Text className="text-white-70 text-lg">
            Sign in to your account to continue
          </Text>
        </div>

        <form onSubmit={handleFormSubmit}>
          <Stack gap="md">
            <Select
              label="Quick Login - Select User"
              placeholder="Choose a demo user"
              value={selectedUser?.id?.toString()}
              onChange={(value) => {
                const user = DUMMY_USERS.find(u => u.id.toString() === value)
                setSelectedUser(user)
              }}
              data={DUMMY_USERS.map(user => ({
                value: user.id.toString(),
                label: user.name,
              }))}
              leftSection={<IconUser size={20} className="text-white-70" />}
              classNames={{
                input: "glass-input rounded-xl h-12",
                label: "text-white font-semibold mb-2",
                dropdown: "bg-white/90 backdrop-blur-xl border border-white/20",
              }}
              required
            />

            {selectedUser && (
              <Group justify="center" style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                borderRadius: '12px', 
                padding: '1rem',
                margin: '1rem 0'
              }}>
                <Avatar src={selectedUser.avatar} size="lg" radius="xl" className="border-2 border-white-30" />
                <div>
                  <Text className="text-white font-semibold">{selectedUser.name}</Text>
                  <Text className="text-white-70 text-sm">{selectedUser.bio}</Text>
                </div>
              </Group>
            )}

            <Button
              type="submit"
              className="gradient-button h-12 text-base font-semibold rounded-xl"
              fullWidth
              loading={loading}
              leftSection={<IconLogin size={20} />}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </Stack>
        </form>

        <Divider 
          label="Or try quick login" 
          labelPosition="center"
          classNames={{
            label: "text-white-70 text-sm"
          }}
        />

        <Stack gap="sm">
          {DUMMY_USERS.map((user) => (
            <Button
              key={user.id}
              className="glass-button h-14 rounded-xl justify-start px-4"
              fullWidth
              onClick={() => handleQuickLogin(user)}
              leftSection={<Avatar src={user.avatar} size="sm" radius="xl" />}
            >
              <div className="text-left">
                <Text className="text-white font-medium">{user.name}</Text>
                <Text className="text-white-60 text-xs">{user.email}</Text>
              </div>
            </Button>
          ))}
        </Stack>
      </Stack>
    </Card>
  )
}

export default LoginForm