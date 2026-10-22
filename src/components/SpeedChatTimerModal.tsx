import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, ChatMessage } from '../types/astrology';
import { X, Send, Clock, Heart, PlusCircle, CheckCheck, Sparkles, MessageCircle } from 'lucide-react';

interface SpeedChatTimerModalProps {
  currentUser: UserProfile;
  matchPartner: UserProfile;
  initialMinutes?: number;
  onClose: () => void;
  onSaveAsPermanentFriend: (partnerId: string) => void;
  onNewRandomMatch: () => void;
}

export const SpeedChatTimerModal: React.FC<SpeedChatTimerModalProps> = ({
  currentUser,
  matchPartner,
  initialMinutes = 3,
  onClose,
  onSaveAsPermanentFriend,
  onNewRandomMatch
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [timeExpired, setTimeExpired] = useState<boolean>(false);
  const [extendedTimeCount, setExtendedTimeCount] = useState<number>(0);
  const [isPermanentFriend, setIsPermanentFriend] = useState<boolean>(false);

  // Chat state
  const [inputText, setInputText] = useState('');
  const [isPartnerTyping, setIsPartnerTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'timer-msg-0',
      senderId: matchPartner.id,
      receiverId: currentUser.id,
      text: `Halo ${currentUser.name.split(' ')[0]}! Senang bisa match sama kamu. Waktu kita mulai berjalan nih ⏱️✨`,
      timestamp: new Date().toISOString(),
      timeLabel: '00:00',
      status: 'read'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const totalSeconds = (initialMinutes + extendedTimeCount * 2) * 60;
  const progressPercent = Math.max(0, (secondsLeft / totalSeconds) * 100);

  // Countdown timer effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsTimerRunning(false);
          setTimeExpired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isPartnerTyping]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleExtendTime = () => {
    setSecondsLeft((prev) => prev + 120);
    setExtendedTimeCount((prev) => prev + 1);
    if (!isTimerRunning && secondsLeft === 0) {
      setIsTimerRunning(true);
      setTimeExpired(false);
    }
    // Partner notification
    setMessages((prev) => [
      ...prev,
      {
        id: `timer-sys-${Date.now()}`,
        senderId: 'system',
        receiverId: currentUser.id,
        text: '✨ Waktu obrolan berhasil diperpanjang +2 Menit!',
        timestamp: new Date().toISOString(),
        timeLabel: 'Sistem',
        status: 'read'
      }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const textToSend = inputText.trim();
    setInputText('');

    const newMsg: ChatMessage = {
      id: `timer-msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: matchPartner.id,
      text: textToSend,
      timestamp: new Date().toISOString(),
      timeLabel: formatTime(secondsLeft),
      status: 'delivered'
    };

    setMessages((prev) => [...prev, newMsg]);

    // Simulated partner response
    setIsPartnerTyping(true);
    setTimeout(() => {
      setIsPartnerTyping(false);
      const responses = [
        `Haha asyik banget obrolan kita! Kamu biasanya paling suka ngapain pas luang? 😄`,
        `Wah seru! Aku juga suka hal-hal yang bikin rileks kayak musik dan kulineran.`,
        `Waktunya cepet banget yaa, seru ngobrol sama kamu!`,
        `Btw kalau waktunya habis, nanti kita lanjut chat di daftar teman ya! 😉`
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: `timer-msg-${Date.now()}`,
          senderId: matchPartner.id,
          receiverId: currentUser.id,
          text: randomResponse,
          timestamp: new Date().toISOString(),
          timeLabel: formatTime(secondsLeft),
          status: 'read'
        }
      ]);
    }, 2000);
  };

  const handleSaveFriend = () => {
    setIsPermanentFriend(true);
    onSaveAsPermanentFriend(matchPartner.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md h-[92vh] max-h-[720px] bg-[#0c0d24] border border-purple-500/35 rounded-3xl overflow-hidden flex flex-col shadow-2xl relative">
        {/* 1. Header with Live Countdown Timer */}
        <div className="px-4 py-3 bg-[#131433]/90 border-b border-purple-500/25 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={matchPartner.avatar}
                alt={matchPartner.name}
                className="w-9 h-9 rounded-full object-cover ring-1 ring-purple-400"
                referrerPolicy="no-referrer"
              />
              <div>
                <h3 className="text-xs font-bold text-white leading-tight">
                  {matchPartner.name}
                </h3>
                <span className="text-[10px] text-pink-300 font-medium">
                  Match Lawan Jenis
                </span>
              </div>
            </div>

            {/* Glowing Countdown Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-mono font-bold transition-all shadow-sm ${
                secondsLeft <= 30
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/50 animate-pulse'
                  : 'bg-purple-950/60 text-purple-200 border-purple-400/40'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTime(secondsLeft)}</span>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Progress Bar of Time Left */}
          <div className="w-full h-1.5 bg-black/40 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 transition-all duration-1000 ease-linear rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2. Chat Bubbles Area */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 relative">
          <div className="text-center my-1">
            <span className="text-[10px] px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              ⚡ Speed Chat Dimulai · Ngobrol santai sebelum timer habis
            </span>
          </div>

          {messages.map((m) => {
            const isMe = m.senderId === currentUser.id;
            const isSystem = m.senderId === 'system';

            if (isSystem) {
              return (
                <div key={m.id} className="text-center py-1">
                  <span className="text-[11px] text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    {m.text}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                      : 'bg-[#1b1c3a] text-slate-100 border border-purple-500/20 rounded-bl-none'
                  }`}
                >
                  <p>{m.text}</p>
                </div>
              </div>
            );
          })}

          {isPartnerTyping && (
            <div className="flex items-center gap-1.5 text-[11px] text-purple-300/80 animate-pulse pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span>{matchPartner.name} sedang mengetik...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* 3. Action Toolbar (Extend time & Add Friend) */}
        <div className="px-3 py-2 bg-[#10112c]/80 border-t border-white/5 flex items-center justify-between text-xs">
          <button
            onClick={handleExtendTime}
            className="flex items-center gap-1 text-purple-300 hover:text-white transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+2 Menit</span>
          </button>

          <button
            onClick={handleSaveFriend}
            disabled={isPermanentFriend}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              isPermanentFriend
                ? 'text-emerald-400 bg-emerald-500/10'
                : 'text-pink-300 hover:text-pink-200 cursor-pointer'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isPermanentFriend ? 'fill-emerald-400' : ''}`} />
            <span>{isPermanentFriend ? 'Teman Tersimpan' : 'Jadikan Teman Tetap'}</span>
          </button>
        </div>

        {/* 4. Input Message */}
        <div className="p-3 bg-[#0a0b1e] border-t border-purple-500/25 shrink-0">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tulis pesan cepat..."
              disabled={timeExpired}
              className="flex-1 px-3 py-2.5 rounded-xl bg-[#161738] border border-purple-500/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 disabled:opacity-50"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || timeExpired}
              className="w-9 h-9 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5. Time Expired Dialog Overlay */}
        {timeExpired && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4 animate-fade-in z-20">
            <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-3xl">
              ⏱️
            </div>
            <div>
              <h3 className="text-base font-bold text-white mb-1">Waktu Speed Chat Habis!</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
                Apakah kamu ingin menyimpan kontak {matchPartner.name} ke daftar obrolan permanen atau mencari lawan jenis baru?
              </p>
            </div>

            <div className="w-full space-y-2 pt-2">
              <button
                onClick={() => {
                  handleSaveFriend();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Simpan ke Daftar Chat Tetap
              </button>

              <button
                onClick={handleExtendTime}
                className="w-full py-2 rounded-xl cosmic-glass text-purple-300 text-xs font-semibold hover:text-white cursor-pointer"
              >
                Tambah Waktu +2 Menit
              </button>

              <button
                onClick={onNewRandomMatch}
                className="w-full py-2 text-xs text-slate-400 hover:text-white"
              >
                Cari Match Lawan Jenis Baru
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
