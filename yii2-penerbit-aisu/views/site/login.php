<?php

/** @var yii\web\View $this */
/** @var app\models\LoginForm $model */

use yii\helpers\Html;
use yii\widgets\ActiveForm;

$this->title = 'Login Administrator';
?>

<div class="site-login" style="max-width:440px; margin:40px auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:28px;">
    <div style="text-align:center; margin-bottom:20px;">
        <h1 style="font-size:1.35rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
        <p style="font-size:0.85rem; color:#718096;">Masuk untuk mengelola katalog buku dan statistik penerbit</p>
    </div>

    <!-- Informasi Login Bawaan Yii2 -->
    <div style="background:#f7fafc; border:1px solid #e2e8f0; border-radius:4px; padding:12px; margin-bottom:18px; font-size:0.8rem; color:#4a5568;">
        <strong>Akun Default Administrator:</strong><br>
        Username: <code>admin</code><br>
        Password: <code>admin123</code>
    </div>

    <?php $form = ActiveForm::begin([
        'id' => 'login-form',
        'fieldConfig' => [
            'template' => "<div style=\"margin-bottom:14px;\">{label}\n{input}\n<div style=\"color:#e53e3e; font-size:0.75rem; margin-top:4px;\">{error}</div></div>",
            'labelOptions' => ['style' => 'display:block; font-size:0.875rem; font-weight:600; color:#4a5568; margin-bottom:4px;'],
            'inputOptions' => ['class' => 'form-control', 'style' => 'width:100%; box-sizing:border-box;'],
        ],
    ]); ?>

        <?= $form->field($model, 'username')->textInput(['autofocus' => true, 'placeholder' => 'Masukkan username']) ?>

        <?= $form->field($model, 'password')->passwordInput(['placeholder' => 'Masukkan password']) ?>

        <?= $form->field($model, 'rememberMe')->checkbox([
            'template' => "<div style=\"margin-bottom:16px;\">{input} <label style=\"font-size:0.85rem; color:#4a5568;\">{labelTitle}</label></div>",
        ]) ?>

        <div style="margin-top:20px;">
            <?= Html::submitButton('Masuk ke Dashboard', ['class' => 'btn btn-primary', 'style' => 'width:100%; padding:10px;', 'name' => 'login-button']) ?>
        </div>

    <?php ActiveForm::end(); ?>
</div>
