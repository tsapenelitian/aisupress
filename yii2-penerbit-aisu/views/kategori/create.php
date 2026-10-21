<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Kategori $model */

$this->title = 'Tambah Kategori';
?>
<div class="kategori-create">
    <div style="margin-bottom:16px;">
        <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
    </div>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>
</div>
