<?php

/** @var yii\web\View $this */
/** @var app\models\BukuSearch $searchModel */
/** @var yii\data\ActiveDataProvider $dataProvider */
/** @var array $kategoriList */

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\GridView;

$this->title = 'Kelola Buku - Administrator';
?>

<div class="buku-index">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
            <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
            <p style="font-size:0.875rem; color:#718096;">Total Koleksi: <?= $dataProvider->getTotalCount() ?> judul buku</p>
        </div>
        <?= Html::a('+ Tambah Buku Baru', ['create'], ['class' => 'btn btn-primary']) ?>
    </div>

    <!-- Tabel Data Buku -->
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; overflow-x:auto;">
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width:50px;">#</th>
                    <th style="width:70px;">Cover</th>
                    <th>Judul & Penulis</th>
                    <th>Kategori</th>
                    <th>ISBN</th>
                    <th>Harga</th>
                    <th style="width:160px;">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($dataProvider->getCount() > 0): ?>
                    <?php $no = $dataProvider->pagination->page * $dataProvider->pagination->pageSize + 1; ?>
                    <?php foreach ($dataProvider->getModels() as $model): ?>
                        <tr>
                            <td><?= $no++ ?></td>
                            <td>
                                <img src="<?= Html::encode($model->getCoverUrl()) ?>" alt="Cover" style="width:48px; height:64px; object-fit:cover; border:1px solid #cbd5e0; border-radius:2px;">
                            </td>
                            <td>
                                <strong><?= Html::encode($model->judul) ?></strong><br>
                                <span style="font-size:0.8rem; color:#718096;">Penulis: <?= Html::encode($model->penulis) ?></span>
                                <?php if ($model->editor): ?>
                                    <span style="font-size:0.8rem; color:#a0aec0;"> | Ed: <?= Html::encode($model->editor) ?></span>
                                <?php endif; ?>
                            </td>
                            <td><?= Html::encode($model->kategori ? $model->kategori->nama : '-') ?></td>
                            <td><code><?= Html::encode($model->isbn) ?></code></td>
                            <td style="font-weight:600; font-variant-numeric:tabular-nums;"><?= Html::encode($model->getFormattedHarga()) ?></td>
                            <td>
                                <div style="display:flex; gap:6px;">
                                    <?= Html::a('Lihat', ['view', 'id' => $model->id], ['class' => 'btn btn-secondary', 'style' => 'padding:4px 8px; font-size:0.75rem;']) ?>
                                    <?= Html::a('Edit', ['update', 'id' => $model->id], ['class' => 'btn btn-secondary', 'style' => 'padding:4px 8px; font-size:0.75rem;']) ?>
                                    <?= Html::a('Hapus', ['delete', 'id' => $model->id], [
                                        'class' => 'btn btn-danger',
                                        'style' => 'padding:4px 8px; font-size:0.75rem;',
                                        'data' => [
                                            'confirm' => 'Yakin ingin menghapus buku "' . $model->judul . '"?',
                                            'method' => 'post',
                                        ],
                                    ]) ?>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="7" style="text-align:center; padding:24px; color:#718096;">Belum ada data buku.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
