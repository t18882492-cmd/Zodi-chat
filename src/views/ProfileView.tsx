import React, { useState } from 'react';
import { UserProfile } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import {
  Bell,
  MessageCircle,
  Users,
  Bookmark,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sparkles,
  Share2,
  Shield,
  Moon
} from 'lucide-react';

interface ProfileViewProps {
  currentUser: UserProfile;
  friendsCount: number;
  onOpenEditProfile: () => void;
  onOpenNotifications: () => void;
  onOpenChat: () => void;
  onOpenConstellation: () => void;
  onOpenSettings: () => void;
  onOpenFaq: () => void;
  onLogout: () => void;
  onOpenAstrologyProfile: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  friendsCount,
  onOpenEditProfile,
  onOpenNotifications,
  onOpenChat,
  onOpenConstellation,
  onOpenSettings,
  onOpenFaq,
  onLogout,
  onOpenAstrologyProfile
}) => {
  const zodiacInfo = ZODIAC_SIGNS[currentUser.zodiac] || ZODIAC_SIGNS['Leo'];

  return (
    <div className="pb-24 pt-4 px-4 space-y-5 animate-fade-in max-w-md mx-auto">
      {/* 1. Header Profile Box (Matches Screenshot #8) */}
      <div className="relative overflow-hidden rounded-3xl p-5 border border-purple-500/30 bg-gradient-to-br from-[#201d4a]/90 via-[#16173a]/80 to-[#0e0f26]/90 shadow-xl shadow-purple-950/30">
        {/* Subtle crescent moon in top right */}
        <div className="absolute top-4 right-5 text-amber-200/60 pointer-events-none">
          <Moon className="w-10 h-10 fill-amber-200/10 stroke-amber-200/70" />
        </div>

        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Avatar with glowing ring */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#16173a]" />
            </div>

            <div>
              <h2 className="text-base font-bold text-white tracking-tight">{currentUser.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-purple-300 font-semibold">
                  {currentUser.zodiac} {zodiacInfo.symbol}
                </span>
                <span className="text-slate-500 text-xs">·</span>
                <span className="text-xs text-slate-400">{currentUser.element}</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenEditProfile}
            className="px-3.5 py-1.5 rounded-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all cursor-pointer"
          >
            Edit Profil
          </button>
        </div>

        {/* Bio */}
        <p className="mt-3.5 text-xs text-slate-300 font-light leading-relaxed">
          {currentUser.bio}
        </p>

        {/* Quick Astrological Chart Shortcut */}
        <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between">
          <button
            onClick={onOpenAstrologyProfile}
            className="text-xs text-purple-300 hover:text-purple-200 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Lihat Bagan Astrologi Pribadi →</span>
          </button>

          <button
            onClick={onOpenConstellation}
            className="text-[11px] text-pink-300 hover:text-pink-200 font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>Rasi Pertemanan</span>
          </button>
        </div>
      </div>

      {/* 2. Menu List (Matches Screenshot #8) */}
      <div className="rounded-2xl cosmic-glass border border-purple-500/20 overflow-hidden divide-y divide-white/[0.04]">
        {/* Notifikasi */}
        <button
          onClick={onOpenNotifications}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <Bell className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Notifikasi</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </button>

        {/* Pesan */}
        <button
          onClick={onOpenChat}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Pesan</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
              2
            </span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </button>

        {/* Teman (with Constellation trigger) */}
        <button
          onClick={onOpenConstellation}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Teman & Rasi Bintang</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-purple-300">{friendsCount}</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </div>
        </button>

        {/* Favorit */}
        <button
          onClick={() => alert('Daftar zodiak dan kutipan favoritmu tersimpan rapi.')}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <Bookmark className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Favorit</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Riwayat Chat */}
        <button
          onClick={onOpenChat}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Riwayat Chat</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Pengaturan */}
        <button
          onClick={onOpenSettings}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Pengaturan</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Bantuan & FAQ */}
        <button
          onClick={onOpenFaq}
          className="w-full flex items-center justify-between p-3.5 hover:bg-white/[0.04] transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <HelpCircle className="w-4 h-4 text-slate-300 group-hover:text-purple-300 transition-colors" />
            <span className="text-xs font-semibold text-white">Bantuan & FAQ</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>

        {/* Keluar */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-3.5 hover:bg-rose-950/20 transition-colors cursor-pointer group text-left"
        >
          <div className="flex items-center gap-3">
            <LogOut className="w-4 h-4 text-rose-400" />
            <span className="text-xs font-semibold text-rose-400">Keluar</span>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-500" />
        </button>
      </div>

      {/* 3. Quote Footer (Matches Screenshot #8) */}
      <div className="pt-4 pb-2 text-center">
        <p className="text-xs text-purple-200/70 italic font-light max-w-xs mx-auto leading-relaxed">
          “Semesta selalu punya cara untuk mempertemukan jiwa yang sefrekuensi.”
        </p>
        <span className="text-[10px] text-slate-500 mt-2 block font-mono">
          ZodiChat v1.0.0 · Connect Beyond the Stars ✨
        </span>
      </div>
    </div>
  );
};
