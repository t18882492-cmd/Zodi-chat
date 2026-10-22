import React, { useState, useRef, useEffect } from 'react';
import { UserProfile, ChatMessage } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Image as ImageIcon,
  Smile,
  Send,
  Moon,
  Sparkles,
  ShieldAlert,
  UserX,
  CheckCheck,
  Check,
  X
} from 'lucide-react';

interface ChatDetailViewProps {
  currentUser: UserProfile;
  contact: UserProfile;
  messages: ChatMessage[];
  onSendMessage: (text: string, imageUrl?: string) => void;
  onBack: () => void;
  onOpenAstrologyProfile: () => void;
}

export const ChatDetailView: React.FC<ChatDetailViewProps> = ({
  currentUser,
  contact,
  messages,
  onSendMessage,
  onBack,
  onOpenAstrologyProfile
}) => {
  const [inputText, setInputText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [callActive, setCallActive] = useState<'voice' | 'video' | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const zodiacInfo = ZODIAC_SIGNS[contact.zodiac] || ZODIAC_SIGNS['Leo'];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText('');
    setShowEmojiPicker(false);
    onSendMessage(textToSend);

    // Simulate other user typing and responding after 2.5 seconds
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const sampleReplies = [
        `Haha bener banget! Emang seru banget kalau ngobrol sama kamu ✨`,
        `Wah seru! Kira-kira topik apa lagi yang paling bikin kamu penasaran? 🌌`,
        `Aku setuju banget. Nanti kita bahas topik ini lagi sambil santai yaa! 🎶`,
        `Hehe senang banget bisa kenal dan ngobrol sama kamu 🤗`
      ];
      const randomReply = sampleReplies[Math.floor(Math.random() * sampleReplies.length)];
      onSendMessage(randomReply);
    }, 2400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickAstrologyEmojis = ['✨', '🌙', '♌', '♐', '♈', '♉', '🔥', '🌊', '🥰', '🤗', '🌟', '🔮'];

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-[#08091a] text-white relative overflow-hidden">
      {/* 1. Header (Matches Screenshot #4) */}
      <div className="z-30 flex items-center justify-between px-4 py-3 bg-[#0d0f26]/90 backdrop-blur-md border-b border-purple-500/20 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <button
            onClick={onOpenAstrologyProfile}
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-400/40 group-hover:ring-purple-400"
                referrerPolicy="no-referrer"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                  {contact.name}
                </span>
              </div>
              <span className="text-[11px] text-purple-300/80 font-medium">
                {contact.handle}
              </span>
            </div>
          </button>
        </div>

        {/* Action icons: Call, Video, More */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCallActive('voice')}
            className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400 transition-colors cursor-pointer"
            title="Panggilan Suara"
          >
            <Phone className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCallActive('video')}
            className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white hover:border-purple-400 transition-colors cursor-pointer"
            title="Panggilan Video Kosmik"
          >
            <Video className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
              aria-label="Pilihan lainnya"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-11 w-48 rounded-2xl bg-[#141633] border border-purple-500/30 p-2 shadow-2xl z-50">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenAstrologyProfile();
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-slate-200 hover:bg-purple-900/40 rounded-xl flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                  <span>Lihat Profil Astrologi</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    alert(`Fitur laporkan ${contact.name}: Laporan diterima dan akan diverifikasi oleh sistem moderasi.`);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-amber-300 hover:bg-amber-950/30 rounded-xl flex items-center gap-2"
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Laporkan Pengguna</span>
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    alert(`Pengguna ${contact.name} telah diblokir.`);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:bg-rose-950/30 rounded-xl flex items-center gap-2"
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Blokir Pengguna</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Chat Area with Cosmic Night Sky Background & Crescent Moon */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 relative z-10">
        {/* Subtle crescent moon and starry atmosphere in chat backdrop */}
        <div className="absolute top-12 left-6 text-amber-200/20 pointer-events-none">
          <Moon className="w-14 h-14" />
        </div>
        <div className="absolute bottom-20 right-8 text-purple-300/10 pointer-events-none">
          <span className="text-4xl">✦</span>
        </div>

        {/* Date / Security Notice Pill */}
        <div className="flex justify-center my-2">
          <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.06] backdrop-blur-sm">
            Hari ini · Percakapan terenkripsi semesta
          </span>
        </div>

        {/* Messages */}
        {messages.map((msg) => {
          const isMe = msg.senderId === currentUser.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed backdrop-blur-md shadow-sm ${
                  isMe
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-sm shadow-purple-950/40'
                    : 'bg-[#1a1c38]/90 text-slate-100 border border-purple-500/20 rounded-bl-sm'
                }`}
              >
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Chat Attachment"
                    className="rounded-xl mb-2 max-h-48 w-full object-cover"
                  />
                )}
                <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                
                <div
                  className={`flex items-center gap-1 mt-1 text-[10px] ${
                    isMe ? 'justify-end text-purple-200/80' : 'justify-start text-slate-400'
                  }`}
                >
                  <span>{msg.timeLabel}</span>
                  {isMe && (
                    <span>
                      {msg.status === 'read' ? (
                        <CheckCheck className="w-3.5 h-3.5 text-sky-300 inline" />
                      ) : (
                        <Check className="w-3 h-3 text-purple-300 inline" />
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-purple-300/80 animate-pulse pl-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>{contact.name} sedang mengetik...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Emoji / Quick Astrology Sticker Bar */}
      {showEmojiPicker && (
        <div className="z-20 px-4 py-2 bg-[#10122e] border-t border-purple-500/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {quickAstrologyEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setInputText((prev) => prev + emoji);
              }}
              className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-sm hover:scale-125 transition-transform shrink-0"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* 4. Input Bar (Matches Screenshot #4) */}
      <div className="z-30 px-3 py-2.5 bg-[#0b0c20]/95 backdrop-blur-xl border-t border-purple-500/20">
        <div className="flex items-center gap-2">
          {/* Image Upload Button */}
          <button
            onClick={() => {
              const cosmicPhotoUrl = '/src/assets/images/zodichat_hero_cosmic_1792496105233.jpg';
              onSendMessage('Lihat pemandangan langit malam kita yang sefrekuensi! 🌌', cosmicPhotoUrl);
            }}
            className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-purple-300 transition-colors shrink-0 cursor-pointer"
            title="Kirim Foto Bintang"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              className="w-full pl-3.5 pr-9 py-2.5 rounded-2xl bg-[#171936] border border-purple-500/25 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-purple-300 transition-colors"
            >
              <Smile className="w-4 h-4" />
            </button>
          </div>

          {/* Send Button: Purple circle with paper plane */}
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-md shadow-purple-900/50 disabled:opacity-40 transition-all shrink-0 cursor-pointer"
            aria-label="Kirim Pesan"
          >
            <Send className="w-4 h-4 -rotate-12 translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Voice / Video Call Modal Simulation */}
      {callActive && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 bg-[#090a18]/95 backdrop-blur-xl animate-fade-in">
          <div className="text-center pt-10">
            <span className="text-xs uppercase tracking-widest text-purple-300 font-semibold mb-2 block">
              {callActive === 'voice' ? 'Panggilan Suara Kosmik' : 'Panggilan Video Kosmik'}
            </span>
            <h2 className="text-2xl font-bold text-white mb-1">{contact.name}</h2>
            <p className="text-xs text-slate-400">Menghubungkan frekuensi {zodiacInfo.name} ({zodiacInfo.symbol})...</p>
          </div>

          <div className="relative">
            <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 animate-pulse">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute inset-0 rounded-full border border-purple-400/40 animate-ping pointer-events-none" />
          </div>

          <div className="flex items-center gap-6 pb-12">
            <button
              onClick={() => setCallActive(null)}
              className="w-14 h-14 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-900/50 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
