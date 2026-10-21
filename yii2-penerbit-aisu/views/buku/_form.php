<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/** @var yii\web\View $this */
/** @var app\models\Buku $model */
/** @var array $kategoriList */
/** @var yii\widgets\ActiveForm $form */
?>

<div class="buku-form" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:24px;">
    <?php $form = ActiveForm::begin([
        'options' => ['enctype' => 'multipart/form-data'],
        'fieldConfig' => [
            'template' => "<div style=\"margin-bottom:16px;\">{label}\n{input}\n<div style=\"color:#e53e3e; font-size:0.75rem; margin-top:4px;\">{error}</div></div>",
            'labelOptions' => ['style' => 'display:block; font-size:0.875rem; font-weight:600; color:#374151; margin-bottom:4px;'],
            'inputOptions' => ['class' => 'form-control', 'style' => 'width:100%; box-sizing:border-box;'],
        ],
    ]); ?>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'judul')->textInput(['maxlength' => true, 'placeholder' => 'Contoh: Dasar Pemrograman Python untuk AI']) ?>
        </div>
        <div>
            <?= $form->field($model, 'kategori_id')->dropDownList($kategoriList, ['prompt' => '-- Pilih Kategori Bidang Ilmu --']) ?>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'penulis')->textInput(['maxlength' => true, 'placeholder' => 'Nama lengkap penulis beserta gelar']) ?>
        </div>
        <div>
            <?= $form->field($model, 'editor')->textInput(['maxlength' => true, 'placeholder' => 'Nama editor/penyunting (opsional)']) ?>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'isbn')->textInput(['maxlength' => true, 'placeholder' => '978-623-xxxxx-x-x']) ?>
        </div>
        <div>
            <?= $form->field($model, 'jumlah_halaman')->textInput(['type' => 'number', 'min' => 1, 'placeholder' => 'Contoh: 280']) ?>
        </div>
        <div>
            <?= $form->field($model, 'harga')->textInput(['type' => 'number', 'step' => '500', 'placeholder' => 'Contoh: 85000']) ?>
        </div>
    </div>

    <?= $form->field($model, 'sinopsis')->textarea(['rows' => 6, 'placeholder' => 'Uraian sinopsis, cakupan materi, dan keunggulan buku...']) ?>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'link_tokopedia')->textInput(['maxlength' => true, 'placeholder' => 'https://tokopedia.com/...']) ?>
        </div>
        <div>
            <?= $form->field($model, 'link_shopee')->textInput(['maxlength' => true, 'placeholder' => 'https://shopee.co.id/...']) ?>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'link_google_book')->textInput(['maxlength' => true, 'placeholder' => 'https://books.google.com/...']) ?>
        </div>
        <div>
            <?= $form->field($model, 'link_google_play')->textInput(['maxlength' => true, 'placeholder' => 'https://play.google.com/store/books/...']) ?>
        </div>
    </div>

    <!-- Upload Cover File Langsung dengan Pratinjau Instan -->
    <div style="border:1px dashed #cbd5e0; border-radius:4px; padding:16px; margin-bottom:16px; background:#f7fafc;">
        <label style="display:block; font-size:0.875rem; font-weight:600; color:#374151; margin-bottom:4px;">
            Upload Cover Buku Langsung *
        </label>
        <?= $form->field($model, 'coverFile')->fileInput([
            'accept' => 'image/jpeg,image/png,image/webp',
            'id' => 'buku-cover-file-input',
            'onchange' => 'previewUploadedCover(event)'
        ])->label(false) ?>
        <p style="font-size:0.75rem; color:#718096; margin-top:4px;">
            Format yang didukung: JPG, PNG, WEBP. Maksimal 2MB. Gambar otomatis disimpan ke direktori <code>web/uploads/cover/</code>.
        </p>

        <!-- Wadah Pratinjau Gambar Instan -->
        <div id="cover-preview-container" style="margin-top:12px; display:flex; align-items:center; gap:16px;">
            <div>
                <span style="font-size:0.75rem; color:#4a5568; display:block; margin-bottom:4px;">Pratinjau Cover:</span>
                <img id="cover-preview-img" src="<?= Html::encode($model->getCoverUrl()) ?>" alt="Pratinjau Cover" style="width:96px; height:128px; object-fit:cover; border:1px solid #cbd5e0; border-radius:3px; background:#e2e8f0;">
            </div>
            <div id="cover-file-info" style="font-size:0.75rem; color:#718096;">
                <?php if (!empty($model->cover)): ?>
                    File aktif: <strong><?= Html::encode($model->cover) ?></strong>
                <?php else: ?>
                    Pilih file gambar untuk melihat pratinjau langsung.
                <?php endif; ?>
            </div>
        </div>
    </div>

    <?= $form->field($model, 'keterangan')->textInput(['maxlength' => true, 'placeholder' => 'Contoh: Edisi Revisi, Buku Ajar, Cetakan Pertama']) ?>

    <div style="display:flex; gap:10px; margin-top:20px;">
        <?= Html::submitButton('Simpan Buku', ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Batal', ['index'], ['class' => 'btn btn-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>
</div>

<script>
function previewUploadedCover(event) {
    var input = event.target;
    var previewImg = document.getElementById('cover-preview-img');
    var fileInfo = document.getElementById('cover-file-info');
    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            fileInfo.innerHTML = 'File dipilih: <strong>' + file.name + '</strong> (' + (file.size / 1024).toFixed(1) + ' KB)';
        };
        reader.readAsDataURL(file);
    }
}
</script>
