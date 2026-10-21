# Penerbit Asosiasi Informatika Sumatera Utara (AISU)
## Web Aplikasi Resmi Penerbit Buku Berbasis Framework Yii2 Basic Template

Aplikasi web penerbit buku resmi **Asosiasi Informatika Sumatera Utara** yang dirancang dengan prioritas utama: **kecepatan loading ekstrem, zero animation (tanpa jeda/lag), efisiensi resource tinggi, dan optimasi SEO Google melampaui standar.**

---

## 1. Informasi Umum Penerbit

- **Nama Penerbit:** Asosiasi Informatika Sumatera Utara (AISU)
- **Logo:** `https://www.aisu.or.id/aisu.png`
- **Fokus Penerbitan:** Menerbitkan buku untuk umum di semua bidang ilmu (Teknologi Informasi, Sains, Pendidikan, Manajemen, Bisnis, Hukum, dan Humaniora)
- **Alamat Kantor:** Jl. Klambir V, Tanjung Gusta, Kec. Sunggal, Kab. Deli Serdang, Prov. Sumatera Utara, Indonesia
- **Email:** `tomysatriaalasi@gmail.com`
- **Telepon / WhatsApp:** `+62 821-6844-9797`

---

## 2. Kebutuhan Sistem & Teknologi

- **Bahasa Pemrograman:** PHP `7.4.33` (atau versi PHP 7.4.x - 8.2.x yang kompatibel)
- **Ekstensi PHP:** `pdo_mysql`, `mbstring`, `curl`, `gd` / `imagick` (untuk upload cover), `xml`
- **Database:** MySQL `5.7+` atau MariaDB `10.3+`
- **Web Server:** Apache (dengan `mod_rewrite` aktif) atau Nginx
- **Web Root:** Folder `web/`

---

## 3. Cara Instalasi Aplikasi

### Langkah 1: Ekstrak / Clone Repositori
Ekstrak arsip proyek atau tempatkan seluruh isi folder ke direktori web server Anda (misalnya `/var/www/html/penerbit-aisu` atau `C:/xampp/htdocs/penerbit-aisu`).

### Langkah 2: Buat Database MySQL
Masuk ke phpMyAdmin atau MySQL CLI, lalu buat database baru:
```sql
CREATE DATABASE aisu_penerbit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### Langkah 3: Import Database atau Jalankan Migrasi Yii2
Anda memiliki 2 opsi:

**Opsi A (Paling Cepat - Import SQL):**
Import berkas `database.sql` yang telah disediakan ke dalam database `aisu_penerbit`:
```bash
mysql -u root -p aisu_penerbit < database.sql
```

**Opsi B (Menggunakan Migrasi Yii2):**
Jalankan perintah migration CLI dari direktori root proyek:
```bash
php yii migrate --interactive=0
```

### Langkah 4: Konfigurasi Database
Buka file `config/db.php` dan sesuaikan kredensial MySQL Anda:
```php
return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=aisu_penerbit',
    'username' => 'root',        // ganti dengan user database Anda
    'password' => '',            // ganti dengan password database Anda
    'charset' => 'utf8mb4',
];
```

### Langkah 5: Set Izin Akses Folder (Linux / macOS)
Pastikan folder `runtime`, `web/assets`, dan `web/uploads/cover` dapat ditulisi oleh web server:
```bash
chmod -R 777 runtime web/assets web/uploads/cover
```

---

## 4. Cara Menjalankan Aplikasi

### Menggunakan Built-in PHP Development Server:
```bash
cd /path/ke/penerbit-aisu
php yii serve --port=8080
```
Buka browser dan akses: `http://localhost:8080`

### Menggunakan Apache (XAMPP / Laragon / LAMP):
Arahkan `DocumentRoot` Apache ke subfolder `web/` proyek, atau akses melalui virtual host:
`http://penerbit-aisu.local/`

File `.htaccess` di dalam folder `web/` dan root sudah secara otomatis mengaktifkan **Pretty URL**:
- URL Buku: `/buku/dasar-pemrograman-python-untuk-kecerdasan-buatan`
- URL Katalog: `/katalog`
- URL Pengiriman: `/pengiriman`
- URL Tentang: `/tentang`
- URL Sitemap: `/sitemap.xml`
- URL Robots: `/robots.txt`

---

## 5. Akun Administrator Bawaan Yii2

Sesuai spesifikasi, otentikasi login administrator menggunakan konfigurasi identity bawaan Yii2 (`app\models\User`), tanpa memerlukan tabel user di database:

- **URL Login:** `/site/login` atau `/login`
- **Username:** `admin`
- **Password:** `admin123`

Setelah login, Anda memiliki akses penuh ke:
1. **CRUD Buku (`/admin/buku`):** Tambah, lihat, ubah, hapus buku, dan upload file cover ke `web/uploads/cover/`.
2. **CRUD Kategori (`/admin/kategori`):** Kelola kategori bidang ilmu penerbitan.
3. **Statistik Pengunjung (`/admin/statistik`):** Pantau kunjungan hari ini, minggu ini, bulan ini, total hits, serta log IP & user-agent.

---

## 6. Panduan Optimasi Google & Google Search Console (GSC)

### A. Cara Menambahkan Kode Verifikasi Google Search Console (HTML Tag)
1. Buka [Google Search Console](https://search.google.com/search-console).
2. Tambahkan properti baru dengan metode **URL Prefix** (misal `https://penerbit.aisu.or.id`).
3. Pilih metode verifikasi: **HTML tag**. Salin kode token yang diberikan (misal `google-site-verification=XXXXXXXXXXXXXXXX`).
4. Buka file `config/params.php` pada baris:
```php
'googleSiteVerification' => 'GSC_KODE_VERIFIKASI_DARI_GOOGLE_SEARCH_CONSOLE',
```
5. Simpan file. Tag `<meta name="google-site-verification" content="...">` secara otomatis terpasang pada seluruh halaman web.
6. Kembali ke Google Search Console dan klik tombol **Verify (Verifikasi)**.

### B. Submit Sitemap.xml Dinamis
Aplikasi menyediakan sitemap dinamis berstandar XML:
- URL Sitemap: `https://domain-anda.com/sitemap.xml`
- Masuk ke dashboard Google Search Console &gt; menu **Sitemaps** &gt; masukkan `sitemap.xml` &gt; klik **Submit**.

### C. Keunggulan SEO yang Sudah Diterapkan:
1. **Schema.org/JSON-LD untuk Book:** Setiap buku memiliki data terstruktur `Book` dan `Offer` (harga IDR, ISBN, penulis, penerbit).
2. **Meta Google Lengkap:** `google-site-verification`, `robots: index, follow, max-snippet:-1, max-image-preview:large`, `author: Asosiasi Informatika Sumatera Utara`.
3. **Meta Wilayah Geografis:** `geo.region: ID-SU`, `geo.placename: Deli Serdang, Sumatera Utara, Indonesia`.
4. **Open Graph & Twitter Card:** Preview tautan sosial media tampil rapi dan profesional.
5. **Core Web Vitals:** Nol animasi (`animation: none !important`, `transition: none !important`), rendering HTML instan, tag gambar menggunakan `loading="lazy"` dan `decoding="async"` tanpa pergeseran tata letak (0 CLS).

---

## 7. Kontak & Dukungan Teknis

Untuk pertanyaan teknis, kerja sama penerbitan, atau cetak buku ber-ISBN:
- **Penerbit:** Asosiasi Informatika Sumatera Utara
- **Email:** `tomysatriaalasi@gmail.com`
- **WhatsApp:** `+62 821-6844-9797`
