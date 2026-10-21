-- Database SQL Dump: Penerbit Asosiasi Informatika Sumatera Utara
-- Framework: Yii2 Basic Template (PHP 7.4.33)
-- Charset: utf8mb4_unicode_ci

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- 1. Struktur Tabel `kategori`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `kategori`;
CREATE TABLE `kategori` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx-kategori-slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 2. Struktur Tabel `buku`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `buku`;
CREATE TABLE `buku` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judul` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `penulis` varchar(200) NOT NULL,
  `editor` varchar(200) DEFAULT NULL,
  `jumlah_halaman` int(11) NOT NULL,
  `isbn` varchar(30) NOT NULL,
  `harga` decimal(12,2) NOT NULL,
  `sinopsis` text NOT NULL,
  `link_tokopedia` varchar(255) DEFAULT NULL,
  `link_shopee` varchar(255) DEFAULT NULL,
  `link_google_book` varchar(255) DEFAULT NULL,
  `link_google_play` varchar(255) DEFAULT NULL,
  `cover` varchar(255) DEFAULT NULL,
  `kategori_id` int(11) NOT NULL,
  `keterangan` text DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx-buku-slug` (`slug`),
  UNIQUE KEY `idx-buku-isbn` (`isbn`),
  KEY `idx-buku-kategori_id` (`kategori_id`),
  CONSTRAINT `fk-buku-kategori_id` FOREIGN KEY (`kategori_id`) REFERENCES `kategori` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 3. Struktur Tabel `pengunjung`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pengunjung`;
CREATE TABLE `pengunjung` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tanggal` date NOT NULL,
  `total_hits` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx-pengunjung-tanggal` (`tanggal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 4. Struktur Tabel `pengunjung_log`
-- --------------------------------------------------------
DROP TABLE IF EXISTS `pengunjung_log`;
CREATE TABLE `pengunjung_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `url_visited` varchar(255) NOT NULL,
  `referer` varchar(255) DEFAULT NULL,
  `visited_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx-log-visited_at` (`visited_at`),
  KEY `idx-log-ip` (`ip_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- 5. Data Awal Kategori
-- --------------------------------------------------------
INSERT INTO `kategori` (`id`, `nama`, `slug`, `keterangan`, `created_at`) VALUES
(1, 'Informatika & Ilmu Komputer', 'informatika-ilmu-komputer', 'Buku-buku seputar algoritma, pemrograman, sistem informasi, dan komputasi cerdas.', NOW()),
(2, 'Kecerdasan Buatan & Data Science', 'kecerdasan-buatan-data-science', 'Pembahasan mendalam tentang machine learning, deep learning, big data, dan analitika data.', NOW()),
(3, 'Jaringan & Keamanan Siber', 'jaringan-keamanan-siber', 'Infrastruktur cloud, pertahanan cyber, kriptografi, dan administrasi server.', NOW()),
(4, 'Pendidikan & Metodologi Penelitian', 'pendidikan-metodologi-penelitian', 'Panduan penulisan ilmiah, strategi pedagogi, dan rancangan riset akademik.', NOW()),
(5, 'Ekonomi & Manajemen Digital', 'ekonomi-manajemen-digital', 'Transformasi bisnis digital, technopreneurship, dan manajemen proyek.', NOW()),
(6, 'Hukum Siber & Etika Profesi', 'hukum-siber-etika-profesi', 'Regulasi perlindungan data pribadi, HAKI, dan kepatuhan hukum dunia siber.', NOW());

-- --------------------------------------------------------
-- 6. Data Awal 8 Buku Dummy
-- --------------------------------------------------------
INSERT INTO `buku` (`id`, `judul`, `slug`, `penulis`, `editor`, `jumlah_halaman`, `isbn`, `harga`, `sinopsis`, `link_tokopedia`, `link_shopee`, `link_google_book`, `link_google_play`, `cover`, `kategori_id`, `keterangan`, `created_at`, `updated_at`) VALUES
(1, 'Dasar Pemrograman Python untuk Kecerdasan Buatan', 'dasar-pemrograman-python-untuk-kecerdasan-buatan', 'Dr. Tomy Satria Alasi, M.Kom.', 'Ir. Muhammad Ridwan, S.Kom., M.T.', 284, '978-623-98701-0-1', 88000.00, 'Buku ini menyajikan fondasi komprehensif sintaks bahasa Python dari tingkat dasar hingga penerapan nyata algoritma machine learning. Disertai studi kasus pengolahan data tabular, computer vision, serta perancangan model prediksi untuk riset akademik maupun industri.', 'https://tokopedia.com/aisu-press/python-ai', 'https://shopee.co.id/aisu-press/python-ai', 'https://books.google.com/books?id=sample_python_ai', 'https://play.google.com/store/books/details?id=sample_python_ai', 'dasar_pemrograman_python.jpg', 2, 'Buku Ajar Utama untuk Perguruan Tinggi dan Peneliti Pemula', NOW(), NOW()),
(2, 'Arsitektur Web Modern Berbasis Framework Yii2', 'arsitektur-web-modern-berbasis-framework-yii2', 'Budi Santoso, S.Kom., M.Kom.', 'Dr. Tomy Satria Alasi, M.Kom.', 312, '978-623-98701-1-8', 95000.00, 'Panduan terstruktur merancang arsitektur aplikasi web skala enterprise menggunakan Yii2 PHP Framework. Membahas MVC pattern, Active Record, ActiveDataProvider, optimasi query MySQL, keamanan RBAC, dan integrasi RESTful API modern.', 'https://tokopedia.com/aisu-press/yii2-modern', 'https://shopee.co.id/aisu-press/yii2-modern', 'https://books.google.com/books?id=sample_yii2', 'https://play.google.com/store/books/details?id=sample_yii2', 'arsitektur_web_yii2.jpg', 1, 'Edisi Revisi Lengkap Best Practice Rekayasa Web', NOW(), NOW()),
(3, 'Keamanan Siber dan Investigasi Forensik Digital', 'keamanan-siber-dan-investigasi-forensik-digital', 'Rizky Pratama, M.Cs. & Aulia Siregar, S.T.', 'Hendro Wijaya, M.Kom.', 260, '978-623-98701-2-5', 92000.00, 'Buku pegangan komprehensif bagi praktisi IT dan mahasiswa dalam mengidentifikasi serangan siber, penanganan insiden keamanan, ekstraksi bukti digital (digital forensics), analisis memori, serta teknik hardening server Linux dan Windows.', 'https://tokopedia.com/aisu-press/cybersecurity-forensics', 'https://shopee.co.id/aisu-press/cybersecurity-forensics', 'https://books.google.com/books?id=sample_cyber', 'https://play.google.com/store/books/details?id=sample_cyber', 'keamanan_siber_forensik.jpg', 3, 'Dilengkapi Studi Kasus Nyata Forensik Jaringan & Log Server', NOW(), NOW()),
(4, 'Metodologi Penelitian Terapan Bidang Informatika', 'metodologi-penelitian-terapan-bidang-informatika', 'Prof. Dr. Hermansyah, M.Sc.', 'Dr. Tomy Satria Alasi, M.Kom.', 220, '978-623-98701-3-2', 78000.00, 'Menuntun akademisi dan mahasiswa menyusun proposal tesis, skripsi, dan disertasi berkualitas tinggi. Mencakup rumusan masalah yang tajam, tinjauan pustaka sistematis (SLR), benchmarking algoritma, serta tips publikasi di jurnal bereputasi Scopus/Sinta.', 'https://tokopedia.com/aisu-press/metopen-informatika', 'https://shopee.co.id/aisu-press/metopen-informatika', 'https://books.google.com/books?id=sample_metopen', 'https://play.google.com/store/books/details?id=sample_metopen', 'metodologi_penelitian_terapan.jpg', 4, 'Rekomendasi Utama Dosen Pembimbing Skripsi dan Tesis', NOW(), NOW()),
(5, 'Transformasi Bisnis dan Technopreneurship Era Digital', 'transformasi-bisnis-dan-technopreneurship-era-digital', 'Siti Rahmawati, S.E., M.M.', 'Ferry Gunawan, M.B.A.', 240, '978-623-98701-4-9', 85000.00, 'Menjelajahi strategi membangun startup teknologi yang adaptif, validasi model bisnis lean canvas, customer acquisition, unit economics, dan implementasi ekosistem pembayaran digital di Indonesia.', 'https://tokopedia.com/aisu-press/technopreneurship', 'https://shopee.co.id/aisu-press/technopreneurship', 'https://books.google.com/books?id=sample_techno', 'https://play.google.com/store/books/details?id=sample_techno', 'technopreneurship_digital.jpg', 5, 'Panduan Praktis Pendiri Startup & Mahasiswa Bisnis', NOW(), NOW()),
(6, 'Hukum Perlindungan Data Pribadi dan Kejahatan Siber', 'hukum-perlindungan-data-pribadi-dan-kejahatan-siber', 'Andi Wijaya, S.H., M.H.', 'Novianti Lubis, S.H., M.Kn.', 276, '978-623-98701-5-6', 90000.00, 'Kajian komparatif Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia terhadap regulasi internasional (GDPR). Memberikan panduan kepatuhan hukum bagi korporasi teknologi, data protection officer (DPO), dan masyarakat umum.', 'https://tokopedia.com/aisu-press/uu-pdp-siber', 'https://shopee.co.id/aisu-press/uu-pdp-siber', 'https://books.google.com/books?id=sample_hukum_pdp', 'https://play.google.com/store/books/details?id=sample_hukum_pdp', 'hukum_data_pribadi.jpg', 6, 'Ulasan Kritis Implementasi UU PDP untuk Organisasi & Publik', NOW(), NOW()),
(7, 'Implementasi Jaringan Komputer Berbasis Mikrotik & Cisco', 'implementasi-jaringan-komputer-berbasis-mikrotik-cisco', 'Wahyu Hidayat, S.T., M.T.', 'Zulfikar Ahmad, S.Kom.', 340, '978-623-98701-6-3', 98000.00, 'Buku praktikum lengkap instalasi, konfigurasi routing OSPF/BGP, VLAN, firewall filter, Quality of Service (QoS), bandwidth management, dan monitoring jaringan enterprise menggunakan routerboard Mikrotik dan switch Cisco.', 'https://tokopedia.com/aisu-press/jaringan-mikrotik-cisco', 'https://shopee.co.id/aisu-press/jaringan-mikrotik-cisco', 'https://books.google.com/books?id=sample_mikrotik', 'https://play.google.com/store/books/details?id=sample_mikrotik', 'jaringan_mikrotik_cisco.jpg', 3, 'Edisi Laboratorium Lengkap dengan Topologi Praktik', NOW(), NOW()),
(8, 'Pengolahan Citra Medis dan Deteksi Dini Penyakit', 'pengolahan-citra-medis-dan-deteksi-dini-penyakit', 'Dr. Dian Anggraini, S.Si., M.Kom.', 'Dr. Tomy Satria Alasi, M.Kom.', 296, '978-623-98701-7-0', 96000.00, 'Buku monograf yang mengupas inovasi pengolahan citra digital MRI dan CT-Scan untuk deteksi lesi dan kelainan organ. Memadukan segmentasi gambar tingkat lanjut, Convolutional Neural Networks (CNN), dan validasi klinis medis.', 'https://tokopedia.com/aisu-press/citra-medis-ai', 'https://shopee.co.id/aisu-press/citra-medis-ai', 'https://books.google.com/books?id=sample_citra_medis', 'https://play.google.com/store/books/details?id=sample_citra_medis', 'pengolahan_citra_medis.jpg', 2, 'Riset Kolaboratif Komputasi Medis dan Kecerdasan Buatan', NOW(), NOW());

-- --------------------------------------------------------
-- 7. Data Awal Statistik Pengunjung (14 Hari)
-- --------------------------------------------------------
INSERT INTO `pengunjung` (`tanggal`, `total_hits`, `created_at`, `updated_at`) VALUES
(CURDATE(), 148, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 1 DAY), 215, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 2 DAY), 198, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 3 DAY), 176, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 4 DAY), 230, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 5 DAY), 164, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 6 DAY), 189, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 7 DAY), 152, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 8 DAY), 143, NOW(), NOW()),
(DATE_SUB(CURDATE(), INTERVAL 9 DAY), 180, NOW(), NOW());

SET FOREIGN_KEY_CHECKS = 1;
