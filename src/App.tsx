import React, { useState } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { Navigation, ActiveTab } from './components/Navigation';
import { HomeView } from './views/HomeView';
import { ChatListView } from './views/ChatListView';
import { ChatDetailView } from './views/ChatDetailView';
import { AstrologyProfileView } from './views/AstrologyProfileView';
import { CosmicMatchView } from './views/CosmicMatchView';
import { CommunicationView } from './views/CommunicationView';
import { ProfileView } from './views/ProfileView';

// Modals
import { AuthModal } from './components/AuthModal';
import { ConstellationModal } from './components/ConstellationModal';
import { DailyCardModal } from './components/DailyCardModal';
import { EditProfileModal } from './components/EditProfileModal';
import { NotificationsModal } from './components/NotificationsModal';
import { SettingsModal } from './components/SettingsModal';
import { FaqModal } from './components/FaqModal';

// Mock Data
import {
  CURRENT_USER,
  MOCK_USERS,
  INITIAL_LEO_MESSAGES,
  INITIAL_SAGITTARIUS_MESSAGES,
  INITIAL_TAURUS_MESSAGES,
  INITIAL_PISCES_MESSAGES,
  INITIAL_VIRGO_MESSAGES,
  INITIAL_CAPRICORN_MESSAGES,
  INITIAL_LIBRA_MESSAGES
} from './data/mockData';
import { UserProfile, ChatMessage, ZodiacSignName } from './types/astrology';
import { Smartphone, Monitor, Sparkles, Heart } from 'lucide-react';

export default function App() {
  // App views: 'beranda' | 'chat' | 'komunitas' | 'profil' | 'astrologi' | 'cocok'
  const [activeTab, setActiveTab] = useState<ActiveTab>('beranda');
  const [activeChatUserId, setActiveChatUserId] = useState<string | null>(null);
  const [selectedAstrologySign, setSelectedAstrologySign] = useState<ZodiacSignName>('Leo');
  const [matchSign2, setMatchSign2] = useState<ZodiacSignName>('Sagittarius');

  // Device view mode: 'mobile' (matches user mockup) vs 'desktop' (wide screen)
  const [viewMode, setViewMode] = useState<'mobile' | 'wide'>('mobile');

  // Modals
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [showConstellation, setShowConstellation] = useState<boolean>(false);
  const [showDailyCard, setShowDailyCard] = useState<boolean>(false);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showFaq, setShowFaq] = useState<boolean>(false);

  // User & Chat state
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [contacts, setContacts] = useState<UserProfile[]>(MOCK_USERS);

  // Conversations dictionary
  const [chatHistories, setChatHistories] = useState<Record<string, ChatMessage[]>>({
    'user-leo': INITIAL_LEO_MESSAGES,
    'user-sagittarius': INITIAL_SAGITTARIUS_MESSAGES,
    'user-taurus': INITIAL_TAURUS_MESSAGES,
    'user-pisces': INITIAL_PISCES_MESSAGES,
    'user-virgo': INITIAL_VIRGO_MESSAGES,
    'user-capricorn': INITIAL_CAPRICORN_MESSAGES,
    'user-libra': INITIAL_LIBRA_MESSAGES
  });

  // Calculate latest messages for chat list
  const latestMessages: Record<string, ChatMessage> = {};
  Object.keys(chatHistories).forEach((userId) => {
    const list = chatHistories[userId];
    if (list && list.length > 0) {
      latestMessages[userId] = list[list.length - 1];
    }
  });


  // Handlers
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    setActiveChatUserId(null);
  };

  const handleOpenChat = (userId?: string) => {
    if (userId) {
      setActiveChatUserId(userId);
      // Mark as read
      setContacts((prev) =>
        prev.map((c) => (c.id === userId ? { ...c, unreadCount: 0 } : c))
      );
    } else {
      setActiveTab('chat');
      setActiveChatUserId(null);
    }
  };

  const handleSendMessage = (text: string, imageUrl?: string) => {
    if (!activeChatUserId) return;

    const now = new Date();
    const timeLabel = `${String(now.getHours()).padStart(2, '0')}.${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeChatUserId,
      text,
      timestamp: now.toISOString(),
      timeLabel,
      status: 'delivered',
      imageUrl
    };

    setChatHistories((prev) => ({
      ...prev,
      [activeChatUserId]: [...(prev[activeChatUserId] || []), newMsg]
    }));
  };

  const handleOpenCosmicMatch = (initialSign2?: ZodiacSignName) => {
    if (initialSign2) {
      setMatchSign2(initialSign2);
    }
    setActiveTab('cocok');
    setActiveChatUserId(null);
  };

  const handleOpenAstrologyProfile = (sign?: ZodiacSignName) => {
    if (sign) {
      setSelectedAstrologySign(sign);
    } else {
      setSelectedAstrologySign(currentUser.zodiac);
    }
    setActiveTab('astrologi');
    setActiveChatUserId(null);
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
  };

  const handleShareDailyCardToChat = (message: string) => {
    // Send card text to Leo's chat
    const leoId = 'user-leo';
    const now = new Date();
    const timeLabel = `${String(now.getHours()).padStart(2, '0')}.${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: leoId,
      text: message,
      timestamp: now.toISOString(),
      timeLabel,
      status: 'delivered'
    };

    setChatHistories((prev) => ({
      ...prev,
      [leoId]: [...(prev[leoId] || []), newMsg]
    }));
  };

  return (
    <div className="min-h-screen bg-[#070814] text-slate-100 flex flex-col items-center justify-start relative selection:bg-purple-500/30">
      {/* Dynamic twinkling cosmic canvas in background */}
      <CosmicBackground />

      {/* Top Bar for View Mode Switching & Brand */}
      <header className="w-full max-w-5xl mx-auto px-4 py-2.5 z-30 flex items-center justify-between border-b border-purple-500/15 backdrop-blur-md bg-[#070814]/80">
        <div className="flex items-center gap-2">
          <span className="text-lg font-black tracking-tight text-white drop-shadow-sm">
            Zod<span className="text-purple-400">i</span>Chat
          </span>
          <span className="text-amber-300 text-xs">✨</span>
          <span className="hidden sm:inline-block text-[11px] text-purple-300/80 font-medium ml-2 border-l border-purple-500/30 pl-2">
            Connect Beyond the Stars
          </span>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tampilan Frame Mobile (Sesuai Mockup)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mockup Mobile</span>
          </button>
          <button
            onClick={() => setViewMode('wide')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all cursor-pointer ${
              viewMode === 'wide'
                ? 'bg-purple-600 text-white font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Tampilan Layar Penuh"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Layar Luas</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex justify-center items-start py-2 sm:py-4 px-2 sm:px-4 z-10">
        {/* Device Frame or Wide Layout Container */}
        <div
          className={`w-full transition-all duration-300 relative ${
            viewMode === 'mobile'
              ? 'max-w-[420px] min-h-[780px] bg-[#090a1a] rounded-[40px] border-[6px] border-[#1f2042] shadow-[0_0_50px_rgba(139,92,246,0.25)] overflow-hidden flex flex-col'
              : 'max-w-4xl min-h-[800px] bg-[#090a1a]/95 rounded-3xl border border-purple-500/25 shadow-2xl backdrop-blur-xl flex flex-col'
          }`}
        >
          {/* Subtle mobile notch indicator in mobile mode */}
          {viewMode === 'mobile' && (
            <div className="w-full flex justify-center pt-2 pb-1 bg-transparent select-none">
              <div className="w-24 h-4 bg-black/60 rounded-full flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-slate-700 mx-1" />
                <span className="w-3 h-1.5 rounded-full bg-slate-800" />
              </div>
            </div>
          )}

          {/* Active View Router */}
          <div className="flex-1 overflow-y-auto">
            {activeChatUserId ? (
              <ChatDetailView
                currentUser={currentUser}
                contact={
                  contacts.find((c) => c.id === activeChatUserId) || contacts[0]
                }
                messages={chatHistories[activeChatUserId] || []}
                onSendMessage={handleSendMessage}
                onBack={() => setActiveChatUserId(null)}
                onOpenAstrologyProfile={() => {
                  const targetUser = contacts.find((c) => c.id === activeChatUserId);
                  if (targetUser) {
                    setSelectedAstrologySign(targetUser.zodiac);
                    setActiveTab('astrologi');
                    setActiveChatUserId(null);
                  }
                }}
              />
            ) : activeTab === 'beranda' ? (
              <HomeView
                currentUser={currentUser}
                onOpenAstrologyProfile={handleOpenAstrologyProfile}
                onOpenNotifications={() => setShowNotifications(true)}
                onOpenProfile={() => setActiveTab('profil')}
                onOpenDailyCardModal={() => setShowDailyCard(true)}
                onOpenRandomMatch={() => setActiveTab('komunitas')}
                onOpenSpeedChatTimer={() => setActiveTab('komunitas')}
              />
            ) : activeTab === 'chat' ? (
              <ChatListView
                contacts={contacts}
                latestMessages={latestMessages}
                onSelectChat={handleOpenChat}
                onOpenCosmicMatch={() => handleOpenCosmicMatch()}
              />
            ) : activeTab === 'komunitas' ? (
              <CommunicationView
                currentUser={currentUser}
                contacts={contacts}
                onOpenChatWith={(userId) => {
                  handleOpenChat(userId);
                }}
                onSaveAsPermanentFriend={(partnerId) => {
                  setContacts((prev) =>
                    prev.map((c) => (c.id === partnerId ? { ...c, isFriend: true } : c))
                  );
                }}
              />
            ) : activeTab === 'profil' ? (
              <ProfileView
                currentUser={currentUser}
                friendsCount={contacts.length}
                onOpenEditProfile={() => setShowEditProfile(true)}
                onOpenNotifications={() => setShowNotifications(true)}
                onOpenChat={() => setActiveTab('chat')}
                onOpenConstellation={() => setShowConstellation(true)}
                onOpenSettings={() => setShowSettings(true)}
                onOpenFaq={() => setShowFaq(true)}
                onLogout={() => setIsAuthenticated(false)}
                onOpenAstrologyProfile={() => handleOpenAstrologyProfile()}
              />
            ) : activeTab === 'astrologi' ? (
              <AstrologyProfileView
                signName={selectedAstrologySign}
                onBack={() => setActiveTab('beranda')}
                onOpenMatchWith={(targetSign) => {
                  setMatchSign2(targetSign);
                  setActiveTab('cocok');
                }}
              />
            ) : activeTab === 'cocok' ? (
              <CosmicMatchView
                initialSign1={currentUser.zodiac}
                initialSign2={matchSign2}
                onBack={() => setActiveTab('beranda')}
                onStartChat={(targetZodiac) => {
                  // Find a contact with that zodiac or default to Sagittarius/Leo
                  const found = contacts.find((c) => c.zodiac === targetZodiac);
                  if (found) {
                    handleOpenChat(found.id);
                  } else {
                    handleOpenChat(contacts[0].id);
                  }
                }}
              />
            ) : null}
          </div>

          {/* Bottom Navigation Bar (Hidden only inside active chat conversation) */}
          {!activeChatUserId && (
            <Navigation
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              unreadCount={2}
            />
          )}
        </div>
      </main>

      {/* Modals & Overlays */}
      {!isAuthenticated && (
        <AuthModal
          onLoginSuccess={(customUser) => {
            if (customUser) setCurrentUser(customUser);
            setIsAuthenticated(true);
          }}
        />
      )}

      {showConstellation && (
        <ConstellationModal
          currentUser={currentUser}
          friends={contacts}
          onClose={() => setShowConstellation(false)}
          onOpenChat={(id) => {
            setShowConstellation(false);
            handleOpenChat(id);
          }}
        />
      )}

      {showDailyCard && (
        <DailyCardModal
          onClose={() => setShowDailyCard(false)}
          onShareToChat={handleShareDailyCardToChat}
        />
      )}

      {showEditProfile && (
        <EditProfileModal
          currentUser={currentUser}
          onSave={handleUpdateProfile}
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {showNotifications && (
        <NotificationsModal
          onClose={() => setShowNotifications(false)}
          onOpenChat={(id) => {
            setShowNotifications(false);
            handleOpenChat(id);
          }}
        />
      )}

      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

      {showFaq && <FaqModal onClose={() => setShowFaq(false)} />}
    </div>
  );
}
