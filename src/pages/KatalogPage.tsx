import React, { useState, useMemo } from "react";
import { BukuItem, KategoriItem } from "../data/initialData";
import { BookCard } from "../components/BookCard";

interface KatalogPageProps {
  books: BukuItem[];
  categories: KategoriItem[];
  selectedCategoryId: number | null;
  onSelectCategory: (cat: KategoriItem | null) => void;
  onSelectBook: (book: BukuItem) => void;
}

export const KatalogPage: React.FC<KatalogPageProps> = ({
  books,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onSelectBook,
}) => {
  const [keyword, setKeyword] = useState("");
  const [searchBy, setSearchBy] = useState<"all" | "judul" | "penulis" | "isbn">("all");
  const [sortBy, setSortBy] = useState<"terbaru" | "harga_asc" | "harga_desc" | "judul_asc">("terbaru");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Filter & Search Logic
  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Category filter
    if (selectedCategoryId !== null) {
      result = result.filter((b) => b.kategori_id === selectedCategoryId);
    }

    // Keyword filter
    if (keyword.trim()) {
      const q = keyword.toLowerCase().trim();
      result = result.filter((b) => {
        if (searchBy === "judul") {
          return b.judul.toLowerCase().includes(q);
        }
        if (searchBy === "penulis") {
          return b.penulis.toLowerCase().includes(q);
        }
        if (searchBy === "isbn") {
          return b.isbn.toLowerCase().includes(q);
        }
        // all
        return (
          b.judul.toLowerCase().includes(q) ||
          b.penulis.toLowerCase().includes(q) ||
          b.isbn.toLowerCase().includes(q)
        );
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "harga_asc") return a.harga - b.harga;
      if (sortBy === "harga_desc") return b.harga - a.harga;
      if (sortBy === "judul_asc") return a.judul.localeCompare(b.judul);
      // default: terbaru (by id desc)
      return b.id - a.id;
    });

    return result;
  }, [books, selectedCategoryId, keyword, searchBy, sortBy]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBooks.length / pageSize) || 1;
  const paginatedBooks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredBooks.slice(start, start + pageSize);
  }, [filteredBooks, currentPage, pageSize]);

  const handleReset = () => {
    setKeyword("");
    setSearchBy("all");
    setSortBy("terbaru");
    onSelectCategory(null);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Page Title */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">Katalog Buku Penerbit</h1>
        <p className="text-xs text-slate-500">
          Temukan koleksi buku ilmiah dan umum ber-ISBN resmi dengan pencarian cepat
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-sm p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Keyword Search Input */}
          <div className="sm:col-span-5">
            <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
              Kata Kunci Pencarian
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari judul, nama penulis, atau ISBN..."
              className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-blue-600 bg-white text-slate-900"
            />
          </div>

          {/* Kolom Pencarian: Judul, Penulis, ISBN */}
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
              Cari Berdasarkan
            </label>
            <select
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-blue-600 bg-white text-slate-900"
            >
              <option value="all">Semua Kolom</option>
              <option value="judul">Judul Buku</option>
              <option value="penulis">Nama Penulis</option>
              <option value="isbn">Nomor ISBN</option>
            </select>
          </div>

          {/* Filter Kategori */}
          <div className="sm:col-span-4">
            <label className="block text-[11px] font-semibold text-slate-700 uppercase mb-1">
              Kategori Bidang Ilmu
            </label>
            <select
              value={selectedCategoryId !== null ? selectedCategoryId : ""}
              onChange={(e) => {
                const val = e.target.value ? Number(e.target.value) : null;
                const found = categories.find((c) => c.id === val) || null;
                onSelectCategory(found);
                setCurrentPage(1);
              }}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-blue-600 bg-white text-slate-900"
            >
              <option value="">Semua Kategori</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nama}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sorting and Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-semibold text-slate-700 uppercase whitespace-nowrap">
              Urutkan:
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1 text-xs border border-slate-300 rounded-sm focus:outline-none focus:border-blue-600 bg-white text-slate-900"
            >
              <option value="terbaru">Buku Terbaru</option>
              <option value="harga_asc">Harga Terendah</option>
              <option value="harga_desc">Harga Tertinggi</option>
              <option value="judul_asc">Judul A - Z</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">
              Ditemukan: <strong>{filteredBooks.length}</strong> buku
            </span>
            {(keyword || selectedCategoryId !== null || searchBy !== "all" || sortBy !== "terbaru") && (
              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-xs text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-sm cursor-pointer"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid Buku */}
      {paginatedBooks.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedBooks.map((buku) => {
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
      ) : (
        <div className="bg-white border border-slate-200 rounded-sm p-10 text-center text-slate-500">
          <p className="text-sm font-semibold mb-1 text-slate-700">
            Tidak ada buku yang sesuai dengan pencarian Anda.
          </p>
          <p className="text-xs text-slate-500 mb-4">
            Coba periksa kembali ejaan kata kunci atau ganti filter kategori.
          </p>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 bg-blue-700 text-white text-xs font-semibold rounded-sm cursor-pointer"
          >
            Tampilkan Semua Buku
          </button>
        </div>
      )}

      {/* Pagination Sederhana */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-xs border border-slate-300 rounded-sm bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &laquo; Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 text-xs border rounded-sm cursor-pointer ${
                currentPage === page
                  ? "bg-blue-700 text-white border-blue-700 font-bold"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-xs border border-slate-300 rounded-sm bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Berikutnya &raquo;
          </button>
        </div>
      )}
    </div>
  );
};
