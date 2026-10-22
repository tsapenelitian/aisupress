# Panduan Lengkap Deploy Yii2 Penerbit AISU ke cPanel

Panduan resmi deployment aplikasi **Penerbit Asosiasi Informatika Sumatera Utara (AISU)** berbasis **Framework Yii2** ke web hosting cPanel (Shared Hosting / VPS cPanel).

---

## Ringkasan Cepat Persyaratan Hosting:
- **PHP Version:** PHP 7.4.33 hingga PHP 8.2 (Dapat disetel via cPanel *Select PHP Version* atau *MultiPHP Manager*)
- **Ekstensi PHP:** `pdo_mysql`, `mbstring`, `curl`, `gd` atau `imagick`, `xml`, `fileinfo`
- **Database:** MySQL 5.7+ atau MariaDB 10.3+
- **Web Server:** Apache / LiteSpeed (mendukung file `.htaccess` dan `mod_rewrite`)

---

## Ada 2 Pilihan Metode Upload ke cPanel

### METODE 1: Upload Langsung ke `public_html` (Paling Cepat & Praktis)
Metode ini paling sering digunakan pengguna cPanel karena tidak perlu mengubah path index.

1. **Login ke cPanel** Anda (`https://domainanda.com:2083`).
2. Masuk ke menu **File Manager** > buka folder **public_html**.
3. Klik tombol **Upload** di menu atas, pilih berkas `yii2-penerbit-aisu.zip`.
4. Setelah proses upload 100% hijau, kembali ke File Manager, klik kanan pada `yii2-penerbit-aisu.zip` lalu pilih **Extract**.
5. Pastikan isi folder berada langsung di dalam `public_html` (bukan bertumpuk di dalam subfolder).
6. File `.htaccess` bawaan pada root proyek sudah dikonfigurasi untuk:
   - Secara otomatis meneruskan pengunjung ke folder `web/` tanpa menampilkan tulisan `/web/` di URL.
   - Memblokir akses publik ke folder sensitif seperti `config/`, `models/`, `controllers/`, `views/`, `runtime/`, `vendor/`, dan `database.sql`.

---

### METODE 2: Struktur Standar Yii2 (Tingkat Keamanan Tertinggi)
Memisahkan kode core di luar web root sehingga hanya aset publik yang berada di `public_html`.

1. Ekstrak zip ke folder home hosting (di atas `public_html`), misalnya:
   `/home/usernamecpanel/yii2-penerbit-aisu/`
2. Pindahkan seluruh isi folder `/home/usernamecpanel/yii2-penerbit-aisu/web/*` ke dalam:
   `/home/usernamecpanel/public_html/`
3. Edit file `/home/usernamecpanel/public_html/index.php`, sesuaikan path:
   ```php
   require __DIR__ . '/../yii2-penerbit-aisu/vendor/autoload.php';
   require __DIR__ . '/../yii2-penerbit-aisu/vendor/yiisoft/yii2/Yii.php';

   $config = require __DIR__ . '/../yii2-penerbit-aisu/config/web.php';

   (new yii\web\Application($config))->run();
   ```

---

## Langkah Konfigurasi Database di cPanel

### 1. Buat Database & User MySQL
1. Di dashboard cPanel, klik menu **MySQL® Database Wizard** atau **MySQL® Databases**.
2. **Buat Database Baru:** misalnya masukkan `penerbit` (nama lengkap database menjadi `usercpanel_penerbit`).
3. **Buat Database User Baru:** misalnya `usercpanel_dbuser` dan generate kata sandi yang kuat (misalnya `K4t4s4ndi#A1SU`).
4. **Hubungkan User ke Database:** Centang **ALL PRIVILEGES** lalu klik **Make Changes**.

### 2. Import Data `database.sql`
1. Kembali ke dashboard cPanel, klik **phpMyAdmin**.
2. Pilih nama database yang baru Anda buat (`usercpanel_penerbit`) di panel kiri.
3. Klik tab **Import** pada menu atas.
4. Klik **Choose File**, pilih berkas `database.sql` dari komputer Anda (atau dari dalam folder proyek yang sudah diekstrak).
5. Klik tombol **Import** / **Go** di bagian bawah.
6. Tunggu hingga muncul notifikasi hijau tanda semua tabel (`buku`, `kategori`, `pengunjung`, `pengunjung_log`) berhasil di-import beserta contoh datanya.

### 3. Sesuaikan Kredensial di `config/db.php`
Buka file `config/db.php` melalui File Manager cPanel (klik kanan > **Edit**):

```php
<?php

return [
    'class' => 'yii\db\Connection',
    'dsn' => 'mysql:host=localhost;dbname=usercpanel_penerbit',
    'username' => 'usercpanel_dbuser',
    'password' => 'K4t4s4ndi#A1SU',
    'charset' => 'utf8mb4',

    // Aktifkan Schema Cache untuk kecepatan tinggi di server produksi
    'enableSchemaCache' => true,
    'schemaCacheDuration' => 86400,
    'schemaCache' => 'cache',
];
```

---

## Pengaturan Izin Akses Folder (Permissions)
Di cPanel File Manager, pastikan folder berikut memiliki izin tulis (biasanya `755` atau `777`):
- `runtime/` (termasuk `runtime/cache` dan `runtime/logs`)
- `web/assets/`
- `web/uploads/cover/`

---

## Login Administrator & Pengelolaan Konten
Setelah website aktif:
- **Halaman Utama Publik:** `https://domainanda.com/`
- **Katalog Buku:** `https://domainanda.com/katalog`
- **Halaman Login Admin:** `https://domainanda.com/login` (atau `https://domainanda.com/site/login`)
- **Username Default:** `admin`
- **Password Default:** `admin123`

### Fitur Admin di cPanel:
1. **Kelola Buku (`/admin/buku`):** Input buku baru, ubah data, hapus, dan upload file cover buku.
2. **Kelola Kategori (`/admin/kategori`):** Tambah / edit bidang ilmu penerbitan.
3. **Statistik Pengunjung (`/admin/statistik`):** Rekap hits harian, mingguan, bulanan, dan IP log otomatis.

---

## Verifikasi Google Search Console & Sitemap
1. Salin kode tag verifikasi HTML dari Google Search Console.
2. Masukkan ke file `config/params.php` pada kunci `'googleSiteVerification'`.
3. Submit sitemap di Google Search Console: `https://domainanda.com/sitemap.xml`.
