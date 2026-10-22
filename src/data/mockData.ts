import { UserProfile, ChatMessage, CommunityRoom, CommunityPost } from '../types/astrology';

export const CURRENT_USER: UserProfile = {
  id: 'current-user-anas',
  name: 'Anas Tyss',
  handle: '@anastyss',
  avatar: '/src/assets/images/avatar_anas_celestial_1792496105550.jpg',
  birthdate: '2004-08-08',
  zodiac: 'Leo',
  bio: 'Pencinta langit malam, astrologi, dan obrolan sefrekuensi 🌙✨ Always ready for new adventures!',
  gender: 'Perempuan',
  element: 'Api',
  traits: ['Percaya Diri', 'Setia', 'Kreatif', 'Pemimpin'],
  interests: ['Astrologi', 'Musik', 'Stargazing', 'Fotografi', 'Art'],
  friendshipGoal: 'Mencari teman ngobrol sefrekuensi & sharing mimpi',
  favoriteZodiac: ['Sagittarius', 'Aries', 'Gemini'],
  communicationStyle: 'Ekspresif, hangat, dan suka mengirim pesan mendalam',
  online: true,
  lastSeen: 'Online sekarang',
  isFriend: true
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'user-leo',
    name: 'Leo',
    handle: '@bimaleo',
    avatar: '/src/assets/images/avatar_leo_character_1792496107716.jpg',
    birthdate: '2003-08-14',
    zodiac: 'Leo',
    bio: 'Fire sign with big dreams 🔥 Suka diskusi astrologi, kopi senja, dan musik indie.',
    gender: 'Laki-laki',
    element: 'Api',
    traits: ['Karismatik', 'Setia', 'Ekspresif', 'Hangat'],
    interests: ['Astrologi', 'Gitar', 'Film Sci-Fi', 'Kopi'],
    friendshipGoal: 'Teman ngobrol santai & berdiskusi tentang semesta',
    favoriteZodiac: ['Leo', 'Sagittarius', 'Aries'],
    communicationStyle: 'Santai, humoris, dan responsif',
    online: true,
    lastSeen: 'Online',
    unreadCount: 0,
    isFriend: true
  },
  {
    id: 'user-sagittarius',
    name: 'Sagittarius',
    handle: '@luna_adventures',
    avatar: '/src/assets/images/avatar_sagittarius_1792496106736.jpg',
    birthdate: '2004-12-05',
    zodiac: 'Sagittarius',
    bio: 'Always chasing constellations and new stories ✨ Never stop wandering!',
    gender: 'Perempuan',
    element: 'Api',
    traits: ['Petualang', 'Jujur', 'Ceria', 'Optimis'],
    interests: ['Traveling', 'Fotografi Bintang', 'Anime', 'Musik Pop'],
    friendshipGoal: 'Mencari teman jalan & obrolan filosofis',
    favoriteZodiac: ['Leo', 'Aries', 'Aquarius'],
    communicationStyle: 'Cepat membalas, penuh emoji & antusias',
    online: false,
    lastSeen: '20.32',
    unreadCount: 2,
    isFriend: true
  },
  {
    id: 'user-taurus',
    name: 'Taurus',
    handle: '@reza_earth',
    avatar: '/src/assets/images/avatar_taurus_user_1792496107353.jpg',
    birthdate: '2003-05-10',
    zodiac: 'Taurus',
    bio: 'Pencinta ketenangan, lofi beats, dan kuliner lezat 🎧🌿 Setia kawan.',
    gender: 'Laki-laki',
    element: 'Tanah',
    traits: ['Setia', 'Penyabar', 'Tenang', 'Dapat Diandalkan'],
    interests: ['Lofi Beats', 'Cooking', 'Buku', 'Desain'],
    friendshipGoal: 'Teman curhat yang tenang dan suportif',
    favoriteZodiac: ['Virgo', 'Cancer', 'Capricorn'],
    communicationStyle: 'Bijaksana dan mendengarkan dengan tulus',
    online: true,
    lastSeen: 'Online',
    unreadCount: 0,
    isFriend: true
  },
  {
    id: 'user-pisces',
    name: 'Pisces',
    handle: '@nadia_dreamer',
    avatar: '/src/assets/images/avatar_anas_celestial_1792496105550.jpg',
    birthdate: '2005-03-03',
    zodiac: 'Pisces',
    bio: 'Lost in poetry and galaxy dreams 🌊🎨 Pendengar setia curahan hatimu.',
    gender: 'Perempuan',
    element: 'Air',
    traits: ['Empati Tinggi', 'Artistik', 'Mimpi Besar', 'Penyayang'],
    interests: ['Melukis', 'Puisi', 'K-Pop', 'Astrologi'],
    friendshipGoal: 'Teman berbagi seni & imajinasi',
    favoriteZodiac: ['Cancer', 'Scorpio', 'Taurus'],
    communicationStyle: 'Penuh kelembutan dan perhatian',
    online: false,
    lastSeen: '18.03',
    unreadCount: 0,
    isFriend: true
  },
  {
    id: 'user-virgo',
    name: 'Virgo',
    handle: '@alya_mind',
    avatar: '/src/assets/images/avatar_sagittarius_1792496106736.jpg',
    birthdate: '2004-09-02',
    zodiac: 'Virgo',
    bio: 'Organized soul with a curious mind 📚💡 Yuk ngobrol produktif!',
    gender: 'Perempuan',
    element: 'Tanah',
    traits: ['Teliti', 'Bijaksana', 'Solutif', 'Tulus'],
    interests: ['Buku Self-Dev', 'Coding', 'Podcast', 'Matematika'],
    friendshipGoal: 'Teman belajar bareng & bertukar wawasan',
    favoriteZodiac: ['Taurus', 'Capricorn', 'Scorpio'],
    communicationStyle: 'Runtut, analitis, dan suka berbagi tips',
    online: false,
    lastSeen: '16.26',
    unreadCount: 0,
    isFriend: true
  },
  {
    id: 'user-capricorn',
    name: 'Capricorn',
    handle: '@dimas_focus',
    avatar: '/src/assets/images/avatar_leo_character_1792496107716.jpg',
    birthdate: '2002-01-15',
    zodiac: 'Capricorn',
    bio: 'Building dreams one step at a time 🏔️☕ Ambisius tapi tetap asyik.',
    gender: 'Laki-laki',
    element: 'Tanah',
    traits: ['Ambisius', 'Teguh', 'Realistis', 'Disiplin'],
    interests: ['Bisnis', 'Rock Music', 'Investasi', 'Gym'],
    friendshipGoal: 'Partner diskusi karier dan visi masa depan',
    favoriteZodiac: ['Taurus', 'Virgo', 'Pisces'],
    communicationStyle: 'Lugaskan dan to the point',
    online: false,
    lastSeen: '14.11',
    unreadCount: 0,
    isFriend: true
  },
  {
    id: 'user-libra',
    name: 'Libra',
    handle: '@maya_harmony',
    avatar: '/src/assets/images/avatar_anas_celestial_1792496105550.jpg',
    birthdate: '2004-10-12',
    zodiac: 'Libra',
    bio: 'Spreading good vibes and aesthetic energy 🌸✨ Love peace and harmony.',
    gender: 'Perempuan',
    element: 'Udara',
    traits: ['Diplomatis', 'Menawan', 'Pecinta Damai', 'Ramah'],
    interests: ['Fashion', 'Museum Date', 'Fotografi', 'Film'],
    friendshipGoal: 'Teman hangout estetik & sharing selera seni',
    favoriteZodiac: ['Gemini', 'Aquarius', 'Leo'],
    communicationStyle: 'Hangat, sopan, dan cepat mencairkan suasana',
    online: false,
    lastSeen: '12.30',
    unreadCount: 0,
    isFriend: true
  }
];

// Initial conversation with Leo (matches screen #4)
export const INITIAL_LEO_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'user-leo',
    receiverId: 'current-user-anas',
    text: 'Haiii 🖐️ Kamu Leo juga ya?',
    timestamp: '2026-10-20T21:20:00.000Z',
    timeLabel: '21.20',
    status: 'read'
  },
  {
    id: 'msg-2',
    senderId: 'current-user-anas',
    receiverId: 'user-leo',
    text: 'Iyaaa, kamu juga? 😄',
    timestamp: '2026-10-20T21:22:00.000Z',
    timeLabel: '21.22',
    status: 'read'
  },
  {
    id: 'msg-3',
    senderId: 'user-leo',
    receiverId: 'current-user-anas',
    text: 'Keren! Jadi kita satu elemen nih (🔥 Fire Sign).',
    timestamp: '2026-10-20T21:25:00.000Z',
    timeLabel: '21.25',
    status: 'read'
  },
  {
    id: 'msg-4',
    senderId: 'current-user-anas',
    receiverId: 'user-leo',
    text: 'Haha iya, cocok sih kalo ngobrol sama kamu. 🥰',
    timestamp: '2026-10-20T21:27:00.000Z',
    timeLabel: '21.27',
    status: 'read'
  },
  {
    id: 'msg-5',
    senderId: 'user-leo',
    receiverId: 'current-user-anas',
    text: 'Btw, kamu suka topik apa nih? Aku suka bahas astrologi, karena menurutku setiap zodiak punya cerita unik.',
    timestamp: '2026-10-20T21:30:00.000Z',
    timeLabel: '21.30',
    status: 'read'
  },
  {
    id: 'msg-6',
    senderId: 'current-user-anas',
    receiverId: 'user-leo',
    text: 'Aku juga! Yuk nanti kita lanjut ngobrol yaa 🤗',
    timestamp: '2026-10-20T21:32:00.000Z',
    timeLabel: '21.32',
    status: 'read'
  },
  {
    id: 'msg-7',
    senderId: 'user-leo',
    receiverId: 'current-user-anas',
    text: 'Hahaha iyaaa, sama banget!',
    timestamp: '2026-10-20T21:45:00.000Z',
    timeLabel: '21.45',
    status: 'read'
  }
];

// Initial conversation with Sagittarius
export const INITIAL_SAGITTARIUS_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-s1',
    senderId: 'current-user-anas',
    receiverId: 'user-sagittarius',
    text: 'Halo Luna! Salam sesama penikmat langit malam 🌌',
    timestamp: '2026-10-20T20:15:00.000Z',
    timeLabel: '20.15',
    status: 'read'
  },
  {
    id: 'msg-s2',
    senderId: 'user-sagittarius',
    receiverId: 'current-user-anas',
    text: 'Hai Anas! Salam kenal yaa ✨',
    timestamp: '2026-10-20T20:20:00.000Z',
    timeLabel: '20.20',
    status: 'read'
  },
  {
    id: 'msg-s3',
    senderId: 'user-sagittarius',
    receiverId: 'current-user-anas',
    text: 'Kamu lagi ngapain?',
    timestamp: '2026-10-20T20:32:00.000Z',
    timeLabel: '20.32',
    status: 'delivered'
  }
];

export const INITIAL_TAURUS_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-t1',
    senderId: 'user-taurus',
    receiverId: 'current-user-anas',
    text: 'Aku suka cara kamu mikir... sangat kreatif dan penuh energi.',
    timestamp: '2026-10-20T19:17:00.000Z',
    timeLabel: '19.17',
    status: 'read'
  }
];

export const INITIAL_PISCES_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-p1',
    senderId: 'user-pisces',
    receiverId: 'current-user-anas',
    text: 'Hmmm, menarik banget sih sudut pandangmu tentang rasi bintang.',
    timestamp: '2026-10-20T18:03:00.000Z',
    timeLabel: '18.03',
    status: 'read'
  }
];

export const INITIAL_VIRGO_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-v1',
    senderId: 'user-virgo',
    receiverId: 'current-user-anas',
    text: 'Yuk ngobrol lebih banyak lagi!',
    timestamp: '2026-10-20T16:26:00.000Z',
    timeLabel: '16.26',
    status: 'read'
  }
];

export const INITIAL_CAPRICORN_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-c1',
    senderId: 'user-capricorn',
    receiverId: 'current-user-anas',
    text: 'Lagi dengerin lagu nih, kamu?',
    timestamp: '2026-10-20T14:11:00.000Z',
    timeLabel: '14.11',
    status: 'read'
  }
];

export const INITIAL_LIBRA_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-l1',
    senderId: 'user-libra',
    receiverId: 'current-user-anas',
    text: 'Kita cocok banget ternyata! Ramalan hari ini benar.',
    timestamp: '2026-10-20T12:30:00.000Z',
    timeLabel: '12.30',
    status: 'read'
  }
];

// Community rooms matching screenshot #7
export const COMMUNITY_ROOMS: CommunityRoom[] = [
  {
    id: 'room-leo',
    title: 'Teman Leo ♌',
    subtitle: 'Yuk sharing hal random!',
    category: 'Zodiak',
    memberCount: '1.2k',
    icon: '🦁',
    bgColor: 'from-amber-500/20 to-orange-500/10',
    rules: [
      'Saling menghargai dan suportif sesama anggota singa kosmik.',
      'Dilarang menyebarkan ujaran kebencian atau spam promosi.',
      'Berbagi cerita positif, inspirasi, dan kreativitas.'
    ],
    description: 'Ruang kumpul khusus para pemilik zodiak Leo dan pengagum energi api! Tempat bertukar cerita kepemimpinan, seni, dan gaya hidup karismatik.'
  },
  {
    id: 'room-love',
    title: 'Love & Dating 💕',
    subtitle: 'Cari teman, siapa tahu jodoh!',
    category: 'Topik',
    memberCount: '856',
    icon: '💖',
    bgColor: 'from-pink-500/20 to-rose-500/10',
    rules: [
      'Wajib menjaga etika dan sopan santun.',
      'Privasi masing-masing anggota harus dihormati.',
      'Gunakan fitur laporan jika ada perilaku yang mengganggu.'
    ],
    description: 'Mencari pasangan atau teman dekat yang cocok secara astrologi dan minat? Temukan frekuensi asmaramu di sini!'
  },
  {
    id: 'room-astro',
    title: 'Astro Talk ✨',
    subtitle: 'Bahas astrologi lebih dalam!',
    category: 'Zodiak',
    memberCount: '932',
    icon: '🔮',
    bgColor: 'from-purple-500/20 to-indigo-500/10',
    rules: [
      'Diskusi seputar transit planet, birth chart, dan filosofi astrologi.',
      'Terbuka bagi pemula maupun pemerhati astrologi berpengalaman.',
      'Gunakan bahasa yang mudah dipahami dan ramah.'
    ],
    description: 'Diskusi seru mengenai pengaruh bulan, retrograde planet, sinastri hubungan, dan rahasia 12 rasi bintang semesta.'
  },
  {
    id: 'room-daily',
    title: 'Daily Life',
    subtitle: 'Curhat, cerita, diskusi bebas!',
    category: 'Topik',
    memberCount: '1.4k',
    icon: '☕',
    bgColor: 'from-blue-500/20 to-cyan-500/10',
    rules: [
      'Jadilah pendengar yang suportif dan berempati.',
      'Hindari menghakimi curhatan orang lain.',
      'Ruang aman untuk melepas penat setelah beraktivitas.'
    ],
    description: 'Tempat aman untuk curhat harian, berbagi kabar hari ini, rekomendasi kafe, dan obrolan santai tanpa beban.'
  },
  {
    id: 'room-career',
    title: 'Zodiak & Karier',
    subtitle: 'Konsultasi karier menurut zodiak',
    category: 'Topik',
    memberCount: '620',
    icon: '💼',
    bgColor: 'from-emerald-500/20 to-teal-500/10',
    rules: [
      'Fokus pada pengembangan diri, produktivitas, dan karier.',
      'Saling berbagi peluang kolaborasi positif.',
      'Bahas kekuatan zodiak dalam dunia kerja.'
    ],
    description: 'Bagaimana memaksimalkan kekuatan elemenmu di dunia kerja? Temukan kiat manajemen waktu dan gaya kepemimpinan ideal.'
  },
  {
    id: 'room-fandom',
    title: 'Fandom & Hobby',
    subtitle: 'Film, musik, anime, dll!',
    category: 'Room',
    memberCount: '789',
    icon: '🎮',
    bgColor: 'from-violet-500/20 to-fuchsia-500/10',
    rules: [
      'Bebas berbagi antusiasme seputar hobi, musik, dan pop culture.',
      'Sertakan peringatan spoiler bila membahas film/anime baru.',
      'Ciptakan atmosfer seru dan saling merekomendasikan tontonan.'
    ],
    description: 'Komunitas pencinta anime, drakor, game, film sci-fi, dan konser musik. Temukan teman mabar dan nobar di sini!'
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    roomId: 'room-leo',
    authorName: 'Kenzo Putra',
    authorZodiac: 'Leo',
    authorAvatar: '/src/assets/images/avatar_leo_character_1792496107716.jpg',
    content: 'Ada yang ngerasa ga kalau minggu ini energi Leo lagi terdorong banget buat mulai proyek baru? Semangat semuanya! 🔥🦁',
    timestamp: '15 menit yang lalu',
    likes: 42,
    repliesCount: 18,
    isLiked: true
  },
  {
    id: 'post-2',
    roomId: 'room-leo',
    authorName: 'Anas Tyss',
    authorZodiac: 'Leo',
    authorAvatar: '/src/assets/images/avatar_anas_celestial_1792496105550.jpg',
    content: 'Bener banget! Aku lagi rajin dengerin podcast astrologi sambil bikin sketsa bintang. Hal baik beneran sedang dalam perjalanan ✨',
    timestamp: '32 menit yang lalu',
    likes: 29,
    repliesCount: 7,
    isLiked: false
  },
  {
    id: 'post-3',
    roomId: 'room-astro',
    authorName: 'Luna Maya',
    authorZodiac: 'Sagittarius',
    authorAvatar: '/src/assets/images/avatar_sagittarius_1792496106736.jpg',
    content: 'Kalian tau gak kalau perpaduan Fire Sign + Fire Sign itu bisa saling memicu ide kreatif tanpa batas? Siapa di sini yang punya sahabat sesama Api? 💫',
    timestamp: '1 jam yang lalu',
    likes: 64,
    repliesCount: 25,
    isLiked: true
  }
];
