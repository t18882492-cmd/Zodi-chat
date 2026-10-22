import React, { useState } from 'react';
import { UserProfile, ChatMessage } from '../types/astrology';
import { Search, UserPlus } from 'lucide-react';

interface ChatListViewProps {
  contacts: UserProfile[];
  latestMessages: Record<string, ChatMessage>;
  onSelectChat: (userId: string) => void;
  onOpenCosmicMatch: () => void;
}

export const ChatListView: React.FC<ChatListViewProps> = ({
  contacts,
  latestMessages,
  onSelectChat,
  onOpenCosmicMatch
}) => {
  const [activeFilter, setActiveFilter] = useState<'Semua' | 'Lawan Jenis'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter contacts without online and without zodiac
  const filteredContacts = contacts.filter((contact) => {
    const matchSearch =
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.handle.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchSearch) return false;

    if (activeFilter === 'Lawan Jenis') {
      return contact.gender === 'Laki-laki'; // Anas is female
    }

    return true;
  });

  return (
    <div className="pb-24 pt-4 px-4 space-y-4 animate-fade-in">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white tracking-tight">Chat</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCosmicMatch}
            className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-purple-300 hover:text-white hover:border-purple-400 transition-colors cursor-pointer"
            title="Temukan Teman Baru"
          >
            <UserPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari teman..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#14152e]/80 border border-purple-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400/60 backdrop-blur-md"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* 3. Filter Tabs (Semua, Lawan Jenis) - without Zodiac and without Online */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['Semua', 'Lawan Jenis'] as const).map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40 ring-1 ring-purple-400/50'
                  : 'cosmic-glass text-slate-300 hover:text-white hover:border-purple-500/30'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* 4. Chat List (without online dots and without zodiac symbols) */}
      <div className="space-y-1.5">
        {filteredContacts.length === 0 ? (
          <div className="p-8 text-center cosmic-glass rounded-2xl border border-purple-500/20">
            <p className="text-sm text-slate-400 mb-2">Tidak ada teman yang cocok dengan pencarian.</p>
            <button
              onClick={() => {
                setActiveFilter('Semua');
                setSearchQuery('');
              }}
              className="text-xs text-purple-300 font-semibold hover:underline"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          filteredContacts.map((contact) => {
            const lastMsg = latestMessages[contact.id];

            return (
              <div
                key={contact.id}
                onClick={() => onSelectChat(contact.id)}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer border-b border-white/[0.04] group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar - no online dot */}
                  <div className="relative shrink-0">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover ring-1 ring-purple-500/20 group-hover:ring-purple-400/50 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Name (no zodiac glyph) + Message preview */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm font-bold text-white tracking-tight truncate">
                        {contact.name}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 truncate max-w-[220px] group-hover:text-slate-300">
                      {lastMsg ? lastMsg.text : contact.bio}
                    </p>
                  </div>
                </div>

                {/* Right side: Timestamp & unread badge - no online green dot */}
                <div className="flex flex-col items-end shrink-0 pl-2">
                  <span className="text-[11px] text-slate-400 font-mono mb-1">
                    {lastMsg ? lastMsg.timeLabel : contact.lastSeen}
                  </span>

                  {contact.unreadCount && contact.unreadCount > 0 ? (
                    <span className="w-5 h-5 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center shadow-[0_0_8px_rgba(147,51,234,0.7)]">
                      {contact.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Match Banner at bottom of list */}
      <div className="pt-2">
        <button
          onClick={onOpenCosmicMatch}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-pink-950/20 to-indigo-900/30 border border-purple-500/30 hover:border-purple-400/50 flex items-center justify-between transition-all group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-lg text-purple-300 group-hover:scale-110 transition-transform">
              ✨
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-white">Temukan Teman Baru</h4>
              <p className="text-[11px] text-slate-400">Match acak lawan jenis & speed chat</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-300 group-hover:translate-x-1 transition-transform">
            Mulai →
          </span>
        </button>
      </div>
    </div>
  );
};
