import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { X, Sparkles, MessageCircle, Star } from 'lucide-react';

interface ConstellationModalProps {
  currentUser: UserProfile;
  friends: UserProfile[];
  onClose: () => void;
  onOpenChat: (userId: string) => void;
}

export const ConstellationModal: React.FC<ConstellationModalProps> = ({
  currentUser,
  friends,
  onClose,
  onOpenChat
}) => {
  const [selectedFriend, setSelectedFriend] = useState<UserProfile | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 360);
    const height = (canvas.height = 360);

    // Nodes: Center is current user, surrounding are friends
    const centerNode = {
      x: width / 2,
      y: height / 2,
      name: currentUser.name,
      symbol: ZODIAC_SIGNS[currentUser.zodiac].symbol,
      isCenter: true
    };

    const friendNodes = friends.map((f, i) => {
      const angle = (i / friends.length) * Math.PI * 2 - Math.PI / 2;
      const radius = 110 + (i % 2 === 0 ? 25 : -15);
      return {
        x: centerNode.x + Math.cos(angle) * radius,
        y: centerNode.y + Math.sin(angle) * radius,
        friend: f,
        angle
      };
    });

    let pulse = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      pulse += 0.04;

      // Draw constellation connecting lines
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.28)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);

      // Connect center to all friends
      friendNodes.forEach((node) => {
        ctx.beginPath();
        ctx.moveTo(centerNode.x, centerNode.y);
        ctx.lineTo(node.x, node.y);
        ctx.stroke();
      });

      // Connect outer friends to each other to make a constellation shape
      for (let i = 0; i < friendNodes.length; i++) {
        const next = (i + 1) % friendNodes.length;
        ctx.beginPath();
        ctx.moveTo(friendNodes[i].x, friendNodes[i].y);
        ctx.lineTo(friendNodes[next].x, friendNodes[next].y);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Draw Center node (Current User)
      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(147, 51, 234, 0.4)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(centerNode.x, centerNode.y, 16 + Math.sin(pulse) * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = '#a855f7';
      ctx.shadowColor = '#c084fc';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Friend nodes
      friendNodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 14, 0, Math.PI * 2);
        ctx.fillStyle = '#1e1b4b';
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [currentUser, friends]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-[#0f1129] border border-purple-500/30 rounded-3xl p-5 overflow-hidden flex flex-col space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <h3 className="text-sm font-bold text-white">Rasi Pertemanan Semesta</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-300 text-center">
          Visualisasi teman-temanmu yang terhubung dalam satu galaksi energi kosmik.
        </p>

        {/* Canvas & Clickable star nodes overlay */}
        <div className="relative w-full h-[360px] flex items-center justify-center bg-black/40 rounded-2xl border border-purple-500/15 overflow-hidden">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Center tag */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
            <span className="text-xs font-bold text-white drop-shadow-md block">
              {currentUser.name.split(' ')[0]}
            </span>
            <span className="text-[10px] text-purple-200">
              {ZODIAC_SIGNS[currentUser.zodiac].symbol}
            </span>
          </div>

          {/* Interactive touch targets for friends */}
          {friends.map((friend, i) => {
            const angle = (i / friends.length) * Math.PI * 2 - Math.PI / 2;
            const radius = 110 + (i % 2 === 0 ? 25 : -15);
            const x = 180 + Math.cos(angle) * radius;
            const y = 180 + Math.sin(angle) * radius;

            return (
              <button
                key={friend.id}
                onClick={() => setSelectedFriend(friend)}
                style={{ left: `${x}px`, top: `${y}px` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex flex-col items-center justify-center hover:scale-125 transition-transform cursor-pointer group"
                title={`${friend.name} (${friend.zodiac})`}
              >
                <span className="text-xs text-cyan-200 font-bold leading-none">
                  {ZODIAC_SIGNS[friend.zodiac].symbol}
                </span>
                <span className="text-[9px] text-white opacity-80 group-hover:opacity-100 font-medium whitespace-nowrap mt-0.5">
                  {friend.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Friend Quick Card */}
        {selectedFriend && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-500/30 flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2.5">
              <img
                src={selectedFriend.avatar}
                alt={selectedFriend.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-400"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white">{selectedFriend.name}</span>
                  <span className="text-[11px] text-purple-300">
                    {ZODIAC_SIGNS[selectedFriend.zodiac].symbol}
                  </span>
                </div>
                <span className="text-[10px] text-slate-300">{selectedFriend.element} · {selectedFriend.friendshipGoal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenChat(selectedFriend.id);
              }}
              className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat</span>
            </button>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
        >
          Tutup Rasi
        </button>
      </div>
    </div>
  );
};
