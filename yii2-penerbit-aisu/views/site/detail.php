<?php

/** @var yii\web\View $this */
/** @var app\models\Buku $model */
/** @var app\models\Buku[] $bukuTerkait */

use yii\helpers\Html;
use yii\helpers\Url;

$this->title = $model->judul . ' - ' . $model->penulis;

// Extreme Unique SEO Meta Tags
$this->registerMetaTag([
    'name' => 'description',
    'content' => mb_substr(strip_tags($model->sinopsis), 0, 155) . '...',
]);
$this->registerMetaTag([
    'name' => 'keywords',
    'content' => implode(', ', [
        $model->judul,
        $model->penulis,
        'ISBN ' . $model->isbn,
        $model->kategori ? $model->kategori->nama : 'Buku Ilmiah',
        'Penerbit AISU',
        'Buku Original'
    ]),
]);

// Open Graph Product / Book Tags
$canonicalUrl = Url::to(['/site/detail', 'slug' => $model->slug], true);
$this->registerMetaTag(['property' => 'og:type', 'content' => 'book']);
$this->registerMetaTag(['property' => 'og:title', 'content' => $model->judul]);
$this->registerMetaTag(['property' => 'og:description', 'content' => mb_substr(strip_tags($model->sinopsis), 0, 150)]);
$this->registerMetaTag(['property' => 'og:url', 'content' => $canonicalUrl]);
$this->registerMetaTag(['property' => 'og:image', 'content' => $model->getCoverUrl()]);

// Injeksi Schema.org Book JSON-LD
$this->registerJs(
    $model->getSchemaJsonLd(),
    \yii\web\View::POS_HEAD,
    'jsonld-book-' . $model->id
);
?>

<div class="site-detail">
    <!-- Breadcrumb Sederhana -->
    <nav aria-label="Breadcrumb" style="margin-bottom:16px; font-size:0.825rem; color:#718096;">
        <a href="<?= Url::to(['/site/index']) ?>">Beranda</a> &raquo;
        <a href="<?= Url::to(['/site/katalog']) ?>">Katalog</a> &raquo;
        <?php if ($model->kategori): ?>
            <a href="<?= Url::to(['/site/katalog', 'kategori' => $model->kategori->slug]) ?>"><?= Html::encode($model->kategori->nama) ?></a> &raquo;
        <?php endif; ?>
        <span style="color:#2d3748;"><?= Html::encode($model->judul) ?></span>
    </nav>

    <!-- Schema.org JSON-LD Script Tag untuk Mesin Pencari Google -->
    <script type="application/ld+json">
    <?= $model->getSchemaJsonLd() ?>
    </script>

    <!-- Layout Detail Buku -->
    <article class="detail-layout">
        <!-- Kolom Kiri: Cover Buku -->
        <div class="detail-cover-col">
            <img 
                src="<?= Html::encode($model->getCoverUrl()) ?>" 
                alt="Cover buku <?= Html::encode($model->judul) ?>"
                loading="lazy"
                decoding="async"
                class="detail-cover"
                width="280"
                height="380"
            >
            <div style="margin-top:12px; font-size:0.75rem; color:#718096; text-align:center;">
                Format: Buku Cetak (Paperback)
            </div>
        </div>

        <!-- Kolom Kanan: Informasi Lengkap & Spesifikasi -->
        <div class="detail-info-col">
            <span style="font-size:0.8rem; font-weight:600; color:#2b6cb0; text-transform:uppercase; letter-spacing:0.05em;">
                <?= Html::encode($model->kategori ? $model->kategori->nama : 'Umum') ?>
            </span>
            <h1 style="font-size:1.5rem; font-weight:700; color:#1a202c; line-height:1.3; margin:6px 0 12px 0;">
                <?= Html::encode($model->judul) ?>
            </h1>

            <div style="font-size:1.35rem; font-weight:700; color:#2b6cb0; margin-bottom:16px; font-variant-numeric:tabular-nums;">
                <?= Html::encode($model->getFormattedHarga()) ?>
            </div>

            <!-- Tabel Spesifikasi Teknis Buku -->
            <table class="detail-meta-table">
                <tbody>
                    <tr>
                        <th>Penulis</th>
                        <td><strong><?= Html::encode($model->penulis) ?></strong></td>
                    </tr>
                    <?php if (!empty($model->editor)): ?>
                        <tr>
                            <th>Editor</th>
                            <td><?= Html::encode($model->editor) ?></td>
                        </tr>
                    <?php endif; ?>
                    <tr>
                        <th>Nomor ISBN</th>
                        <td><code><?= Html::encode($model->isbn) ?></code></td>
                    </tr>
                    <tr>
                        <th>Jumlah Halaman</th>
                        <td><?= (int) $model->jumlah_halaman ?> Halaman</td>
                    </tr>
                    <tr>
                        <th>Kategori</th>
                        <td><?= Html::encode($model->kategori ? $model->kategori->nama : '-') ?></td>
                    </tr>
                    <?php if (!empty($model->keterangan)): ?>
                        <tr>
                            <th>Keterangan</th>
                            <td><?= Html::encode($model->keterangan) ?></td>
                        </tr>
                    <?php endif; ?>
                    <tr>
                        <th>Penerbit</th>
                        <td><?= Html::encode(Yii::$app->params['namaPenerbit']) ?></td>
                    </tr>
                </tbody>
            </table>

            <!-- Sinopsis Buku -->
            <div style="margin-top:20px;">
                <h2 style="font-size:1.1rem; font-weight:600; color:#1a202c; margin-bottom:8px;">Sinopsis Buku</h2>
                <div style="font-size:0.925rem; line-height:1.7; color:#374151; white-space:pre-line;">
                    <?= Html::encode($model->sinopsis) ?>
                </div>
            </div>

            <!-- Link Pembelian Marketplace & Digital Play -->
            <div class="purchase-zone">
                <h3 style="font-size:0.95rem; font-weight:600; color:#1a202c; margin-bottom:8px;">Pilihan Pembelian Resmi:</h3>
                <div class="purchase-buttons">
                    <?php if (!empty($model->link_tokopedia)): ?>
                        <a href="<?= Html::encode($model->link_tokopedia) ?>" target="_blank" rel="noopener nofollow" class="btn-store btn-tokopedia">Beli di Tokopedia</a>
                    <?php endif; ?>

                    <?php if (!empty($model->link_shopee)): ?>
                        <a href="<?= Html::encode($model->link_shopee) ?>" target="_blank" rel="noopener nofollow" class="btn-store btn-shopee">Beli di Shopee</a>
                    <?php endif; ?>

                    <?php if (!empty($model->link_google_book)): ?>
                        <a href="<?= Html::encode($model->link_google_book) ?>" target="_blank" rel="noopener nofollow" class="btn-store btn-google">Google Books</a>
                    <?php endif; ?>

                    <?php if (!empty($model->link_google_play)): ?>
                        <a href="<?= Html::encode($model->link_google_play) ?>" target="_blank" rel="noopener nofollow" class="btn-store btn-play">Google Play Books</a>
                    <?php endif; ?>

                    <!-- Pemesanan Langsung via WhatsApp Penerbit -->
                    <a href="https://wa.me/<?= Html::encode(Yii::$app->params['whatsapp']) ?>?text=Halo%20Penerbit%20AISU,%20saya%20ingin%20memesan%20buku:%20<?= urlencode($model->judul) ?>%20(ISBN:%20<?= urlencode($model->isbn) ?>)" target="_blank" rel="noopener" class="btn" style="background:#25d366; color:#fff;">
                        Pesan via WhatsApp
                    </a>
                </div>
            </div>
        </div>
    </article>

    <!-- Buku Terkait Dalam Kategori yang Sama -->
    <?php if (!empty($bukuTerkait)): ?>
        <section style="margin-top:36px;">
            <h2 style="font-size:1.15rem; font-weight:700; color:#1a202c; margin-bottom:16px;">Buku Terkait Lainnya</h2>
            <div class="book-grid">
                <?php foreach ($bukuTerkait as $buku): ?>
                    <article class="book-card">
                        <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>" class="book-cover-wrap">
                            <img 
                                src="<?= Html::encode($buku->getCoverUrl()) ?>" 
                                alt="<?= Html::encode($buku->judul) ?>"
                                loading="lazy"
                                decoding="async"
                                class="book-cover"
                            >
                        </a>
                        <div class="book-body">
                            <h3 class="book-title" style="font-size:0.875rem;">
                                <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>"><?= Html::encode($buku->judul) ?></a>
                            </h3>
                            <div class="book-footer">
                                <span class="book-price" style="font-size:0.85rem;"><?= Html::encode($buku->getFormattedHarga()) ?></span>
                            </div>
                        </div>
                    </article>
                <?php endforeach; ?>
            </div>
        </section>
    <?php endif; ?>
</div>
