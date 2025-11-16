// src/features/posts/pages/FeedPage.jsx
import { useState } from 'react';
import { IconSearch, IconSend, IconHeart, IconMessage, IconShare, IconDots, IconMoodHeart } from '@tabler/icons-react';
import { usePostsStore } from '../store/posts.store';
import { useAuthStore } from '../../auth/store/auth.store';

const FeedPage = () => {
  const { posts, addPost } = usePostsStore();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');

  const filteredPosts = posts.filter(post =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        userId: user.id,
        user: {
          name: user.name,
          avatar: user.avatar,
        },
        content: newPost.trim(),
        image: null,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        userReactions: {},
      };
      addPost(post);
      setNewPost('');
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Search Bar */}
      <div className="glass-card p-4">
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input w-full pl-10 pr-4 py-3"
          />
        </div>
      </div>

      {/* Create Post */}
      <div className="glass-card p-6">
        <div className="flex gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-white/30"
          />
          <div className="flex-1">
            <textarea
              placeholder={`What's on your mind, ${user.name}?`}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="glass-input w-full p-4 resize-none rounded-xl min-h-20"
              rows="3"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2">
                {/* Add image, emoji buttons here */}
              </div>
              <button
                onClick={handleAddPost}
                disabled={!newPost.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <IconSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="glass-card overflow-hidden">
            {/* Post Header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <p className="font-semibold text-white">{post.user.name}</p>
                    <p className="text-white/60 text-sm">{formatTime(post.timestamp)}</p>
                  </div>
                </div>
                <button className="p-2 text-white/60 hover:text-white transition-colors">
                  <IconDots className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Post Content */}
            <div className="p-4">
              <p className="text-white leading-relaxed mb-4">{post.content}</p>
              
              {post.image && (
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-auto rounded-xl object-cover max-h-96"
                />
              )}
            </div>

            {/* Post Stats */}
            <div className="px-4 py-3 border-t border-b border-white/10">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-white/60">
                  <IconMoodHeart className="w-4 h-4 text-red-400" />
                  <span>{post.likes} likes</span>
                </div>
                <span className="text-white/60">{post.comments.length} comments</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-2">
              <div className="flex justify-around">
                <button className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors">
                  <IconHeart className="w-5 h-5" />
                  <span>Like</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors">
                  <IconMessage className="w-5 h-5" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white transition-colors">
                  <IconShare className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            {post.comments.length > 0 && (
              <div className="p-4 border-t border-white/10">
                <div className="space-y-3">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <img
                        src={comment.user.avatar}
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full border border-white/30"
                      />
                      <div className="flex-1">
                        <div className="bg-white/10 rounded-2xl rounded-tl-none p-3">
                          <p className="font-semibold text-white text-sm">{comment.user.name}</p>
                          <p className="text-white text-sm">{comment.text}</p>
                        </div>
                        <p className="text-white/60 text-xs mt-1">
                          {formatTime(comment.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedPage;