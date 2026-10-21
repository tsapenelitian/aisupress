<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var yii\data\ActiveDataProvider $dataProvider */

$this->title = 'Kelola Kategori Bidang Ilmu';
?>
<div class="kategori-index">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
        <div>
            <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
            <p style="font-size:0.875rem; color:#718096;">Total Kategori: <?= $dataProvider->getTotalCount() ?> kategori</p>
        </div>
        <?= Html::a('+ Tambah Kategori', ['create'], ['class' => 'btn btn-primary']) ?>
    </div>

    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; overflow-x:auto;">
        <table class="data-table">
            <thead>
                <tr>
                    <th style="width:50px;">#</th>
                    <th>Nama Kategori</th>
                    <th>Slug URL</th>
                    <th>Jumlah Buku</th>
                    <th>Keterangan</th>
                    <th style="width:140px;">Aksi</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($dataProvider->getCount() > 0): ?>
                    <?php $no = 1; ?>
                    <?php foreach ($dataProvider->getModels() as $model): ?>
                        <tr>
                            <td><?= $no++ ?></td>
                            <td><strong><?= Html::encode($model->nama) ?></strong></td>
                            <td><code><?= Html::encode($model->slug) ?></code></td>
                            <td><strong><?= $model->getTotalBuku() ?></strong> buku</td>
                            <td style="font-size:0.8rem; color:#718096;"><?= Html::encode($model->keterangan ?: '-') ?></td>
                            <td>
                                <div style="display:flex; gap:6px;">
                                    <?= Html::a('Edit', ['update', 'id' => $model->id], ['class' => 'btn btn-secondary', 'style' => 'padding:4px 8px; font-size:0.75rem;']) ?>
                                    <?= Html::a('Hapus', ['delete', 'id' => $model->id], [
                                        'class' => 'btn btn-danger',
                                        'style' => 'padding:4px 8px; font-size:0.75rem;',
                                        'data' => [
                                            'confirm' => 'Yakin ingin menghapus kategori "' . $model->nama . '"?',
                                            'method' => 'post',
                                        ],
                                    ]) ?>
                                </div>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                <?php else: ?>
                    <tr>
                        <td colspan="6" style="text-align:center; padding:24px; color:#718096;">Belum ada data kategori.</td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
</div>
