// src/features/chat/pages/ChatPage.jsx
import { useState, useRef, useEffect } from 'react';
import { IconMessage, IconSend, IconMoodSmile, IconCircleFilled } from '@tabler/icons-react';
import { useAuthStore } from '../../auth/store/auth.store';
import { useChatStore } from '../store/chat.store';
import { DUMMY_USERS } from '../../../utils/constants';

const ChatPage = () => {
  const [newMessage, setNewMessage] = useState('');
  const { user } = useAuthStore();
  const { messages, addMessage, onlineUsers } = useChatStore();
  const messagesEndRef = useRef(null);

  const onlineUsersList = DUMMY_USERS.filter(user => 
    onlineUsers.includes(user.id)
  ).filter(onlineUser => onlineUser.id !== user.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        userId: user.id,
        user: {
          name: user.name,
          avatar: user.avatar,
        },
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };
      addMessage(message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <IconMessage className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Global Chat</h1>
            <p className="text-white/60">Chat with other users in real-time</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Messages - 3/4 width on desktop */}
        <div className="lg:col-span-3">
          <div className="glass-card p-6 h-[600px] flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map((message) => {
                const isOwnMessage = message.userId === user.id;
                
                return (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <img
                      src={message.user.avatar}
                      alt={message.user.name}
                      className="w-10 h-10 rounded-full border-2 border-white/30 flex-shrink-0"
                    />
                    
                    <div className={`max-w-[70%] ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                      {!isOwnMessage && (
                        <p className="text-white font-semibold text-sm mb-1">
                          {message.user.name}
                        </p>
                      )}
                      <div
                        className={`inline-block px-4 py-3 rounded-2xl ${
                          isOwnMessage
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-none'
                            : 'bg-white/20 text-white rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className={`text-white/60 text-xs mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="flex gap-3">
              <button className="glass-button p-3 rounded-xl">
                <IconMoodSmile className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="glass-input flex-1 px-4 py-3"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
              >
                <IconSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Online Users - 1/4 width on desktop */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-white">Online Now</h3>
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                {onlineUsersList.length}
              </span>
            </div>

            <div className="space-y-3">
              {onlineUsersList.map((onlineUser) => (
                <div key={onlineUser.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <div className="relative">
                    <img
                      src={onlineUser.avatar}
                      alt={onlineUser.name}
                      className="w-10 h-10 rounded-full border-2 border-white/30"
                    />
                    <IconCircleFilled className="absolute -bottom-1 -right-1 w-3 h-3 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white text-sm">{onlineUser.name}</p>
                    <p className="text-white/60 text-xs">Online</p>
                  </div>
                </div>
              ))}
              
              {onlineUsersList.length === 0 && (
                <div className="text-center py-8">
                  <IconMessage className="w-12 h-12 text-white/40 mx-auto mb-3" />
                  <p className="text-white/60 text-sm">No one else is online</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;