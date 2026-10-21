export interface YiiFile {
  path: string;
  category: "config" | "controller" | "model" | "migration" | "view" | "web" | "doc";
  description: string;
  language: "php" | "sql" | "xml" | "markdown" | "htaccess" | "json";
}

export const YII_FILES_CATALOG: YiiFile[] = [
  {
    path: "config/web.php",
    category: "config",
    description: "Konfigurasi utama web application, Pretty URL tanpa web/index.php dan %2F, User identity, dan error handler.",
    language: "php",
  },
  {
    path: "config/db.php",
    category: "config",
    description: "Konfigurasi koneksi database MySQL, charset utf8mb4, dan schema cache untuk performa tinggi.",
    language: "php",
  },
  {
    path: "config/params.php",
    category: "config",
    description: "Parameter global identitas penerbit AISU, email, WhatsApp, Google verification token, dan geo meta.",
    language: "php",
  },
  {
    path: "config/console.php",
    category: "config",
    description: "Konfigurasi CLI Yii2 untuk menjalankan migrasi database tabel buku dan pengunjung.",
    language: "php",
  },
  {
    path: "models/User.php",
    category: "model",
    description: "Model IdentityInterface bawaan Yii2 tanpa tabel database sesuai spesifikasi otentikasi login administrator.",
    language: "php",
  },
  {
    path: "models/LoginForm.php",
    category: "model",
    description: "Form model untuk validasi username dan password administrator.",
    language: "php",
  },
  {
    path: "models/Buku.php",
    category: "model",
    description: "ActiveRecord Buku dengan validasi komprehensif, upload cover ke web/uploads/cover/, dan generator Schema.org Book JSON-LD.",
    language: "php",
  },
  {
    path: "models/BukuSearch.php",
    category: "model",
    description: "Search model dengan fitur pencarian Judul, Penulis, ISBN, filter Kategori, dan multi-sorting.",
    language: "php",
  },
  {
    path: "models/Kategori.php",
    category: "model",
    description: "ActiveRecord Kategori bidang ilmu dengan relasi hasMany ke Buku dan auto slug.",
    language: "php",
  },
  {
    path: "models/Pengunjung.php",
    category: "model",
    description: "Model counter pengunjung real-time (hari ini, minggu ini, bulan ini, total) tanpa memperlambat loading.",
    language: "php",
  },
  {
    path: "models/PengunjungLog.php",
    category: "model",
    description: "Model audit trail pencatatan IP, peramban (User-Agent), URL, dan referer pengunjung.",
    language: "php",
  },
  {
    path: "controllers/SiteController.php",
    category: "controller",
    description: "Controller halaman publik (Beranda, Katalog, Detail Buku, Pengiriman, Tentang, Login, Logout, Sitemap XML, Robots TXT).",
    language: "php",
  },
  {
    path: "controllers/BukuController.php",
    category: "controller",
    description: "Controller administrator untuk operasi CRUD Buku lengkap dan upload berkas cover.",
    language: "php",
  },
  {
    path: "controllers/KategoriController.php",
    category: "controller",
    description: "Controller administrator untuk operasi CRUD Kategori bidang ilmu.",
    language: "php",
  },
  {
    path: "controllers/StatistikController.php",
    category: "controller",
    description: "Controller administrator untuk memantau ringkasan statistik dan tabel log pengunjung real-time.",
    language: "php",
  },
  {
    path: "migrations/m231021_000001_create_kategori_table.php",
    category: "migration",
    description: "Migrasi pembuatan tabel kategori.",
    language: "php",
  },
  {
    path: "migrations/m231021_000002_create_buku_table.php",
    category: "migration",
    description: "Migrasi pembuatan tabel buku lengkap dengan relasi foreign key dan index performa.",
    language: "php",
  },
  {
    path: "migrations/m231021_000003_create_pengunjung_table.php",
    category: "migration",
    description: "Migrasi pembuatan tabel ringkasan pengunjung harian.",
    language: "php",
  },
  {
    path: "migrations/m231021_000004_create_pengunjung_log_table.php",
    category: "migration",
    description: "Migrasi pembuatan tabel audit log pengunjung.",
    language: "php",
  },
  {
    path: "migrations/m231021_000005_seed_data.php",
    category: "migration",
    description: "Migrasi seeder untuk 6 kategori, 8 buku dummy lintas bidang ilmu, dan data historis pengunjung.",
    language: "php",
  },
  {
    path: "views/layouts/main.php",
    category: "view",
    description: "Layout master semantik dengan zero-animation CSS, meta Google, geo tags, dan publisher schema markup.",
    language: "php",
  },
  {
    path: "views/site/index.php",
    category: "view",
    description: "View Beranda dengan header logo, highlight 8 buku terbaru, banner statistik pengunjung, dan footer.",
    language: "php",
  },
  {
    path: "views/site/katalog.php",
    category: "view",
    description: "View Katalog dengan pencarian (Judul, Penulis, ISBN), filter kategori, sorting, dan grid cover.",
    language: "php",
  },
  {
    path: "views/site/detail.php",
    category: "view",
    description: "View Detail Buku dengan cover lazy-load, spesifikasi lengkap, link Tokopedia/Shopee/Google, dan JSON-LD.",
    language: "php",
  },
  {
    path: "views/site/pengiriman.php",
    category: "view",
    description: "View Informasi Pengiriman yang ringkas, jelas, dan transparan.",
    language: "php",
  },
  {
    path: "views/site/tentang.php",
    category: "view",
    description: "View Profil Penerbit AISU, alamat Deli Serdang, dan kontak resmi.",
    language: "php",
  },
  {
    path: "views/site/login.php",
    category: "view",
    description: "View Form login administrator menggunakan identitas bawaan Yii2.",
    language: "php",
  },
  {
    path: "views/buku/_form.php",
    category: "view",
    description: "Form CRUD buku untuk semua field dan berkas cover.",
    language: "php",
  },
  {
    path: "web/.htaccess",
    category: "web",
    description: "Konfigurasi Apache Pretty URL (menghilangkan index.php dan %2F) serta caching browser.",
    language: "htaccess",
  },
  {
    path: ".htaccess",
    category: "web",
    description: "Root rewrite untuk mengarahkan akses domain ke folder web/ secara bersih.",
    language: "htaccess",
  },
  {
    path: "web/robots.txt",
    category: "web",
    description: "Robots.txt teroptimasi untuk Googlebot dan perayap search engine.",
    language: "xml",
  },
  {
    path: "web/sitemap.xml",
    category: "web",
    description: "Sitemap XML statis fallback siap submit ke Google Search Console.",
    language: "xml",
  },
  {
    path: "web/css/site.css",
    category: "web",
    description: "Stylesheet ultra-ringan (<5KB) dengan aturan zero animation tanpa efek transisi/animasi.",
    language: "php",
  },
  {
    path: "database.sql",
    category: "doc",
    description: "Database MySQL dump siap import langsung ke phpMyAdmin dengan 4 tabel dan 8 buku.",
    language: "sql",
  },
  {
    path: "README.md",
    category: "doc",
    description: "Dokumentasi lengkap cara instalasi, setting Google Search Console, meta tag, dan menjalankan aplikasi.",
    language: "markdown",
  },
];
