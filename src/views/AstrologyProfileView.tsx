import React, { useState } from 'react';
import { ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { ArrowLeft, Share2, Flame, Sun, Sparkles, Check, HeartHandshake, ShieldCheck } from 'lucide-react';

interface AstrologyProfileViewProps {
  signName: ZodiacSignName;
  onBack: () => void;
  onOpenMatchWith: (targetSign: ZodiacSignName) => void;
}

export const AstrologyProfileView: React.FC<AstrologyProfileViewProps> = ({
  signName,
  onBack,
  onOpenMatchWith
}) => {
  const [showFullDetailModal, setShowFullDetailModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const sign = ZODIAC_SIGNS[signName] || ZODIAC_SIGNS['Leo'];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-5 animate-fade-in max-w-md mx-auto">
      {/* 1. Header (Matches Screenshot #5) */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-bold text-white tracking-tight">Profil Astrologi</h1>

        <button
          onClick={handleShare}
          className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          title="Bagikan Profil"
        >
          {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Celestial Astrological Chart Wheel (Matches Screenshot #5) */}
      <div className="relative flex flex-col items-center justify-center py-4">
        {/* Outer glowing celestial chart dial */}
        <div className="relative w-56 h-56 rounded-full border border-purple-500/30 flex items-center justify-center p-3">
          {/* Subtle celestial compass rings */}
          <div className="absolute inset-2 rounded-full border border-dashed border-purple-400/20 animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-5 rounded-full border border-purple-500/20" />
          
          {/* Constellation star points around rim */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_8px_#c084fc]" />

          {/* Central Zodiac luminous medallion */}
          <div className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-tr from-purple-800 via-indigo-700 to-purple-900 border-2 border-purple-400/60 shadow-[0_0_35px_rgba(168,85,247,0.45)] flex flex-col items-center justify-center text-center">
            <span className="text-4xl text-purple-200 font-bold leading-none select-none drop-shadow-md">
              {sign.symbol}
            </span>
          </div>
        </div>

        {/* Title and Dates */}
        <div className="text-center mt-3">
          <h2 className="text-xl font-bold text-white tracking-tight">{sign.name}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{sign.period}</p>
        </div>
      </div>

      {/* 3. Trait Badges (Matches Screenshot #5: Percaya Diri, Setia, Kreatif, Pemimpin) */}
      <div className="flex flex-wrap justify-center gap-2">
        {sign.traits.map((trait) => (
          <span
            key={trait}
            className="px-3.5 py-1.5 rounded-full bg-[#161838] border border-purple-500/20 text-xs font-semibold text-purple-200 shadow-sm"
          >
            {trait}
          </span>
        ))}
      </div>

      {/* 4. Elemen Section (Matches Screenshot #5) */}
      <div className="p-3.5 rounded-2xl cosmic-glass border border-purple-500/20 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
          <Flame className="w-5 h-5 fill-rose-500/30" />
        </div>
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Elemen
          </span>
          <h3 className="text-sm font-bold text-white">{sign.element}</h3>
          <p className="text-xs text-slate-300 leading-tight">{sign.elementDescription}</p>
        </div>
      </div>

      {/* 5. Planet Penguasa Section (Matches Screenshot #5) */}
      <div className="p-3.5 rounded-2xl cosmic-glass border border-purple-500/20 flex items-center gap-3.5">
        <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
          <Sun className="w-5 h-5 fill-amber-500/30" />
        </div>
        <div>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Planet Penguasa
          </span>
          <h3 className="text-sm font-bold text-white">{sign.rulingPlanet}</h3>
          <p className="text-xs text-slate-300 leading-tight">{sign.rulingPlanetDescription}</p>
        </div>
      </div>

      {/* 6. Kecocokan Terbaik (Matches Screenshot #5: Aries, Sagittarius, Gemini) */}
      <div>
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
          Kecocokan Terbaik
        </h3>

        <div className="grid grid-cols-3 gap-3">
          {sign.bestMatches.map((matchSign) => {
            const matchInfo = ZODIAC_SIGNS[matchSign];
            return (
              <button
                key={matchSign}
                onClick={() => onOpenMatchWith(matchSign)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl cosmic-glass border border-purple-500/20 hover:border-purple-400/50 hover:bg-purple-950/20 transition-all group cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#1b1c3c] border border-purple-400/30 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                  <span className="text-xl text-purple-300 font-bold">{matchInfo.symbol}</span>
                </div>
                <span className="text-xs font-bold text-white">{matchInfo.name}</span>
                <span className="text-[10px] text-purple-300/80">Cek Cocok</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 7. Action Button: "Lihat Detail Lengkap" */}
      <div className="pt-2">
        <button
          onClick={() => setShowFullDetailModal(true)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-950/50 transition-all cursor-pointer"
        >
          Lihat Detail Lengkap
        </button>
      </div>

      {/* Full Detail Modal */}
      {showFullDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md max-h-[85vh] bg-[#0f1129] border border-purple-500/30 rounded-3xl p-6 overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-2xl text-purple-300">{sign.symbol}</span>
                <div>
                  <h3 className="text-base font-bold text-white">Analisis Kosmik {sign.name}</h3>
                  <p className="text-[11px] text-purple-300">{sign.period}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFullDetailModal(false)}
                className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <h4 className="font-bold text-purple-300 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Kekuatan Utama ({sign.name})</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  {sign.strengths.map((str) => (
                    <li key={str}>{str}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <h4 className="font-bold text-rose-300 mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Tantangan & Ruang Bertumbuh</span>
                </h4>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  {sign.weaknesses.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-2xl bg-purple-900/20 border border-purple-500/30">
                <h4 className="font-bold text-white mb-1">Kutipan Semesta</h4>
                <p className="text-slate-200 italic font-light">“{sign.quote}”</p>
              </div>
            </div>

            <button
              onClick={() => setShowFullDetailModal(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
