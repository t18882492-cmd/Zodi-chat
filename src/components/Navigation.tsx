import React from 'react';
import { Home, MessageCircle, Users, User, Sparkles, HeartHandshake } from 'lucide-react';

export type ActiveTab = 'beranda' | 'chat' | 'komunitas' | 'profil' | 'cocok' | 'astrologi';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  unreadCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  unreadCount = 2
}) => {
  const tabs = [
    {
      id: 'beranda' as ActiveTab,
      label: 'Beranda',
      icon: Home
    },
    {
      id: 'chat' as ActiveTab,
      label: 'Chat',
      icon: MessageCircle,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    {
      id: 'komunitas' as ActiveTab,
      label: 'Komunikasi',
      icon: HeartHandshake
    },
    {
      id: 'profil' as ActiveTab,
      label: 'Profil',
      icon: User
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-[#0b0c1e]/90 backdrop-blur-xl border-t border-purple-500/20 px-4 py-2">
      <div className="grid grid-cols-4 items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 transition-all duration-200 min-h-[46px] group ${
                isActive ? 'text-purple-300' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {/* Active glow indicator */}
              {isActive && (
                <span className="absolute -top-1 w-8 h-1 bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-purple-300' : 'group-hover:scale-105'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>

              <span
                className={`text-[11px] mt-1 tracking-tight font-medium ${
                  isActive ? 'text-purple-200 font-semibold text-glow' : 'text-slate-400'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
