import React, { useState } from 'react';
import { UserProfile, ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { Sparkles, ArrowRight, ShieldCheck, Moon } from 'lucide-react';

interface AuthModalProps {
  onLoginSuccess: (user?: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'welcome' | 'login' | 'register'>('welcome');
  const [name, setName] = useState('');
  const [zodiac, setZodiac] = useState<ZodiacSignName>('Leo');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoLogin = () => {
    onLoginSuccess();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      handle: `@${name.toLowerCase().replace(/\s+/g, '')}`,
      avatar: '/src/assets/images/avatar_anas_celestial_1792496105550.jpg',
      zodiac,
      bio: `Penjelajah semesta zodiak ${zodiac} ✨ Senang berkenalan!`,
      gender: 'Perempuan',
      element: ZODIAC_SIGNS[zodiac].element,
      traits: ZODIAC_SIGNS[zodiac].traits,
      interests: ['Astrologi', 'Musik', 'Stargazing'],
      friendshipGoal: 'Mencari teman sefrekuensi',
      favoriteZodiac: ZODIAC_SIGNS[zodiac].bestMatches,
      communicationStyle: 'Ramah dan hangat',
      online: true,
      lastSeen: 'Online',
      isFriend: true
    };

    onLoginSuccess(newUser);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080918] overflow-hidden">
      {/* Background illustration matching Screenshot #1 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/zodichat_hero_cosmic_1792496105233.jpg"
          alt="Cosmic Night Sky"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080918] via-[#090b1e]/80 to-transparent" />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-between min-h-[560px] py-8 text-center animate-fade-in">
        {/* Brand Lockup */}
        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-center gap-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.7)]">
              Zod<span className="text-purple-300">i</span>Chat
            </h1>
            <span className="text-2xl text-amber-300 animate-pulse">✨</span>
          </div>

          <p className="text-xs text-purple-200/90 font-light tracking-wide max-w-xs mx-auto drop-shadow-sm">
            Bukan sekadar chat, tapi koneksi antar semesta
          </p>
        </div>

        {/* Center Zodiac Glyphs Aura Ring */}
        <div className="relative my-6 w-44 h-44 rounded-full border border-purple-400/25 flex items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-dashed border-purple-300/20 animate-[spin_40s_linear_infinite]" />
          
          <div className="text-center p-4">
            <span className="text-3xl text-purple-200 select-none block mb-1">🌌</span>
            <span className="text-[11px] text-purple-300/80 font-mono">12 SIGNS · 1 SOUL</span>
          </div>

          {/* Zodiac Glyphs orbiting */}
          {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((g, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const x = Math.cos(angle) * 78;
            const y = Math.sin(angle) * 78;
            return (
              <span
                key={i}
                style={{ transform: `translate(${x}px, ${y}px)` }}
                className="absolute text-purple-300/60 text-xs font-bold"
              >
                {g}
              </span>
            );
          })}
        </div>

        {/* Dynamic content based on mode */}
        {mode === 'welcome' && (
          <div className="w-full space-y-3 px-4">
            <button
              onClick={handleDemoLogin}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-950/60 transition-all cursor-pointer"
            >
              Masuk
            </button>

            <button
              onClick={() => setMode('register')}
              className="w-full py-3.5 rounded-2xl cosmic-glass border border-purple-500/35 hover:border-purple-400/70 text-purple-200 font-semibold text-sm transition-all cursor-pointer"
            >
              Daftar
            </button>

            <div className="pt-2">
              <button
                onClick={handleDemoLogin}
                className="text-xs text-slate-400 hover:text-purple-300 transition-colors"
              >
                Sudah punya akun? <span className="text-purple-300 font-semibold underline">Login</span>
              </button>
            </div>
          </div>
        )}

        {mode === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="w-full space-y-3 px-4 text-left">
            <div>
              <label className="text-[11px] text-purple-200 font-semibold block mb-1">
                Nama Panggilan
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Anas"
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-500/40 text-xs text-white focus:outline-none focus:border-purple-300"
              />
            </div>

            <div>
              <label className="text-[11px] text-purple-200 font-semibold block mb-1">
                Pilih Zodiakmu
              </label>
              <select
                value={zodiac}
                onChange={(e) => setZodiac(e.target.value as ZodiacSignName)}
                className="w-full px-3 py-2 rounded-xl bg-black/60 border border-purple-500/40 text-xs text-white focus:outline-none focus:border-purple-300"
              >
                {Object.keys(ZODIAC_SIGNS).map((s) => (
                  <option key={s} value={s}>
                    {ZODIAC_SIGNS[s as ZodiacSignName].symbol} {s} ({ZODIAC_SIGNS[s as ZodiacSignName].periodShort})
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs tracking-wide shadow-md shadow-purple-900/50 cursor-pointer"
              >
                Masuk ke Semesta ZodiChat
              </button>

              <button
                type="button"
                onClick={() => setMode('welcome')}
                className="w-full py-2 text-xs text-slate-400 hover:text-white text-center block"
              >
                Kembali
              </button>
            </div>
          </form>
        )}

        {/* Footer trust badge */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-4">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Privasi terenkripsi & ramah bagi pemula</span>
        </div>
      </div>
    </div>
  );
};
