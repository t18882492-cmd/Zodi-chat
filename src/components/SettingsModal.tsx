import React, { useState } from 'react';
import { X, Shield, Bell, Lock, Eye, Trash2, Check } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const [pushNotif, setPushNotif] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [onlineStatusVisible, setOnlineStatusVisible] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#0e1028] border border-purple-500/30 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-300" />
            <h3 className="text-sm font-bold text-white">Pengaturan Aplikasi</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
            <span className="font-bold text-purple-200 block">Notifikasi & Suara</span>
            <label className="flex items-center justify-between cursor-pointer text-slate-300">
              <span>Notifikasi Pesan & Kecocokan</span>
              <input
                type="checkbox"
                checked={pushNotif}
                onChange={(e) => setPushNotif(e.target.checked)}
                className="accent-purple-600"
              />
            </label>
            <label className="flex items-center justify-between cursor-pointer text-slate-300">
              <span>Efek Suara Kosmik</span>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => setSoundEnabled(e.target.checked)}
                className="accent-purple-600"
              />
            </label>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2.5">
            <span className="font-bold text-purple-200 block">Privasi Akun</span>
            <label className="flex items-center justify-between cursor-pointer text-slate-300">
              <span>Tampilkan Status Online</span>
              <input
                type="checkbox"
                checked={onlineStatusVisible}
                onChange={(e) => setOnlineStatusVisible(e.target.checked)}
                className="accent-purple-600"
              />
            </label>
            <p className="text-[10px] text-slate-400 leading-tight">
              Jika dimatikan, pengguna lain tidak dapat melihat kapan kamu aktif di semesta.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
            <span className="font-bold text-purple-200 block mb-1">Daftar Blokir</span>
            <p className="text-[11px] text-slate-400">Saat ini tidak ada pengguna yang diblokir.</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Tersimpan!</span>
            </>
          ) : (
            <span>Simpan Pengaturan</span>
          )}
        </button>
      </div>
    </div>
  );
};
