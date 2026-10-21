import React, { useState } from "react";
import {
  BukuItem,
  KategoriItem,
  PengunjungLogItem,
  PengunjungStats,
} from "../data/initialData";
import { generateCoverDataUri } from "../utils/coverGenerator";

export interface CoverColorPreset {
  id: string;
  group: "blue" | "green" | "red" | "warm" | "dark";
  name: string;
  categoryTag: string;
  bgStart: string;
  bgEnd: string;
  accent: string;
  label: string;
}

export const COVER_COLOR_PRESETS: CoverColorPreset[] = [
  // Nuansa Biru
  { id: "navy", group: "blue", name: "Navy Classic", categoryTag: "Informatika", bgStart: "#1e3a8a", bgEnd: "#0f172a", accent: "#38bdf8", label: "Biru Laut Dalam" },
  { id: "cobalt", group: "blue", name: "Cobalt Night", categoryTag: "AI & Sains Data", bgStart: "#172554", bgEnd: "#030712", accent: "#60a5fa", label: "Kobalt Pekat" },
  { id: "ocean", group: "blue", name: "Deep Ocean", categoryTag: "Rekayasa Perangkat Lunak", bgStart: "#0369a1", bgEnd: "#082f49", accent: "#7dd3fc", label: "Samudra Biru" },
  { id: "sapphire", group: "blue", name: "Royal Sapphire", categoryTag: "Sistem Informasi", bgStart: "#1d4ed8", bgEnd: "#1e1b4b", accent: "#93c5fd", label: "Safir Kerajaan" },
  { id: "indigo", group: "blue", name: "Midnight Indigo", categoryTag: "Jaringan Komputer", bgStart: "#1e1b4b", bgEnd: "#0b092b", accent: "#818cf8", label: "Indigo Pekat" },

  // Nuansa Hijau & Teal
  { id: "teal", group: "green", name: "Emerald Teal", categoryTag: "Arsitektur Web", bgStart: "#0f766e", bgEnd: "#134e4a", accent: "#2dd4bf", label: "Teal Modern" },
  { id: "emerald", group: "green", name: "Forest Emerald", categoryTag: "Sains & Lingkungan", bgStart: "#064e3b", bgEnd: "#022c22", accent: "#34d399", label: "Zamrud Hutan" },
  { id: "sage", group: "green", name: "Dark Sage", categoryTag: "Pertanian & Bio", bgStart: "#14532d", bgEnd: "#052e16", accent: "#86efac", label: "Sage Herbal" },
  { id: "olive", group: "green", name: "Olive Moss", categoryTag: "Biologi Terapan", bgStart: "#365314", bgEnd: "#1a2e05", accent: "#bef264", label: "Zaitun Lumut" },
  { id: "cyan", group: "green", name: "Cyber Cyan", categoryTag: "Cloud Computing", bgStart: "#0e7490", bgEnd: "#083344", accent: "#22d3ee", label: "Sian Elektrik" },

  // Nuansa Merah & Ungu
  { id: "ruby", group: "red", name: "Crimson Ruby", categoryTag: "Keamanan Siber", bgStart: "#881337", bgEnd: "#4c0519", accent: "#fb7185", label: "Merah Ruby" },
  { id: "rose", group: "red", name: "Deep Rose", categoryTag: "Kriptografi", bgStart: "#831843", bgEnd: "#500724", accent: "#f472b6", label: "Rose Magenta" },
  { id: "wine", group: "red", name: "Bordeaux Wine", categoryTag: "Hukum & Etika", bgStart: "#701a75", bgEnd: "#4a044e", accent: "#f472b6", label: "Anggur Bordeaux" },
  { id: "purple", group: "red", name: "Royal Purple", categoryTag: "Sosial Humaniora", bgStart: "#581c87", bgEnd: "#3b0764", accent: "#c084fc", label: "Ungu Monarki" },
  { id: "violet", group: "red", name: "Cosmic Violet", categoryTag: "Inovasi Masa Depan", bgStart: "#4c1d95", bgEnd: "#2e1065", accent: "#a78bfa", label: "Violet Kosmik" },
  { id: "plum", group: "red", name: "Plum Berry", categoryTag: "Bahasa & Komunikasi", bgStart: "#4a154b", bgEnd: "#280729", accent: "#e879f9", label: "Plum Berry" },

  // Nuansa Oranye & Emas
  { id: "amber", group: "warm", name: "Golden Amber", categoryTag: "Pendidikan & Riset", bgStart: "#78350f", bgEnd: "#451a03", accent: "#fbbf24", label: "Kuning Kunyit Emas" },
  { id: "terracotta", group: "warm", name: "Warm Terracotta", categoryTag: "Metodologi Penelitian", bgStart: "#7c2d12", bgEnd: "#431407", accent: "#fb923c", label: "Terracotta Hangat" },
  { id: "orange", group: "warm", name: "Sunset Orange", categoryTag: "Technopreneurship", bgStart: "#9a3412", bgEnd: "#2c0b02", accent: "#fdba74", label: "Oranye Senja" },
  { id: "gold", group: "warm", name: "Imperial Gold", categoryTag: "Monograf Ilmiah", bgStart: "#713f12", bgEnd: "#3f2205", accent: "#fde047", label: "Emas Monograf" },
  { id: "cinnamon", group: "warm", name: "Burnt Cinnamon", categoryTag: "Sejarah & Filsafat", bgStart: "#5c1d11", bgEnd: "#2e0b04", accent: "#fca5a5", label: "Kayu Manis" },

  // Nuansa Arang & Gelap
  { id: "charcoal", group: "dark", name: "Titanium Charcoal", categoryTag: "Teknik Mesin & Elektro", bgStart: "#18181b", bgEnd: "#09090b", accent: "#e4e4e7", label: "Arang Titanium" },
  { id: "slate", group: "dark", name: "Graphite Slate", categoryTag: "Manajemen Proyek", bgStart: "#334155", bgEnd: "#0f172a", accent: "#cbd5e1", label: "Slate Grafit" },
  { id: "bronze", group: "dark", name: "Coffee Bronze", categoryTag: "Ekonomi Bisnis", bgStart: "#3e2723", bgEnd: "#1a0c08", accent: "#d7ccc8", label: "Cokelat Perunggu" },
];

interface AdminPageProps {
  isLoggedIn: boolean;
  onLogin: (u: string, p: string) => boolean;
  onLogout: () => void;
  books: BukuItem[];
  categories: KategoriItem[];
  stats: PengunjungStats;
  logs: PengunjungLogItem[];
  onAddBook: (book: Omit<BukuItem, "id" | "created_at" | "updated_at">) => void;
  onUpdateBook: (id: number, book: Partial<BukuItem>) => void;
  onDeleteBook: (id: number) => void;
  onAddCategory: (cat: Omit<KategoriItem, "id" | "created_at">) => void;
  onDeleteCategory: (id: number) => { success: boolean; message?: string };
}

export const AdminPage: React.FC<AdminPageProps> = ({
  isLoggedIn,
  onLogin,
  onLogout,
  books,
  categories,
  stats,
  logs,
  onAddBook,
  onUpdateBook,
  onDeleteBook,
  onAddCategory,
  onDeleteCategory,
}) => {
  // Login State
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tabs: 'dashboard' | 'buku' | 'kategori' | 'statistik'
  const [activeTab, setActiveTab] = useState<"dashboard" | "buku" | "kategori" | "statistik">(
    "dashboard"
  );

  // Cover Preset Filter State
  const [colorFilter, setColorFilter] = useState<string>("all");

  // Flash Message
  const [flashMsg, setFlashMsg] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const showFlash = (type: "success" | "error", text: string) => {
    setFlashMsg({ type, text });
    setTimeout(() => setFlashMsg(null), 3500);
  };

  // CRUD Book Modal / Form State
  const [isEditingBook, setIsEditingBook] = useState(false);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [bookForm, setBookForm] = useState({
    judul: "",
    slug: "",
    penulis: "",
    editor: "",
    jumlah_halaman: 200,
    isbn: "",
    harga: 85000,
    sinopsis: "",
    link_tokopedia: "",
    link_shopee: "",
    link_google_book: "",
    link_google_play: "",
    cover: "default.png",
    coverImage: "",
    coverBg: "#1e3a8a",
    coverAccent: "#38bdf8",
    kategori_id: 1,
    keterangan: "Edisi Pertama",
  });

  // Handler for Direct Image File Upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showFlash("error", "Berkas harus berupa gambar valid (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showFlash("error", "Ukuran berkas gambar maksimal 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setBookForm((prev) => ({
        ...prev,
        cover: file.name,
        coverImage: dataUrl,
      }));
      showFlash("success", `Cover buku "${file.name}" berhasil diunggah langsung.`);
    };
    reader.readAsDataURL(file);
  };

  // CRUD Category Form State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    nama: "",
    slug: "",
    keterangan: "",
  });

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(username, password);
    if (!ok) {
      setLoginError("Nama pengguna atau kata sandi tidak cocok. Default: admin / admin123");
    } else {
      setLoginError("");
      setPassword("");
    }
  };

  const handleOpenNewBook = () => {
    setEditBookId(null);
    setBookForm({
      judul: "",
      slug: "",
      penulis: "",
      editor: "",
      jumlah_halaman: 220,
      isbn: "978-623-98701-" + Math.floor(Math.random() * 90 + 10) + "-0",
      harga: 85000,
      sinopsis: "",
      link_tokopedia: "https://tokopedia.com/aisu-press",
      link_shopee: "https://shopee.co.id/aisu-press",
      link_google_book: "",
      link_google_play: "",
      cover: "cover.jpg",
      coverImage: "",
      coverBg: "#1e293b",
      coverAccent: "#38bdf8",
      kategori_id: categories[0]?.id || 1,
      keterangan: "Buku Terbitan Baru",
    });
    setIsEditingBook(true);
  };

  const handleOpenEditBook = (b: BukuItem) => {
    setEditBookId(b.id);
    setBookForm({
      judul: b.judul,
      slug: b.slug,
      penulis: b.penulis,
      editor: b.editor,
      jumlah_halaman: b.jumlah_halaman,
      isbn: b.isbn,
      harga: b.harga,
      sinopsis: b.sinopsis,
      link_tokopedia: b.link_tokopedia,
      link_shopee: b.link_shopee,
      link_google_book: b.link_google_book,
      link_google_play: b.link_google_play,
      cover: b.cover,
      coverImage: b.coverImage || b.cover || "",
      coverBg: b.coverBg,
      coverAccent: b.coverAccent,
      kategori_id: b.kategori_id,
      keterangan: b.keterangan,
    });
    setIsEditingBook(true);
  };

  const handleSaveBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.judul.trim() || !bookForm.penulis.trim() || !bookForm.isbn.trim()) {
      showFlash("error", "Judul, Penulis, dan ISBN wajib diisi.");
      return;
    }

    const slug =
      bookForm.slug.trim() ||
      bookForm.judul
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    const categoryItem = categories.find((c) => c.id === bookForm.kategori_id);
    const categoryName = categoryItem ? categoryItem.nama : "Penerbit AISU";

    // Auto-generate cover image if none was uploaded
    const finalCoverImage =
      bookForm.coverImage.trim() ||
      generateCoverDataUri(
        bookForm.judul,
        bookForm.penulis,
        categoryName,
        bookForm.coverBg,
        "#0f172a",
        bookForm.coverAccent
      );

    if (editBookId !== null) {
      onUpdateBook(editBookId, {
        ...bookForm,
        coverImage: finalCoverImage,
        slug,
      });
      showFlash("success", `Data buku "${bookForm.judul}" berhasil diperbarui.`);
    } else {
      onAddBook({
        ...bookForm,
        coverImage: finalCoverImage,
        slug,
      });
      showFlash("success", `Buku baru "${bookForm.judul}" berhasil ditambahkan.`);
    }

    setIsEditingBook(false);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.nama.trim()) {
      showFlash("error", "Nama kategori wajib diisi.");
      return;
    }
    const slug =
      categoryForm.slug.trim() ||
      categoryForm.nama
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

    onAddCategory({
      nama: categoryForm.nama,
      slug,
      keterangan: categoryForm.keterangan,
    });
    showFlash("success", `Kategori "${categoryForm.nama}" berhasil dibuat.`);
    setIsAddingCategory(false);
    setCategoryForm({ nama: "", slug: "", keterangan: "" });
  };

  // If NOT logged in, show Yii2 standard login form
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white border border-slate-200 rounded-sm p-6 shadow-xs">
        <div className="text-center mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            Yii2 Identity Authentication
          </div>
          <h1 className="text-xl font-bold text-slate-900">Login Administrator</h1>
          <p className="text-xs text-slate-500 mt-1">
            Masuk ke panel manajemen penerbit Asosiasi Informatika Sumatera Utara
          </p>
        </div>

        {/* Yii2 Identity default info box */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm mb-4 text-xs text-slate-600">
          <div className="font-semibold text-slate-800 mb-1">
            Kredensial Default Yii2 (Identity Bawaan):
          </div>
          <div>Username: <code className="bg-white px-1.5 py-0.5 border border-slate-200 rounded-xs font-bold">admin</code></div>
          <div>Password: <code className="bg-white px-1.5 py-0.5 border border-slate-200 rounded-xs font-bold">admin123</code></div>
        </div>

        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-sm text-xs mb-4">
            {loginError}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nama Pengguna (Username)
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-blue-700 bg-white text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Kata Sandi (Password)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password admin"
              className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-none focus:border-blue-700 bg-white text-slate-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-sm cursor-pointer mt-2"
          >
            Masuk ke Panel Administrator
          </button>
        </form>
      </div>
    );
  }

  // If LOGGED IN, show full admin dashboard and CRUDs
  return (
    <div className="space-y-6">
      {/* Top Admin Header Bar */}
      <div className="bg-white border border-slate-200 rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">
            Panel Administrator Yii2
          </span>
          <h1 className="text-lg font-bold text-slate-900">
            Penerbit Asosiasi Informatika Sumatera Utara
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">
            Login sebagai: <strong className="text-slate-800">admin</strong>
          </span>
          <button
            onClick={onLogout}
            className="px-2.5 py-1 text-xs bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-sm cursor-pointer"
          >
            Keluar (Logout)
          </button>
        </div>
      </div>

      {/* Flash Messages */}
      {flashMsg && (
        <div
          className={`p-3 rounded-sm text-xs font-medium border ${
            flashMsg.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {flashMsg.text}
        </div>
      )}

      {/* Admin Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white px-2 pt-2 gap-2 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-4 py-2 border-b-2 cursor-pointer ${
            activeTab === "dashboard"
              ? "border-blue-700 text-blue-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Dashboard Ringkasan
        </button>

        <button
          onClick={() => setActiveTab("buku")}
          className={`px-4 py-2 border-b-2 cursor-pointer ${
            activeTab === "buku"
              ? "border-blue-700 text-blue-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Kelola Buku ({books.length})
        </button>

        <button
          onClick={() => setActiveTab("kategori")}
          className={`px-4 py-2 border-b-2 cursor-pointer ${
            activeTab === "kategori"
              ? "border-blue-700 text-blue-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Kelola Kategori ({categories.length})
        </button>

        <button
          onClick={() => setActiveTab("statistik")}
          className={`px-4 py-2 border-b-2 cursor-pointer ${
            activeTab === "statistik"
              ? "border-blue-700 text-blue-700"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          Log & Statistik Pengunjung
        </button>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200 p-4 rounded-sm">
              <div className="text-2xl font-bold text-blue-700 tabular-nums">
                {books.length}
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase mt-1">
                Total Koleksi Buku
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-sm">
              <div className="text-2xl font-bold text-slate-800 tabular-nums">
                {categories.length}
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase mt-1">
                Kategori Bidang Ilmu
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-sm">
              <div className="text-2xl font-bold text-emerald-700 tabular-nums">
                {stats.hariIni}
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase mt-1">
                Hits Pengunjung Hari Ini
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-4 rounded-sm">
              <div className="text-2xl font-bold text-slate-900 tabular-nums">
                {stats.total.toLocaleString("id-ID")}
              </div>
              <div className="text-xs text-slate-500 font-medium uppercase mt-1">
                Total Kunjungan Akumulatif
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Buku Terbaru yang Terdaftar
              </h2>
              <button
                onClick={() => setActiveTab("buku")}
                className="text-xs text-blue-700 hover:underline cursor-pointer"
              >
                Kelola Semua Buku &rarr;
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-left">
                    <th className="p-2">Judul Buku</th>
                    <th className="p-2">Penulis</th>
                    <th className="p-2">ISBN</th>
                    <th className="p-2">Harga</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {books.slice(0, 5).map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-2 font-medium text-slate-900">{b.judul}</td>
                      <td className="p-2 text-slate-600">{b.penulis}</td>
                      <td className="p-2 font-mono text-slate-700">{b.isbn}</td>
                      <td className="p-2 text-blue-700 font-bold tabular-nums">
                        Rp {b.harga.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CRUD BUKU */}
      {activeTab === "buku" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Manajemen Koleksi Buku
              </h2>
              <p className="text-xs text-slate-500">
                Tambah, ubah, dan hapus data buku serta upload file cover
              </p>
            </div>
            <button
              onClick={handleOpenNewBook}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-sm cursor-pointer"
            >
              + Tambah Buku Baru
            </button>
          </div>

          {/* Book Form Modal / Section */}
          {isEditingBook && (
            <div className="bg-slate-50 border border-slate-300 rounded-sm p-5 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-sm font-bold text-slate-900">
                  {editBookId !== null ? "Edit Data Buku" : "Form Tambah Buku Baru"}
                </h3>
                <button
                  onClick={() => setIsEditingBook(false)}
                  className="text-xs text-slate-500 hover:text-slate-800 cursor-pointer"
                >
                  Tutup Form &times;
                </button>
              </div>

              <form onSubmit={handleSaveBook} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Judul Buku *
                    </label>
                    <input
                      type="text"
                      value={bookForm.judul}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, judul: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Kategori Bidang Ilmu *
                    </label>
                    <select
                      value={bookForm.kategori_id}
                      onChange={(e) =>
                        setBookForm({
                          ...bookForm,
                          kategori_id: Number(e.target.value),
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nama}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nama Penulis *
                    </label>
                    <input
                      type="text"
                      value={bookForm.penulis}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, penulis: e.target.value })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Editor / Penyunting
                    </label>
                    <input
                      type="text"
                      value={bookForm.editor}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, editor: e.target.value })
                      }
                      placeholder="Nama editor (opsional)"
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nomor ISBN *
                    </label>
                    <input
                      type="text"
                      value={bookForm.isbn}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, isbn: e.target.value })
                      }
                      placeholder="978-623-xxxxx-x-x"
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Jumlah Halaman *
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={bookForm.jumlah_halaman}
                      onChange={(e) =>
                        setBookForm({
                          ...bookForm,
                          jumlah_halaman: Number(e.target.value),
                        })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Harga (Rp) *
                    </label>
                    <input
                      type="number"
                      step={500}
                      value={bookForm.harga}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, harga: Number(e.target.value) })
                      }
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white tabular-nums"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sinopsis Buku *
                  </label>
                  <textarea
                    rows={4}
                    value={bookForm.sinopsis}
                    onChange={(e) =>
                      setBookForm({ ...bookForm, sinopsis: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Link Tokopedia
                    </label>
                    <input
                      type="url"
                      value={bookForm.link_tokopedia}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, link_tokopedia: e.target.value })
                      }
                      placeholder="https://tokopedia.com/..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Link Shopee
                    </label>
                    <input
                      type="url"
                      value={bookForm.link_shopee}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, link_shopee: e.target.value })
                      }
                      placeholder="https://shopee.co.id/..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Link Google Books
                    </label>
                    <input
                      type="url"
                      value={bookForm.link_google_book}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, link_google_book: e.target.value })
                      }
                      placeholder="https://books.google.com/..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Link Google Play Books
                    </label>
                    <input
                      type="url"
                      value={bookForm.link_google_play}
                      onChange={(e) =>
                        setBookForm({ ...bookForm, link_google_play: e.target.value })
                      }
                      placeholder="https://play.google.com/..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    />
                  </div>
                </div>

                {/* UPLOAD COVER IMAGE LANGSUNG */}
                <div className="border border-slate-300 rounded-sm p-4 bg-white space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <label className="block font-bold text-slate-800 text-xs">
                        Upload Cover Buku Langsung *
                      </label>
                      <p className="text-[11px] text-slate-500">
                        Pilih berkas gambar cover (JPG, PNG, WEBP). Gambar langsung terbaca dan tampil secara instan.
                      </p>
                    </div>
                    {bookForm.coverImage && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-medium self-start sm:self-auto">
                        Cover Siap Terbit
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start pt-1">
                    {/* Pratinjau Gambar Cover */}
                    <div className="sm:col-span-4 flex flex-col items-center">
                      <div className="w-28 sm:w-32 aspect-[3/4] bg-slate-900 border border-slate-300 rounded-sm overflow-hidden flex items-center justify-center shadow-xs">
                        {bookForm.coverImage ? (
                          <img
                            src={bookForm.coverImage}
                            alt="Pratinjau Cover Buku"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-3 text-slate-400 text-[10px]">
                            Belum ada gambar cover
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 mt-1 font-mono">
                        Rasio 3:4 Standar
                      </span>
                    </div>

                    {/* Input File & Pilihan Preset */}
                    <div className="sm:col-span-8 space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Pilih Berkas dari Komputer / Perangkat:
                        </label>
                        <input
                          type="file"
                          accept="image/png, image/jpeg, image/webp"
                          onChange={handleCoverUpload}
                          className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-blue-700 file:text-white hover:file:bg-blue-800 cursor-pointer border border-slate-300 rounded-sm bg-slate-50 p-1"
                        />
                        <div className="text-[10px] text-slate-500 mt-1">
                          Format: JPG, PNG, WEBP. Maksimal 5MB. File otomatis dikonversi dan disimpan.
                        </div>
                      </div>

                      {/* Sampel Desain Instan dengan Koleksi Warna Sangat Lengkap (24 Variasi) */}
                      <div className="pt-3 border-t border-slate-200 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <label className="block text-[11px] font-bold text-slate-800 uppercase tracking-wide">
                            Atau Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna):
                          </label>
                          <span className="text-[10px] text-slate-500">
                            Klik warna untuk langsung melihat perubahan
                          </span>
                        </div>

                        {/* Filter Kategori Warna */}
                        <div className="flex flex-wrap gap-1 text-[10px]">
                          {[
                            { key: "all", label: "Semua (24)" },
                            { key: "blue", label: "Biru & Samudra (5)" },
                            { key: "green", label: "Hijau & Teal (5)" },
                            { key: "red", label: "Merah & Ungu (6)" },
                            { key: "warm", label: "Oranye & Emas (5)" },
                            { key: "dark", label: "Arang & Gelap (3)" },
                          ].map((t) => (
                            <button
                              key={t.key}
                              type="button"
                              onClick={() => setColorFilter(t.key)}
                              className={`px-2 py-0.5 rounded-xs cursor-pointer ${
                                colorFilter === t.key
                                  ? "bg-slate-900 text-white font-bold"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              {t.label}
                            </button>
                          ))}
                        </div>

                        {/* Grid 24 Sampel Warna */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-56 overflow-y-auto pr-1 border border-slate-200 p-2 rounded-sm bg-slate-50">
                          {COVER_COLOR_PRESETS.filter(
                            (p) => colorFilter === "all" || p.group === colorFilter
                          ).map((preset) => (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                const currentCat = categories.find((c) => c.id === bookForm.kategori_id);
                                const catTag = currentCat ? currentCat.nama : preset.categoryTag;
                                const uri = generateCoverDataUri(
                                  bookForm.judul || "Judul Buku Terbitan",
                                  bookForm.penulis || "Nama Penulis",
                                  catTag,
                                  preset.bgStart,
                                  preset.bgEnd,
                                  preset.accent
                                );
                                setBookForm({
                                  ...bookForm,
                                  coverImage: uri,
                                  cover: `cover_${preset.id}.png`,
                                  coverBg: preset.bgStart,
                                  coverAccent: preset.accent,
                                });
                                showFlash("success", `Tema cover "${preset.name}" diterapkan.`);
                              }}
                              className="flex items-center gap-2 p-1.5 bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-400 rounded-xs text-left cursor-pointer group"
                            >
                              {/* Swatch Circle */}
                              <div
                                className="w-6 h-6 rounded-xs shrink-0 flex items-center justify-center border border-black/20 shadow-2xs"
                                style={{
                                  background: `linear-gradient(135deg, ${preset.bgStart}, ${preset.bgEnd})`,
                                }}
                              >
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: preset.accent }}
                                />
                              </div>
                              {/* Title & Tag */}
                              <div className="min-w-0">
                                <div className="text-[11px] font-semibold text-slate-800 truncate group-hover:text-blue-700">
                                  {preset.name}
                                </div>
                                <div className="text-[9px] text-slate-400 truncate">
                                  {preset.label}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                        {/* Kustomisasi Warna Manual (Hex Color Pickers) */}
                        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-3 bg-white p-2.5 rounded-sm border border-slate-200">
                          <span className="text-[11px] font-semibold text-slate-700">
                            Atau Atur Warna Kustom:
                          </span>
                          <div className="flex items-center gap-1.5">
                            <label className="text-[10px] text-slate-500">Latar:</label>
                            <input
                              type="color"
                              value={bookForm.coverBg || "#1e3a8a"}
                              onChange={(e) => {
                                const newBg = e.target.value;
                                setBookForm((prev) => ({
                                  ...prev,
                                  coverBg: newBg,
                                }));
                              }}
                              className="w-6 h-6 p-0 border border-slate-300 rounded cursor-pointer"
                              title="Pilih Warna Latar Belakang"
                            />
                            <span className="font-mono text-[10px] text-slate-600">
                              {bookForm.coverBg || "#1e3a8a"}
                            </span>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <label className="text-[10px] text-slate-500">Aksen:</label>
                            <input
                              type="color"
                              value={bookForm.coverAccent || "#38bdf8"}
                              onChange={(e) => {
                                const newAccent = e.target.value;
                                setBookForm((prev) => ({
                                  ...prev,
                                  coverAccent: newAccent,
                                }));
                              }}
                              className="w-6 h-6 p-0 border border-slate-300 rounded cursor-pointer"
                              title="Pilih Warna Aksen Judul / Pita"
                            />
                            <span className="font-mono text-[10px] text-slate-600">
                              {bookForm.coverAccent || "#38bdf8"}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const currentCat = categories.find((c) => c.id === bookForm.kategori_id);
                              const catTag = currentCat ? currentCat.nama : "Penerbit AISU";
                              const uri = generateCoverDataUri(
                                bookForm.judul || "Judul Buku Terbitan",
                                bookForm.penulis || "Nama Penulis",
                                catTag,
                                bookForm.coverBg || "#1e3a8a",
                                "#0f172a",
                                bookForm.coverAccent || "#38bdf8"
                              );
                              setBookForm((prev) => ({
                                ...prev,
                                coverImage: uri,
                                cover: "custom_cover.png",
                              }));
                              showFlash("success", "Kombinasi warna kustom diterapkan ke cover.");
                            }}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-semibold rounded-xs cursor-pointer ml-auto"
                          >
                            Terapkan Warna Kustom
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Keterangan Tambahan
                  </label>
                  <input
                    type="text"
                    value={bookForm.keterangan}
                    onChange={(e) =>
                      setBookForm({ ...bookForm, keterangan: e.target.value })
                    }
                    placeholder="Contoh: Edisi Revisi, Buku Ajar"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-sm cursor-pointer"
                  >
                    Simpan Buku
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingBook(false)}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-sm cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Book Table */}
          <div className="bg-white border border-slate-200 rounded-sm overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-left">
                  <th className="p-2.5 w-10">#</th>
                  <th className="p-2.5 w-16">Cover</th>
                  <th className="p-2.5">Judul & Penulis</th>
                  <th className="p-2.5">Kategori</th>
                  <th className="p-2.5">ISBN</th>
                  <th className="p-2.5">Harga</th>
                  <th className="p-2.5 text-right w-36">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {books.map((b, idx) => {
                  const cat = categories.find((c) => c.id === b.kategori_id);
                  const coverThumb = b.coverImage || b.cover;
                  return (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-2.5">
                        <div className="w-9 h-12 bg-slate-900 rounded-xs overflow-hidden border border-slate-200 flex items-center justify-center">
                          {coverThumb ? (
                            <img
                              src={coverThumb}
                              alt="Thumb"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-[8px] text-white/60">No Img</span>
                          )}
                        </div>
                      </td>
                      <td className="p-2.5">
                        <div className="font-semibold text-slate-900">{b.judul}</div>
                        <div className="text-[11px] text-slate-500">
                          Penulis: {b.penulis} {b.editor ? `| Ed: ${b.editor}` : ""}
                        </div>
                      </td>
                      <td className="p-2.5 text-slate-700">{cat?.nama || "-"}</td>
                      <td className="p-2.5 font-mono text-slate-800">{b.isbn}</td>
                      <td className="p-2.5 font-bold text-blue-700 tabular-nums">
                        Rp {b.harga.toLocaleString("id-ID")}
                      </td>
                      <td className="p-2.5 text-right">
                        <div className="inline-flex gap-1.5">
                          <button
                            onClick={() => handleOpenEditBook(b)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs border border-slate-300 cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Yakin ingin menghapus buku "${b.judul}"?`)) {
                                onDeleteBook(b.id);
                                showFlash("success", `Buku "${b.judul}" berhasil dihapus.`);
                              }
                            }}
                            className="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xs border border-red-200 cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CRUD KATEGORI */}
      {activeTab === "kategori" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Manajemen Kategori Bidang Ilmu
              </h2>
              <p className="text-xs text-slate-500">
                Kategori terhubung langsung dengan pengelompokan buku dan slug URL
              </p>
            </div>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-sm cursor-pointer"
            >
              + Tambah Kategori
            </button>
          </div>

          {isAddingCategory && (
            <div className="bg-slate-50 border border-slate-300 rounded-sm p-4 text-xs space-y-3">
              <h3 className="font-bold text-slate-900 pb-1 border-b border-slate-200">
                Tambah Kategori Baru
              </h3>
              <form onSubmit={handleSaveCategory} className="space-y-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nama Kategori *
                  </label>
                  <input
                    type="text"
                    value={categoryForm.nama}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, nama: e.target.value })
                    }
                    placeholder="Contoh: Sains Terapan & Lingkungan"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) =>
                      setCategoryForm({ ...categoryForm, slug: e.target.value })
                    }
                    placeholder="otomatis dibuat jika kosong"
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Deskripsi Kategori
                  </label>
                  <textarea
                    rows={2}
                    value={categoryForm.keterangan}
                    onChange={(e) =>
                      setCategoryForm({
                        ...categoryForm,
                        keterangan: e.target.value,
                      })
                    }
                    placeholder="Cakupan materi buku dalam kategori ini..."
                    className="w-full px-2.5 py-1.5 border border-slate-300 rounded-sm bg-white"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 bg-blue-700 text-white font-semibold rounded-sm cursor-pointer"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingCategory(false)}
                    className="px-3.5 py-1.5 bg-slate-200 text-slate-800 font-semibold rounded-sm cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-sm overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-left">
                  <th className="p-2.5 w-10">#</th>
                  <th className="p-2.5">Nama Kategori</th>
                  <th className="p-2.5">Slug URL</th>
                  <th className="p-2.5">Jumlah Buku</th>
                  <th className="p-2.5 text-right w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((c, idx) => {
                  const bookCount = books.filter((b) => b.kategori_id === c.id).length;
                  return (
                    <tr key={c.id} className="hover:bg-slate-50">
                      <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-2.5">
                        <div className="font-semibold text-slate-900">{c.nama}</div>
                        <div className="text-[11px] text-slate-500">{c.keterangan}</div>
                      </td>
                      <td className="p-2.5 font-mono text-slate-700">{c.slug}</td>
                      <td className="p-2.5 font-bold text-slate-900">{bookCount} judul</td>
                      <td className="p-2.5 text-right">
                        <button
                          onClick={() => {
                            if (confirm(`Hapus kategori "${c.nama}"?`)) {
                              const res = onDeleteCategory(c.id);
                              if (res.success) {
                                showFlash("success", `Kategori "${c.nama}" dihapus.`);
                              } else {
                                showFlash("error", res.message || "Gagal menghapus kategori.");
                              }
                            }
                          }}
                          className="px-2 py-0.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xs border border-red-200 cursor-pointer"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: STATISTIK & LOG PENGUNJUNG */}
      {activeTab === "statistik" && (
        <div className="space-y-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Statistik Kunjungan & Log Real-Time
            </h2>
            <p className="text-xs text-slate-500">
              Catatan audit IP address, halaman yang diakses, peramban, dan rujukan pengunjung
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm text-center">
              <div className="text-xl font-bold text-blue-700 tabular-nums">
                {stats.hariIni}
              </div>
              <div className="text-[10px] text-slate-500 uppercase mt-0.5">Hari Ini</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm text-center">
              <div className="text-xl font-bold text-blue-700 tabular-nums">
                {stats.mingguIni}
              </div>
              <div className="text-[10px] text-slate-500 uppercase mt-0.5">Minggu Ini</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm text-center">
              <div className="text-xl font-bold text-blue-700 tabular-nums">
                {stats.bulanIni}
              </div>
              <div className="text-[10px] text-slate-500 uppercase mt-0.5">Bulan Ini</div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-sm text-center">
              <div className="text-xl font-bold text-slate-900 tabular-nums">
                {stats.total.toLocaleString("id-ID")}
              </div>
              <div className="text-[10px] text-slate-500 uppercase mt-0.5">Total Hits</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-sm overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-left">
                  <th className="p-2.5 w-36">Waktu Kunjungan</th>
                  <th className="p-2.5 w-32">IP Address</th>
                  <th className="p-2.5">Halaman yang Diakses</th>
                  <th className="p-2.5">Peramban (User-Agent)</th>
                  <th className="p-2.5">Sumber Rujukan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-2.5 text-slate-500 whitespace-nowrap">{log.visited_at}</td>
                    <td className="p-2.5 text-slate-800">{log.ip_address}</td>
                    <td className="p-2.5 text-blue-700 font-sans font-medium">{log.url_visited}</td>
                    <td className="p-2.5 text-slate-500 truncate max-w-xs font-sans" title={log.user_agent}>
                      {log.user_agent}
                    </td>
                    <td className="p-2.5 text-slate-600 font-sans">{log.referer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
