<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Buku $model */
/** @var array $kategoriList */

$this->title = 'Tambah Buku Baru';
?>
<div class="buku-create">
    <div style="margin-bottom:16px;">
        <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
        <p style="font-size:0.875rem; color:#718096;">Lengkapi seluruh informasi buku, metadata ISBN, harga, dan berkas cover.</p>
    </div>

    <?= $this->render('_form', [
        'model' => $model,
        'kategoriList' => $kategoriList,
    ]) ?>
</div>
