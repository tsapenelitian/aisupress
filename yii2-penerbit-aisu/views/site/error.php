<?php

/** @var yii\web\View $this */
/** @var string $name */
/** @var string $message */
/** @var Exception $exception */

use yii\helpers\Html;
use yii\helpers\Url;

$this->title = $name;
?>
<div class="site-error" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:32px; text-align:center; max-width:600px; margin:40px auto;">
    <h1 style="font-size:1.5rem; font-weight:700; color:#e53e3e; margin-bottom:12px;"><?= Html::encode($this->title) ?></h1>

    <div class="alert alert-danger" style="font-size:0.95rem; color:#4a5568; margin-bottom:20px;">
        <?= nl2br(Html::encode($message)) ?>
    </div>

    <p style="font-size:0.875rem; color:#718096; margin-bottom:20px;">
        Halaman yang Anda minta tidak dapat ditemukan atau terjadi kendala pada server.
    </p>

    <a href="<?= Url::to(['/site/index']) ?>" class="btn btn-primary">Kembali ke Beranda</a>
</div>
