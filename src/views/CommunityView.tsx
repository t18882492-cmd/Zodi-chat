import React, { useState } from 'react';
import { CommunityRoom, CommunityPost, UserProfile } from '../types/astrology';
import { COMMUNITY_ROOMS, INITIAL_COMMUNITY_POSTS } from '../data/mockData';
import { Users, MessageSquare, Heart, Shield, Plus, ArrowLeft, Send } from 'lucide-react';

interface CommunityViewProps {
  currentUser: UserProfile;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'Semua' | 'Zodiak' | 'Topik' | 'Room'>('Semua');
  const [selectedRoom, setSelectedRoom] = useState<CommunityRoom | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [newPostContent, setNewPostContent] = useState('');

  const filteredRooms = COMMUNITY_ROOMS.filter((room) => {
    if (activeTab === 'Semua') return true;
    return room.category === activeTab;
  });

  const handleCreatePost = () => {
    if (!newPostContent.trim() || !selectedRoom) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      roomId: selectedRoom.id,
      authorName: currentUser.name,
      authorZodiac: currentUser.zodiac,
      authorAvatar: currentUser.avatar,
      content: newPostContent.trim(),
      timestamp: 'Baru saja',
      likes: 1,
      repliesCount: 0,
      isLiked: true
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const toggleLike = (postId: string) => {
    setPosts(
      posts.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likes: isLiked ? p.likes + 1 : p.likes - 1
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-4 animate-fade-in max-w-md mx-auto">
      {/* If a room is selected, show Room Detail */}
      {selectedRoom ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedRoom(null)}
                className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{selectedRoom.icon}</span>
                  <span>{selectedRoom.title}</span>
                </h2>
                <span className="text-[11px] text-purple-300 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  <span>{selectedRoom.memberCount} anggota kosmik</span>
                </span>
              </div>
            </div>
          </div>

          {/* Room Description & Rules */}
          <div className="p-3.5 rounded-2xl cosmic-glass border border-purple-500/20 text-xs">
            <p className="text-slate-300 mb-2 leading-relaxed">{selectedRoom.description}</p>
            <div className="bg-white/[0.02] p-2.5 rounded-xl border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-[11px]">
                <Shield className="w-3.5 h-3.5" />
                <span>Aturan Komunitas</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 text-slate-400 text-[10px]">
                {selectedRoom.rules.map((rule, idx) => (
                  <li key={idx}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Post creator */}
          <div className="p-3 rounded-2xl bg-[#141634] border border-purple-500/25 space-y-2">
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder="Tulis ceritamu di ruang ini..."
              rows={2}
              className="w-full text-xs p-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 resize-none"
            />
            <div className="flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Berbagi dengan aman dan santun</span>
              <button
                onClick={handleCreatePost}
                disabled={!newPostContent.trim()}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim</span>
              </button>
            </div>
          </div>

          {/* Posts list */}
          <div className="space-y-3">
            {posts
              .filter((p) => p.roomId === selectedRoom.id)
              .map((post) => (
                <div
                  key={post.id}
                  className="p-3.5 rounded-2xl cosmic-glass border border-purple-500/20 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-purple-400/40"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{post.authorName}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300">
                            {post.authorZodiac}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">{post.timestamp}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed">{post.content}</p>

                  <div className="flex items-center gap-4 pt-1 border-t border-white/5 text-xs text-slate-400">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1 cursor-pointer transition-colors ${
                        post.isLiked ? 'text-pink-400 font-semibold' : 'hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-pink-400' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.repliesCount} balasan</span>
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        /* Room Directory (Matches Screenshot #7) */
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white tracking-tight">Komunitas</h1>
          </div>

          {/* Filter Tabs (Semua, Zodiak, Topik, Room) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(['Semua', 'Zodiak', 'Topik', 'Room'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400/50'
                      : 'cosmic-glass text-slate-300 hover:text-white hover:border-purple-500/30'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* List of Community Rooms (Matches Screenshot #7) */}
          <div className="space-y-2">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer border-b border-white/[0.04] group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Icon Circle */}
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-tr ${room.bgColor} border border-white/10 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <span>{room.icon}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-white tracking-tight group-hover:text-purple-300 transition-colors truncate">
                      {room.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate group-hover:text-slate-300">
                      {room.subtitle}
                    </p>
                  </div>
                </div>

                {/* Member count */}
                <div className="flex items-center gap-1 shrink-0 text-slate-400 text-xs pl-2">
                  <Users className="w-3.5 h-3.5" />
                  <span className="font-mono text-[11px]">{room.memberCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
