<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Kategori $model */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="kategori-form" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:20px; max-width:600px;">
    <?php $form = ActiveForm::begin([
        'fieldConfig' => [
            'template' => "<div style=\"margin-bottom:14px;\">{label}\n{input}\n<div style=\"color:#e53e3e; font-size:0.75rem; margin-top:4px;\">{error}</div></div>",
            'labelOptions' => ['style' => 'display:block; font-size:0.875rem; font-weight:600; color:#374151; margin-bottom:4px;'],
            'inputOptions' => ['class' => 'form-control', 'style' => 'width:100%; box-sizing:border-box;'],
        ],
    ]); ?>

    <?= $form->field($model, 'nama')->textInput(['maxlength' => true, 'placeholder' => 'Nama Kategori Bidang Ilmu']) ?>

    <?= $form->field($model, 'slug')->textInput(['maxlength' => true, 'placeholder' => 'slug-otomatis-jika-kosong']) ?>

    <?= $form->field($model, 'keterangan')->textarea(['rows' => 3, 'placeholder' => 'Uraian cakupan bidang ilmu kategori ini...']) ?>

    <div style="display:flex; gap:10px; margin-top:16px;">
        <?= Html::submitButton('Simpan Kategori', ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Batal', ['index'], ['class' => 'btn btn-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>
</div>
