// src/features/users/pages/UsersPage.jsx
import { Container, Grid, TextInput, Stack, Title, Text, Group, Card } from '@mantine/core'
import { IconSearch, IconUsers } from '@tabler/icons-react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import UserCard from '../components/UserCard'
import { DUMMY_USERS } from '../../../utils/constants'
import { useAuthStore } from '../../auth/store/auth.store'

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { user: currentUser } = useAuthStore()

  const filteredUsers = DUMMY_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(user => user.id !== currentUser.id)

  const handleMessage = (user) => {
    navigate('/chat')
  }

  return (
    <Container size="lg" style={{ padding: 0 }}>
      <Stack gap="lg">
        {/* Header */}
        <Card className="glass-card text-center" style={{ padding: '2rem' }}>
          <Stack gap="xs" align="center">
            <IconUsers size={48} className="text-white-60" />
            <Title className="text-2xl font-bold text-white">Discover People</Title>
            <Text className="text-white-60 text-center">
              Connect with other users and build your network
            </Text>
          </Stack>
        </Card>

        {/* Search */}
        <TextInput
          placeholder="Search users by name or bio..."
          leftSection={<IconSearch size={18} className="text-white-60" />}
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

        {/* Users Grid */}
        {filteredUsers.length > 0 ? (
          <Grid>
            {filteredUsers.map((user) => (
              <Grid.Col key={user.id} span={{ base: 12, sm: 6, md: 4 }}>
                <UserCard user={user} onMessage={handleMessage} />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Card className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
            <IconUsers size={64} className="text-white-60 mb-4" />
            <Text className="text-xl font-semibold text-white mb-2">No users found</Text>
            <Text className="text-white-60">Try adjusting your search terms</Text>
          </Card>
        )}
      </Stack>
    </Container>
  )
}

export default UsersPage