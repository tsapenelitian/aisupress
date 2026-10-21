import { generateCoverDataUri } from "../utils/coverGenerator";

export interface KategoriItem {
  id: number;
  nama: string;
  slug: string;
  keterangan: string;
  created_at: string;
}

export interface BukuItem {
  id: number;
  judul: string;
  slug: string;
  penulis: string;
  editor: string;
  jumlah_halaman: number;
  isbn: string;
  harga: number;
  sinopsis: string;
  link_tokopedia: string;
  link_shopee: string;
  link_google_book: string;
  link_google_play: string;
  cover: string;
  coverImage?: string; // Direct uploaded image data URL or SVG data URI
  coverBg: string;
  coverAccent: string;
  kategori_id: number;
  keterangan: string;
  created_at: string;
  updated_at: string;
}

export interface PengunjungLogItem {
  id: number;
  ip_address: string;
  user_agent: string;
  url_visited: string;
  referer: string;
  visited_at: string;
}

export interface PengunjungStats {
  hariIni: number;
  mingguIni: number;
  bulanIni: number;
  total: number;
}

export const INITIAL_CATEGORIES: KategoriItem[] = [
  {
    id: 1,
    nama: "Informatika & Ilmu Komputer",
    slug: "informatika-ilmu-komputer",
    keterangan: "Buku-buku seputar algoritma, pemrograman, arsitektur software, sistem informasi, dan rekayasa web.",
    created_at: "2026-01-10 09:00:00",
  },
  {
    id: 2,
    nama: "Kecerdasan Buatan & Data Science",
    slug: "kecerdasan-buatan-data-science",
    keterangan: "Pembahasan mendalam tentang machine learning, deep learning, pengolahan citra medis, dan analitika big data.",
    created_at: "2026-01-10 09:15:00",
  },
  {
    id: 3,
    nama: "Jaringan & Keamanan Siber",
    slug: "jaringan-keamanan-siber",
    keterangan: "Infrastruktur cloud, pertahanan siber, digital forensics, routing Mikrotik, dan switching Cisco.",
    created_at: "2026-01-10 09:30:00",
  },
  {
    id: 4,
    nama: "Pendidikan & Metodologi Penelitian",
    slug: "pendidikan-metodologi-penelitian",
    keterangan: "Panduan penulisan karya ilmiah, metodologi riset komputasi, dan penyusunan tesis terapan.",
    created_at: "2026-01-10 09:45:00",
  },
  {
    id: 5,
    nama: "Ekonomi & Manajemen Digital",
    slug: "ekonomi-manajemen-digital",
    keterangan: "Transformasi bisnis digital, ekosistem technopreneurship, dan manajemen proyek teknologi.",
    created_at: "2026-01-10 10:00:00",
  },
  {
    id: 6,
    nama: "Hukum Siber & Etika Profesi",
    slug: "hukum-siber-etika-profesi",
    keterangan: "Regulasi Undang-Undang Perlindungan Data Pribadi (UU PDP), HAKI, dan etika profesional IT.",
    created_at: "2026-01-10 10:15:00",
  },
];

export const INITIAL_BOOKS: BukuItem[] = [
  {
    id: 1,
    judul: "Dasar Pemrograman Python untuk Kecerdasan Buatan",
    slug: "dasar-pemrograman-python-untuk-kecerdasan-buatan",
    penulis: "Dr. Tomy Satria Alasi, M.Kom.",
    editor: "Ir. Muhammad Ridwan, S.Kom., M.T.",
    jumlah_halaman: 284,
    isbn: "978-623-98701-0-1",
    harga: 88000,
    sinopsis: "Buku ini menyajikan fondasi komprehensif sintaks bahasa Python dari tingkat dasar hingga penerapan nyata algoritma machine learning. Disertai studi kasus pengolahan data tabular, computer vision, serta perancangan model prediksi untuk riset akademik maupun industri.",
    link_tokopedia: "https://tokopedia.com/aisu-press/python-ai",
    link_shopee: "https://shopee.co.id/aisu-press/python-ai",
    link_google_book: "https://books.google.com/books?id=sample_python_ai",
    link_google_play: "https://play.google.com/store/books/details?id=sample_python_ai",
    cover: "dasar_pemrograman_python.jpg",
    coverImage: generateCoverDataUri(
      "Dasar Pemrograman Python untuk Kecerdasan Buatan",
      "Dr. Tomy Satria Alasi, M.Kom.",
      "Kecerdasan Buatan & Data Science",
      "#1e3a8a",
      "#0f172a",
      "#38bdf8"
    ),
    coverBg: "#1e3a8a",
    coverAccent: "#38bdf8",
    kategori_id: 2,
    keterangan: "Buku Ajar Utama untuk Perguruan Tinggi dan Peneliti Pemula",
    created_at: "2026-02-01 11:00:00",
    updated_at: "2026-02-01 11:00:00",
  },
  {
    id: 2,
    judul: "Arsitektur Web Modern Berbasis Framework Yii2",
    slug: "arsitektur-web-modern-berbasis-framework-yii2",
    penulis: "Budi Santoso, S.Kom., M.Kom.",
    editor: "Dr. Tomy Satria Alasi, M.Kom.",
    jumlah_halaman: 312,
    isbn: "978-623-98701-1-8",
    harga: 95000,
    sinopsis: "Panduan terstruktur merancang arsitektur aplikasi web skala enterprise menggunakan Yii2 PHP Framework. Membahas MVC pattern, Active Record, ActiveDataProvider, optimasi query MySQL, keamanan RBAC, dan integrasi RESTful API modern.",
    link_tokopedia: "https://tokopedia.com/aisu-press/yii2-modern",
    link_shopee: "https://shopee.co.id/aisu-press/yii2-modern",
    link_google_book: "https://books.google.com/books?id=sample_yii2",
    link_google_play: "https://play.google.com/store/books/details?id=sample_yii2",
    cover: "arsitektur_web_yii2.jpg",
    coverImage: generateCoverDataUri(
      "Arsitektur Web Modern Berbasis Framework Yii2",
      "Budi Santoso, S.Kom., M.Kom.",
      "Informatika & Ilmu Komputer",
      "#0f766e",
      "#134e4a",
      "#2dd4bf"
    ),
    coverBg: "#0f766e",
    coverAccent: "#2dd4bf",
    kategori_id: 1,
    keterangan: "Edisi Revisi Lengkap Best Practice Rekayasa Web",
    created_at: "2026-02-03 14:20:00",
    updated_at: "2026-02-03 14:20:00",
  },
  {
    id: 3,
    judul: "Keamanan Siber dan Investigasi Forensik Digital",
    slug: "keamanan-siber-dan-investigasi-forensik-digital",
    penulis: "Rizky Pratama, M.Cs. & Aulia Siregar, S.T.",
    editor: "Hendro Wijaya, M.Kom.",
    jumlah_halaman: 260,
    isbn: "978-623-98701-2-5",
    harga: 92000,
    sinopsis: "Buku pegangan komprehensif bagi praktisi IT dan mahasiswa dalam mengidentifikasi serangan siber, penanganan insiden keamanan, ekstraksi bukti digital (digital forensics), analisis memori, serta teknik hardening server Linux dan Windows.",
    link_tokopedia: "https://tokopedia.com/aisu-press/cybersecurity-forensics",
    link_shopee: "https://shopee.co.id/aisu-press/cybersecurity-forensics",
    link_google_book: "https://books.google.com/books?id=sample_cyber",
    link_google_play: "https://play.google.com/store/books/details?id=sample_cyber",
    cover: "keamanan_siber_forensik.jpg",
    coverImage: generateCoverDataUri(
      "Keamanan Siber dan Investigasi Forensik Digital",
      "Rizky Pratama, M.Cs. & Aulia Siregar, S.T.",
      "Jaringan & Keamanan Siber",
      "#831843",
      "#500724",
      "#f472b6"
    ),
    coverBg: "#831843",
    coverAccent: "#f472b6",
    kategori_id: 3,
    keterangan: "Dilengkapi Studi Kasus Nyata Forensik Jaringan & Log Server",
    created_at: "2026-02-05 16:45:00",
    updated_at: "2026-02-05 16:45:00",
  },
  {
    id: 4,
    judul: "Metodologi Penelitian Terapan Bidang Informatika",
    slug: "metodologi-penelitian-terapan-bidang-informatika",
    penulis: "Prof. Dr. Hermansyah, M.Sc.",
    editor: "Dr. Tomy Satria Alasi, M.Kom.",
    jumlah_halaman: 220,
    isbn: "978-623-98701-3-2",
    harga: 78000,
    sinopsis: "Menuntun akademisi dan mahasiswa menyusun proposal tesis, skripsi, dan disertasi berkualitas tinggi. Mencakup rumusan masalah yang tajam, tinjauan pustaka sistematis (SLR), benchmarking algoritma, serta tips publikasi di jurnal bereputasi Scopus/Sinta.",
    link_tokopedia: "https://tokopedia.com/aisu-press/metopen-informatika",
    link_shopee: "https://shopee.co.id/aisu-press/metopen-informatika",
    link_google_book: "https://books.google.com/books?id=sample_metopen",
    link_google_play: "https://play.google.com/store/books/details?id=sample_metopen",
    cover: "metodologi_penelitian_terapan.jpg",
    coverImage: generateCoverDataUri(
      "Metodologi Penelitian Terapan Bidang Informatika",
      "Prof. Dr. Hermansyah, M.Sc.",
      "Pendidikan & Metodologi Penelitian",
      "#7c2d12",
      "#431407",
      "#fb923c"
    ),
    coverBg: "#431407",
    coverAccent: "#fb923c",
    kategori_id: 4,
    keterangan: "Rekomendasi Utama Dosen Pembimbing Skripsi dan Tesis",
    created_at: "2026-02-08 08:30:00",
    updated_at: "2026-02-08 08:30:00",
  },
  {
    id: 5,
    judul: "Transformasi Bisnis dan Technopreneurship Era Digital",
    slug: "transformasi-bisnis-dan-technopreneurship-era-digital",
    penulis: "Siti Rahmawati, S.E., M.M.",
    editor: "Ferry Gunawan, M.B.A.",
    jumlah_halaman: 240,
    isbn: "978-623-98701-4-9",
    harga: 85000,
    sinopsis: "Menjelajahi strategi membangun startup teknologi yang adaptif, validasi model bisnis lean canvas, customer acquisition, unit economics, dan implementasi ekosistem pembayaran digital di Indonesia.",
    link_tokopedia: "https://tokopedia.com/aisu-press/technopreneurship",
    link_shopee: "https://shopee.co.id/aisu-press/technopreneurship",
    link_google_book: "https://books.google.com/books?id=sample_techno",
    link_google_play: "https://play.google.com/store/books/details?id=sample_techno",
    cover: "technopreneurship_digital.jpg",
    coverImage: generateCoverDataUri(
      "Transformasi Bisnis dan Technopreneurship Era Digital",
      "Siti Rahmawati, S.E., M.M.",
      "Ekonomi & Manajemen Digital",
      "#14532d",
      "#052e16",
      "#4ade80"
    ),
    coverBg: "#14532d",
    coverAccent: "#4ade80",
    kategori_id: 5,
    keterangan: "Panduan Praktis Pendiri Startup & Mahasiswa Bisnis",
    created_at: "2026-02-11 10:10:00",
    updated_at: "2026-02-11 10:10:00",
  },
  {
    id: 6,
    judul: "Hukum Perlindungan Data Pribadi dan Kejahatan Siber",
    slug: "hukum-perlindungan-data-pribadi-dan-kejahatan-siber",
    penulis: "Andi Wijaya, S.H., M.H.",
    editor: "Novianti Lubis, S.H., M.Kn.",
    jumlah_halaman: 276,
    isbn: "978-623-98701-5-6",
    harga: 90000,
    sinopsis: "Kajian komparatif Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia terhadap regulasi internasional (GDPR). Memberikan panduan kepatuhan hukum bagi korporasi teknologi, data protection officer (DPO), dan masyarakat umum.",
    link_tokopedia: "https://tokopedia.com/aisu-press/uu-pdp-siber",
    link_shopee: "https://shopee.co.id/aisu-press/uu-pdp-siber",
    link_google_book: "https://books.google.com/books?id=sample_hukum_pdp",
    link_google_play: "https://play.google.com/store/books/details?id=sample_hukum_pdp",
    cover: "hukum_data_pribadi.jpg",
    coverImage: generateCoverDataUri(
      "Hukum Perlindungan Data Pribadi dan Kejahatan Siber",
      "Andi Wijaya, S.H., M.H.",
      "Hukum Siber & Etika Profesi",
      "#312e81",
      "#1e1b4b",
      "#a5b4fc"
    ),
    coverBg: "#312e81",
    coverAccent: "#a5b4fc",
    kategori_id: 6,
    keterangan: "Ulasan Kritis Implementasi UU PDP untuk Organisasi & Publik",
    created_at: "2026-02-14 13:00:00",
    updated_at: "2026-02-14 13:00:00",
  },
  {
    id: 7,
    judul: "Implementasi Jaringan Komputer Berbasis Mikrotik & Cisco",
    slug: "implementasi-jaringan-komputer-berbasis-mikrotik-cisco",
    penulis: "Wahyu Hidayat, S.T., M.T.",
    editor: "Zulfikar Ahmad, S.Kom.",
    jumlah_halaman: 340,
    isbn: "978-623-98701-6-3",
    harga: 98000,
    sinopsis: "Buku praktikum lengkap instalasi, konfigurasi routing OSPF/BGP, VLAN, firewall filter, Quality of Service (QoS), bandwidth management, dan monitoring jaringan enterprise menggunakan routerboard Mikrotik dan switch Cisco.",
    link_tokopedia: "https://tokopedia.com/aisu-press/jaringan-mikrotik-cisco",
    link_shopee: "https://shopee.co.id/aisu-press/jaringan-mikrotik-cisco",
    link_google_book: "https://books.google.com/books?id=sample_mikrotik",
    link_google_play: "https://play.google.com/store/books/details?id=sample_mikrotik",
    cover: "jaringan_mikrotik_cisco.jpg",
    coverImage: generateCoverDataUri(
      "Implementasi Jaringan Komputer Berbasis Mikrotik & Cisco",
      "Wahyu Hidayat, S.T., M.T.",
      "Jaringan & Keamanan Siber",
      "#1e1b4b",
      "#0f172a",
      "#818cf8"
    ),
    coverBg: "#1e1b4b",
    coverAccent: "#818cf8",
    kategori_id: 3,
    keterangan: "Edisi Laboratorium Lengkap dengan Topologi Praktik",
    created_at: "2026-02-18 15:30:00",
    updated_at: "2026-02-18 15:30:00",
  },
  {
    id: 8,
    judul: "Pengolahan Citra Medis dan Deteksi Dini Penyakit",
    slug: "pengolahan-citra-medis-dan-deteksi-dini-penyakit",
    penulis: "Dr. Dian Anggraini, S.Si., M.Kom.",
    editor: "Dr. Tomy Satria Alasi, M.Kom.",
    jumlah_halaman: 296,
    isbn: "978-623-98701-7-0",
    harga: 96000,
    sinopsis: "Buku monograf yang mengupas inovasi pengolahan citra digital MRI dan CT-Scan untuk deteksi lesi dan kelainan organ. Memadukan segmentasi gambar tingkat lanjut, Convolutional Neural Networks (CNN), dan validasi klinis medis.",
    link_tokopedia: "https://tokopedia.com/aisu-press/citra-medis-ai",
    link_shopee: "https://shopee.co.id/aisu-press/citra-medis-ai",
    link_google_book: "https://books.google.com/books?id=sample_citra_medis",
    link_google_play: "https://play.google.com/store/books/details?id=sample_citra_medis",
    cover: "pengolahan_citra_medis.jpg",
    coverImage: generateCoverDataUri(
      "Pengolahan Citra Medis dan Deteksi Dini Penyakit",
      "Dr. Dian Anggraini, S.Si., M.Kom.",
      "Kecerdasan Buatan & Data Science",
      "#134e4a",
      "#042f2e",
      "#5eead4"
    ),
    coverBg: "#134e4a",
    coverAccent: "#5eead4",
    kategori_id: 2,
    keterangan: "Riset Kolaboratif Komputasi Medis dan Kecerdasan Buatan",
    created_at: "2026-02-22 09:15:00",
    updated_at: "2026-02-22 09:15:00",
  },
];

export const INITIAL_LOGS: PengunjungLogItem[] = [
  {
    id: 1,
    ip_address: "180.252.164.21",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0.0.0 Safari/537.36",
    url_visited: "/buku/dasar-pemrograman-python-untuk-kecerdasan-buatan",
    referer: "https://www.google.com/",
    visited_at: "2026-10-21 14:45:12",
  },
  {
    id: 2,
    ip_address: "114.122.38.92",
    user_agent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15",
    url_visited: "/katalog",
    referer: "https://penerbit.aisu.or.id/",
    visited_at: "2026-10-21 14:48:33",
  },
  {
    id: 3,
    ip_address: "36.72.215.118",
    user_agent: "Mozilla/5.0 (Linux; Android 14; SM-S918B) Chrome/123.0.0.0 Mobile",
    url_visited: "/buku/arsitektur-web-modern-berbasis-framework-yii2",
    referer: "https://www.google.co.id/",
    visited_at: "2026-10-21 14:52:01",
  },
  {
    id: 4,
    ip_address: "66.249.66.16",
    user_agent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    url_visited: "/sitemap.xml",
    referer: "Direct / Search Engine Spider",
    visited_at: "2026-10-21 15:01:29",
  },
  {
    id: 5,
    ip_address: "140.213.12.87",
    user_agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:125.0) Gecko/20100101 Firefox/125.0",
    url_visited: "/pengiriman",
    referer: "https://penerbit.aisu.or.id/katalog",
    visited_at: "2026-10-21 15:15:40",
  },
  {
    id: 6,
    ip_address: "182.1.204.45",
    user_agent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15",
    url_visited: "/",
    referer: "https://www.aisu.or.id/",
    visited_at: "2026-10-21 15:30:18",
  },
];
