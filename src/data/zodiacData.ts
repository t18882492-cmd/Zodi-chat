import { ZodiacSignInfo, ZodiacSignName, DailyHoroscope, CompatibilityResult } from '../types/astrology';

export const ZODIAC_SIGNS: Record<ZodiacSignName, ZodiacSignInfo> = {
  Aries: {
    name: 'Aries',
    nameId: 'Aries',
    symbol: '♈',
    glyph: '♈',
    period: '21 Maret – 19 April',
    periodShort: '21 Mar – 19 Apr',
    element: 'Api',
    elementDescription: 'Penuh inisiatif, berani, antusias dan dinamis.',
    rulingPlanet: 'Mars',
    rulingPlanetDescription: 'Keberanian, dorongan, dan aksi nyata.',
    traits: ['Pemberani', 'Spontan', 'Optimis', 'Kompetitif'],
    bestMatches: ['Leo', 'Sagittarius', 'Gemini'],
    strengths: ['Kepemimpinan alami', 'Pantang menyerah', 'Cepat bertindak'],
    weaknesses: ['Cepat bosan', 'Impulsif'],
    color: '#ef4444',
    accentBg: 'rgba(239, 68, 68, 0.15)',
    quote: 'Langkah pertama selalu membutuhkan keberanian api sejati.'
  },
  Taurus: {
    name: 'Taurus',
    nameId: 'Taurus',
    symbol: '♉',
    glyph: '♉',
    period: '20 April – 20 Mei',
    periodShort: '20 Apr – 20 Mei',
    element: 'Tanah',
    elementDescription: 'Stabil, penuh kesabaran, setia, dan menghargai keindahan.',
    rulingPlanet: 'Venus',
    rulingPlanetDescription: 'Cinta, keindahan seni, dan kehangatan hati.',
    traits: ['Setia', 'Penyabar', 'Realistis', 'Tulus'],
    bestMatches: ['Virgo', 'Capricorn', 'Cancer'],
    strengths: ['Dapat diandalkan', 'Pekerja keras', 'Ketenangan luar biasa'],
    weaknesses: ['Keras kepala', 'Enggan keluar dari zona nyaman'],
    color: '#10b981',
    accentBg: 'rgba(16, 185, 129, 0.15)',
    quote: 'Ketenangan adalah bentuk kekuatan tertinggi.'
  },
  Gemini: {
    name: 'Gemini',
    nameId: 'Gemini',
    symbol: '♊',
    glyph: '♊',
    period: '21 Mei – 20 Juni',
    periodShort: '21 Mei – 20 Jun',
    element: 'Udara',
    elementDescription: 'Cerdas, komunikatif, fleksibel, dan memiliki rasa ingin tahu tinggi.',
    rulingPlanet: 'Merkurius',
    rulingPlanetDescription: 'Komunikasi, pertukaran ide, dan kelincahan berpikir.',
    traits: ['Komunikatif', 'Cerdas', 'Humoris', 'Adaptif'],
    bestMatches: ['Libra', 'Aquarius', 'Aries'],
    strengths: ['Mudah bergaul', 'Pemikiran cepat', 'Selalu berenergi'],
    weaknesses: ['Sering bimbang', 'Perhatian mudah terbagi'],
    color: '#38bdf8',
    accentBg: 'rgba(56, 189, 248, 0.15)',
    quote: 'Obrolan yang menyenangkan bisa membuka pintu semesta baru.'
  },
  Cancer: {
    name: 'Cancer',
    nameId: 'Cancer',
    symbol: '♋',
    glyph: '♋',
    period: '21 Juni – 22 Juli',
    periodShort: '21 Jun – 22 Jul',
    element: 'Air',
    elementDescription: 'Penuh empati, intuitif, penyayang, dan protektif terhadap orang tersayang.',
    rulingPlanet: 'Bulan',
    rulingPlanetDescription: 'Emosi mendalam, naluri batin, dan kehangatan rumah.',
    traits: ['Penyayang', 'Empati Tinggi', 'Intuitif', 'Pelindung'],
    bestMatches: ['Scorpio', 'Pisces', 'Taurus'],
    strengths: ['Pendengar yang baik', 'Ketulusan kasih', 'Imajinasi kaya'],
    weaknesses: ['Terlalu sensitif', 'Mudah overthinking'],
    color: '#818cf8',
    accentBg: 'rgba(129, 140, 248, 0.15)',
    quote: 'Hati yang peka mampu merasakan keajaiban yang tak terucap.'
  },
  Leo: {
    name: 'Leo',
    nameId: 'Leo',
    symbol: '♌',
    glyph: '♌',
    period: '23 Juli – 22 Agustus',
    periodShort: '23 Jul – 22 Ags',
    element: 'Api',
    elementDescription: 'Semangat, energi, antusiasme, karismatik dan berjiwa pelindung.',
    rulingPlanet: 'Matahari',
    rulingPlanetDescription: 'Kekuatan, kepercayaan diri, dan cahaya kehidupan.',
    traits: ['Percaya Diri', 'Setia', 'Kreatif', 'Pemimpin'],
    bestMatches: ['Aries', 'Sagittarius', 'Gemini'],
    strengths: ['Karismatik', 'Murah hati', 'Selalu setia kawan'],
    weaknesses: ['Haus validasi', 'Terkadang mendominasi'],
    color: '#f59e0b',
    accentBg: 'rgba(245, 158, 11, 0.15)',
    quote: 'Hal baik sedang dalam perjalanan. Tetaplah percaya pada prosesnya.'
  },
  Virgo: {
    name: 'Virgo',
    nameId: 'Virgo',
    symbol: '♍',
    glyph: '♍',
    period: '23 Agustus – 22 September',
    periodShort: '23 Ags – 22 Sep',
    element: 'Tanah',
    elementDescription: 'Detail, metodis, tulus membantu, dan berpikiran tajam.',
    rulingPlanet: 'Merkurius',
    rulingPlanetDescription: 'Analisis mendalam, ketepatan, dan keahlian praktis.',
    traits: ['Perfeksionis', 'Teliti', 'Bijaksana', 'Suka Membantu'],
    bestMatches: ['Taurus', 'Capricorn', 'Cancer'],
    strengths: ['Pemecah masalah handal', 'Disiplin', 'Pengamat cermat'],
    weaknesses: ['Terlalu kritis pada diri sendiri', 'Cemas berlebih'],
    color: '#14b8a6',
    accentBg: 'rgba(20, 184, 166, 0.15)',
    quote: 'Keindahan sejati sering ditemukan dalam hal-hal kecil yang teratur.'
  },
  Libra: {
    name: 'Libra',
    nameId: 'Libra',
    symbol: '♎',
    glyph: '♎',
    period: '23 September – 22 Oktober',
    periodShort: '23 Sep – 22 Okt',
    element: 'Udara',
    elementDescription: 'Harmonis, diplomatis, adil, dan mencintai estetika keindahan.',
    rulingPlanet: 'Venus',
    rulingPlanetDescription: 'Keharmonisan, hubungan manis, dan apresiasi seni.',
    traits: ['Diplomatis', 'Menawan', 'Pecinta Damai', 'Adil'],
    bestMatches: ['Gemini', 'Aquarius', 'Leo'],
    strengths: ['Penengah ulung', 'Empati sosial', 'Sopan santun alami'],
    weaknesses: ['Sulit menentukan pilihan', 'Takut konfrontasi'],
    color: '#ec4899',
    accentBg: 'rgba(236, 72, 153, 0.15)',
    quote: 'Keseimbangan dalam hubungan adalah seni mendengarkan tanpa menghakimi.'
  },
  Scorpio: {
    name: 'Scorpio',
    nameId: 'Scorpio',
    symbol: '♏',
    glyph: '♏',
    period: '23 Oktober – 21 November',
    periodShort: '23 Okt – 21 Nov',
    element: 'Air',
    elementDescription: 'Intens, misterius, berdedikasi tinggi, dan sangat loyal.',
    rulingPlanet: 'Pluto',
    rulingPlanetDescription: 'Transformasi batin, kedalaman jiwa, dan ketahanan batin.',
    traits: ['Penuh Gairah', 'Misterius', 'Setia Mati', 'Intuitif'],
    bestMatches: ['Cancer', 'Pisces', 'Virgo'],
    strengths: ['Fokus membara', 'Daya tarik kuat', 'Sangat jujur'],
    weaknesses: ['Mudah curiga', 'Sulit memaafkan luka'],
    color: '#a855f7',
    accentBg: 'rgba(168, 85, 247, 0.15)',
    quote: 'Kedalaman koneksi hanya bisa dicapai bila kedua hati berani terbuka.'
  },
  Sagittarius: {
    name: 'Sagittarius',
    nameId: 'Sagitarius',
    symbol: '♐',
    glyph: '♐',
    period: '22 November – 21 Desember',
    periodShort: '22 Nov – 21 Des',
    element: 'Api',
    elementDescription: 'Bebas, berjiwa petualang, optimis, dan berpikiran terbuka luas.',
    rulingPlanet: 'Jupiter',
    rulingPlanetDescription: 'Keberuntungan, ekspansi ilmu, dan kebijaksanaan hidup.',
    traits: ['Petualang', 'Jujur', 'Filosofis', 'Bebas'],
    bestMatches: ['Aries', 'Leo', 'Aquarius'],
    strengths: ['Berjiwa besar', 'Menyenangkan', 'Selalu optimis'],
    weaknesses: ['Terlalu blak-blakan', 'Suka gelisah tanpa rencana'],
    color: '#c084fc',
    accentBg: 'rgba(192, 132, 252, 0.15)',
    quote: 'Semesta adalah bentangan luas yang selalu memanggil untuk dijelajahi.'
  },
  Capricorn: {
    name: 'Capricorn',
    nameId: 'Capricorn',
    symbol: '♑',
    glyph: '♑',
    period: '22 Desember – 19 Januari',
    periodShort: '22 Des – 19 Jan',
    element: 'Tanah',
    elementDescription: 'Ambisius, bertanggung jawab, teguh, dan memiliki visi jangka panjang.',
    rulingPlanet: 'Saturnus',
    rulingPlanetDescription: 'Struktur, ketekunan, dan buah manis dari kerja keras.',
    traits: ['Ambisius', 'Bertanggung Jawab', 'Teguh', 'Realistis'],
    bestMatches: ['Taurus', 'Virgo', 'Scorpio'],
    strengths: ['Pekerja ulet', 'Sangat setia kawan', 'Penyusun strategi'],
    weaknesses: ['Cenderung kaku', 'Sering memendam lelah sendiri'],
    color: '#64748b',
    accentBg: 'rgba(100, 116, 139, 0.15)',
    quote: 'Puncak tertinggi dicapai bukan dengan terburu-buru, melainkan konsistensi.'
  },
  Aquarius: {
    name: 'Aquarius',
    nameId: 'Aquarius',
    symbol: '♒',
    glyph: '♒',
    period: '20 Januari – 18 Februari',
    periodShort: '20 Jan – 18 Feb',
    element: 'Udara',
    elementDescription: 'Visioner, independen, berpikiran unik, dan berjiwa kemanusiaan.',
    rulingPlanet: 'Uranus',
    rulingPlanetDescription: 'Inovasi, kebebasan berpikir, dan terobosan orisinal.',
    traits: ['Inovatif', 'Mandiri', 'Unik', 'Sosial'],
    bestMatches: ['Gemini', 'Libra', 'Sagittarius'],
    strengths: ['Kreatif luar kotak', 'Toleran', 'Teman ngobrol yang seru'],
    weaknesses: ['Emosionalnya sukar ditebak', 'Cenderung menyendiri'],
    color: '#06b6d4',
    accentBg: 'rgba(6, 182, 212, 0.15)',
    quote: 'Keunikanmu adalah bintang pemandu yang tidak boleh kamu redupkan.'
  },
  Pisces: {
    name: 'Pisces',
    nameId: 'Pisces',
    symbol: '♓',
    glyph: '♓',
    period: '19 Februari – 20 Maret',
    periodShort: '19 Feb – 20 Mar',
    element: 'Air',
    elementDescription: 'Penuh imajinasi, peka, penuh kasih, dan berjiwa artistik.',
    rulingPlanet: 'Neptunus',
    rulingPlanetDescription: 'Mimpi, intuisi spiritual, dan keajaiban seni.',
    traits: ['Penyayang', 'Artistik', 'Mimpi Besar', 'Penuh Pengertian'],
    bestMatches: ['Cancer', 'Scorpio', 'Taurus'],
    strengths: ['Kreativitas puitis', 'Empati mendalam', 'Selalu mendukung teman'],
    weaknesses: ['Sering melarikan diri ke lamunan', 'Mudah terpengaruh suasana'],
    color: '#3b82f6',
    accentBg: 'rgba(59, 130, 246, 0.15)',
    quote: 'Ketika jiwa berbisik dengan ketulusan, semesta akan membukakan jalan.'
  }
};

export const ZODIAC_LIST = Object.values(ZODIAC_SIGNS);

// Daily Horoscopes for all signs
export const DAILY_HOROSCOPES: Record<ZodiacSignName, DailyHoroscope> = {
  Leo: {
    sign: 'Leo',
    overview: 'Hal baik sedang dalam perjalanan. Tetaplah percaya pada prosesnya dan pancarkan karisma hangatmu.',
    love: 'Komunikasi manis terbuka lebar malam ini. Sambut obrolan dengan seseorang yang punya elemen api atau udara.',
    career: 'Ide kreatifmu mendapat apresiasi. Jangan ragu memimpin diskusi dengan penuh rasa percaya diri.',
    energyScore: 94,
    luckyColor: 'Emas Hangat & Lilac Neon',
    luckyNumber: 7,
    quote: '“Semesta selalu punya cara untuk mempertemukan jiwa yang sefrekuensi.”'
  },
  Sagittarius: {
    sign: 'Sagittarius',
    overview: 'Petualangan baru sudah di depan mata. Suasana hati cerah membuka peluang persahabatan tak terduga.',
    love: 'Obrolan santai tentang mimpi dan perjalanan bisa memicu percikan chemistry yang kuat.',
    career: 'Optimisme tinggi membawa solusi cepat pada tantangan yang sempat tertunda.',
    energyScore: 91,
    luckyColor: 'Ungu Kosmik & Biru Malam',
    luckyNumber: 9,
    quote: '“Jadilah penjelajah bintang yang selalu berani melangkah lebih jauh.”'
  },
  Aries: {
    sign: 'Aries',
    overview: 'Energi awal pekan ini sangat membakar semangat. Tindakan beranimu akan memberi hasil manis.',
    love: 'Ketulusanmu yang spontan memikat perhatian teman ngobrol barumu.',
    career: 'Proyek baru menanti eksekusi cepat. Percaya diri dengan instingmu.',
    energyScore: 88,
    luckyColor: 'Merah Ruby',
    luckyNumber: 1,
    quote: '“Langkah pertama hari ini adalah fondasi kejayaan esok hari.”'
  },
  Taurus: {
    sign: 'Taurus',
    overview: 'Ketenangan adalah sahabat terbaikmu hari ini. Nikmati momen santai sambil bertukar kabar.',
    love: 'Percakapan yang mendalam dan hangat membuatmu merasa aman dan dimengerti.',
    career: 'Ketekunan membuahkan hasil nyata. Pengeluaran terjaga dengan baik.',
    energyScore: 85,
    luckyColor: 'Hijau Zamrud',
    luckyNumber: 4,
    quote: '“Kebaikan yang tenang berbicara lebih lantang daripada gemuruh.”'
  },
  Gemini: {
    sign: 'Gemini',
    overview: 'Pikiranmu sangat aktif dan penuh humor cerdas. Sangat cocok untuk berkenalan di komunitas!',
    love: 'Banyak teman baru tertarik dengan gayamu yang asyik diajak berdiskusi berbagai topik.',
    career: 'Kemampuan multitask membantumu menyelesaikan tugas dengan santai.',
    energyScore: 89,
    luckyColor: 'Kuning Mentari',
    luckyNumber: 5,
    quote: '“Dunia ini penuh teka-teki yang menyenangkan untuk kita bicarakan.”'
  },
  Cancer: {
    sign: 'Cancer',
    overview: 'Nalurimu sangat tajam hari ini. Kehangatan hatimu memberikan kenyamanan bagi orang di sekitarmu.',
    love: 'Seseorang mengagumi caramu memperhatikan hal-hal detail dalam obrolan.',
    career: 'Lingkungan kerja atau belajar terasa lebih suportif jika kamu membuka komunikasi.',
    energyScore: 87,
    luckyColor: 'Perak Bulan',
    luckyNumber: 2,
    quote: '“Rasa sayang yang tulus tak pernah kehilangan arah kembali.”'
  },
  Virgo: {
    sign: 'Virgo',
    overview: 'Semua potongan puzzle mulai tersusun rapi. Beri apresiasi pada dirimu sendiri.',
    love: 'Obrolan intelektual tentang hal-hal praktis ternyata bisa sangat romantis bila frekuensinya pas.',
    career: 'Keahlian analitismu membantu memecahkan kebuntuan tim.',
    energyScore: 86,
    luckyColor: 'Biru Toska',
    luckyNumber: 6,
    quote: '“Kerapian pikiran melahirkan ketenangan dalam mengambil keputusan.”'
  },
  Libra: {
    sign: 'Libra',
    overview: 'Aura pesonamu sedang bersinar terang. Keharmonisan menyelimuti setiap percakapan.',
    love: 'Hari yang tepat untuk mencairkan suasana dan mengirim sapaan pertama pada gebetan atau teman baru.',
    career: 'Kerja sama yang seimbang menghasilkan karya seni atau solusi yang memuaskan.',
    energyScore: 90,
    luckyColor: 'Merah Muda Pastel',
    luckyNumber: 8,
    quote: '“Keharmonisan dimulai saat kita menerima perbedaan dengan senyuman.”'
  },
  Scorpio: {
    sign: 'Scorpio',
    overview: 'Daya tarik misteriusmu memikat rasa ingin tahu banyak orang. Dengarkan bisikan intuisimu.',
    love: 'Koneksi emosional mendalam terasa begitu nyata saat membahas topik-topik filosofis.',
    career: 'Fokusmu yang tidak tergoyahkan menjamin target tercapai lebih awal.',
    energyScore: 93,
    luckyColor: 'Marun Nebula',
    luckyNumber: 11,
    quote: '“Kejujuran jiwa adalah kompas sejati dalam mengarungi samudra semesta.”'
  },
  Capricorn: {
    sign: 'Capricorn',
    overview: 'Rencanamu berjalan mantap di jalurnya. Luangkan waktu untuk ngobrol santai melepas penat.',
    love: 'Teman setia yang selalu hadir di saat suka maupun duka adalah permata paling berharga.',
    career: 'Konsistensimu diakui. Ada kabar baik tentang kesempatan baru.',
    energyScore: 84,
    luckyColor: 'Abu Karbon',
    luckyNumber: 10,
    quote: '“Bintang yang bersinar paling kokoh adalah bintang yang tidak silau oleh puji-pujian.”'
  },
  Aquarius: {
    sign: 'Aquarius',
    overview: 'Ide-ide orisinal bermunculan bagai komet. Bagikan ke komunitas untuk melihat reaksi seru mereka!',
    love: 'Kamu paling nyaman dengan teman ngobrol yang tidak mengekang dan menghargai keunikanmu.',
    career: 'Inovasi yang kamu cetuskan membawa kesegaran baru bagi proyek yang sedang dijalani.',
    energyScore: 92,
    luckyColor: 'Cyan Elektrik',
    luckyNumber: 13,
    quote: '“Jadilah dirimu sendiri; semesta mencintai keaslian bukan tiruan.”'
  },
  Pisces: {
    sign: 'Pisces',
    overview: 'Kreativitasmu meluap dengan lembut. Dengarkan musik favorit atau jelajahi ruang obrolan astrologi.',
    love: 'Saling bertukar lagu atau rekomendasi film bisa menjadi jembatan chemistry yang hangat.',
    career: 'Empatimu memudahkanmu merangkul rekan kerja atau teman belajar.',
    energyScore: 88,
    luckyColor: 'Biru Samudra',
    luckyNumber: 12,
    quote: '“Di dalam hati yang tenang, mimpi-mimpi indah menemukan wujud nyatanya.”'
  }
};

// Compatibility Matrix generator
export function getZodiacCompatibility(
  sign1: ZodiacSignName,
  sign2: ZodiacSignName,
  category: 'Pasangan' | 'Persahabatan' | 'Lawan Jenis' = 'Pasangan'
): CompatibilityResult {
  const z1 = ZODIAC_SIGNS[sign1];
  const z2 = ZODIAC_SIGNS[sign2];

  // Specific custom highlights
  if ((sign1 === 'Leo' && sign2 === 'Sagittarius') || (sign1 === 'Sagittarius' && sign2 === 'Leo')) {
    return {
      sign1,
      sign2,
      score: 92,
      category,
      status: 'Sangat Cocok!',
      description: 'Keduanya sama-sama suka petualangan, energi positif, dan saling mendukung impian masing-masing. Api bertemu api menciptakan kehangatan yang menginspirasi banyak orang.',
      communicationTip: 'Jaga keterbukaan dan jangan biarkan ego menutupi rasa saling menghargai.',
      elementDynamic: 'Dua Tanda Api (Fire Sign) yang menyala harmonis penuh semangat.'
    };
  }

  if ((sign1 === 'Leo' && sign2 === 'Aries') || (sign1 === 'Aries' && sign2 === 'Leo')) {
    return {
      sign1,
      sign2,
      score: 95,
      category,
      status: 'Koneksi Kosmik Terbaik!',
      description: 'Chemistry instan! Hubungan penuh semangat, gairah, dan keberanian. Keduanya saling memicu inspirasi untuk mencapai potensi tertinggi.',
      communicationTip: 'Berikan apresiasi tulus satu sama lain dan bergantian mengambil kendali.',
      elementDynamic: 'Harmoni Api sejati yang penuh vitalitas dan kejayaan.'
    };
  }

  if ((sign1 === 'Taurus' && sign2 === 'Virgo') || (sign1 === 'Virgo' && sign2 === 'Taurus')) {
    return {
      sign1,
      sign2,
      score: 94,
      category,
      status: 'Pasangan Sangat Selaras',
      description: 'Koneksi yang dibangun atas dasar saling percaya, kesabaran, dan visi masa depan yang jelas. Saling menenangkan di kala badai.',
      communicationTip: 'Nikmati obrolan santai dan luangkan waktu menikmati kuliner atau seni bersama.',
      elementDynamic: 'Dua Tanda Tanah (Earth Sign) yang kokoh, stabil, dan langgeng.'
    };
  }

  if ((sign1 === 'Cancer' && sign2 === 'Pisces') || (sign1 === 'Pisces' && sign2 === 'Cancer')) {
    return {
      sign1,
      sign2,
      score: 96,
      category,
      status: 'Jiwa Kembar Spiritual',
      description: 'Ikatan batin yang sangat mendalam dan penuh empati. Tanpa banyak bicara, kalian berdua bisa saling memahami perasaan masing-masing.',
      communicationTip: 'Saling membuka hati dan jangan takut membagikan mimpi-mimpi terdalam.',
      elementDynamic: 'Dua Tanda Air (Water Sign) yang mengalir lembut penuh cinta dan intuisi.'
    };
  }

  if ((sign1 === 'Gemini' && sign2 === 'Libra') || (sign1 === 'Libra' && sign2 === 'Gemini')) {
    return {
      sign1,
      sign2,
      score: 93,
      category,
      status: 'Duet Intelektual Menyenangkan',
      description: 'Obrolan tidak pernah habis! Dari pembahasan filsafat, tren terkini, hingga lelucon receh, kalian selalu nyambung dan saling menghibur.',
      communicationTip: 'Jadwalkan kencan obrolan rutin atau bergabung di proyek komunitas bersama.',
      elementDynamic: 'Dua Tanda Udara (Air Sign) yang ringan, cerdas, dan memesona.'
    };
  }

  // Same sign
  if (sign1 === sign2) {
    return {
      sign1,
      sign2,
      score: 88,
      category,
      status: 'Cermin Jiwa',
      description: `Kalian berdua memiliki sifat dasar ${z1.traits.join(', ')}. Karena memiliki kesamaan yang banyak, kalian sangat cepat mengerti kebiasaan satu sama lain.`,
      communicationTip: 'Pahami bahwa kalian punya kelemahan serupa, jadikan itu ruang untuk saling memaklumi.',
      elementDynamic: `Elemen sejenis (${z1.element}) yang sangat familiar dan nyaman.`
    };
  }

  // Cross element rules
  const isFire = (e: string) => e === 'Api';
  const isAir = (e: string) => e === 'Udara';
  const isEarth = (e: string) => e === 'Tanah';
  const isWater = (e: string) => e === 'Air';

  let score = 80;
  let status = 'Cukup Cocok';
  let description = 'Kombinasi yang menarik dan saling melengkapi perspektif masing-masing.';

  if ((isFire(z1.element) && isAir(z2.element)) || (isAir(z1.element) && isFire(z2.element))) {
    score = 89;
    status = 'Saling Menghidupkan!';
    description = 'Udara mengipasi Api hingga berkobar indah! Obrolan kalian seru, penuh tawa, dan saling memicu ide-ide gila yang menyenangkan.';
  } else if ((isEarth(z1.element) && isWater(z2.element)) || (isWater(z1.element) && isEarth(z2.element))) {
    score = 90;
    status = 'Subur & Penuh Kasih';
    description = 'Air menyirami Tanah, menumbuhkan bunga-bunga kebaikan. Hubungan yang tenang, suportif, dan memberi rasa aman bagi keduanya.';
  } else if (z1.element === z2.element) {
    score = 86;
    status = 'Harmoni Alami';
    description = `Satu elemen ${z1.element} membuat ritme kehidupan dan cara pandang kalian selaras sejak awal perjumpaan.`;
  } else {
    score = 75;
    status = 'Saling Melengkapi';
    description = 'Perbedaan karakter justru membuat hubungan ini berwarna. Banyak hal baru yang bisa saling dipelajari satu sama lain.';
  }

  return {
    sign1,
    sign2,
    score,
    category,
    status,
    description,
    communicationTip: 'Fokus pada kesamaan minat dan dengarkan sudut pandang masing-masing dengan hati terbuka.',
    elementDynamic: `Dinamika ${z1.element} dan ${z2.element} yang unik.`
  };
}

// Daily Cosmic Question of the day
export const COSMIC_QUESTIONS = [
  'Jika zodiakmu bisa memberimu satu kekuatan kosmik hari ini, apa yang ingin kamu lakukan?',
  'Topik apa yang selalu membuatmu bersemangat ngobrol sampai lupa waktu?',
  'Apakah kamu lebih percaya pada takdir semesta atau usaha keras dalam mencari teman?',
  'Apa sifat zodiakmu yang paling sering orang lain salah pahamkan?',
  'Jika kamu bisa stargazing di tempat mana saja di dunia malam ini, kamu ingin mengajak siapa?'
];

// Mood of the Moon definitions
export interface MoonMood {
  phase: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
}

export const MOON_MOODS: MoonMood[] = [
  {
    phase: 'Bulan Sabit',
    name: 'Tenang & Berpikir',
    description: 'Energi lembut untuk merenung dan mencari kedamaian batin.',
    icon: '🌙',
    accent: '#a78bfa'
  },
  {
    phase: 'Bulan Purnama',
    name: 'Penuh Gairah & Semangat',
    description: 'Puncak energi kosmik! Waktu terbaik untuk mengobrol dan berkenalan.',
    icon: '🌕',
    accent: '#fbbf24'
  },
  {
    phase: 'Bulan Perbani',
    name: 'Kreatif & Terbuka',
    description: 'Pikiran mengalir lancar, siap menyambut koneksi-koneksi baru.',
    icon: '🌓',
    accent: '#38bdf8'
  },
  {
    phase: 'Bulan Baru',
    name: 'Awal Baru yang Segar',
    description: 'Membuka lembaran baru, menyapa orang baru dengan tulus.',
    icon: '🌑',
    accent: '#ec4899'
  }
];

// Daily Inspiration Cards
export interface CosmicCard {
  id: string;
  title: string;
  signSymbol: string;
  message: string;
  author: string;
  category: string;
}

export const COSMIC_CARDS: CosmicCard[] = [
  {
    id: 'card-1',
    title: 'Koneksi Jiwa',
    signSymbol: '✨',
    message: 'Semesta selalu punya cara untuk mempertemukan jiwa yang sefrekuensi di waktu yang paling tepat.',
    author: 'ZodiChat Wisdom',
    category: 'Persahabatan'
  },
  {
    id: 'card-2',
    title: 'Keberanian Api',
    signSymbol: '🔥',
    message: 'Katakan apa yang ada di hatimu. Kejujuran yang lembut selalu meluluhkan keraguan.',
    author: 'Astro Harmony',
    category: 'Asmara'
  },
  {
    id: 'card-3',
    title: 'Ketenangan Kosmik',
    signSymbol: '🌌',
    message: 'Tidak perlu terburu-buru. Bintang tidak saling bersaing, mereka bersinar bersama menghias malam.',
    author: 'Galactic Mind',
    category: 'Inspirasi'
  }
];
