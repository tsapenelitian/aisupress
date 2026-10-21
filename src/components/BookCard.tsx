import React from "react";
import { BukuItem, KategoriItem } from "../data/initialData";

interface BookCardProps {
  buku: BukuItem;
  kategori?: KategoriItem;
  onSelect: (buku: BukuItem) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  buku,
  kategori,
  onSelect,
}) => {
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(buku.harga);

  const coverSrc = buku.coverImage || buku.cover;

  return (
    <article
      onClick={() => onSelect(buku)}
      className="bg-white border border-slate-200 rounded-sm overflow-hidden flex flex-col cursor-pointer hover:border-slate-400"
    >
      {/* Cover Image Container (Direct Image with Zero Animation & Lazy Loading) */}
      <div className="w-full aspect-[3/4] bg-slate-900 relative overflow-hidden select-none border-b border-slate-100 flex items-center justify-center">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={`Cover buku ${buku.judul}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            onError={(e) => {
              // Resilient fallback if an external image url fails
              const target = e.currentTarget;
              target.style.display = "none";
            }}
          />
        ) : (
          <div
            className="w-full h-full flex flex-col justify-between p-4"
            style={{ backgroundColor: buku.coverBg || "#1e293b", color: "#ffffff" }}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
              {kategori?.nama || "Penerbit AISU"}
            </div>
            <div className="my-auto">
              <h4 className="text-sm font-bold leading-tight line-clamp-3 text-white">
                {buku.judul}
              </h4>
              <p className="text-[11px] text-white/80 mt-1 line-clamp-1">{buku.penulis}</p>
            </div>
            <div className="flex items-center justify-between border-t border-white/20 pt-2">
              <div className="text-[9px] text-white/70">ISBN: {buku.isbn}</div>
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xs">
                <img
                  src="https://www.aisu.or.id/aisu.png"
                  alt="AISU Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Book Metadata & Price */}
      <div className="p-3 flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Zero-pill metadata line */}
          <div className="text-[11px] text-slate-500 mb-1 flex items-center gap-1.5 flex-wrap">
            <span>{kategori?.nama || "Umum"}</span>
            <span aria-hidden="true">·</span>
            <span>{buku.jumlah_halaman} Halaman</span>
          </div>

          <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 hover:text-blue-700">
            {buku.judul}
          </h3>

          <p className="text-xs text-slate-600 mt-1 line-clamp-1">
            {buku.penulis}
          </p>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between mt-auto">
          <div className="text-sm font-bold text-blue-700 tabular-nums">
            {formattedPrice}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(buku);
            }}
            className="text-xs font-medium text-slate-700 hover:text-blue-700 bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded-sm border border-slate-200 cursor-pointer"
          >
            Detail Buku
          </button>
        </div>
      </div>
    </article>
  );
};
