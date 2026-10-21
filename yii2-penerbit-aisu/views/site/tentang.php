<?php

/** @var yii\web\View $this */

use yii\helpers\Html;

$this->title = 'Tentang Penerbit Asosiasi Informatika Sumatera Utara';
$this->registerMetaTag([
    'name' => 'description',
    'content' => 'Profil resmi Penerbit Asosiasi Informatika Sumatera Utara (AISU). Menerbitkan karya ilmiah, buku referensi, ajar, dan umum dengan standar mutu tinggi.',
]);
?>

<div class="site-tentang" style="max-width:850px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:28px;">
    <div style="display:flex; align-items:center; gap:16px; border-bottom:1px solid #edf2f7; padding-bottom:20px; margin-bottom:20px;">
        <img src="<?= Html::encode(Yii::$app->params['logoUrl']) ?>" alt="Logo AISU" width="72" height="72" style="object-fit:contain;">
        <div>
            <h1 style="font-size:1.5rem; font-weight:700; color:#1a202c; margin-bottom:4px;"><?= Html::encode(Yii::$app->params['namaPenerbit']) ?></h1>
            <p style="font-size:0.875rem; color:#718096;"><?= Html::encode(Yii::$app->params['fokusPenerbit']) ?></p>
        </div>
    </div>

    <!-- Profil & Visi Misi -->
    <section style="margin-bottom:24px;">
        <h2 style="font-size:1.15rem; font-weight:600; color:#2b6cb0; margin-bottom:8px;">Profil Singkat</h2>
        <p style="font-size:0.925rem; line-height:1.7; color:#374151; margin-bottom:12px;">
            <strong>Penerbit Asosiasi Informatika Sumatera Utara (AISU)</strong> didirikan sebagai wadah penerbitan resmi yang berdedikasi mendiseminasikan ilmu pengetahuan, teknologi, seni, sosial, dan humaniora kepada masyarakat luas. Kami melayani penerbitan buku untuk dosen, peneliti, praktisi industri, guru, mahasiswa, hingga penulis umum di seluruh penjuru Indonesia.
        </p>
        <p style="font-size:0.925rem; line-height:1.7; color:#374151;">
            Seluruh naskah yang diterbitkan melalui Penerbit AISU melalui proses telaah kelayakan, penyuntingan bahasa (copyediting), tata letak standar internasional, serta pengajuan ISBN resmi yang terdaftar di Perpustakaan Nasional Republik Indonesia.
        </p>
    </section>

    <!-- Komitmen Mutu Penerbitan -->
    <section style="margin-bottom:24px; background:#f7fafc; border:1px solid #edf2f7; border-radius:4px; padding:16px;">
        <h2 style="font-size:1.05rem; font-weight:600; color:#1a202c; margin-bottom:8px;">Fokus & Layanan Penerbitan</h2>
        <ul style="font-size:0.9rem; line-height:1.7; color:#4a5568; padding-left:20px;">
            <li>Menerbitkan buku ajar, buku teks perkuliahan, dan modul praktikum.</li>
            <li>Penerbitan buku referensi, monograf hasil riset skripsi/tesis/disertasi.</li>
            <li>Buku populer, antologi pemikiran, dan panduan keterampilan praktis masyarakat.</li>
            <li>Penyediaan ISBN, barcode, Hak Cipta (HAKI), dan pendistribusian multi-channel (Shopee, Tokopedia, Google Play Books).</li>
        </ul>
    </section>

    <!-- Informasi Alamat & Kontak Resmi -->
    <section>
        <h2 style="font-size:1.15rem; font-weight:600; color:#2b6cb0; margin-bottom:12px;">Alamat & Kontak Resmi</h2>
        <table class="data-table" style="width:100%;">
            <tbody>
                <tr>
                    <td style="width:180px; font-weight:600; background:#f7fafc;">Nama Penerbit</td>
                    <td><?= Html::encode(Yii::$app->params['namaPenerbit']) ?></td>
                </tr>
                <tr>
                    <td style="font-weight:600; background:#f7fafc;">Fokus Penerbitan</td>
                    <td><?= Html::encode(Yii::$app->params['fokusPenerbit']) ?></td>
                </tr>
                <tr>
                    <td style="font-weight:600; background:#f7fafc;">Alamat Kantor</td>
                    <td><?= Html::encode(Yii::$app->params['alamat']) ?></td>
                </tr>
                <tr>
                    <td style="font-weight:600; background:#f7fafc;">Email Resmi</td>
                    <td><a href="mailto:<?= Html::encode(Yii::$app->params['email']) ?>"><?= Html::encode(Yii::$app->params['email']) ?></a></td>
                </tr>
                <tr>
                    <td style="font-weight:600; background:#f7fafc;">Telepon / WhatsApp</td>
                    <td><a href="https://wa.me/<?= Html::encode(Yii::$app->params['whatsapp']) ?>" target="_blank" rel="noopener"><?= Html::encode(Yii::$app->params['telepon']) ?></a></td>
                </tr>
                <tr>
                    <td style="font-weight:600; background:#f7fafc;">Wilayah Hukum</td>
                    <td>Kab. Deli Serdang, Provinsi Sumatera Utara, Indonesia</td>
                </tr>
            </tbody>
        </table>
    </section>
</div>
