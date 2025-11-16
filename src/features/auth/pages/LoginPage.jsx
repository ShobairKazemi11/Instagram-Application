// src/features/auth/pages/LoginPage.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { IconBrandInstagram, IconUser, IconLogin } from '@tabler/icons-react';
import { useAuthStore } from '../store/auth.store';
import { DUMMY_USERS } from '../../../utils/constants';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/feed');
    }
  }, [isAuthenticated, navigate]);

  const handleQuickLogin = (user) => {
    login(user);
    navigate('/feed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <IconBrandInstagram className="w-12 h-12 text-white" />
            <h1 className="text-4xl font-bold text-white">SocialApp</h1>
          </div>
          <p className="text-white/80 text-lg">Connect with friends and share your moments</p>
        </div>

        {/* Login Card */}
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/70">Sign in to your account to continue</p>
          </div>

          {/* Quick Login Buttons */}
          <div className="space-y-3">
            {DUMMY_USERS.map((user) => (
              <button
                key={user.id}
                onClick={() => handleQuickLogin(user)}
                className="glass-button w-full p-4 flex items-center gap-4 text-left hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-white/30"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white">{user.name}</p>
                  <p className="text-white/60 text-sm">{user.email}</p>
                </div>
                <IconUser className="w-5 h-5 text-white/60" />
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-center text-white/60 text-sm">
              This is a demo app. Select any user to login and explore the features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;