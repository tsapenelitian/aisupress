import React, { useState } from "react";
import { BukuItem, KategoriItem } from "../data/initialData";
import { BookCard } from "../components/BookCard";

interface DetailPageProps {
  buku: BukuItem;
  categories: KategoriItem[];
  allBooks: BukuItem[];
  onSelectBook: (book: BukuItem) => void;
  onBack: () => void;
}

export const DetailPage: React.FC<DetailPageProps> = ({
  buku,
  categories,
  allBooks,
  onSelectBook,
  onBack,
}) => {
  const [copiedSchema, setCopiedSchema] = useState(false);
  const kategori = categories.find((c) => c.id === buku.kategori_id);

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(buku.harga);

  // Related books
  const relatedBooks = allBooks
    .filter((b) => b.kategori_id === buku.kategori_id && b.id !== buku.id)
    .slice(0, 4);

  // Schema.org Book JSON-LD
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": buku.judul,
    "headline": buku.judul,
    "url": `https://penerbit.aisu.or.id/buku/${buku.slug}`,
    "image": "https://www.aisu.or.id/aisu.png",
    "isbn": buku.isbn,
    "numberOfPages": buku.jumlah_halaman,
    "bookFormat": "https://schema.org/Paperback",
    "inLanguage": "id",
    "author": {
      "@type": "Person",
      "name": buku.penulis,
    },
    ...(buku.editor
      ? {
          "editor": {
            "@type": "Person",
            "name": buku.editor,
          },
        }
      : {}),
    "publisher": {
      "@type": "Organization",
      "name": "Asosiasi Informatika Sumatera Utara",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aisu.or.id/aisu.png",
      },
    },
    "description": buku.sinopsis,
    "offers": {
      "@type": "Offer",
      "price": buku.harga.toString(),
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "url": `https://penerbit.aisu.or.id/buku/${buku.slug}`,
      "seller": {
        "@type": "Organization",
        "name": "Asosiasi Informatika Sumatera Utara",
      },
    },
  };

  const schemaString = JSON.stringify(schemaJson, null, 2);

  const copySchemaToClipboard = () => {
    navigator.clipboard.writeText(schemaString);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
        <button onClick={onBack} className="hover:underline cursor-pointer">
          Katalog
        </button>
        <span aria-hidden="true">&raquo;</span>
        <span>{kategori?.nama || "Kategori"}</span>
        <span aria-hidden="true">&raquo;</span>
        <span className="text-slate-800 font-medium truncate max-w-xs">{buku.judul}</span>
      </nav>

      {/* Main Detail Layout */}
      <article className="bg-white border border-slate-200 rounded-sm p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Cover Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="w-full aspect-[3/4] rounded-sm overflow-hidden border border-slate-300 shadow-xs bg-slate-900 flex items-center justify-center">
            {buku.coverImage || buku.cover ? (
              <img
                src={buku.coverImage || buku.cover}
                alt={`Cover buku ${buku.judul}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col justify-between p-5"
                style={{ backgroundColor: buku.coverBg || "#1e293b", color: "#ffffff" }}
              >
                <div className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  {kategori?.nama || "Penerbit AISU"}
                </div>
                <div className="my-auto">
                  <h1 className="text-lg font-bold leading-tight text-white mb-2">{buku.judul}</h1>
                  <p className="text-xs text-white/80">{buku.penulis}</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/20 pt-2">
                  <div className="text-[10px] text-white/70">ISBN: {buku.isbn}</div>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-0.5 shadow-2xs">
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

          <div className="mt-3 text-center">
            <span className="text-[11px] text-slate-500 font-medium">
              Format: Buku Cetak (Softcover / Paperback)
            </span>
          </div>
        </div>

        {/* Technical Metadata & Content Column */}
        <div className="md:col-span-8 lg:col-span-9 flex flex-col">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            {kategori?.nama || "Kategori Umum"}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug mb-2">
            {buku.judul}
          </h2>

          <div className="text-2xl font-bold text-blue-700 tabular-nums mb-4">
            {formattedPrice}
          </div>

          {/* Technical Specifications Table */}
          <table className="w-full border-collapse border border-slate-200 text-xs mb-5">
            <tbody>
              <tr className="border-b border-slate-200">
                <th className="w-36 p-2 text-left font-semibold text-slate-600 bg-slate-50">
                  Penulis
                </th>
                <td className="p-2 text-slate-900 font-medium">{buku.penulis}</td>
              </tr>
              {buku.editor && (
                <tr className="border-b border-slate-200">
                  <th className="p-2 text-left font-semibold text-slate-600 bg-slate-50">
                    Editor / Penyunting
                  </th>
                  <td className="p-2 text-slate-800">{buku.editor}</td>
                </tr>
              )}
              <tr className="border-b border-slate-200">
                <th className="p-2 text-left font-semibold text-slate-600 bg-slate-50">
                  Nomor ISBN
                </th>
                <td className="p-2 font-mono text-slate-900 font-medium">{buku.isbn}</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="p-2 text-left font-semibold text-slate-600 bg-slate-50">
                  Jumlah Halaman
                </th>
                <td className="p-2 text-slate-800">{buku.jumlah_halaman} Halaman</td>
              </tr>
              <tr className="border-b border-slate-200">
                <th className="p-2 text-left font-semibold text-slate-600 bg-slate-50">
                  Penerbit
                </th>
                <td className="p-2 text-slate-800">
                  Asosiasi Informatika Sumatera Utara (AISU)
                </td>
              </tr>
              {buku.keterangan && (
                <tr className="border-b border-slate-200">
                  <th className="p-2 text-left font-semibold text-slate-600 bg-slate-50">
                    Keterangan
                  </th>
                  <td className="p-2 text-slate-800">{buku.keterangan}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Sinopsis */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2">
              Sinopsis Buku
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-3.5 rounded-sm border border-slate-200/80">
              {buku.sinopsis}
            </p>
          </div>

          {/* Link Pembelian: Tokopedia, Shopee, Google Book, Google Play */}
          <div className="pt-4 border-t border-slate-200">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
              Saluran Pembelian Resmi & Pemesanan:
            </h3>
            <div className="flex flex-wrap gap-2">
              {buku.link_tokopedia && (
                <a
                  href={buku.link_tokopedia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#03ac0e] hover:bg-[#02970c] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5"
                >
                  Beli di Tokopedia
                </a>
              )}

              {buku.link_shopee && (
                <a
                  href={buku.link_shopee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#ee4d2d] hover:bg-[#d73f20] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5"
                >
                  Beli di Shopee
                </a>
              )}

              {buku.link_google_book && (
                <a
                  href={buku.link_google_book}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#4285f4] hover:bg-[#3367d6] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5"
                >
                  Google Books
                </a>
              )}

              {buku.link_google_play && (
                <a
                  href={buku.link_google_play}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#01875f] hover:bg-[#01704e] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5"
                >
                  Google Play Books
                </a>
              )}

              <a
                href={`https://wa.me/6282168449797?text=Halo%20Penerbit%20AISU,%20saya%20ingin%20memesan%20buku:%20${encodeURIComponent(
                  buku.judul
                )}%20(ISBN:%20${encodeURIComponent(buku.isbn)})`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#25d366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5"
              >
                Pesan Cepat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Schema.org Book JSON-LD Inspector Box */}
      <section className="bg-white border border-slate-200 rounded-sm p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Schema.org / JSON-LD Book Markup (Google Rich Snippet)
            </h3>
            <p className="text-[11px] text-slate-500">
              Data terstruktur otomatis tertanam di &lt;head&gt; halaman ini untuk indeks Google Search
            </p>
          </div>
          <button
            onClick={copySchemaToClipboard}
            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-sm border border-slate-300 cursor-pointer"
          >
            {copiedSchema ? "Tersalin!" : "Salin JSON-LD"}
          </button>
        </div>
        <pre className="text-[10px] font-mono bg-slate-900 text-slate-100 p-3 rounded-sm overflow-x-auto max-h-48 leading-relaxed">
          {schemaString}
        </pre>
      </section>

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <section>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
            Buku Terkait dalam Bidang yang Sama
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedBooks.map((rel) => (
              <BookCard
                key={rel.id}
                buku={rel}
                kategori={kategori}
                onSelect={onSelectBook}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
