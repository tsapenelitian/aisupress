<?php

/** @var yii\web\View $this */
/** @var app\models\Buku[] $bukuTerbaru */
/** @var array $statistik */
/** @var int $totalBuku */
/** @var app\models\Kategori[] $kategoriList */

use yii\helpers\Html;
use yii\helpers\Url;

$this->title = 'Beranda Penerbit Buku Resmi';
$this->registerMetaTag([
    'name' => 'description',
    'content' => 'Penerbit Asosiasi Informatika Sumatera Utara (AISU) menerbitkan buku untuk umum di semua bidang ilmu. Resmi, ber-ISBN, cepat dan berkualitas.',
]);
$this->registerMetaTag([
    'name' => 'keywords',
    'content' => 'penerbit aisu, buku informatika, penerbit buku sumatera utara, cetak buku ber-isbn, publikasi ilmiah',
]);
?>

<div class="site-index">
    <!-- Hero Banner Bersih & Ringan -->
    <section class="hero-section" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:28px 24px; margin-bottom:24px;">
        <h1 style="font-size:1.6rem; font-weight:700; color:#1a202c; margin-bottom:8px; line-height:1.3;">
            Penerbit Asosiasi Informatika Sumatera Utara
        </h1>
        <p style="font-size:1rem; color:#4a5568; max-width:850px; line-height:1.6; margin-bottom:16px;">
            Menerbitkan buku untuk umum di semua bidang ilmu pengetahuan, teknologi, sains, pendidikan, manajemen, dan sosial humaniora. Siap mendampingi dosen, peneliti, praktisi, dan penulis umum meraih karya berstandar nasional dan ber-ISBN resmi Perpustakaan Nasional RI.
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:12px;">
            <a href="<?= Url::to(['/site/katalog']) ?>" class="btn btn-primary">Lihat Katalog Buku</a>
            <a href="<?= Url::to(['/site/pengiriman']) ?>" class="btn btn-secondary">Informasi Pengiriman</a>
            <a href="https://wa.me/<?= Html::encode(Yii::$app->params['whatsapp']) ?>?text=Halo%20Penerbit%20AISU,%20saya%20ingin%20konsultasi%20penerbitan%20buku" target="_blank" rel="noopener" class="btn" style="background:#03ac0e; color:#fff;">Konsultasi Terbit via WA</a>
        </div>
    </section>

    <!-- Statistik Pengunjung Real-Time -->
    <section class="stats-banner" aria-label="Statistik Pengunjung">
        <h2 style="font-size:1.05rem; font-weight:600; margin-bottom:12px; color:#2d3748;">
            Statistik Kunjungan & Publikasi Penerbit
        </h2>
        <div class="stats-grid">
            <div class="stat-box">
                <div class="stat-value"><?= number_format($statistik['hariIni']) ?></div>
                <div class="stat-label">Pengunjung Hari Ini</div>
            </div>
            <div class="stat-box">
                <div class="stat-value"><?= number_format($statistik['mingguIni']) ?></div>
                <div class="stat-label">Pengunjung Minggu Ini</div>
            </div>
            <div class="stat-box">
                <div class="stat-value"><?= number_format($statistik['bulanIni']) ?></div>
                <div class="stat-label">Pengunjung Bulan Ini</div>
            </div>
            <div class="stat-box">
                <div class="stat-value"><?= number_format($statistik['total']) ?></div>
                <div class="stat-label">Total Kunjungan</div>
            </div>
        </div>
    </section>

    <!-- Highlight Buku Terbaru (6 - 8 Buku) -->
    <section class="latest-books" style="margin-top:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div>
                <h2 style="font-size:1.3rem; font-weight:700; color:#1a202c;">Buku Terbaru Terbitan AISU</h2>
                <p style="font-size:0.875rem; color:#718096;">Koleksi buku terkini dari berbagai disiplin ilmu ber-ISBN resmi</p>
            </div>
            <a href="<?= Url::to(['/site/katalog']) ?>" style="font-weight:600; font-size:0.875rem;">Semua Buku &rarr;</a>
        </div>

        <div class="book-grid">
            <?php foreach ($bukuTerbaru as $buku): ?>
                <article class="book-card">
                    <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>" class="book-cover-wrap" title="<?= Html::encode($buku->judul) ?>">
                        <img 
                            src="<?= Html::encode($buku->getCoverUrl()) ?>" 
                            alt="Cover buku <?= Html::encode($buku->judul) ?>"
                            loading="lazy"
                            decoding="async"
                            class="book-cover"
                            width="240"
                            height="320"
                        >
                    </a>
                    <div class="book-body">
                        <span class="book-category"><?= Html::encode($buku->kategori ? $buku->kategori->nama : 'Umum') ?></span>
                        <h3 class="book-title">
                            <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>">
                                <?= Html::encode($buku->judul) ?>
                            </a>
                        </h3>
                        <p class="book-author">Oleh: <?= Html::encode($buku->penulis) ?></p>
                        <div class="book-footer">
                            <span class="book-price"><?= Html::encode($buku->getFormattedHarga()) ?></span>
                            <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>" class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem;">Detail</a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- Daftar Kategori Bidang Ilmu -->
    <section class="category-section" style="margin-top:36px; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:20px;">
        <h2 style="font-size:1.15rem; font-weight:700; color:#1a202c; margin-bottom:12px;">Bidang Ilmu Penerbitan</h2>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
            <?php foreach ($kategoriList as $cat): ?>
                <a href="<?= Url::to(['/site/katalog', 'kategori' => $cat->slug]) ?>" class="btn btn-secondary" style="font-size:0.825rem; font-weight:500;">
                    <?= Html::encode($cat->nama) ?>
                </a>
            <?php endforeach; ?>
        </div>
    </section>
</div>
