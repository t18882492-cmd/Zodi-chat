import React, { useState } from 'react';
import { ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS, ZODIAC_LIST, getZodiacCompatibility } from '../data/zodiacData';
import { ArrowLeft, MessageCircle, RefreshCw, Sparkles, Heart, HelpCircle, CheckCircle2 } from 'lucide-react';

interface CosmicMatchViewProps {
  initialSign1?: ZodiacSignName;
  initialSign2?: ZodiacSignName;
  onBack: () => void;
  onStartChat: (targetZodiac: ZodiacSignName) => void;
}

export const CosmicMatchView: React.FC<CosmicMatchViewProps> = ({
  initialSign1 = 'Leo',
  initialSign2 = 'Sagittarius',
  onBack,
  onStartChat
}) => {
  const [activeTab, setActiveTab] = useState<'Pasangan' | 'Persahabatan' | 'Lawan Jenis'>('Pasangan');
  const [sign1, setSign1] = useState<ZodiacSignName>(initialSign1);
  const [sign2, setSign2] = useState<ZodiacSignName>(initialSign2);
  const [showPairSelector, setShowPairSelector] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // Quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);

  const matchResult = getZodiacCompatibility(sign1, sign2, activeTab);
  const info1 = ZODIAC_SIGNS[sign1] || ZODIAC_SIGNS['Leo'];
  const info2 = ZODIAC_SIGNS[sign2] || ZODIAC_SIGNS['Sagittarius'];

  // Quiz questions
  const quizQuestions = [
    {
      q: 'Bagaimana caramu mengisi energi setelah seharian beraktivitas?',
      options: [
        { label: 'Nongkrong & ngobrol seru bareng teman', sign: 'Sagittarius' },
        { label: 'Menyendiri, dengerin musik atau nonton film', sign: 'Pisces' },
        { label: 'Membaca buku atau mengeksplorasi ide baru', sign: 'Gemini' },
        { label: 'Relaksasi santai sambil makan enak di rumah', sign: 'Taurus' }
      ]
    },
    {
      q: 'Topik apa yang paling cepat bikin kamu tertarik ngobrol lama?',
      options: [
        { label: 'Mimpi besar, ambisi, dan rencana masa depan', sign: 'Leo' },
        { label: 'Misteri semesta, astrologi, dan filosofi hidup', sign: 'Scorpio' },
        { label: 'Seni, pop culture, musik, dan desain estetik', sign: 'Libra' },
        { label: 'Teknologi masa depan dan gagasan orisinal', sign: 'Aquarius' }
      ]
    },
    {
      q: 'Sifat apa yang paling kamu cari dalam sosok teman atau pasangan?',
      options: [
        { label: 'Kesetiaan dan keterbukaan tanpa rahasia', sign: 'Cancer' },
        { label: 'Keberanian dan selalu optimis menghadapi rintangan', sign: 'Aries' },
        { label: 'Kedewasaan, ketenangan, dan komitmen nyata', sign: 'Capricorn' },
        { label: 'Kerapian berpikir dan siap saling mendukung', sign: 'Virgo' }
      ]
    }
  ];

  const handleSelectQuizOption = (index: number, recommendedSign: string) => {
    const nextAnswers = [...quizAnswers, index];
    setQuizAnswers(nextAnswers);

    if (quizStep + 1 < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    } else {
      // Finish quiz
      setSign2(recommendedSign as ZodiacSignName);
      setShowQuizModal(false);
      setQuizStep(0);
      setQuizAnswers([]);
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 space-y-4 animate-fade-in max-w-md mx-auto">
      {/* 1. Header (Matches Screenshot #6) */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
          aria-label="Kembali"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-bold text-white tracking-tight">Cocok Zodiak</h1>

        <button
          onClick={() => setShowQuizModal(true)}
          className="w-9 h-9 rounded-full cosmic-glass flex items-center justify-center text-purple-300 hover:text-white cursor-pointer"
          title="Ikuti Kuis Kecocokan"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Filter Tabs (Pasangan, Persahabatan, Lawan Jenis) */}
      <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#12132e]/80 border border-purple-500/20">
        {(['Pasangan', 'Persahabatan', 'Lawan Jenis'] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-900/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 3. Interconnected Glowing Zodiac Circles (Matches Screenshot #6) */}
      <div className="relative py-4 flex flex-col items-center justify-center">
        {/* Glow ambient nebula */}
        <div className="absolute w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-center gap-2 mb-3">
          {/* Sign 1: Leo */}
          <button
            onClick={() => setShowPairSelector(true)}
            className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-rose-500 to-purple-600 shadow-[0_0_25px_rgba(236,72,153,0.35)] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-[#181938] flex flex-col items-center justify-center">
              <span className="text-3xl text-pink-300 font-bold leading-none select-none">
                {info1.symbol}
              </span>
              <span className="text-[10px] text-pink-200 font-semibold mt-1">{info1.name}</span>
            </div>
          </button>

          {/* Plus sign */}
          <div className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-purple-300 text-sm font-bold z-10 shadow-sm">
            +
          </div>

          {/* Sign 2: Sagittarius */}
          <button
            onClick={() => setShowPairSelector(true)}
            className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-500 shadow-[0_0_25px_rgba(168,85,247,0.35)] flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
          >
            <div className="w-full h-full rounded-full bg-[#181938] flex flex-col items-center justify-center">
              <span className="text-3xl text-purple-300 font-bold leading-none select-none">
                {info2.symbol}
              </span>
              <span className="text-[10px] text-purple-200 font-semibold mt-1">{info2.name}</span>
            </div>
          </button>
        </div>

        {/* Labels below */}
        <div className="flex items-center gap-2 text-sm font-bold text-white mb-4">
          <span>{info1.name} {info1.symbol}</span>
          <span className="text-purple-400 font-normal">+</span>
          <span>{info2.name} {info2.symbol}</span>
        </div>

        {/* 4. Circular Progress Indicator (Matches Screenshot #6: 92%) */}
        <div className="relative w-24 h-24 rounded-full flex items-center justify-center mb-3">
          {/* Circular SVG meter */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="7"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#38bdf8"
              strokeWidth="7"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={2 * Math.PI * 40 * (1 - matchResult.score / 100)}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-extrabold text-white tracking-tight">
              {matchResult.score}%
            </span>
          </div>
        </div>

        {/* 5. Status & Description (Matches Screenshot #6) */}
        <div className="text-center max-w-xs space-y-2">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {matchResult.status}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {matchResult.description}
          </p>
          <div className="pt-1">
            <span className="text-[11px] text-purple-300 bg-purple-500/15 border border-purple-500/25 px-2.5 py-1 rounded-full">
              {matchResult.elementDynamic}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Action Buttons (Matches Screenshot #6) */}
      <div className="space-y-2.5 pt-2">
        <button
          onClick={() => onStartChat(sign2)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-purple-950/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Chat Sekarang</span>
        </button>

        <button
          onClick={() => setShowPairSelector(true)}
          className="w-full py-3.5 rounded-2xl cosmic-glass border border-purple-500/30 hover:border-purple-400/60 text-purple-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Coba Pasangan Lain</span>
        </button>
      </div>

      {/* Pairing Selector Modal */}
      {showPairSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0f1129] border border-purple-500/30 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Pilih Dua Zodiak untuk Dicocokkan</h3>
              <button
                onClick={() => setShowPairSelector(false)}
                className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="text-xs text-purple-300 font-semibold block mb-1.5">Zodiak Pertama:</label>
              <select
                value={sign1}
                onChange={(e) => setSign1(e.target.value as ZodiacSignName)}
                className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
              >
                {ZODIAC_LIST.map((z) => (
                  <option key={z.name} value={z.name}>
                    {z.symbol} {z.name} ({z.periodShort})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-purple-300 font-semibold block mb-1.5">Zodiak Kedua:</label>
              <select
                value={sign2}
                onChange={(e) => setSign2(e.target.value as ZodiacSignName)}
                className="w-full py-2.5 px-3 rounded-xl bg-black/50 border border-purple-500/30 text-white text-xs focus:outline-none focus:border-purple-400"
              >
                {ZODIAC_LIST.map((z) => (
                  <option key={z.name} value={z.name}>
                    {z.symbol} {z.name} ({z.periodShort})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowPairSelector(false)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
            >
              Lihat Hasil Kecocokan
            </button>
          </div>
        </div>
      )}

      {/* Cosmic Match Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#0f1129] border border-purple-500/30 rounded-3xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-300 font-semibold">
                Pertanyaan {quizStep + 1} dari {quizQuestions.length}
              </span>
              <button
                onClick={() => setShowQuizModal(false)}
                className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <h3 className="text-sm font-bold text-white leading-snug">
              {quizQuestions[quizStep].q}
            </h3>

            <div className="space-y-2">
              {quizQuestions[quizStep].options.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectQuizOption(i, opt.sign)}
                  className="w-full p-3 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-purple-400 hover:bg-purple-950/20 text-left text-xs text-slate-200 transition-all cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
