import React, { useState } from 'react';
import { UserProfile, CommunityRoom, CommunityPost } from '../types/astrology';
import { COMMUNITY_ROOMS, INITIAL_COMMUNITY_POSTS } from '../data/mockData';
import { SpeedChatTimerModal } from '../components/SpeedChatTimerModal';
import {
  Sparkles,
  Shuffle,
  Clock,
  Heart,
  MessageCircle,
  Users,
  Compass,
  ArrowRight,
  Shield,
  Send
} from 'lucide-react';

interface CommunicationViewProps {
  currentUser: UserProfile;
  contacts: UserProfile[];
  onOpenChatWith: (userId: string) => void;
  onSaveAsPermanentFriend: (userId: string) => void;
}

export const CommunicationView: React.FC<CommunicationViewProps> = ({
  currentUser,
  contacts,
  onOpenChatWith,
  onSaveAsPermanentFriend
}) => {
  // Get opposite gender candidates (Anas is 'Perempuan' so candidates are 'Laki-laki')
  const oppositeGenderCandidates = contacts.filter((c) => c.gender !== currentUser.gender);
  const fallbackCandidates = oppositeGenderCandidates.length > 0 ? oppositeGenderCandidates : contacts;

  // Feature 1: Match Acak Lawan Jenis state
  const [isSearchingRandom, setIsSearchingRandom] = useState(false);
  const [randomMatchCandidate, setRandomMatchCandidate] = useState<UserProfile | null>(
    fallbackCandidates[0] || null
  );

  // Feature 2: Match Chatan dengan Timer state
  const [isSpeedChatActive, setIsSpeedChatActive] = useState(false);
  const [speedChatPartner, setSpeedChatPartner] = useState<UserProfile | null>(null);
  const [selectedTimerDuration, setSelectedTimerDuration] = useState<number>(3); // 3 minutes

  // Optional Community Rooms sub-view
  const [activeSection, setActiveSection] = useState<'match' | 'ruang'>('match');
  const [selectedRoom, setSelectedRoom] = useState<CommunityRoom | null>(null);
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [newPostContent, setNewPostContent] = useState('');

  // Handle Match Acak Lawan Jenis
  const handleTriggerRandomMatch = () => {
    setIsSearchingRandom(true);
    setTimeout(() => {
      setIsSearchingRandom(false);
      // Pick random opposite gender profile
      const otherCandidates = fallbackCandidates.filter((c) => c.id !== randomMatchCandidate?.id);
      const pool = otherCandidates.length > 0 ? otherCandidates : fallbackCandidates;
      const picked = pool[Math.floor(Math.random() * pool.length)];
      setRandomMatchCandidate(picked);
    }, 1200);
  };

  // Handle Match Chatan Lawan Jenis dengan Timer
  const handleStartSpeedChat = () => {
    // Pick an opposite gender candidate
    const picked = fallbackCandidates[Math.floor(Math.random() * fallbackCandidates.length)];
    setSpeedChatPartner(picked);
    setIsSpeedChatActive(true);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-4 animate-fade-in max-w-md mx-auto">
      {/* 1. Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Komunikasi</h1>
          <p className="text-xs text-purple-300/80">Koneksi lawan jenis & ruang obrolan semesta</p>
        </div>

        {/* Section Pill Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          <button
            onClick={() => setActiveSection('match')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'match'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Match
          </button>
          <button
            onClick={() => setActiveSection('ruang')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
              activeSection === 'ruang'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ruang
          </button>
        </div>
      </div>

      {activeSection === 'match' ? (
        <div className="space-y-4">
          {/* FITUR 1: MATCH ACAK LAWAN JENIS */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#1d1b46]/90 via-[#15163a]/80 to-[#0e0f26]/90 border border-purple-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600/30 flex items-center justify-center text-purple-300">
                  <Shuffle className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Match Acak Lawan Jenis</h2>
                  <span className="text-[10px] text-pink-300 font-medium">Temukan koneksi spontan</span>
                </div>
              </div>

              <button
                onClick={handleTriggerRandomMatch}
                disabled={isSearchingRandom}
                className="px-3 py-1.5 rounded-full bg-purple-600/40 hover:bg-purple-600/70 border border-purple-400/30 text-purple-200 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
              >
                <Shuffle className={`w-3 h-3 ${isSearchingRandom ? 'animate-spin' : ''}`} />
                <span>{isSearchingRandom ? 'Memindai...' : 'Acak Ulang'}</span>
              </button>
            </div>

            {/* Radar Scanning State */}
            {isSearchingRandom ? (
              <div className="py-8 text-center flex flex-col items-center justify-center space-y-3">
                <div className="relative w-20 h-20 rounded-full border-2 border-purple-400/40 flex items-center justify-center animate-pulse">
                  <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Compass className="w-8 h-8 text-purple-300 animate-[spin_3s_linear_infinite]" />
                  </div>
                  <div className="absolute inset-0 rounded-full border border-pink-400/30 animate-ping" />
                </div>
                <p className="text-xs text-purple-200 animate-pulse">
                  Menghubungkan frekuensi lawan jenis di semesta...
                </p>
              </div>
            ) : randomMatchCandidate ? (
              /* Matched Candidate Card */
              <div className="space-y-3">
                <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <img
                    src={randomMatchCandidate.avatar}
                    alt={randomMatchCandidate.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-purple-400/50 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white truncate">
                        {randomMatchCandidate.name}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-semibold">
                        Lawan Jenis
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 italic mt-0.5 line-clamp-1">
                      “{randomMatchCandidate.bio}”
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {randomMatchCandidate.interests.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-purple-900/40 text-purple-200 border border-purple-500/20"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenChatWith(randomMatchCandidate.id)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-950/40 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Chat Sekarang</span>
                  </button>

                  <button
                    onClick={handleTriggerRandomMatch}
                    className="px-3.5 py-2.5 rounded-xl cosmic-glass border border-purple-500/30 text-purple-200 hover:text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Cari Lain</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* FITUR 2: MATCH CHATAN LAWAN JENIS DENGAN TIMER */}
          <div className="p-4 rounded-3xl bg-gradient-to-br from-[#241c48]/90 via-[#19163d]/80 to-[#0e0f26]/90 border border-purple-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-pink-600/30 flex items-center justify-center text-pink-300">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">Match Chatan dengan Timer</h2>
                  <span className="text-[10px] text-purple-300 font-medium">Speed chat seru berbatas waktu</span>
                </div>
              </div>

              {/* Timer selector */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-black/40 border border-purple-500/20 text-[11px]">
                <button
                  onClick={() => setSelectedTimerDuration(3)}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                    selectedTimerDuration === 3 ? 'bg-purple-600 text-white' : 'text-slate-400'
                  }`}
                >
                  3m
                </button>
                <button
                  onClick={() => setSelectedTimerDuration(5)}
                  className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                    selectedTimerDuration === 5 ? 'bg-purple-600 text-white' : 'text-slate-400'
                  }`}
                >
                  5m
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-3.5 leading-relaxed">
              Ngobrol kilat dengan lawan jenis selama {selectedTimerDuration} menit! Bila saling cocok sebelum timer habis, kamu bisa memperpanjang waktu atau menyimpannya sebagai teman permanen.
            </p>

            <button
              onClick={handleStartSpeedChat}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-900/40 cursor-pointer"
            >
              <Clock className="w-4 h-4 text-amber-300" />
              <span>Mulai Match Chatan ({selectedTimerDuration} Menit)</span>
            </button>
          </div>
        </div>
      ) : (
        /* RUANG DISKUSI */
        <div className="space-y-3">
          {selectedRoom ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <button
                  onClick={() => setSelectedRoom(null)}
                  className="text-xs text-purple-300 hover:underline flex items-center gap-1"
                >
                  ← Kembali ke Daftar Ruang
                </button>
                <h3 className="text-xs font-bold text-white">{selectedRoom.title}</h3>
              </div>

              <div className="p-3 rounded-2xl cosmic-glass border border-purple-500/20 text-xs">
                <p className="text-slate-300">{selectedRoom.description}</p>
              </div>

              {/* Input post */}
              <div className="p-3 rounded-2xl bg-[#141634] border border-purple-500/25 space-y-2">
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Bagikan ceritamu di ruang ini..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl bg-black/40 border border-purple-500/20 text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 resize-none"
                />
                <button
                  onClick={() => {
                    if (!newPostContent.trim()) return;
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
                  }}
                  disabled={!newPostContent.trim()}
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ml-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim</span>
                </button>
              </div>

              {/* Posts */}
              <div className="space-y-2">
                {posts
                  .filter((p) => p.roomId === selectedRoom.id)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="p-3 rounded-2xl cosmic-glass border border-purple-500/20 space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorAvatar}
                          alt={post.authorName}
                          className="w-7 h-7 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-bold text-white">{post.authorName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{post.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-200">{post.content}</p>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {COMMUNITY_ROOMS.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className="flex items-center justify-between p-3.5 rounded-2xl hover:bg-white/[0.04] transition-all cursor-pointer border-b border-white/[0.04] group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-tr ${room.bgColor} border border-white/10 flex items-center justify-center text-lg shrink-0`}
                    >
                      <span>{room.icon}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-white tracking-tight truncate group-hover:text-purple-300 transition-colors">
                        {room.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">{room.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{room.memberCount}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Speed Chat with Timer Modal */}
      {isSpeedChatActive && speedChatPartner && (
        <SpeedChatTimerModal
          currentUser={currentUser}
          matchPartner={speedChatPartner}
          initialMinutes={selectedTimerDuration}
          onClose={() => setIsSpeedChatActive(false)}
          onSaveAsPermanentFriend={(partnerId) => {
            onSaveAsPermanentFriend(partnerId);
          }}
          onNewRandomMatch={() => {
            const picked = fallbackCandidates[Math.floor(Math.random() * fallbackCandidates.length)];
            setSpeedChatPartner(picked);
          }}
        />
      )}
    </div>
  );
};
