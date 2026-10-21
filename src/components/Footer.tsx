import React from "react";

interface FooterProps {
  setActivePage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm mt-auto border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1: Profil Penerbit */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src="https://www.aisu.or.id/aisu.png"
              alt="AISU Logo"
              className="w-8 h-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <h3 className="text-white text-base font-bold">
              Asosiasi Informatika Sumatera Utara
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-3">
            Penerbit resmi berbadan hukum yang berfokus menerbitkan buku untuk umum
            di semua bidang ilmu pengetahuan (Komputer & Teknologi, Sains Terapan,
            Pendidikan, Ekonomi Bisnis, Hukum, dan Humaniora).
          </p>
          <div className="text-xs text-slate-500">
            Wilayah Operasional: Kab. Deli Serdang, Sumatera Utara, Indonesia
          </div>
        </div>

        {/* Kolom 2: Alamat & Kontak Resmi */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">
            Alamat Kantor & Kontak
          </h4>
          <address className="not-italic text-xs text-slate-400 leading-relaxed mb-3">
            Jl. Klambir V, Tanjung Gusta, Kec. Sunggal, Kab. Deli Serdang, Prov.
            Sumatera Utara, Indonesia
          </address>
          <div className="space-y-1.5 text-xs">
            <div>
              <span className="text-slate-500 font-medium">Email: </span>
              <a
                href="mailto:tomysatriaalasi@gmail.com"
                className="text-blue-400 hover:underline"
              >
                tomysatriaalasi@gmail.com
              </a>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Telepon / WA: </span>
              <a
                href="https://wa.me/6282168449797"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline"
              >
                +62 821-6844-9797
              </a>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Jam Pelayanan: </span>
              <span className="text-slate-300">Senin - Sabtu (08.30 - 17.00 WIB)</span>
            </div>
          </div>
        </div>

        {/* Kolom 3: Navigasi Cepat & Standar SEO */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-3">
            Navigasi Cepat & SEO
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => setActivePage("katalog")}
                className="hover:text-white cursor-pointer text-left"
              >
                Katalog Buku Lengkap
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("pengiriman")}
                className="hover:text-white cursor-pointer text-left"
              >
                Ketentuan & Ekspedisi Pengiriman
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("tentang")}
                className="hover:text-white cursor-pointer text-left"
              >
                Profil Redaksi Penerbit AISU
              </button>
            </li>
            <li>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>sitemap.xml (Dinamis untuk Google)</span>
              </a>
            </li>
            <li>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>robots.txt (Mesin Pencari)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            &copy; {new Date().getFullYear()} Penerbit Asosiasi Informatika Sumatera
            Utara. Seluruh hak cipta dilindungi.
          </div>
          <div className="text-slate-500">
            Yii2 Basic Template · Zero Animation · Kecepatan Maksimal
          </div>
        </div>
      </div>
    </footer>
  );
};
