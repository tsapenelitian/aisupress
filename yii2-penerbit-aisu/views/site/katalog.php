<?php

/** @var yii\web\View $this */
/** @var app\models\BukuSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */
/** @var app\models\Kategori[] $kategoriList */
/** @var string|null $currentSlug */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\widgets\LinkPager;

$this->title = 'Katalog Buku Lengkap - Semua Bidang Ilmu';
$this->registerMetaTag([
    'name' => 'description',
    'content' => 'Jelajahi katalog buku terbitan Asosiasi Informatika Sumatera Utara. Temukan buku referensi, ajar, dan umum dengan pencarian judul, penulis, dan ISBN.',
]);
?>

<div class="site-katalog">
    <div style="margin-bottom:20px;">
        <h1 style="font-size:1.5rem; font-weight:700; color:#1a202c; margin-bottom:4px;">Katalog Buku Penerbit</h1>
        <p style="font-size:0.875rem; color:#718096;">Menampilkan koleksi buku resmi berkualitas dengan sistem pencarian cepat.</p>
    </div>

    <!-- Filter & Pencarian Bar -->
    <div class="filter-bar">
        <form method="get" action="<?= Url::to(['/site/katalog']) ?>" class="filter-form">
            <!-- Keyword Input -->
            <div style="flex:2; min-width:200px;">
                <input 
                    type="text" 
                    name="BukuSearch[keyword]" 
                    value="<?= Html::encode($searchModel->keyword) ?>" 
                    class="form-control" 
                    placeholder="Ketik kata kunci pencarian..." 
                    style="width:100%;"
                >
            </div>

            <!-- Tipe Pencarian: Judul, Penulis, ISBN -->
            <div style="flex:1; min-width:140px;">
                <select name="BukuSearch[search_by]" class="form-control" style="width:100%;">
                    <option value="">Semua Kolom</option>
                    <option value="judul" <?= $searchModel->search_by === 'judul' ? 'selected' : '' ?>>Berdasarkan Judul</option>
                    <option value="penulis" <?= $searchModel->search_by === 'penulis' ? 'selected' : '' ?>>Berdasarkan Penulis</option>
                    <option value="isbn" <?= $searchModel->search_by === 'isbn' ? 'selected' : '' ?>>Berdasarkan ISBN</option>
                </select>
            </div>

            <!-- Filter Kategori -->
            <div style="flex:1; min-width:160px;">
                <select name="BukuSearch[kategori_id]" class="form-control" style="width:100%;">
                    <option value="">Semua Kategori</option>
                    <?php foreach ($kategoriList as $cat): ?>
                        <option value="<?= $cat->id ?>" <?= (string)$searchModel->kategori_id === (string)$cat->id ? 'selected' : '' ?>>
                            <?= Html::encode($cat->nama) ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </div>

            <!-- Sorting Dropdown -->
            <div style="flex:1; min-width:140px;">
                <select name="BukuSearch[sort_by]" class="form-control" style="width:100%;">
                    <option value="terbaru" <?= $searchModel->sort_by === 'terbaru' ? 'selected' : '' ?>>Terbaru</option>
                    <option value="harga_asc" <?= $searchModel->sort_by === 'harga_asc' ? 'selected' : '' ?>>Harga Terendah</option>
                    <option value="harga_desc" <?= $searchModel->sort_by === 'harga_desc' ? 'selected' : '' ?>>Harga Tertinggi</option>
                    <option value="judul_asc" <?= $searchModel->sort_by === 'judul_asc' ? 'selected' : '' ?>>Judul A-Z</option>
                </select>
            </div>

            <!-- Tombol Aksi -->
            <div>
                <button type="submit" class="btn btn-primary">Cari & Saring</button>
                <a href="<?= Url::to(['/site/katalog']) ?>" class="btn btn-secondary">Reset</a>
            </div>
        </form>
    </div>

    <!-- Ringkasan Hasil & Grid Buku -->
    <div style="margin-bottom:12px; font-size:0.875rem; color:#4a5568;">
        Menemukan <strong><?= $dataProvider->getTotalCount() ?></strong> buku yang sesuai.
    </div>

    <?php if ($dataProvider->getCount() > 0): ?>
        <div class="book-grid">
            <?php foreach ($dataProvider->getModels() as $buku): ?>
                <article class="book-card">
                    <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>" class="book-cover-wrap" title="<?= Html::encode($buku->judul) ?>">
                        <img 
                            src="<?= Html::encode($buku->getCoverUrl()) ?>" 
                            alt="Cover <?= Html::encode($buku->judul) ?>"
                            loading="lazy"
                            decoding="async"
                            class="book-cover"
                            width="240"
                            height="320"
                        >
                    </a>
                    <div class="book-body">
                        <span class="book-category"><?= Html::encode($buku->kategori ? $buku->kategori->nama : 'Umum') ?></span>
                        <h2 class="book-title" style="font-size:0.95rem;">
                            <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>">
                                <?= Html::encode($buku->judul) ?>
                            </a>
                        </h2>
                        <p class="book-author">Oleh: <?= Html::encode($buku->penulis) ?></p>
                        <p style="font-size:0.75rem; color:#718096; margin-bottom:8px;">ISBN: <?= Html::encode($buku->isbn) ?></p>
                        <div class="book-footer">
                            <span class="book-price"><?= Html::encode($buku->getFormattedHarga()) ?></span>
                            <a href="<?= Url::to(['/site/detail', 'slug' => $buku->slug]) ?>" class="btn btn-secondary" style="padding:4px 8px; font-size:0.75rem;">Detail Buku</a>
                        </div>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>

        <!-- Pagination Sederhana -->
        <div style="margin-top:28px; display:flex; justify-content:center;">
            <?= LinkPager::widget([
                'pagination' => $dataProvider->pagination,
                'options' => ['class' => 'pagination', 'style' => 'display:flex; list-style:none; gap:6px;'],
                'linkContainerOptions' => ['class' => 'page-item'],
                'linkOptions' => ['class' => 'btn btn-secondary', 'style' => 'padding:6px 12px;'],
                'prevPageLabel' => '&laquo; Sebelumnya',
                'nextPageLabel' => 'Berikutnya &raquo;',
            ]) ?>
        </div>
    <?php else: ?>
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:32px; text-align:center; color:#718096;">
            <p style="font-size:1.1rem; margin-bottom:8px;">Tidak ada buku yang sesuai dengan kriteria pencarian Anda.</p>
            <p style="font-size:0.875rem;">Silakan periksa kembali ejaan kata kunci atau klik tombol Reset di atas.</p>
        </div>
    <?php endif; ?>
</div>
