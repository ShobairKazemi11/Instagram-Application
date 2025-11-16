// src/features/ui/components/NavBar.jsx
import { NavLink } from 'react-router'
import { 
  NavLink as MantineNavLink, 
  Stack, 
  Group, 
  Text, 
  Avatar,
  Divider 
} from '@mantine/core'
import { 
  IconHome, 
  IconUser, 
  IconUsers, 
  IconMessage, 
  IconLogout,
} from '@tabler/icons-react'
import { useAuthStore } from '../../auth/store/auth.store'

const NavBar = () => {
  const { user, logout } = useAuthStore()

  const navItems = [
    { icon: IconHome, label: 'Feed', path: '/feed' },
    { icon: IconUser, label: 'Profile', path: '/profile' },
    { icon: IconUsers, label: 'Users', path: '/users' },
    { icon: IconMessage, label: 'Chat', path: '/chat' },
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <Stack gap="sm" style={{ padding: '1.5rem' }}>
      {/* User Info */}
      <Group>
        <Avatar src={user?.avatar} size="lg" radius="xl" style={{ border: '2px solid rgba(255,255,255,0.3)' }} />
        <div style={{ flex: 1 }}>
          <Text className="text-white font-semibold text-sm">{user?.name}</Text>
          <Text className="text-white-60 text-xs">{user?.bio}</Text>
        </div>
      </Group>

      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* Navigation Links */}
      <Stack gap={2}>
        {navItems.map((item) => {
          const IconComponent = item.icon
          return (
            <MantineNavLink
              key={item.path}
              component={NavLink}
              to={item.path}
              label={item.label}
              leftSection={<IconComponent size={20} style={{ color: 'rgba(255,255,255,0.7)' }} />}
              styles={{
                root: {
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  '&[data-active]': {
                    backgroundColor: 'rgba(255,255,255,0.2)',
                  }
                },
                body: {
                  color: 'white',
                },
                label: {
                  color: 'white',
                  fontWeight: 500,
                },
              }}
            />
          )
        })}
      </Stack>

      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* Logout Button */}
      <MantineNavLink
        component="button"
        onClick={handleLogout}
        label="Logout"
        leftSection={<IconLogout size={20} style={{ color: '#f87171' }} />}
        styles={{
          root: {
            borderRadius: '12px',
            '&:hover': {
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
            }
          },
          body: {
            color: '#f87171',
          },
          label: {
            color: '#f87171',
            fontWeight: 500,
          },
        }}
      />
    </Stack>
  )
}

export default NavBar