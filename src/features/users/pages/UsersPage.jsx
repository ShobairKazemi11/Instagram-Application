// src/features/users/pages/UsersPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { IconSearch, IconUsers, IconUserPlus, IconMessage, IconUserCheck } from '@tabler/icons-react';
import UserCard from '../components/UserCard';
import { DUMMY_USERS } from '../../../utils/constants';
import { useAuthStore } from '../../auth/store/auth.store';

const UsersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user: currentUser } = useAuthStore();

  const filteredUsers = DUMMY_USERS.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.bio.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter(user => user.id !== currentUser.id);

  const handleMessage = (user) => {
    navigate('/chat');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-8 text-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <IconUsers className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Discover People</h1>
          <p className="text-white/60 text-lg max-w-md">
            Connect with other users and build your network
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search users by name or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full pl-10 pr-4 py-3"
          />
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} onMessage={handleMessage} />
          ))
        ) : (
          <div className="col-span-full glass-card p-12 text-center">
            <IconUsers className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
            <p className="text-white/60">Try adjusting your search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;