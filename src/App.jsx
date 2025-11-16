// src/App.jsx
import { Routes, Route, Navigate } from 'react-router'
import Layout from './features/ui/components/Layout'
import LoginPage from './features/auth/pages/LoginPage'
import FeedPage from './features/posts/pages/FeedPage'
import PostPage from './features/posts/pages/PostPage'
import ProfilePage from './features/profile/pages/ProfilePage'
import UsersPage from './features/users/pages/UsersPage'
import ChatPage from './features/chat/pages/ChatPage'
import { useAuthStore } from './features/auth/store/auth.store'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Layout>
        <Routes>
          <Route 
            path="/login" 
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/feed" replace />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/feed" : "/login"} replace />} 
          />
          <Route 
            path="/feed" 
            element={isAuthenticated ? <FeedPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/post/:id" 
            element={isAuthenticated ? <PostPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/users" 
            element={isAuthenticated ? <UsersPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/chat" 
            element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />} 
          />
        </Routes>
      </Layout>
    </div>
  )
}

export default App