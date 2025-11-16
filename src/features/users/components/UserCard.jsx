// src/features/users/components/UserCard.jsx
import { IconUserPlus, IconMessage, IconUserCheck, IconStar, IconPhoto, IconMessageCircle } from '@tabler/icons-react';
import { useAuthStore } from '../../auth/store/auth.store';
import { usePostsStore } from '../../posts/store/posts.store';

const UserCard = ({ user, onMessage }) => {
  const { user: currentUser } = useAuthStore();
  const { posts } = usePostsStore();

  const userPosts = posts.filter(post => post.userId === user.id);
  const totalLikes = userPosts.reduce((sum, post) => sum + post.likes, 0);
  const isCurrentUser = user.id === currentUser.id;

  const engagementRate = userPosts.length > 0 
    ? Math.round((totalLikes / userPosts.length) * 10) / 10 
    : 0;

  return (
    <div className="glass-card p-6 rounded-2xl group hover:scale-105 transition-all duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        {/* Avatar with Status */}
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full border-4 border-white/30 group-hover:border-white/50 transition-colors duration-300"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900"></div>
        </div>

        {/* User Info */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-xl font-bold text-white">{user.name}</h3>
            {engagementRate > 5 && (
              <IconStar className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            )}
          </div>
          <p className="text-white/70 text-sm leading-relaxed">{user.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex gap-6">
          <div className="text-center">
            <div className="flex items-center gap-1 text-white font-semibold">
              <IconPhoto className="w-4 h-4 text-white/60" />
              <span>{userPosts.length}</span>
            </div>
            <span className="text-white/60 text-xs">Posts</span>
          </div>
          <div className="text-center">
            <div className="flex items-center gap-1 text-white font-semibold">
              <IconMessageCircle className="w-4 h-4 text-white/60" />
              <span>{totalLikes}</span>
            </div>
            <span className="text-white/60 text-xs">Likes</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          {!isCurrentUser ? (
            <>
              <button className="flex-1 glass-button py-2 flex items-center justify-center gap-2 text-sm font-medium">
                <IconUserPlus className="w-4 h-4" />
                Follow
              </button>
              <button 
                onClick={() => onMessage(user)}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <IconMessage className="w-4 h-4" />
                Message
              </button>
            </>
          ) : (
            <button className="w-full glass-button py-2 flex items-center justify-center gap-2 text-sm font-medium opacity-50 cursor-not-allowed">
              <IconUserCheck className="w-4 h-4" />
              This is you
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;