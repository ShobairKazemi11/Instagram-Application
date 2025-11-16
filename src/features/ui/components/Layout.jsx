// src/features/ui/components/Layout.jsx
import { AppShell, Burger, ActionIcon, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconSun, IconMoon, IconBrandInstagram } from '@tabler/icons-react'
import { useThemeStore } from '../store/theme.store'
import NavBar from './NavBar'
import { useAuthStore } from '../../auth/store/auth.store'

const Layout = ({ children }) => {
  const [opened, { toggle }] = useDisclosure()
  const { colorScheme, toggleColorScheme } = useThemeStore()
  const { isAuthenticated } = useAuthStore()
  
  if (!isAuthenticated) {
    return children
  }

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
      styles={{
        main: {
          background: colorScheme === 'dark' 
            ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
        },
      }}
    >
      <AppShell.Header className="glass-card" style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '100%', 
          padding: '0 1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
              color="white"
            />
            <Group gap="xs">
              <IconBrandInstagram 
                size={28}
                className="gradient-text"
              />
              <div className="text-xl font-bold gradient-text">
                SocialApp
              </div>
            </Group>
          </div>

          <ActionIcon
            className="glass-button"
            onClick={toggleColorScheme}
            size="lg"
          >
            {colorScheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
          </ActionIcon>
        </div>
      </AppShell.Header>

      <AppShell.Navbar className="glass-card" style={{ borderRight: '1px solid rgba(255,255,255,0.2)' }}>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main style={{ paddingTop: '1.5rem' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default Layout