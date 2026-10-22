import React from 'react';
import { X, HelpCircle, Shield, Heart } from 'lucide-react';

interface FaqModalProps {
  onClose: () => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ onClose }) => {
  const faqs = [
    {
      q: 'Bagaimana cara kerja skor kecocokan zodiak di ZodiChat?',
      a: 'Skor kecocokan dihitung berdasarkan elemen astrologi (Api, Tanah, Udara, Air), polaritas tanda, dan sinastri zodiak klasik. Skor ini ditujukan untuk sarana hiburan dan jembatan percakapan santai, bukan patokan mutlak sebuah hubungan nyata.'
    },
    {
      q: 'Apakah tanggal lahir lengkap saya bisa dilihat pengguna lain?',
      a: 'Tidak. ZodiChat menerapkan prinsip privasi ketat. Pengguna lain hanya akan melihat nama panggilan, zodiak, dan elemenmu tanpa mengekspos tahun lahir secara otomatis.'
    },
    {
      q: 'Bagaimana cara melaporkan pengguna yang mengganggu?',
      a: 'Kamu dapat menekan ikon titik tiga di pojok kanan atas ruang obrolan, lalu pilih "Laporkan Pengguna" atau "Blokir Pengguna". Tim moderasi ZodiChat akan menindaklanjuti dalam waktu 24 jam.'
    },
    {
      q: 'Apa itu fitur Friendship Constellation?',
      a: 'Fitur unik ini memetakan jaringan teman-temanmu menjadi rasi bintang yang saling terhubung. Kamu dapat melihat harmoni elemen antarbintang dan membuka chat langsung dari rasi tersebut.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md max-h-[85vh] bg-[#0e1028] border border-purple-500/30 rounded-3xl p-5 overflow-y-auto space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-purple-300" />
            <h3 className="text-sm font-bold text-white">Bantuan & FAQ Semesta</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full cosmic-glass flex items-center justify-center text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
              <h4 className="text-xs font-bold text-purple-200">{f.q}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-light">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-2xl bg-purple-950/20 border border-purple-500/20 text-center">
          <p className="text-[11px] text-slate-400">
            Butuh bantuan lebih lanjut? Hubungi kami di <span className="text-purple-300 font-mono">support@zodichat.com</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
        >
          Tutup Bantuan
        </button>
      </div>
    </div>
  );
};
