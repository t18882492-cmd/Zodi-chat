import React, { useState } from 'react';
import { UserProfile, ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { X, Check, Sparkles, Shield, User } from 'lucide-react';

interface EditProfileModalProps {
  currentUser: UserProfile;
  onSave: (updated: Partial<UserProfile>) => void;
  onClose: () => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  currentUser,
  onSave,
  onClose
}) => {
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [birthdate, setBirthdate] = useState(currentUser.birthdate || '2004-08-08');
  const [zodiac, setZodiac] = useState<ZodiacSignName>(currentUser.zodiac);
  const [friendshipGoal, setFriendshipGoal] = useState(currentUser.friendshipGoal);
  const [interests, setInterests] = useState<string[]>(currentUser.interests);
  const [hideBirthyear, setHideBirthyear] = useState(true);
  const [allowPublicMessages, setAllowPublicMessages] = useState(true);

  // Available interest options
  const availableInterests = [
    'Astrologi',
    'Musik',
    'Stargazing',
    'Fotografi',
    'Film Sci-Fi',
    'Anime',
    'Gaming',
    'Buku',
    'Kuliner',
    'Traveling',
    'Art & Desain',
    'Coding'
  ];

  // Helper to determine Zodiac from birthdate
  const updateZodiacFromDate = (dateString: string) => {
    setBirthdate(dateString);
    if (!dateString) return;
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      let detectedSign: ZodiacSignName = 'Leo';
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) detectedSign = 'Aries';
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) detectedSign = 'Taurus';
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) detectedSign = 'Gemini';
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) detectedSign = 'Cancer';
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) detectedSign = 'Leo';
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) detectedSign = 'Virgo';
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) detectedSign = 'Libra';
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) detectedSign = 'Scorpio';
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) detectedSign = 'Sagittarius';
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) detectedSign = 'Capricorn';
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) detectedSign = 'Aquarius';
      else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) detectedSign = 'Pisces';

      setZodiac(detectedSign);
    }
  };

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleSave = () => {
    onSave({
      name,
      bio,
      birthdate,
      zodiac,
      friendshipGoal,
      interests,
      element: ZODIAC_SIGNS[zodiac].element
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md max-h-[90vh] bg-[#0e1028] border border-purple-500/30 rounded-3xl p-5 overflow-y-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <User className="w-4 h-4 text-purple-300" />
            <span>Edit Profil & Preferensi Kosmik</span>
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-3.5 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Nama Panggilan</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Tanggal Lahir</label>
              <input
                type="date"
                value={birthdate}
                onChange={(e) => updateZodiacFromDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="text-slate-300 font-semibold block mb-1">Zodiak (Otomatis)</label>
              <div className="px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 font-bold flex items-center gap-1.5">
                <span>{ZODIAC_SIGNS[zodiac].symbol}</span>
                <span>{zodiac}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Bio Singkat</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Tujuan Berteman</label>
            <input
              type="text"
              value={friendshipGoal}
              onChange={(e) => setFriendshipGoal(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-black/40 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400"
            />
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">Minat & Hobi</label>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
              {availableInterests.map((item) => {
                const isSelected = interests.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleInterest(item)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {item} {isSelected ? '✓' : ''}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Privacy controls */}
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center gap-1.5 text-purple-300 font-semibold text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              <span>Privasi & Keamanan Data</span>
            </div>

            <label className="flex items-center justify-between cursor-pointer text-slate-300 text-[11px]">
              <span>Sembunyikan tahun lahir (hanya tampilkan zodiak)</span>
              <input
                type="checkbox"
                checked={hideBirthyear}
                onChange={(e) => setHideBirthyear(e.target.checked)}
                className="accent-purple-600"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer text-slate-300 text-[11px]">
              <span>Izinkan pesan dari pengguna baru tanpa request</span>
              <input
                type="checkbox"
                checked={allowPublicMessages}
                onChange={(e) => setAllowPublicMessages(e.target.checked)}
                className="accent-purple-600"
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-900/50 cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  );
};
