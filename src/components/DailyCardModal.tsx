import React, { useState } from 'react';
import { COSMIC_CARDS, CosmicCard } from '../data/zodiacData';
import { X, Sparkles, Share2, Check, RefreshCw } from 'lucide-react';

interface DailyCardModalProps {
  onClose: () => void;
  onShareToChat: (message: string) => void;
}

export const DailyCardModal: React.FC<DailyCardModalProps> = ({ onClose, onShareToChat }) => {
  const [cardIndex, setCardIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const card = COSMIC_CARDS[cardIndex];

  const handleNextCard = () => {
    setCardIndex((prev) => (prev + 1) % COSMIC_CARDS.length);
  };

  const handleShare = () => {
    onShareToChat(`[Kartu Inspirasi Kosmik] ✨ "${card.message}" - ${card.author}`);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#0d0f26] border border-purple-500/30 rounded-3xl p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Kartu Kosmik Semesta Hari Ini</span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tarot style Card */}
        <div className="relative rounded-2xl p-6 bg-gradient-to-b from-[#24214f] via-[#16173a] to-[#0c0d20] border-2 border-amber-300/30 shadow-[0_0_30px_rgba(251,191,36,0.15)] text-center flex flex-col items-center justify-between min-h-[300px]">
          <div className="w-full flex items-center justify-between text-[11px] text-amber-200/70 font-mono">
            <span>✦ ZODICHAT ORACLE ✦</span>
            <span>{card.category}</span>
          </div>

          <div className="my-4">
            <div className="w-20 h-20 rounded-full border border-amber-300/40 bg-amber-400/10 flex items-center justify-center text-4xl mb-3 mx-auto shadow-inner">
              {card.signSymbol}
            </div>
            <h4 className="text-base font-bold text-amber-200 mb-2">{card.title}</h4>
            <p className="text-xs text-slate-200 italic leading-relaxed px-2">
              “{card.message}”
            </p>
          </div>

          <span className="text-[10px] text-slate-400 font-mono">
            ~ {card.author} ~
          </span>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleShare}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-purple-900/40 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Terkirim ke Chat Teman!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Bagikan Kartu ke Chat</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextCard}
            className="w-full py-2 rounded-xl cosmic-glass text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Tarik Kartu Lain</span>
          </button>
        </div>
      </div>
    </div>
  );
};
