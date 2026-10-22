import React, { useState } from 'react';
import { UserProfile, ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS, DAILY_HOROSCOPES, COSMIC_QUESTIONS } from '../data/zodiacData';
import {
  Bell,
  ArrowRight,
  Moon,
  Sparkles,
  Shuffle,
  Clock,
  Check
} from 'lucide-react';

interface HomeViewProps {
  currentUser: UserProfile;
  onOpenAstrologyProfile: (sign?: ZodiacSignName) => void;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  onOpenDailyCardModal: () => void;
  onOpenRandomMatch: () => void;
  onOpenSpeedChatTimer: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentUser,
  onOpenAstrologyProfile,
  onOpenNotifications,
  onOpenProfile,
  onOpenDailyCardModal,
  onOpenRandomMatch,
  onOpenSpeedChatTimer
}) => {
  const [answerInput, setAnswerInput] = useState<string>('');
  const [answeredQuestion, setAnsweredQuestion] = useState<boolean>(false);

  const currentHoroscope = DAILY_HOROSCOPES[currentUser.zodiac] || DAILY_HOROSCOPES['Leo'];
  const userZodiacInfo = ZODIAC_SIGNS[currentUser.zodiac] || ZODIAC_SIGNS['Leo'];

  return (
    <div className="pb-24 pt-4 px-4 space-y-5 animate-fade-in">
      {/* 1. Header: Personal Greeting */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            className="relative rounded-full ring-2 ring-purple-500/40 p-0.5 hover:ring-purple-400 transition-all cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-11 h-11 rounded-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-bold text-white tracking-tight">
                Halo, {currentUser.name.split(' ')[0]}
              </h1>
              <span className="text-amber-400 text-sm">✨</span>
            </div>
            <p className="text-xs text-slate-400 leading-tight">
              Selamat datang kembali! <br />
              <span className="text-purple-300 font-medium">Yuk, lihat energi semesta!</span>
            </p>
          </div>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Notifikasi"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_8px_rgba(236,72,153,0.8)]" />
        </button>
      </div>

      {/* 2. Ramalan Hari Ini Card (Matches Screenshot #2) */}
      <div className="relative overflow-hidden rounded-3xl p-5 border border-purple-500/30 bg-gradient-to-br from-[#201d4a]/90 via-[#16173a]/80 to-[#0e0f26]/90 shadow-xl shadow-purple-950/30 backdrop-blur-md">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-pink-600/10 rounded-full blur-2xl pointer-events-none" />

        {/* Crescent moon in top right */}
        <div className="absolute top-4 right-5 text-amber-200/80 pointer-events-none flex items-center gap-1">
          <Moon className="w-6 h-6 fill-amber-200/20 stroke-amber-200/90 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
          <span className="text-[10px] text-amber-200/60 font-mono">✦</span>
        </div>

        <div className="relative z-10">
          <div className="text-xs font-medium text-purple-300/80 mb-3 tracking-wide">
            Ramalan Hari Ini
          </div>

          <div className="flex items-center gap-3.5 mb-3.5">
            {/* Circular symbol container */}
            <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-[2px] shadow-lg shadow-pink-500/20">
              <div className="w-full h-full rounded-full bg-[#1b1738] flex items-center justify-center">
                <span className="text-2xl text-pink-300 font-bold leading-none select-none">
                  {userZodiacInfo.symbol}
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  {userZodiacInfo.name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium border border-purple-500/30">
                  {userZodiacInfo.element}
                </span>
              </div>
              <p className="text-xs text-slate-400">{userZodiacInfo.periodShort}</p>
            </div>
          </div>

          <p className="text-sm text-slate-200 italic font-light leading-relaxed mb-4 bg-white/[0.03] p-3 rounded-2xl border border-white/[0.05]">
            “{currentHoroscope.overview}”
          </p>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => onOpenAstrologyProfile(currentUser.zodiac)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-300 hover:text-purple-100 transition-colors group cursor-pointer"
            >
              <span>Lihat Selengkapnya</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenDailyCardModal}
              className="text-[11px] text-pink-300 hover:text-pink-200 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3 h-3" />
              <span>Kartu Kosmik</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Dua Fitur Utama Komunikasi Lawan Jenis */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
          <span>Koneksi Lawan Jenis</span>
          <span className="text-pink-400 text-xs">✨</span>
        </h2>

        {/* Card 1: Match Acak Lawan Jenis */}
        <button
          onClick={onOpenRandomMatch}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/30 to-purple-950/40 border border-purple-500/30 hover:border-purple-400/60 flex items-center justify-between transition-all group cursor-pointer text-left shadow-lg shadow-purple-950/20"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/30 to-indigo-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
              <Shuffle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Match Acak Lawan Jenis</h3>
              <p className="text-[11px] text-slate-300">Pindai & temukan lawan jenis yang sefrekuensi</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>

        {/* Card 2: Match Chatan Lawan Jenis dengan Timer */}
        <button
          onClick={onOpenSpeedChatTimer}
          className="w-full p-4 rounded-2xl bg-gradient-to-r from-pink-900/30 via-purple-900/30 to-indigo-950/40 border border-pink-500/30 hover:border-pink-400/60 flex items-center justify-between transition-all group cursor-pointer text-left shadow-lg shadow-pink-950/20"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Match Chatan dengan Timer</h3>
              <p className="text-[11px] text-slate-300">Speed chat seru berbatas waktu (3–5 menit)</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform shrink-0" />
        </button>
      </div>

      {/* 4. Cosmic Question (Icebreaker Harian) */}
      <div className="rounded-2xl cosmic-glass border border-purple-500/20 p-4 bg-gradient-to-r from-purple-950/20 to-indigo-950/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-300 text-xs">
            💬
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
            Cosmic Question Hari Ini
          </h3>
        </div>

        <p className="text-sm font-medium text-purple-200 mb-3 leading-snug">
          “{COSMIC_QUESTIONS[0]}”
        </p>

        {answeredQuestion ? (
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-purple-200">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Jawabanmu tersimpan di semesta!</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <input
              type="text"
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Tulis jawabanmu untuk memantik obrolan..."
              className="w-full text-xs px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400"
            />
            <button
              onClick={() => {
                if (answerInput.trim()) setAnsweredQuestion(true);
              }}
              disabled={!answerInput.trim()}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white transition-all disabled:opacity-50 cursor-pointer shadow-md shadow-purple-900/30"
            >
              Simpan Jawaban
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
