<?php

/** @var yii\web\View $this */

use yii\helpers\Html;

$this->title = 'Informasi Pengiriman Buku';
$this->registerMetaTag([
    'name' => 'description',
    'content' => 'Informasi pengiriman buku Penerbit Asosiasi Informatika Sumatera Utara. Ekspedisi, estimasi waktu sampai, garansi retur cetak, dan nomor resi.',
]);
?>

<div class="site-pengiriman" style="max-width:850px; margin:0 auto; background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:28px;">
    <h1 style="font-size:1.5rem; font-weight:700; color:#1a202c; margin-bottom:8px;">Informasi & Kebijakan Pengiriman</h1>
    <p style="font-size:0.875rem; color:#718096; margin-bottom:20px;">Layanan pengiriman aman, terpercaya, dan berasuransi ke seluruh pelosok Indonesia.</p>

    <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- 1. Ekspedisi -->
        <div style="border-bottom:1px solid #edf2f7; padding-bottom:16px;">
            <h2 style="font-size:1.1rem; font-weight:600; color:#2b6cb0; margin-bottom:6px;">1. Mitra Ekspedisi Logistik</h2>
            <p style="font-size:0.9rem; line-height:1.6; color:#4a5568;">
                Kami bermitra dengan penyedia jasa pengiriman resmi terpercaya: <strong>JNE Express</strong> (Reguler/YES), <strong>J&T Express</strong>, <strong>SiCepat</strong>, dan <strong>Pos Indonesia</strong>. Pemesanan buku dalam jumlah besar (perpustakaan/institusi) dapat menggunakan armada kargo khusus (JNE Trucking/Indah Cargo).
            </p>
        </div>

        <!-- 2. Waktu Proses & Estimasi Sampai -->
        <div style="border-bottom:1px solid #edf2f7; padding-bottom:16px;">
            <h2 style="font-size:1.1rem; font-weight:600; color:#2b6cb0; margin-bottom:6px;">2. Waktu Proses & Estimasi Tiba</h2>
            <ul style="font-size:0.9rem; line-height:1.7; color:#4a5568; padding-left:20px;">
                <li><strong>Waktu Pemrosesan:</strong> Pesanan yang terkonfirmasi sebelum pukul 15.00 WIB dikirim pada hari yang sama. Setelah pukul 15.00 WIB dikirim pada hari kerja berikutnya.</li>
                <li><strong>Sumatera Utara & Sekitarnya:</strong> 1 - 2 hari kerja.</li>
                <li><strong>Pulau Jawa & Sumatera Lainnya:</strong> 2 - 4 hari kerja.</li>
                <li><strong>Kalimantan, Sulawesi, Bali & Nusa Tenggara:</strong> 3 - 5 hari kerja.</li>
                <li><strong>Maluku & Papua:</strong> 4 - 7 hari kerja.</li>
            </ul>
        </div>

        <!-- 3. Standar Pengemasan (Packaging) -->
        <div style="border-bottom:1px solid #edf2f7; padding-bottom:16px;">
            <h2 style="font-size:1.1rem; font-weight:600; color:#2b6cb0; margin-bottom:6px;">3. Standar Pengemasan Aman (Zero Damage)</h2>
            <p style="font-size:0.9rem; line-height:1.6; color:#4a5568;">
                Setiap buku dilapisi plastik segel (shrink wrap) asli dari percetakan, dibungkus <strong>bubble wrap 2 lapis</strong>, serta dilindungi kardus karton tebal tahan benturan dan lakban fragile gratis tanpa biaya tambahan.
            </p>
        </div>

        <!-- 4. Resi & Pelacakan -->
        <div style="border-bottom:1px solid #edf2f7; padding-bottom:16px;">
            <h2 style="font-size:1.1rem; font-weight:600; color:#2b6cb0; margin-bottom:6px;">4. Pelacakan Pesanan & Nomor Resi</h2>
            <p style="font-size:0.9rem; line-height:1.6; color:#4a5568;">
                Nomor resi pengiriman otomatis dikirimkan ke WhatsApp atau email pembeli paling lambat malam hari setelah pengiriman. Anda dapat memantau status secara langsung melalui portal resmi kurir terkait.
            </p>
        </div>

        <!-- 5. Garansi Cacat Cetak -->
        <div>
            <h2 style="font-size:1.1rem; font-weight:600; color:#2b6cb0; margin-bottom:6px;">5. Garansi Penggantian Cacat Cetak</h2>
            <p style="font-size:0.9rem; line-height:1.6; color:#4a5568;">
                Jika buku yang diterima mengalami cacat jilid, halaman terbalik, atau teks tidak terbaca akibat kesalahan cetak, kami memberikan <strong>garansi penggantian 100% buku baru gratis</strong> beserta ongkos kirim pengganti.
            </p>
        </div>
    </div>
</div>
