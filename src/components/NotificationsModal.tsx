import React from 'react';
import { X, Sparkles, MessageCircle, Heart, Bell } from 'lucide-react';

interface NotificationsModalProps {
  onClose: () => void;
  onOpenChat: (userId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ onClose, onOpenChat }) => {
  const notifications = [
    {
      id: 'notif-1',
      type: 'message',
      title: 'Pesan Baru dari Sagitarius ♐',
      desc: 'Luna: "Kamu lagi ngapain?"',
      time: '15 menit yang lalu',
      userId: 'user-sagittarius',
      unread: true
    },
    {
      id: 'notif-2',
      type: 'match',
      title: 'Kecocokan Kosmik Tinggi! ✨',
      desc: 'Energi harimu dengan Sagitarius mencapai 92% Sangat Cocok.',
      time: '1 jam yang lalu',
      unread: true
    },
    {
      id: 'notif-3',
      type: 'community',
      title: 'Ruang Teman Leo ♌ Ramai',
      desc: 'Kenzo Putra baru saja membagikan cerita transit planet hari ini.',
      time: '3 jam yang lalu',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-[#0e1028] border border-purple-500/30 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-purple-300" />
            <h3 className="text-sm font-bold text-white">Notifikasi Semesta</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                if (n.userId) {
                  onClose();
                  onOpenChat(n.userId);
                }
              }}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                n.unread
                  ? 'bg-purple-900/30 border-purple-400/40 shadow-sm'
                  : 'bg-white/[0.02] border-white/5 hover:border-purple-500/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-white">{n.title}</span>
                {n.unread && <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0 mt-1" />}
              </div>
              <p className="text-xs text-slate-300">{n.desc}</p>
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">{n.time}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
        >
          Tandai Sudah Dibaca
        </button>
      </div>
    </div>
  );
};
