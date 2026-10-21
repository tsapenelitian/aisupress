<?php

use yii\db\Migration;

/**
 * Class m231021_000005_seed_data
 * Seeds initial categories and 8 comprehensive books across various fields.
 */
class m231021_000005_seed_data extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $now = date('Y-m-d H:i:s');

        // 1. Seed Kategori
        $categories = [
            ['id' => 1, 'nama' => 'Informatika & Ilmu Komputer', 'slug' => 'informatika-ilmu-komputer', 'keterangan' => 'Buku-buku seputar algoritma, pemrograman, sistem informasi, dan komputasi cerdas.', 'created_at' => $now],
            ['id' => 2, 'nama' => 'Kecerdasan Buatan & Data Science', 'slug' => 'kecerdasan-buatan-data-science', 'keterangan' => 'Pembahasan mendalam tentang machine learning, deep learning, big data, dan analitika data.', 'created_at' => $now],
            ['id' => 3, 'nama' => 'Jaringan & Keamanan Siber', 'slug' => 'jaringan-keamanan-siber', 'keterangan' => 'Infrastruktur cloud, pertahanan cyber, kriptografi, dan administrasi server.', 'created_at' => $now],
            ['id' => 4, 'nama' => 'Pendidikan & Metodologi Penelitian', 'slug' => 'pendidikan-metodologi-penelitian', 'keterangan' => 'Panduan penulisan ilmiah, strategi pedagogi, dan rancangan riset akademik.', 'created_at' => $now],
            ['id' => 5, 'nama' => 'Ekonomi & Manajemen Digital', 'slug' => 'ekonomi-manajemen-digital', 'keterangan' => 'Transformasi bisnis digital, technopreneurship, dan manajemen proyek.', 'created_at' => $now],
            ['id' => 6, 'nama' => 'Hukum Siber & Etika Profesi', 'slug' => 'hukum-siber-etika-profesi', 'keterangan' => 'Regulasi perlindungan data pribadi, HAKI, dan kepatuhan hukum dunia siber.', 'created_at' => $now],
        ];

        foreach ($categories as $cat) {
            $this->insert('{{%kategori}}', $cat);
        }

        // 2. Seed 8 Dummy Books
        $books = [
            [
                'judul' => 'Dasar Pemrograman Python untuk Kecerdasan Buatan',
                'slug' => 'dasar-pemrograman-python-untuk-kecerdasan-buatan',
                'penulis' => 'Dr. Tomy Satria Alasi, M.Kom.',
                'editor' => 'Ir. Muhammad Ridwan, S.Kom., M.T.',
                'jumlah_halaman' => 284,
                'isbn' => '978-623-98701-0-1',
                'harga' => 88000.00,
                'sinopsis' => 'Buku ini menyajikan fondasi komprehensif sintaks bahasa Python dari tingkat dasar hingga penerapan nyata algoritma machine learning. Disertai studi kasus pengolahan data tabular, computer vision, serta perancangan model prediksi untuk riset akademik maupun industri.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/python-ai',
                'link_shopee' => 'https://shopee.co.id/aisu-press/python-ai',
                'link_google_book' => 'https://books.google.com/books?id=sample_python_ai',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_python_ai',
                'cover' => 'dasar_pemrograman_python.jpg',
                'kategori_id' => 2,
                'keterangan' => 'Buku Ajar Utama untuk Perguruan Tinggi dan Peneliti Pemula',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Arsitektur Web Modern Berbasis Framework Yii2',
                'slug' => 'arsitektur-web-modern-berbasis-framework-yii2',
                'penulis' => 'Budi Santoso, S.Kom., M.Kom.',
                'editor' => 'Dr. Tomy Satria Alasi, M.Kom.',
                'jumlah_halaman' => 312,
                'isbn' => '978-623-98701-1-8',
                'harga' => 95000.00,
                'sinopsis' => 'Panduan terstruktur merancang arsitektur aplikasi web skala enterprise menggunakan Yii2 PHP Framework. Membahas MVC pattern, Active Record, ActiveDataProvider, optimasi query MySQL, keamanan RBAC, dan integrasi RESTful API modern.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/yii2-modern',
                'link_shopee' => 'https://shopee.co.id/aisu-press/yii2-modern',
                'link_google_book' => 'https://books.google.com/books?id=sample_yii2',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_yii2',
                'cover' => 'arsitektur_web_yii2.jpg',
                'kategori_id' => 1,
                'keterangan' => 'Edisi Revisi Lengkap Best Practice Rekayasa Web',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Keamanan Siber dan Investigasi Forensik Digital',
                'slug' => 'keamanan-siber-dan-investigasi-forensik-digital',
                'penulis' => 'Rizky Pratama, M.Cs. & Aulia Siregar, S.T.',
                'editor' => 'Hendro Wijaya, M.Kom.',
                'jumlah_halaman' => 260,
                'isbn' => '978-623-98701-2-5',
                'harga' => 92000.00,
                'sinopsis' => 'Buku pegangan komprehensif bagi praktisi IT dan mahasiswa dalam mengidentifikasi serangan siber, penanganan insiden keamanan, ekstraksi bukti digital (digital forensics), analisis memori, serta teknik hardening server Linux dan Windows.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/cybersecurity-forensics',
                'link_shopee' => 'https://shopee.co.id/aisu-press/cybersecurity-forensics',
                'link_google_book' => 'https://books.google.com/books?id=sample_cyber',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_cyber',
                'cover' => 'keamanan_siber_forensik.jpg',
                'kategori_id' => 3,
                'keterangan' => 'Dilengkapi Studi Kasus Nyata Forensik Jaringan & Log Server',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Metodologi Penelitian Terapan Bidang Informatika',
                'slug' => 'metodologi-penelitian-terapan-bidang-informatika',
                'penulis' => 'Prof. Dr. Hermansyah, M.Sc.',
                'editor' => 'Dr. Tomy Satria Alasi, M.Kom.',
                'jumlah_halaman' => 220,
                'isbn' => '978-623-98701-3-2',
                'harga' => 78000.00,
                'sinopsis' => 'Menuntun akademisi dan mahasiswa menyusun proposal tesis, skripsi, dan disertasi berkualitas tinggi. Mencakup rumusan masalah yang tajam, tinjauan pustaka sistematis (SLR), benchmarking algoritma, serta tips publikasi di jurnal bereputasi Scopus/Sinta.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/metopen-informatika',
                'link_shopee' => 'https://shopee.co.id/aisu-press/metopen-informatika',
                'link_google_book' => 'https://books.google.com/books?id=sample_metopen',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_metopen',
                'cover' => 'metodologi_penelitian_terapan.jpg',
                'kategori_id' => 4,
                'keterangan' => 'Rekomendasi Utama Dosen Pembimbing Skripsi dan Tesis',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Transformasi Bisnis dan Technopreneurship Era Digital',
                'slug' => 'transformasi-bisnis-dan-technopreneurship-era-digital',
                'penulis' => 'Siti Rahmawati, S.E., M.M.',
                'editor' => 'Ferry Gunawan, M.B.A.',
                'jumlah_halaman' => 240,
                'isbn' => '978-623-98701-4-9',
                'harga' => 85000.00,
                'sinopsis' => 'Menjelajahi strategi membangun startup teknologi yang adaptif, validasi model bisnis lean canvas, customer acquisition, unit economics, dan implementasi ekosistem pembayaran digital di Indonesia.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/technopreneurship',
                'link_shopee' => 'https://shopee.co.id/aisu-press/technopreneurship',
                'link_google_book' => 'https://books.google.com/books?id=sample_techno',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_techno',
                'cover' => 'technopreneurship_digital.jpg',
                'kategori_id' => 5,
                'keterangan' => 'Panduan Praktis Pendiri Startup & Mahasiswa Bisnis',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Hukum Perlindungan Data Pribadi dan Kejahatan Siber',
                'slug' => 'hukum-perlindungan-data-pribadi-dan-kejahatan-siber',
                'penulis' => 'Andi Wijaya, S.H., M.H.',
                'editor' => 'Novianti Lubis, S.H., M.Kn.',
                'jumlah_halaman' => 276,
                'isbn' => '978-623-98701-5-6',
                'harga' => 90000.00,
                'sinopsis' => 'Kajian komparatif Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia terhadap regulasi internasional (GDPR). Memberikan panduan kepatuhan hukum bagi korporasi teknologi, data protection officer (DPO), dan masyarakat umum.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/uu-pdp-siber',
                'link_shopee' => 'https://shopee.co.id/aisu-press/uu-pdp-siber',
                'link_google_book' => 'https://books.google.com/books?id=sample_hukum_pdp',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_hukum_pdp',
                'cover' => 'hukum_data_pribadi.jpg',
                'kategori_id' => 6,
                'keterangan' => 'Ulasan Kritis Implementasi UU PDP untuk Organisasi & Publik',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Implementasi Jaringan Komputer Berbasis Mikrotik & Cisco',
                'slug' => 'implementasi-jaringan-komputer-berbasis-mikrotik-cisco',
                'penulis' => 'Wahyu Hidayat, S.T., M.T.',
                'editor' => 'Zulfikar Ahmad, S.Kom.',
                'jumlah_halaman' => 340,
                'isbn' => '978-623-98701-6-3',
                'harga' => 98000.00,
                'sinopsis' => 'Buku praktikum lengkap instalasi, konfigurasi routing OSPF/BGP, VLAN, firewall filter, Quality of Service (QoS), bandwidth management, dan monitoring jaringan enterprise menggunakan routerboard Mikrotik dan switch Cisco.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/jaringan-mikrotik-cisco',
                'link_shopee' => 'https://shopee.co.id/aisu-press/jaringan-mikrotik-cisco',
                'link_google_book' => 'https://books.google.com/books?id=sample_mikrotik',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_mikrotik',
                'cover' => 'jaringan_mikrotik_cisco.jpg',
                'kategori_id' => 3,
                'keterangan' => 'Edisi Laboratorium Lengkap dengan Topologi Praktik',
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'judul' => 'Pengolahan Citra Medis dan Deteksi Dini Penyakit',
                'slug' => 'pengolahan-citra-medis-dan-deteksi-dini-penyakit',
                'penulis' => 'Dr. Dian Anggraini, S.Si., M.Kom.',
                'editor' => 'Dr. Tomy Satria Alasi, M.Kom.',
                'jumlah_halaman' => 296,
                'isbn' => '978-623-98701-7-0',
                'harga' => 96000.00,
                'sinopsis' => 'Buku monograf yang mengupas inovasi pengolahan citra digital MRI dan CT-Scan untuk deteksi lesi dan kelainan organ. Memadukan segmentasi gambar tingkat lanjut, Convolutional Neural Networks (CNN), dan validasi klinis medis.',
                'link_tokopedia' => 'https://tokopedia.com/aisu-press/citra-medis-ai',
                'link_shopee' => 'https://shopee.co.id/aisu-press/citra-medis-ai',
                'link_google_book' => 'https://books.google.com/books?id=sample_citra_medis',
                'link_google_play' => 'https://play.google.com/store/books/details?id=sample_citra_medis',
                'cover' => 'pengolahan_citra_medis.jpg',
                'kategori_id' => 2,
                'keterangan' => 'Riset Kolaboratif Komputasi Medis dan Kecerdasan Buatan',
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        foreach ($books as $book) {
            $this->insert('{{%buku}}', $book);
        }

        // 3. Seed Sample Visitor Statistics
        for ($i = 14; $i >= 0; $i--) {
            $date = date('Y-m-d', strtotime("-$i days"));
            $hits = rand(45, 180);
            $this->insert('{{%pengunjung}}', [
                'tanggal' => $date,
                'total_hits' => $hits,
                'created_at' => $date . ' 00:00:00',
                'updated_at' => $date . ' 23:59:59',
            ]);
        }
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->truncateTable('{{%buku}}');
        $this->truncateTable('{{%kategori}}');
        $this->truncateTable('{{%pengunjung}}');
    }
}
