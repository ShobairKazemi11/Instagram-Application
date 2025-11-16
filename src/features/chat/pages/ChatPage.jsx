// src/features/chat/pages/ChatPage.jsx
import { Container, Grid, Stack, Title, Text, Group, Card } from '@mantine/core'
import { IconMessage } from '@tabler/icons-react'
import ChatBox from '../components/ChatBox'
import OnlineUsers from '../components/OnlineUsers'

const ChatPage = () => {
  return (
    <Container size="lg" style={{ padding: 0 }}>
      <Stack gap="lg">
        {/* Header */}
        <Card className="glass-card" style={{ padding: '1.5rem' }}>
          <Stack gap="xs">
            <Group gap="sm">
              <IconMessage size={32} className="gradient-text" />
              <Title className="text-2xl font-bold text-white">Global Chat</Title>
            </Group>
            <Text className="text-white-60">
              Chat with other users in real-time. Connect and share ideas!
            </Text>
          </Stack>
        </Card>

        {/* Chat Layout */}
        <Grid>
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <ChatBox />
          </Grid.Col>
          <Grid.Col span={{ base: 12, lg: 4 }}>
            <OnlineUsers />
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  )
}

export default ChatPage