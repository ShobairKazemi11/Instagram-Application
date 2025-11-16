// src/features/profile/pages/ProfilePage.jsx
import { useState } from 'react';
import { IconPhoto, IconHeart, IconUser, IconCamera, IconEdit, IconMapPin, IconCalendar, IconUsers, IconMessage, IconUserPlus } from '@tabler/icons-react';
import { useAuthStore } from '../../auth/store/auth.store';
import { usePostsStore } from '../../posts/store/posts.store';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const { posts } = usePostsStore();
  const [activeTab, setActiveTab] = useState('posts');

  const userPosts = posts.filter(post => post.userId === user.id);
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
  const totalComments = userPosts.reduce((sum, post) => sum + post.comments.length, 0);

  const stats = [
    { label: 'Posts', value: userPosts.length, icon: IconPhoto },
    { label: 'Likes', value: totalLikes, icon: IconHeart },
    { label: 'Comments', value: totalComments, icon: IconMessage },
  ];

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="glass-card p-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Avatar Section */}
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-white/30 shadow-2xl"
            />
            <button className="absolute bottom-2 right-2 glass-button p-2 rounded-full">
              <IconCamera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold text-white">{user.name}</h1>
              <div className="flex gap-3 justify-center lg:justify-start">
                <button className="glass-button px-6 py-2 flex items-center gap-2">
                  <IconEdit className="w-5 h-5" />
                  Edit Profile
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
                  <IconUserPlus className="w-5 h-5" />
                  Follow
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-4">
              <div className="flex items-center gap-2 text-white/70">
                <IconMapPin className="w-5 h-5" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <IconCalendar className="w-5 h-5" />
                <span>Joined March 2024</span>
              </div>
            </div>

            <p className="text-white/80 leading-relaxed max-w-2xl">
              {user.bio}
            </p>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 mt-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-5 h-5 text-white/70" />
                      <span className="text-2xl font-bold text-white">{stat.value}</span>
                    </div>
                    <span className="text-white/60 text-sm">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-card p-6">
        <div className="flex border-b border-white/10 mb-6">
          {[
            { id: 'posts', label: 'Posts', icon: IconPhoto },
            { id: 'liked', label: 'Liked Posts', icon: IconHeart },
            { id: 'about', label: 'About', icon: IconUser },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-white text-white'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <div key={post.id} className="glass-card rounded-xl overflow-hidden group hover:scale-105 transition-transform duration-300">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                      <IconPhoto className="w-12 h-12 text-white/50" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-white text-sm line-clamp-2 mb-2">{post.content}</p>
                    <div className="flex items-center justify-between text-white/60 text-xs">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <IconHeart className="w-4 h-4" />
                          {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <IconMessage className="w-4 h-4" />
                          {post.comments.length}
                        </span>
                      </div>
                      <span>{formatTime(post.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <IconPhoto className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
                <p className="text-white/60">Share your first post with the community!</p>
              </div>
            )}
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">About Me</h3>
              <p className="text-white/80 leading-relaxed">
                Passionate developer and designer. Love creating beautiful user experiences 
                and solving complex problems. Always learning and growing in the tech space.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Email</label>
                  <p className="text-white">{user.email}</p>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Location</label>
                  <p className="text-white">New York, USA</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/60 text-sm mb-1">Joined</label>
                  <p className="text-white">March 2024</p>
                </div>
                <div>
                  <label className="block text-white/60 text-sm mb-1">Website</label>
                  <p className="text-white">portfolio.example.com</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;