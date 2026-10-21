<?php

use yii\helpers\Html;

/** @var yii\web\View $this */
/** @var app\models\Kategori $model */

$this->title = 'Edit Kategori: ' . $model->nama;
?>
<div class="kategori-update">
    <div style="margin-bottom:16px;">
        <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
    </div>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>
</div>
