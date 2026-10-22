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
        'options' => ['enctype' => 'multipart/form-data', 'id' => 'form-buku'],
        'fieldConfig' => [
            'template' => "<div style=\"margin-bottom:16px;\">{label}\n{input}\n<div style=\"color:#e53e3e; font-size:0.75rem; margin-top:4px;\">{error}</div></div>",
            'labelOptions' => ['style' => 'display:block; font-size:0.875rem; font-weight:600; color:#374151; margin-bottom:4px;'],
            'inputOptions' => ['class' => 'form-control', 'style' => 'width:100%; box-sizing:border-box;'],
        ],
    ]); ?>

    <?= Html::activeHiddenInput($model, 'cover', ['id' => 'buku-cover']) ?>
    <?= Html::activeHiddenInput($model, 'cover_base64', ['id' => 'buku-cover_base64']) ?>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'judul')->textInput([
                'id' => 'buku-judul',
                'maxlength' => true, 
                'placeholder' => 'Contoh: Dasar Pemrograman Python untuk AI'
            ]) ?>
        </div>
        <div>
            <?= $form->field($model, 'kategori_id')->dropDownList($kategoriList, [
                'id' => 'buku-kategori_id',
                'prompt' => '-- Pilih Kategori Bidang Ilmu --'
            ]) ?>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'penulis')->textInput([
                'id' => 'buku-penulis',
                'maxlength' => true, 
                'placeholder' => 'Nama lengkap penulis beserta gelar'
            ]) ?>
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

    <?= $form->field($model, 'sinopsis')->textarea(['rows' => 5, 'placeholder' => 'Uraian sinopsis, cakupan materi, dan keunggulan buku...']) ?>

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

    <!-- SEKSI COVER: Upload File Langsung ATAU Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna) -->
    <div style="border:1px solid #cbd5e0; border-radius:6px; padding:20px; margin-bottom:20px; background:#f8fafc;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <div>
                <label style="font-size:0.95rem; font-weight:700; color:#1e293b; margin:0; display:block;">
                    Desain & Cover Buku Publikasi Resmi
                </label>
                <p style="font-size:0.8rem; color:#64748b; margin:2px 0 0 0;">
                    Anda dapat mengunggah berkas cover mandiri, ATAU memilih salah satu dari 24 sampel desain cover warna instan berlogo AISU.
                </p>
            </div>
            <span id="cover-status-badge" style="font-size:0.75rem; background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; padding:4px 8px; border-radius:4px; font-weight:600;">
                <?= !empty($model->cover) ? 'Cover Aktif: ' . Html::encode($model->cover) : 'Pilih Metode Cover' ?>
            </span>
        </div>

        <div style="display:grid; grid-template-columns:140px 1fr; gap:20px; align-items:start;">
            <!-- Box Pratinjau Cover Real-Time (Rasio 3:4) -->
            <div style="text-align:center;">
                <div style="width:140px; height:186px; border:2px solid #cbd5e1; border-radius:4px; overflow:hidden; background:#0f172a; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1); display:flex; align-items:center; justify-content:center;">
                    <img id="cover-preview-img" src="<?= Html::encode($model->getCoverUrl()) ?>" alt="Pratinjau Cover Buku" style="width:100%; height:100%; object-fit:cover; display:block;">
                </div>
                <span style="font-size:0.75rem; color:#64748b; display:block; margin-top:6px; font-weight:500;">
                    Rasio 3:4 Standar
                </span>
            </div>

            <!-- Opsi 1: File Upload & Opsi 2: 24 Preset Warna -->
            <div>
                <!-- Opsi 1: Upload File Gambar Sendiri -->
                <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:12px 14px; margin-bottom:14px;">
                    <label style="font-size:0.825rem; font-weight:600; color:#334155; margin-bottom:4px; display:block;">
                        Opsi A: Upload Berkas Cover dari Komputer (JPG, PNG, WEBP)
                    </label>
                    <?= $form->field($model, 'coverFile')->fileInput([
                        'accept' => 'image/jpeg,image/png,image/webp',
                        'id' => 'buku-cover-file-input',
                        'onchange' => 'handleFileUpload(event)',
                        'style' => 'font-size:0.85rem;'
                    ])->label(false) ?>
                    <p style="font-size:0.75rem; color:#94a3b8; margin:2px 0 0 0;">
                        Maksimal 2MB. Gambar akan diunggah ke <code>web/uploads/cover/</code>.
                    </p>
                </div>

                <!-- Opsi 2: Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna) -->
                <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:14px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; flex-wrap:wrap; gap:6px;">
                        <span style="font-size:0.825rem; font-weight:700; color:#0f172a; text-transform:uppercase; letter-spacing:0.5px;">
                            Opsi B: Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna)
                        </span>
                        <span style="font-size:0.75rem; color:#64748b;">
                            Klik warna untuk membuat cover resmi instan berlogo AISU
                        </span>
                    </div>

                    <!-- Filter Kategori Warna -->
                    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                        <button type="button" class="btn-color-filter active" onclick="filterColorGroup('all', this)" style="padding:3px 8px; font-size:0.75rem; border-radius:3px; border:1px solid #0f172a; background:#0f172a; color:#ffffff; cursor:pointer;">Semua (24)</button>
                        <button type="button" class="btn-color-filter" onclick="filterColorGroup('blue', this)" style="padding:3px 8px; font-size:0.75rem; border-radius:3px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; cursor:pointer;">Biru & Samudra (5)</button>
                        <button type="button" class="btn-color-filter" onclick="filterColorGroup('green', this)" style="padding:3px 8px; font-size:0.75rem; border-radius:3px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; cursor:pointer;">Hijau & Teal (5)</button>
                        <button type="button" class="btn-color-filter" onclick="filterColorGroup('red', this)" style="padding:3px 8px; font-size:0.75rem; border-radius:3px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; cursor:pointer;">Merah & Ungu (6)</button>
                        <button type="button" class="btn-color-filter" onclick="filterColorGroup('warm', this)" style="padding:3px 8px; font-size:0.75rem; border-radius:3px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; cursor:pointer;">Oranye & Emas (5)</button>
                        <button type="button" class="btn-color-filter" onclick="filterColorGroup('dark', this)" style="padding:3px 8px; font-size:0.75rem; border-radius:3px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569; cursor:pointer;">Arang & Gelap (3)</button>
                    </div>

                    <!-- Grid 24 Sampel Warna -->
                    <div id="palette-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:8px; max-height:220px; overflow-y:auto; padding:6px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:4px;">
                        <!-- Item Preset Warna dirender via JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?= $form->field($model, 'keterangan')->textInput(['maxlength' => true, 'placeholder' => 'Contoh: Edisi Revisi, Buku Ajar, Cetakan Pertama']) ?>

    <div style="display:flex; gap:10px; margin-top:20px;">
        <?= Html::submitButton('Simpan Buku', ['class' => 'btn btn-primary', 'style' => 'background:#003366; border-color:#003366; padding:8px 24px; font-weight:600;']) ?>
        <?= Html::a('Batal', ['index'], ['class' => 'btn btn-secondary', 'style' => 'padding:8px 16px;']) ?>
    </div>

    <?php ActiveForm::end(); ?>
</div>

<script>
// 24 Pilihan Tema Desain Cover Lengkap Sesuai Spesifikasi AISU Press
var COVER_PRESETS = [
    // Nuansa Biru
    { id: "navy", group: "blue", name: "Navy Classic", categoryTag: "Informatika", bgStart: "#1e3a8a", bgEnd: "#0f172a", accent: "#38bdf8", label: "Biru Laut Dalam" },
    { id: "cobalt", group: "blue", name: "Cobalt Night", categoryTag: "AI & Sains Data", bgStart: "#172554", bgEnd: "#030712", accent: "#60a5fa", label: "Kobalt Pekat" },
    { id: "ocean", group: "blue", name: "Deep Ocean", categoryTag: "Rekayasa Lunak", bgStart: "#0369a1", bgEnd: "#082f49", accent: "#7dd3fc", label: "Samudra Biru" },
    { id: "sapphire", group: "blue", name: "Royal Sapphire", categoryTag: "Sistem Informasi", bgStart: "#1d4ed8", bgEnd: "#1e1b4b", accent: "#93c5fd", label: "Safir Kerajaan" },
    { id: "indigo", group: "blue", name: "Midnight Indigo", categoryTag: "Jaringan Komputer", bgStart: "#1e1b4b", bgEnd: "#0b092b", accent: "#818cf8", label: "Indigo Pekat" },

    // Nuansa Hijau & Teal
    { id: "teal", group: "green", name: "Emerald Teal", categoryTag: "Arsitektur Web", bgStart: "#0f766e", bgEnd: "#134e4a", accent: "#2dd4bf", label: "Teal Modern" },
    { id: "emerald", group: "green", name: "Forest Emerald", categoryTag: "Sains & Lingkungan", bgStart: "#064e3b", bgEnd: "#022c22", accent: "#34d399", label: "Zamrud Hutan" },
    { id: "sage", group: "green", name: "Dark Sage", categoryTag: "Pertanian & Bio", bgStart: "#14532d", bgEnd: "#052e16", accent: "#86efac", label: "Sage Herbal" },
    { id: "olive", group: "green", name: "Olive Moss", categoryTag: "Biologi Terapan", bgStart: "#365314", bgEnd: "#1a2e05", accent: "#bef264", label: "Zaitun Lumut" },
    { id: "cyan", group: "green", name: "Cyber Cyan", categoryTag: "Cloud Computing", bgStart: "#0e7490", bgEnd: "#083344", accent: "#22d3ee", label: "Sian Elektrik" },

    // Nuansa Merah & Ungu
    { id: "ruby", group: "red", name: "Crimson Ruby", categoryTag: "Keamanan Siber", bgStart: "#881337", bgEnd: "#4c0519", accent: "#fb7185", label: "Merah Ruby" },
    { id: "rose", group: "red", name: "Deep Rose", categoryTag: "Kriptografi", bgStart: "#831843", bgEnd: "#500724", accent: "#f472b6", label: "Rose Magenta" },
    { id: "wine", group: "red", name: "Bordeaux Wine", categoryTag: "Hukum & Etika", bgStart: "#701a75", bgEnd: "#4a044e", accent: "#f472b6", label: "Anggur Bordeaux" },
    { id: "purple", group: "red", name: "Royal Purple", categoryTag: "Sosial Humaniora", bgStart: "#581c87", bgEnd: "#3b0764", accent: "#c084fc", label: "Ungu Monarki" },
    { id: "violet", group: "red", name: "Cosmic Violet", categoryTag: "Inovasi Masa Depan", bgStart: "#4c1d95", bgEnd: "#2e1065", accent: "#a78bfa", label: "Violet Kosmik" },
    { id: "plum", group: "red", name: "Plum Berry", categoryTag: "Bahasa & Komunikasi", bgStart: "#4a154b", bgEnd: "#280729", accent: "#e879f9", label: "Plum Berry" },

    // Nuansa Oranye & Emas
    { id: "amber", group: "warm", name: "Golden Amber", categoryTag: "Pendidikan & Riset", bgStart: "#78350f", bgEnd: "#451a03", accent: "#fbbf24", label: "Kuning Kunyit Emas" },
    { id: "terracotta", group: "warm", name: "Warm Terracotta", categoryTag: "Metodologi Riset", bgStart: "#7c2d12", bgEnd: "#431407", accent: "#fb923c", label: "Terracotta Hangat" },
    { id: "orange", group: "warm", name: "Sunset Orange", categoryTag: "Technopreneur", bgStart: "#9a3412", bgEnd: "#2c0b02", accent: "#fdba74", label: "Oranye Senja" },
    { id: "gold", group: "warm", name: "Imperial Gold", categoryTag: "Monograf Ilmiah", bgStart: "#713f12", bgEnd: "#3f2205", accent: "#fde047", label: "Emas Monograf" },
    { id: "cinnamon", group: "warm", name: "Burnt Cinnamon", categoryTag: "Sejarah & Filsafat", bgStart: "#5c1d11", bgEnd: "#2e0b04", accent: "#fca5a5", label: "Kayu Manis" },

    // Nuansa Arang & Gelap
    { id: "charcoal", group: "dark", name: "Titanium Charcoal", categoryTag: "Teknik Mesin", bgStart: "#18181b", bgEnd: "#09090b", accent: "#e4e4e7", label: "Arang Titanium" },
    { id: "slate", group: "dark", name: "Graphite Slate", categoryTag: "Manajemen Proyek", bgStart: "#334155", bgEnd: "#0f172a", accent: "#cbd5e1", label: "Slate Grafit" },
    { id: "bronze", group: "dark", name: "Coffee Bronze", categoryTag: "Ekonomi Bisnis", bgStart: "#3e2723", bgEnd: "#1a0c08", accent: "#d7ccc8", label: "Cokelat Perunggu" }
];

var currentSelectedPreset = null;

function escapeXml(unsafe) {
    if (!unsafe) return '';
    return String(unsafe)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Generator SVG Cover Crisp Resmi dengan Logo www.aisu.or.id/aisu.png
function generateAisuCoverSvg(title, author, category, bgStart, bgEnd, accent) {
    title = title || 'Judul Buku Publikasi';
    author = author || 'Nama Penulis';
    category = category || 'Penerbit AISU';

    // Bungkus judul menjadi 2-4 baris
    var words = title.split(' ');
    var lines = [];
    var currentLine = '';

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        if ((currentLine + ' ' + word).trim().length > 20) {
            if (currentLine) lines.push(currentLine.trim());
            currentLine = word;
        } else {
            currentLine += ' ' + word;
        }
    }
    if (currentLine) lines.push(currentLine.trim());

    var titleLinesSvg = lines.slice(0, 4).map(function(line, idx) {
        return '<tspan x="36" dy="' + (idx === 0 ? 0 : 28) + '">' + escapeXml(line) + '</tspan>';
    }).join('');

    var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 360 480" width="360" height="480">' +
        '<defs>' +
        '  <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
        '    <stop offset="0%" stop-color="' + bgStart + '" />' +
        '    <stop offset="100%" stop-color="' + bgEnd + '" />' +
        '  </linearGradient>' +
        '  <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">' +
        '    <stop offset="0%" stop-color="rgba(0,0,0,0.5)" />' +
        '    <stop offset="50%" stop-color="rgba(255,255,255,0.08)" />' +
        '    <stop offset="100%" stop-color="rgba(0,0,0,0.3)" />' +
        '  </linearGradient>' +
        '</defs>' +
        '<!-- Background Canvas -->' +
        '<rect width="360" height="480" fill="url(#bgGrad)" />' +
        '<!-- Spine Simulation -->' +
        '<rect x="0" y="0" width="18" height="480" fill="url(#spineGrad)" />' +
        '<line x1="18" y1="0" x2="18" y2="480" stroke="rgba(255,255,255,0.15)" stroke-width="1" />' +
        '<!-- Geometric Accents -->' +
        '<circle cx="320" cy="80" r="140" fill="' + accent + '" opacity="0.08" />' +
        '<rect x="220" y="320" width="160" height="160" rx="20" fill="' + accent + '" opacity="0.05" transform="rotate(25 300 400)" />' +
        '<!-- Header Kategori -->' +
        '<g transform="translate(36, 42)">' +
        '  <text font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="700" fill="' + accent + '" letter-spacing="1.5">' +
             escapeXml(category.toUpperCase()) +
        '  </text>' +
        '  <text y="18" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="9" fill="rgba(255,255,255,0.55)">' +
        '    ASOSIASI INFORMATIKA SUMATERA UTARA' +
        '  </text>' +
        '</g>' +
        '<!-- Divider -->' +
        '<rect x="36" y="80" width="48" height="3" fill="' + accent + '" rx="1.5" />' +
        '<!-- Book Title -->' +
        '<text x="36" y="160" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="800" fill="#ffffff" letter-spacing="-0.3">' +
             titleLinesSvg +
        '</text>' +
        '<!-- Author Name -->' +
        '<g transform="translate(36, 305)">' +
        '  <text font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="rgba(255,255,255,0.6)" letter-spacing="0.5">PENULIS:</text>' +
        '  <text y="20" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" font-weight="600" fill="#ffffff">' +
             escapeXml(author) +
        '  </text>' +
        '</g>' +
        '<!-- Publisher Seal with Official Logo www.aisu.or.id/aisu.png -->' +
        '<line x1="36" y1="432" x2="140" y2="432" stroke="rgba(255,255,255,0.2)" stroke-width="1" />' +
        '<g transform="translate(180, 432)">' +
        '  <circle cx="0" cy="0" r="28" fill="#ffffff" stroke="rgba(255,255,255,0.4)" stroke-width="2" />' +
        '  <image href="https://www.aisu.or.id/aisu.png" xlink:href="https://www.aisu.or.id/aisu.png" x="-21" y="-22" width="42" height="44" preserveAspectRatio="xMidYMid meet" />' +
        '</g>' +
        '<line x1="220" y1="432" x2="324" y2="432" stroke="rgba(255,255,255,0.2)" stroke-width="1" />' +
        '</svg>';

    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// Render 24 Swatch Cards
function renderPresets(groupFilter) {
    var container = document.getElementById('palette-grid');
    if (!container) return;
    container.innerHTML = '';

    COVER_PRESETS.forEach(function(preset) {
        if (groupFilter !== 'all' && preset.group !== groupFilter) return;

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'preset-card';
        btn.style.display = 'flex';
        btn.style.alignItems = 'center';
        btn.style.gap = '8px';
        btn.style.padding = '6px 8px';
        btn.style.background = '#ffffff';
        btn.style.border = '1px solid #e2e8f0';
        btn.style.borderRadius = '4px';
        btn.style.cursor = 'pointer';
        btn.style.textAlign = 'left';
        btn.style.transition = 'all 0.15s ease';

        btn.onmouseover = function() {
            this.style.borderColor = '#3b82f6';
            this.style.background = '#f0f9ff';
        };
        btn.onmouseout = function() {
            if (currentSelectedPreset && currentSelectedPreset.id === preset.id) {
                this.style.borderColor = '#1d4ed8';
                this.style.background = '#eff6ff';
            } else {
                this.style.borderColor = '#e2e8f0';
                this.style.background = '#ffffff';
            }
        };

        btn.onclick = function() {
            applyPreset(preset);
        };

        btn.innerHTML = 
            '<div style="width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg, ' + preset.bgStart + ', ' + preset.bgEnd + '); border:2px solid ' + preset.accent + '; flex-shrink:0;"></div>' +
            '<div style="overflow:hidden; line-height:1.2;">' +
            '  <div style="font-size:0.75rem; font-weight:700; color:#1e293b; white-space:nowrap; text-overflow:ellipsis; overflow:hidden;">' + escapeXml(preset.name) + '</div>' +
            '  <div style="font-size:0.65rem; color:#64748b;">' + escapeXml(preset.label) + '</div>' +
            '</div>';

        container.appendChild(btn);
    });
}

// Terapkan preset yang diklik ke buku
function applyPreset(preset) {
    currentSelectedPreset = preset;

    var judulInput = document.getElementById('buku-judul');
    var penulisInput = document.getElementById('buku-penulis');
    var kategoriSelect = document.getElementById('buku-kategori_id');

    var judul = judulInput ? judulInput.value : '';
    var penulis = penulisInput ? penulisInput.value : '';
    var kategori = (kategoriSelect && kategoriSelect.selectedIndex > 0) 
        ? kategoriSelect.options[kategoriSelect.selectedIndex].text 
        : preset.categoryTag;

    var dataUri = generateAisuCoverSvg(judul, penulis, kategori, preset.bgStart, preset.bgEnd, preset.accent);

    // Set preview & hidden fields
    document.getElementById('cover-preview-img').src = dataUri;
    document.getElementById('buku-cover_base64').value = dataUri;
    document.getElementById('buku-cover').value = 'cover_' + preset.id + '.svg';

    // Clear file upload input
    var fileInput = document.getElementById('buku-cover-file-input');
    if (fileInput) fileInput.value = '';

    // Update status badge
    var badge = document.getElementById('cover-status-badge');
    if (badge) {
        badge.innerText = 'Sampel Terpasang: ' + preset.name;
        badge.style.background = '#ecfdf5';
        badge.style.color = '#047857';
        badge.style.borderColor = '#a7f3d0';
    }
}

// Tangani perubahan file upload manual
function handleFileUpload(event) {
    var input = event.target;
    var previewImg = document.getElementById('cover-preview-img');
    var badge = document.getElementById('cover-status-badge');
    var hiddenBase64 = document.getElementById('buku-cover_base64');

    if (input.files && input.files[0]) {
        var file = input.files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            // Bersihkan preset aktif karena user memilih file sendiri
            currentSelectedPreset = null;
            if (hiddenBase64) hiddenBase64.value = '';
            if (badge) {
                badge.innerText = 'File Terpilih: ' + file.name + ' (' + (file.size / 1024).toFixed(1) + ' KB)';
                badge.style.background = '#eff6ff';
                badge.style.color = '#1d4ed8';
                badge.style.borderColor = '#bfdbfe';
            }
        };
        reader.readAsDataURL(file);
    }
}

// Filter tombol kelompok warna
function filterColorGroup(group, btnElement) {
    var allBtns = document.querySelectorAll('.btn-color-filter');
    allBtns.forEach(function(b) {
        b.style.background = '#f8fafc';
        b.style.color = '#475569';
        b.style.borderColor = '#cbd5e1';
    });
    btnElement.style.background = '#0f172a';
    btnElement.style.color = '#ffffff';
    btnElement.style.borderColor = '#0f172a';

    renderPresets(group);
}

// Pasang listener jika judul / penulis diketik ulang saat preset aktif
document.addEventListener('DOMContentLoaded', function() {
    renderPresets('all');

    var judulInput = document.getElementById('buku-judul');
    var penulisInput = document.getElementById('buku-penulis');
    var kategoriSelect = document.getElementById('buku-kategori_id');

    var updateTimeout;
    function triggerUpdate() {
        if (!currentSelectedPreset) return;
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(function() {
            applyPreset(currentSelectedPreset);
        }, 150);
    }

    if (judulInput) judulInput.addEventListener('input', triggerUpdate);
    if (penulisInput) penulisInput.addEventListener('input', triggerUpdate);
    if (kategoriSelect) kategoriSelect.addEventListener('change', triggerUpdate);
});
</script>
