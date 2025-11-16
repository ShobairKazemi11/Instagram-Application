// src/features/ui/components/Layout.jsx
import { useState } from 'react';
import { IconSun, IconMoon, IconBrandInstagram, IconHome, IconUser, IconUsers, IconMessage, IconLogout } from '@tabler/icons-react';
import { useThemeStore } from '../store/theme.store';
import { useAuthStore } from '../../auth/store/auth.store';
import { NavLink, useNavigate } from 'react-router';

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { colorScheme, toggleColorScheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return children;
  }

  const navItems = [
    { icon: IconHome, label: 'Feed', path: '/feed' },
    { icon: IconUser, label: 'Profile', path: '/profile' },
    { icon: IconUsers, label: 'Users', path: '/users' },
    { icon: IconMessage, label: 'Chat', path: '/chat' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
      {/* Mobile Header */}
      <header className="lg:hidden glass-card p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <div className="w-full h-0.5 bg-white rounded"></div>
              <div className="w-full h-0.5 bg-white rounded"></div>
              <div className="w-full h-0.5 bg-white rounded"></div>
            </div>
          </button>
          
          <div className="flex items-center gap-2">
            <IconBrandInstagram className="w-8 h-8 text-white" />
            <span className="text-xl font-bold text-white">SocialApp</span>
          </div>

          <button
            onClick={toggleColorScheme}
            className="p-2 text-white"
          >
            {colorScheme === 'dark' ? <IconSun className="w-6 h-6" /> : <IconMoon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 h-screen glass-card sticky top-0">
          <div className="p-6 h-full flex flex-col">
            {/* Brand */}
            <div className="flex items-center gap-3 mb-8">
              <IconBrandInstagram className="w-8 h-8 text-white" />
              <span className="text-2xl font-bold text-white">SocialApp</span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4 mb-8 p-4 rounded-lg bg-white/10">
              <img
                src={user?.avatar}
                alt={user?.name}
                className="w-12 h-12 rounded-full border-2 border-white/30"
              />
              <div className="flex-1">
                <p className="font-semibold text-white">{user?.name}</p>
                <p className="text-white/60 text-sm">{user?.bio}</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }`
                    }
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Footer Actions */}
            <div className="space-y-2 pt-4 border-t border-white/20">
              <button
                onClick={toggleColorScheme}
                className="flex items-center gap-3 p-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white w-full transition-all duration-200"
              >
                {colorScheme === 'dark' ? <IconSun className="w-6 h-6" /> : <IconMoon className="w-6 h-6" />}
                <span className="font-medium">
                  {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/10 w-full transition-all duration-200"
              >
                <IconLogout className="w-6 h-6" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-0 bottom-0 w-80 glass-card">
              <div className="p-6 h-full flex flex-col">
                {/* Same content as desktop sidebar */}
                <div className="flex items-center gap-3 mb-8">
                  <IconBrandInstagram className="w-8 h-8 text-white" />
                  <span className="text-2xl font-bold text-white">SocialApp</span>
                </div>

                <div className="flex items-center gap-4 mb-8 p-4 rounded-lg bg-white/10">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-white">{user?.name}</p>
                    <p className="text-white/60 text-sm">{user?.bio}</p>
                  </div>
                </div>

                <nav className="space-y-2 flex-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'text-white/70 hover:bg-white/10 hover:text-white'
                          }`
                        }
                      >
                        <Icon className="w-6 h-6" />
                        <span className="font-medium">{item.label}</span>
                      </NavLink>
                    );
                  })}
                </nav>

                <div className="space-y-2 pt-4 border-t border-white/20">
                  <button
                    onClick={toggleColorScheme}
                    className="flex items-center gap-3 p-3 rounded-lg text-white/70 hover:bg-white/10 hover:text-white w-full transition-all duration-200"
                  >
                    {colorScheme === 'dark' ? <IconSun className="w-6 h-6" /> : <IconMoon className="w-6 h-6" />}
                    <span className="font-medium">
                      {colorScheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-red-400/10 w-full transition-all duration-200"
                  >
                    <IconLogout className="w-6 h-6" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;