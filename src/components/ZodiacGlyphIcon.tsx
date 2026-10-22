import React from 'react';
import { ZodiacSignName } from '../types/astrology';
import { ZODIAC_SIGNS } from '../data/zodiacData';
import { Flame, Mountain, Wind, Droplets } from 'lucide-react';

interface ZodiacGlyphIconProps {
  sign: ZodiacSignName;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showGlow?: boolean;
  className?: string;
}

export const ZodiacGlyphIcon: React.FC<ZodiacGlyphIconProps> = ({
  sign,
  size = 'md',
  showGlow = false,
  className = ''
}) => {
  const info = ZODIAC_SIGNS[sign] || ZODIAC_SIGNS['Leo'];

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
    xl: 'w-20 h-20 text-3xl',
    '2xl': 'w-28 h-28 text-5xl'
  };

  const getElementColor = () => {
    switch (info.element) {
      case 'Api':
        return 'from-amber-500/30 to-rose-500/20 text-rose-300 border-rose-500/30';
      case 'Tanah':
        return 'from-emerald-500/30 to-teal-500/20 text-emerald-300 border-emerald-500/30';
      case 'Udara':
        return 'from-cyan-500/30 to-blue-500/20 text-cyan-300 border-cyan-500/30';
      case 'Air':
        return 'from-indigo-500/30 to-purple-500/20 text-indigo-300 border-indigo-500/30';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-br border ${getElementColor()} ${sizeClasses[size]} ${
        showGlow ? 'shadow-lg shadow-purple-500/20' : ''
      } ${className}`}
    >
      <span className="font-semibold select-none leading-none">{info.symbol}</span>
    </div>
  );
};

export const ElementBadge: React.FC<{ element: 'Api' | 'Tanah' | 'Udara' | 'Air'; compact?: boolean }> = ({
  element,
  compact = false
}) => {
  const config = {
    Api: {
      icon: Flame,
      label: 'Api',
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20'
    },
    Tanah: {
      icon: Mountain,
      label: 'Tanah',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    Udara: {
      icon: Wind,
      label: 'Udara',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    Air: {
      icon: Droplets,
      label: 'Air',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    }
  }[element];

  const Icon = config.icon;

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${config.color}`}>
        <Icon className="w-3 h-3" />
        <span>{config.label}</span>
      </span>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${config.color}`}>
      <Icon className="w-4 h-4" />
      <span className="text-xs font-medium">{config.label}</span>
    </div>
  );
};
