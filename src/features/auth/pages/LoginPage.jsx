// src/features/auth/pages/LoginPage.jsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Container, Center, Stack, Text } from '@mantine/core'
import { IconBrandInstagram } from '@tabler/icons-react'
import LoginForm from '../components/LoginForm'
import { useAuthStore } from '../store/auth.store'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="min-h-screen flex-center p-6">
      <Container size="xl" style={{ width: '100%' }}>
        <Center>
          <Stack gap="xl" align="center" style={{ width: '100%', maxWidth: '42rem' }}>
            {/* App Branding */}
            <div className="text-center">
              <IconBrandInstagram 
                size={64} 
                style={{
                  marginBottom: '1rem',
                  background: 'linear-gradient(45deg, #fff, #e0f2fe)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              />
              <Text className="text-5xl font-black gradient-text mb-3">
                SocialApp
              </Text>
              <Text className="text-xl text-white-70">
                Connect with friends and share your moments
              </Text>
            </div>

            {/* Login Form */}
            <LoginForm />

            {/* Footer */}
            <Text className="text-white-60 text-sm text-center mt-8">
              This is a demo app. Select any user to login and explore the features.
            </Text>
          </Stack>
        </Center>
      </Container>
    </div>
  )
}

export default LoginPage