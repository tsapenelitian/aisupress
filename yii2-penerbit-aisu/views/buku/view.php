<?php

use yii\helpers\Html;
use yii\helpers\Url;

/** @var yii\web\View $this */
/** @var app\models\Buku $model */

$this->title = $model->judul;
?>
<div class="buku-view">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
        <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
        <div style="display:flex; gap:8px;">
            <?= Html::a('Lihat di Website', ['/site/detail', 'slug' => $model->slug], ['class' => 'btn btn-secondary', 'target' => '_blank']) ?>
            <?= Html::a('Edit', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
            <?= Html::a('Kembali', ['index'], ['class' => 'btn btn-secondary']) ?>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:240px 1fr; gap:20px; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:20px;">
        <div>
            <img src="<?= Html::encode($model->getCoverUrl()) ?>" alt="Cover" style="width:100%; border:1px solid #cbd5e0; border-radius:4px;">
            <p style="font-size:0.75rem; color:#718096; margin-top:8px; text-align:center;">File: <?= Html::encode($model->cover ?: 'default') ?></p>
        </div>

        <div>
            <table class="data-table">
                <tbody>
                    <tr>
                        <th style="width:160px;">ID</th>
                        <td><?= $model->id ?></td>
                    </tr>
                    <tr>
                        <th>Judul</th>
                        <td><strong><?= Html::encode($model->judul) ?></strong></td>
                    </tr>
                    <tr>
                        <th>Slug URL</th>
                        <td><code><?= Html::encode($model->slug) ?></code></td>
                    </tr>
                    <tr>
                        <th>Kategori</th>
                        <td><?= Html::encode($model->kategori ? $model->kategori->nama : '-') ?></td>
                    </tr>
                    <tr>
                        <th>Penulis</th>
                        <td><?= Html::encode($model->penulis) ?></td>
                    </tr>
                    <tr>
                        <th>Editor</th>
                        <td><?= Html::encode($model->editor ?: '-') ?></td>
                    </tr>
                    <tr>
                        <th>ISBN</th>
                        <td><code><?= Html::encode($model->isbn) ?></code></td>
                    </tr>
                    <tr>
                        <th>Jumlah Halaman</th>
                        <td><?= $model->jumlah_halaman ?> Halaman</td>
                    </tr>
                    <tr>
                        <th>Harga</th>
                        <td><strong><?= Html::encode($model->getFormattedHarga()) ?></strong></td>
                    </tr>
                    <tr>
                        <th>Sinopsis</th>
                        <td><div style="max-height:160px; overflow-y:auto; font-size:0.85rem; line-height:1.6;"><?= nl2br(Html::encode($model->sinopsis)) ?></div></td>
                    </tr>
                    <tr>
                        <th>Tokopedia</th>
                        <td><?= $model->link_tokopedia ? Html::a(Html::encode($model->link_tokopedia), $model->link_tokopedia, ['target' => '_blank']) : '-' ?></td>
                    </tr>
                    <tr>
                        <th>Shopee</th>
                        <td><?= $model->link_shopee ? Html::a(Html::encode($model->link_shopee), $model->link_shopee, ['target' => '_blank']) : '-' ?></td>
                    </tr>
                    <tr>
                        <th>Google Books</th>
                        <td><?= $model->link_google_book ? Html::a(Html::encode($model->link_google_book), $model->link_google_book, ['target' => '_blank']) : '-' ?></td>
                    </tr>
                    <tr>
                        <th>Google Play</th>
                        <td><?= $model->link_google_play ? Html::a(Html::encode($model->link_google_play), $model->link_google_play, ['target' => '_blank']) : '-' ?></td>
                    </tr>
                    <tr>
                        <th>Keterangan</th>
                        <td><?= Html::encode($model->keterangan ?: '-') ?></td>
                    </tr>
                    <tr>
                        <th>Waktu Dibuat</th>
                        <td><?= Html::encode($model->created_at) ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
