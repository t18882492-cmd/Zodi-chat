export type ZodiacSignName =
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Cancer'
  | 'Leo'
  | 'Virgo'
  | 'Libra'
  | 'Scorpio'
  | 'Sagittarius'
  | 'Capricorn'
  | 'Aquarius'
  | 'Pisces';

export type ElementType = 'Api' | 'Tanah' | 'Udara' | 'Air';

export interface ZodiacSignInfo {
  name: ZodiacSignName;
  nameId: string;
  symbol: string;
  glyph: string;
  period: string;
  periodShort: string;
  element: ElementType;
  elementDescription: string;
  rulingPlanet: string;
  rulingPlanetDescription: string;
  traits: string[];
  bestMatches: ZodiacSignName[];
  strengths: string[];
  weaknesses: string[];
  color: string;
  accentBg: string;
  quote: string;
}

export interface CompatibilityResult {
  sign1: ZodiacSignName;
  sign2: ZodiacSignName;
  score: number;
  category: 'Pasangan' | 'Persahabatan' | 'Lawan Jenis';
  status: string;
  description: string;
  communicationTip: string;
  elementDynamic: string;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  birthdate?: string;
  zodiac: ZodiacSignName;
  bio: string;
  gender: 'Laki-laki' | 'Perempuan';
  element: ElementType;
  traits: string[];
  interests: string[];
  friendshipGoal: string;
  favoriteZodiac: ZodiacSignName[];
  communicationStyle: string;
  online: boolean;
  lastSeen: string;
  unreadCount?: number;
  isFriend: boolean;
  isBlocked?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  timeLabel: string;
  status: 'sent' | 'delivered' | 'read';
  imageUrl?: string;
  stickerUrl?: string;
  reactions?: string[];
}

export interface CommunityRoom {
  id: string;
  title: string;
  subtitle: string;
  category: 'Semua' | 'Zodiak' | 'Topik' | 'Room';
  memberCount: string;
  icon: string;
  bgColor: string;
  rules: string[];
  description: string;
}

export interface CommunityPost {
  id: string;
  roomId: string;
  authorName: string;
  authorZodiac: ZodiacSignName;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  repliesCount: number;
  isLiked?: boolean;
}

export interface DailyHoroscope {
  sign: ZodiacSignName;
  overview: string;
  love: string;
  career: string;
  energyScore: number;
  luckyColor: string;
  luckyNumber: number;
  quote: string;
}
