import React from "react";
import { BukuItem, KategoriItem, PengunjungStats } from "../data/initialData";
import { BookCard } from "../components/BookCard";
import { VisitorCounter } from "../components/VisitorCounter";

interface HomePageProps {
  books: BukuItem[];
  categories: KategoriItem[];
  stats: PengunjungStats;
  onSelectBook: (book: BukuItem) => void;
  onSelectCategory: (category: KategoriItem) => void;
  onNavigateKatalog: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  books,
  categories,
  stats,
  onSelectBook,
  onSelectCategory,
  onNavigateKatalog,
}) => {
  // Highlight 8 latest books
  const latestBooks = books.slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Hero Penerbit Bersih & Cepat (Zero Animation) */}
      <section className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
            Penerbit Resmi Berstandar Nasional
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
            Penerbit Asosiasi Informatika Sumatera Utara
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            Menerbitkan buku untuk umum di semua bidang ilmu (Informatika & Ilmu Komputer,
            Kecerdasan Buatan, Sains Data, Keamanan Siber, Metodologi Riset, Ekonomi Digital,
            dan Hukum Teknologi). Resmi ber-ISBN Perpustakaan Nasional RI.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateKatalog}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-sm cursor-pointer"
            >
              Jelajahi Katalog Buku
            </button>
            <a
              href="https://wa.me/6282168449797?text=Halo%20Penerbit%20AISU,%20saya%20ingin%20konsultasi%20penerbitan%20buku"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-sm cursor-pointer"
            >
              Konsultasi Terbit Buku (WhatsApp)
            </a>
          </div>
        </div>
      </section>

      {/* Statistik Pengunjung Real-Time */}
      <VisitorCounter stats={stats} totalBooks={books.length} />

      {/* Highlight Buku Terbaru (6-8 Buku) */}
      <section aria-labelledby="latest-books-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id="latest-books-heading" className="text-lg font-bold text-slate-900">
              Buku Terbaru Terbitan AISU
            </h2>
            <p className="text-xs text-slate-500">
              Koleksi buku terbitan terkini yang telah ber-ISBN resmi
            </p>
          </div>
          <button
            onClick={onNavigateKatalog}
            className="text-xs font-semibold text-blue-700 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>Lihat Semua Katalog</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {latestBooks.map((buku) => {
            const cat = categories.find((c) => c.id === buku.kategori_id);
            return (
              <BookCard
                key={buku.id}
                buku={buku}
                kategori={cat}
                onSelect={onSelectBook}
              />
            );
          })}
        </div>
      </section>

      {/* Bidang Ilmu / Kategori Penerbitan */}
      <section className="bg-white border border-slate-200 rounded-sm p-5">
        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
          Fokus Bidang Ilmu Penerbitan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const count = books.filter((b) => b.kategori_id === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-sm text-left hover:border-blue-400 hover:bg-blue-50/30 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-slate-900">{cat.nama}</span>
                  <span className="text-[11px] text-slate-500 font-mono">{count} buku</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {cat.keterangan}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
