import React, { useState } from "react";
import { YII_FILES_CATALOG, YiiFile } from "../data/yiiFiles";

// Pre-loaded source code samples for inspection
const SAMPLE_CODES: Record<string, string> = {
  "CPANEL_DEPLOYMENT_GUIDE.md": `# Panduan Lengkap Deploy Yii2 Penerbit AISU ke cPanel

Panduan resmi deployment aplikasi Penerbit Asosiasi Informatika Sumatera Utara (AISU) berbasis Framework Yii2 ke web hosting cPanel (Shared Hosting / VPS cPanel).

## Persyaratan Hosting:
- PHP Version: PHP 7.4.33 hingga PHP 8.2
- Ekstensi PHP: pdo_mysql, mbstring, curl, gd/imagick, xml, fileinfo
- Database: MySQL 5.7+ atau MariaDB 10.3+
- Web Server: Apache / LiteSpeed (mendukung .htaccess & mod_rewrite)

## METODE 1: Upload Langsung ke public_html (Paling Cepat & Praktis)
1. Login ke cPanel (https://domainanda.com:2083)
2. Masuk ke menu File Manager > buka folder public_html.
3. Klik tombol Upload di menu atas, pilih berkas yii2-penerbit-aisu.zip.
4. Klik kanan pada zip lalu pilih Extract di public_html.
5. File .htaccess root bawaan proyek otomatis mengarahkan akses publik ke folder web/ tanpa memunculkan /web/ di URL, sekaligus mengamankan folder config, models, vendor, dan database.sql.

## METODE 2: Struktur Standar Yii2 (Keamanan Tingkat Tinggi)
1. Ekstrak zip ke direktori home hosting: /home/username/yii2-penerbit-aisu/
2. Pindahkan isi folder yii2-penerbit-aisu/web/* ke dalam /home/username/public_html/
3. Sesuaikan path pada /home/username/public_html/index.php.

## Konfigurasi Database di cPanel:
1. Buat database baru di cPanel > MySQL Database Wizard.
2. Buat user database dan hubungkan dengan ALL PRIVILEGES.
3. Buka phpMyAdmin > pilih database baru > klik Import > pilih database.sql > klik Go.
4. Buka config/db.php via cPanel File Manager dan sesuaikan dbname, username, dan password.

## Akses Admin:
- URL: /login atau /site/login
- User: admin
- Pass: admin123`,

  "config/db.php": `<?php

/**
 * Konfigurasi Koneksi Database MySQL Yii2 untuk cPanel / Shared Hosting
 *
 * Catatan untuk cPanel:
 * - Biasanya nama database dan user di cPanel diawali username akun cPanel,
 *   contoh: 'akunanda_aisudb' dan 'akunanda_dbuser'.
 * - Host di cPanel umumnya tetap 'localhost'.
 */

return [
    'class' => 'yii\\db\\Connection',
    // Sesuaikan dbname dengan nama database di cPanel Anda
    'dsn' => 'mysql:host=localhost;dbname=usercpanel_penerbit',
    
    // Sesuaikan username database cPanel Anda
    'username' => 'usercpanel_dbuser',
    
    // Sesuaikan password user database cPanel Anda
    'password' => 'PasswordDatabaseAnda',
    
    'charset' => 'utf8mb4',

    // Optimasi Schema Cache untuk Performa Maksimal di Server Produksi
    'enableSchemaCache' => YII_ENV_PROD,
    'schemaCacheDuration' => 86400, // 24 jam
    'schemaCache' => 'cache',
];`,

  ".htaccess": `# ==============================================================================
# Root .htaccess - Penerbit AISU (Yii2 Basic Template)
# Didesain khusus untuk cPanel / Shared Hosting
# ==============================================================================

Options -Indexes
RewriteEngine on

# 1. Lindungi file sensitif & berkas sistem dari akses langsung via browser
<FilesMatch "^(\\..*|composer\\.(json|lock)|yii|database\\.sql|README\\.md|CPANEL_DEPLOYMENT_GUIDE\\.md)$">
    Order allow,deny
    Deny from all
</FilesMatch>

# 2. Blokir akses langsung ke folder internal Yii2 (keamanan tingkat tinggi)
RewriteRule ^(config|models|controllers|views|migrations|runtime|vendor)/ - [F,L,NC]

# 3. Arahkan semua request publik ke folder web/ tanpa mengubah URL di browser
RewriteCond %{REQUEST_URI} !^/web/
RewriteRule ^(.*)$ web/$1 [L]`,

  "config/web.php": `<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'penerbit-aisu',
    'name' => 'Penerbit Asosiasi Informatika Sumatera Utara',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'language' => 'id-ID',
    'components' => [
        'request' => [
            'cookieValidationKey' => 'aisu-publisher-secret-key-salt-748923748239478',
        ],
        'user' => [
            'identityClass' => 'app\\models\\User',
            'enableAutoLogin' => true,
            'loginUrl' => ['site/login'],
        ],
        'db' => $db,
        // Pretty URL (menghilangkan web/index.php dan %2F)
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
            'rules' => [
                'robots.txt' => 'site/robots',
                'sitemap.xml' => 'site/sitemap',
                '' => 'site/index',
                'katalog' => 'site/katalog',
                'katalog/<kategori:[\\w\\-]+>' => 'site/katalog',
                'buku/<slug:[\\w\\-]+>' => 'site/detail',
                'pengiriman' => 'site/pengiriman',
                'tentang' => 'site/tentang',
                'login' => 'site/login',
                'logout' => 'site/logout',
                'admin' => 'buku/index',
                'admin/buku' => 'buku/index',
                'admin/kategori' => 'kategori/index',
                'admin/statistik' => 'statistik/index',
            ],
        ],
    ],
    'params' => $params,
];

return $config;`,

  "models/User.php": `<?php

namespace app\\models;

use yii\\base\\BaseObject;
use yii\\web\\IdentityInterface;

/**
 * Standard identity configured directly without database user table
 */
class User extends BaseObject implements IdentityInterface
{
    public $id;
    public $username;
    public $password;
    public $authKey;
    public $accessToken;

    private static $users = [
        '100' => [
            'id' => '100',
            'username' => 'admin',
            'password' => 'admin123',
            'authKey' => 'aisu_auth_key_100',
            'accessToken' => 'aisu_access_token_100',
        ],
    ];

    public static function findIdentity($id)
    {
        return isset(self::$users[$id]) ? new static(self::$users[$id]) : null;
    }

    public static function findByUsername($username)
    {
        foreach (self::$users as $user) {
            if (strcasecmp($user['username'], $username) === 0) {
                return new static($user);
            }
        }
        return null;
    }

    public function validatePassword($password)
    {
        return $this->password === $password;
    }
}`,

  "models/Buku.php": `<?php

namespace app\\models;

use Yii;
use yii\\db\\ActiveRecord;

class Buku extends ActiveRecord
{
    public $coverFile;

    public static function tableName()
    {
        return '{{%buku}}';
    }

    public function rules()
    {
        return [
            [['judul', 'penulis', 'jumlah_halaman', 'isbn', 'harga', 'sinopsis', 'kategori_id'], 'required'],
            [['jumlah_halaman', 'kategori_id'], 'integer'],
            [['harga'], 'number', 'min' => 0],
            [['sinopsis', 'keterangan'], 'string'],
            [['judul', 'slug', 'link_tokopedia', 'link_shopee', 'link_google_book', 'link_google_play', 'cover'], 'string', 'max' => 255],
            [['penulis', 'editor'], 'string', 'max' => 200],
            [['isbn'], 'unique'],
            [['slug'], 'unique'],
        ];
    }

    public function getSchemaJsonLd()
    {
        $siteUrl = Yii::$app->params['siteUrl'] ?? 'https://penerbit.aisu.or.id';
        return json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'Book',
            'name' => $this->judul,
            'url' => $siteUrl . '/buku/' . $this->slug,
            'isbn' => $this->isbn,
            'numberOfPages' => (int) $this->jumlah_halaman,
            'author' => ['@type' => 'Person', 'name' => $this->penulis],
            'publisher' => ['@type' => 'Organization', 'name' => Yii::$app->params['namaPenerbit']],
            'offers' => [
                '@type' => 'Offer',
                'price' => (string) $this->harga,
                'priceCurrency' => 'IDR',
                'availability' => 'https://schema.org/InStock',
            ],
        ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    }
}`,

  "controllers/SiteController.php": `<?php

namespace app\\controllers;

use Yii;
use yii\\web\\Controller;
use yii\\web\\Response;
use app\\models\\Buku;
use app\\models\\BukuSearch;
use app\\models\\Kategori;
use app\\models\\Pengunjung;

class SiteController extends Controller
{
    public function beforeAction($action)
    {
        if (parent::beforeAction($action)) {
            if (!in_array($action->id, ['robots', 'sitemap', 'error'])) {
                Pengunjung::trackVisit();
            }
            return true;
        }
        return false;
    }

    public function actionIndex()
    {
        $bukuTerbaru = Buku::find()->orderBy(['id' => SORT_DESC])->limit(8)->all();
        $statistik = Pengunjung::getStats();
        return $this->render('index', [
            'bukuTerbaru' => $bukuTerbaru,
            'statistik' => $statistik,
        ]);
    }

    public function actionKatalog($kategori = null)
    {
        $searchModel = new BukuSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);
        return $this->render('katalog', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }

    public function actionDetail($slug)
    {
        $model = Buku::find()->where(['slug' => $slug])->one();
        return $this->render('detail', ['model' => $model]);
    }

    public function actionSitemap()
    {
        Yii::$app->response->format = Response::FORMAT_RAW;
        Yii::$app->response->headers->set('Content-Type', 'application/xml; charset=utf-8');
        return $this->renderPartial('sitemap', [
            'baseUrl' => Yii::$app->params['siteUrl'],
            'bukus' => Buku::find()->all(),
        ]);
    }
}`,

  "web/.htaccess": `# Apache Configuration for Yii2 Pretty URL
RewriteEngine on
AllowEncodedSlashes On

# Jika file fisik atau folder ada di web/, layani langsung
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Teruskan seluruh request dinamis ke index.php
RewriteRule . index.php [L]`,

  "views/buku/_form.php": `<?php

use yii\\helpers\\Html;
use yii\\widgets\\ActiveForm;

/** @var yii\\web\\View $this */
/** @var app\\models\\Buku $model */
/** @var array $kategoriList */
/** @var yii\\widgets\\ActiveForm $form */
?>

<div class="buku-form" style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:24px;">
    <?php $form = ActiveForm::begin([
        'options' => ['enctype' => 'multipart/form-data', 'id' => 'form-buku'],
        'fieldConfig' => [
            'template' => "<div style=\\"margin-bottom:16px;\\">{label}\\n{input}\\n<div style=\\"color:#e53e3e; font-size:0.75rem; margin-top:4px;\\">{error}</div></div>",
            'labelOptions' => ['style' => 'display:block; font-size:0.875rem; font-weight:600; color:#374151; margin-bottom:4px;'],
            'inputOptions' => ['class' => 'form-control', 'style' => 'width:100%; box-sizing:border-box;'],
        ],
    ]); ?>

    <?= Html::activeHiddenInput($model, 'cover', ['id' => 'buku-cover']) ?>
    <?= Html::activeHiddenInput($model, 'cover_base64', ['id' => 'buku-cover_base64']) ?>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'judul')->textInput(['id' => 'buku-judul', 'maxlength' => true, 'placeholder' => 'Dasar Pemrograman AI']) ?>
        </div>
        <div>
            <?= $form->field($model, 'kategori_id')->dropDownList($kategoriList, ['id' => 'buku-kategori_id', 'prompt' => '-- Pilih Kategori --']) ?>
        </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
        <div>
            <?= $form->field($model, 'penulis')->textInput(['id' => 'buku-penulis', 'maxlength' => true, 'placeholder' => 'Nama lengkap penulis']) ?>
        </div>
        <div>
            <?= $form->field($model, 'editor')->textInput(['maxlength' => true, 'placeholder' => 'Nama editor/penyunting (opsional)']) ?>
        </div>
    </div>

    <!-- SEKSI COVER: Upload File Langsung ATAU Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna) -->
    <div style="border:1px solid #cbd5e0; border-radius:6px; padding:20px; margin-bottom:20px; background:#f8fafc;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <label style="font-size:0.95rem; font-weight:700; color:#1e293b; margin:0;">
                Desain & Cover Buku Publikasi Resmi
            </label>
            <span id="cover-status-badge" style="font-size:0.75rem; background:#eff6ff; color:#1d4ed8; padding:4px 8px; border-radius:4px;">
                24 Pilihan Warna Cover Siap Pakai
            </span>
        </div>

        <div style="display:grid; grid-template-columns:140px 1fr; gap:20px;">
            <div>
                <img id="cover-preview-img" src="<?= Html::encode($model->getCoverUrl()) ?>" alt="Pratinjau Cover" style="width:140px; height:186px; object-fit:cover; border-radius:4px; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                <span style="font-size:0.75rem; color:#64748b; display:block; margin-top:6px; text-align:center;">Rasio 3:4 Standar</span>
            </div>

            <div>
                <!-- Opsi A: Upload File Mandiri -->
                <div style="background:#fff; border:1px solid #e2e8f0; padding:12px; margin-bottom:12px; border-radius:4px;">
                    <label style="font-size:0.825rem; font-weight:600;">Opsi A: Upload Berkas Cover (JPG, PNG, WEBP)</label>
                    <?= $form->field($model, 'coverFile')->fileInput(['accept' => 'image/*', 'onchange' => 'handleFileUpload(event)'])->label(false) ?>
                </div>

                <!-- Opsi B: Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna) -->
                <div style="background:#fff; border:1px solid #e2e8f0; padding:14px; border-radius:4px;">
                    <div style="font-size:0.825rem; font-weight:700; color:#0f172a; margin-bottom:8px;">
                        Opsi B: Terapkan Sampel Desain Cover Cepat (24 Pilihan Warna Berlogo AISU)
                    </div>
                    <!-- Filter Tombol 6 Grup Warna -->
                    <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:10px;">
                        <button type="button" onclick="filterColorGroup('all', this)" class="btn-color-filter active">Semua (24)</button>
                        <button type="button" onclick="filterColorGroup('blue', this)" class="btn-color-filter">Biru & Samudra (5)</button>
                        <button type="button" onclick="filterColorGroup('green', this)" class="btn-color-filter">Hijau & Teal (5)</button>
                        <button type="button" onclick="filterColorGroup('red', this)" class="btn-color-filter">Merah & Ungu (6)</button>
                        <button type="button" onclick="filterColorGroup('warm', this)" class="btn-color-filter">Oranye & Emas (5)</button>
                        <button type="button" onclick="filterColorGroup('dark', this)" class="btn-color-filter">Arang & Gelap (3)</button>
                    </div>
                    <!-- Grid 24 Sampel Warna -->
                    <div id="palette-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); gap:8px; max-height:220px; overflow-y:auto;">
                        <!-- 24 Palet Warna Otomatis diisi oleh JavaScript -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <?= Html::submitButton('Simpan Buku', ['class' => 'btn btn-primary']) ?>
    <?php ActiveForm::end(); ?>
</div>

<script>
// 24 Palet Warna Lengkap + Generator SVG Cover Resmi Logo www.aisu.or.id/aisu.png
var COVER_PRESETS = [
    { id: "navy", group: "blue", name: "Navy Classic", categoryTag: "Informatika", bgStart: "#1e3a8a", bgEnd: "#0f172a", accent: "#38bdf8", label: "Biru Laut Dalam" },
    { id: "cobalt", group: "blue", name: "Cobalt Night", categoryTag: "AI & Sains Data", bgStart: "#172554", bgEnd: "#030712", accent: "#60a5fa", label: "Kobalt Pekat" },
    { id: "ocean", group: "blue", name: "Deep Ocean", categoryTag: "Rekayasa Lunak", bgStart: "#0369a1", bgEnd: "#082f49", accent: "#7dd3fc", label: "Samudra Biru" },
    { id: "sapphire", group: "blue", name: "Royal Sapphire", categoryTag: "Sistem Informasi", bgStart: "#1d4ed8", bgEnd: "#1e1b4b", accent: "#93c5fd", label: "Safir Kerajaan" },
    { id: "indigo", group: "blue", name: "Midnight Indigo", categoryTag: "Jaringan Komputer", bgStart: "#1e1b4b", bgEnd: "#0b092b", accent: "#818cf8", label: "Indigo Pekat" },
    { id: "teal", group: "green", name: "Emerald Teal", categoryTag: "Arsitektur Web", bgStart: "#0f766e", bgEnd: "#134e4a", accent: "#2dd4bf", label: "Teal Modern" },
    { id: "emerald", group: "green", name: "Forest Emerald", categoryTag: "Sains & Lingkungan", bgStart: "#064e3b", bgEnd: "#022c22", accent: "#34d399", label: "Zamrud Hutan" },
    { id: "sage", group: "green", name: "Dark Sage", categoryTag: "Pertanian & Bio", bgStart: "#14532d", bgEnd: "#052e16", accent: "#86efac", label: "Sage Herbal" },
    { id: "olive", group: "green", name: "Olive Moss", categoryTag: "Biologi Terapan", bgStart: "#365314", bgEnd: "#1a2e05", accent: "#bef264", label: "Zaitun Lumut" },
    { id: "cyan", group: "green", name: "Cyber Cyan", categoryTag: "Cloud Computing", bgStart: "#0e7490", bgEnd: "#083344", accent: "#22d3ee", label: "Sian Elektrik" },
    { id: "ruby", group: "red", name: "Crimson Ruby", categoryTag: "Keamanan Siber", bgStart: "#881337", bgEnd: "#4c0519", accent: "#fb7185", label: "Merah Ruby" },
    { id: "rose", group: "red", name: "Deep Rose", categoryTag: "Kriptografi", bgStart: "#831843", bgEnd: "#500724", accent: "#f472b6", label: "Rose Magenta" },
    { id: "wine", group: "red", name: "Bordeaux Wine", categoryTag: "Hukum & Etika", bgStart: "#701a75", bgEnd: "#4a044e", accent: "#f472b6", label: "Anggur Bordeaux" },
    { id: "purple", group: "red", name: "Royal Purple", categoryTag: "Sosial Humaniora", bgStart: "#581c87", bgEnd: "#3b0764", accent: "#c084fc", label: "Ungu Monarki" },
    { id: "violet", group: "red", name: "Cosmic Violet", categoryTag: "Inovasi Masa Depan", bgStart: "#4c1d95", bgEnd: "#2e1065", accent: "#a78bfa", label: "Violet Kosmik" },
    { id: "plum", group: "red", name: "Plum Berry", categoryTag: "Bahasa & Komunikasi", bgStart: "#4a154b", bgEnd: "#280729", accent: "#e879f9", label: "Plum Berry" },
    { id: "amber", group: "warm", name: "Golden Amber", categoryTag: "Pendidikan & Riset", bgStart: "#78350f", bgEnd: "#451a03", accent: "#fbbf24", label: "Kuning Kunyit Emas" },
    { id: "terracotta", group: "warm", name: "Warm Terracotta", categoryTag: "Metodologi Riset", bgStart: "#7c2d12", bgEnd: "#431407", accent: "#fb923c", label: "Terracotta Hangat" },
    { id: "orange", group: "warm", name: "Sunset Orange", categoryTag: "Technopreneur", bgStart: "#9a3412", bgEnd: "#2c0b02", accent: "#fdba74", label: "Oranye Senja" },
    { id: "gold", group: "warm", name: "Imperial Gold", categoryTag: "Monograf Ilmiah", bgStart: "#713f12", bgEnd: "#3f2205", accent: "#fde047", label: "Emas Monograf" },
    { id: "cinnamon", group: "warm", name: "Burnt Cinnamon", categoryTag: "Sejarah & Filsafat", bgStart: "#5c1d11", bgEnd: "#2e0b04", accent: "#fca5a5", label: "Kayu Manis" },
    { id: "charcoal", group: "dark", name: "Titanium Charcoal", categoryTag: "Teknik Mesin", bgStart: "#18181b", bgEnd: "#09090b", accent: "#e4e4e7", label: "Arang Titanium" },
    { id: "slate", group: "dark", name: "Graphite Slate", categoryTag: "Manajemen Proyek", bgStart: "#334155", bgEnd: "#0f172a", accent: "#cbd5e1", label: "Slate Grafit" },
    { id: "bronze", group: "dark", name: "Coffee Bronze", categoryTag: "Ekonomi Bisnis", bgStart: "#3e2723", bgEnd: "#1a0c08", accent: "#d7ccc8", label: "Cokelat Perunggu" }
];
// (Lihat file views/buku/_form.php untuk implementasi fungsi render dan SVG lengkap)
</script>`,

  "database.sql": `-- 4 Tabel Utama Sesuai Spesifikasi:
-- 1. buku
-- 2. kategori
-- 3. pengunjung
-- 4. pengunjung_log

CREATE TABLE \`kategori\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`nama\` varchar(100) NOT NULL,
  \`slug\` varchar(120) NOT NULL UNIQUE,
  \`keterangan\` text,
  \`created_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`buku\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`judul\` varchar(255) NOT NULL,
  \`slug\` varchar(255) NOT NULL UNIQUE,
  \`penulis\` varchar(200) NOT NULL,
  \`editor\` varchar(200) DEFAULT NULL,
  \`jumlah_halaman\` int(11) NOT NULL,
  \`isbn\` varchar(30) NOT NULL UNIQUE,
  \`harga\` decimal(12,2) NOT NULL,
  \`sinopsis\` text NOT NULL,
  \`link_tokopedia\` varchar(255) DEFAULT NULL,
  \`link_shopee\` varchar(255) DEFAULT NULL,
  \`link_google_book\` varchar(255) DEFAULT NULL,
  \`link_google_play\` varchar(255) DEFAULT NULL,
  \`cover\` varchar(255) DEFAULT NULL,
  \`kategori_id\` int(11) NOT NULL,
  \`keterangan\` text,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`),
  KEY \`idx-buku-kategori_id\` (\`kategori_id\`),
  CONSTRAINT \`fk-buku-kategori_id\` FOREIGN KEY (\`kategori_id\`) REFERENCES \`kategori\` (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`pengunjung\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`tanggal\` date NOT NULL UNIQUE,
  \`total_hits\` int(11) NOT NULL DEFAULT 1,
  \`created_at\` datetime NOT NULL,
  \`updated_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE \`pengunjung_log\` (
  \`id\` int(11) NOT NULL AUTO_INCREMENT,
  \`ip_address\` varchar(45) NOT NULL,
  \`user_agent\` varchar(255) DEFAULT NULL,
  \`url_visited\` varchar(255) NOT NULL,
  \`referer\` varchar(255) DEFAULT NULL,
  \`visited_at\` datetime NOT NULL,
  PRIMARY KEY (\`id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;`,
};

export const YiiExplorerPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<YiiFile>(YII_FILES_CATALOG[0]);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"files" | "guide">("files");
  const [copied, setCopied] = useState(false);

  const filteredCatalog = YII_FILES_CATALOG.filter((f) =>
    filterCategory === "all" ? true : f.category === filterCategory
  );

  const activeContent =
    SAMPLE_CODES[selectedFile.path] ||
    `// Berkas Yii2: ${selectedFile.path}\n// Silakan unduh paket ZIP lengkap yii2-penerbit-aisu.zip untuk melihat seluruh kode sumber.`;

  const copyCode = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Download Bar */}
      <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              Yii2 Basic Application Template · Siap Deploy cPanel
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Kode Sumber Yii2 Standar & Download ZIP Siap cPanel
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-3xl">
              Paket lengkap aplikasi framework Yii2 standar. Dilengkapi folder <code>vendor/</code> (Yii 2.0.55), 
              struktur folder <code>runtime/</code>, <code>web/assets/</code>, konfigurasi <code>.htaccess</code> otomatis untuk <code>public_html</code>, 
              serta berkas <code>database.sql</code> siap import ke phpMyAdmin hosting Anda.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center gap-2 border border-slate-200 p-1 rounded-sm bg-slate-50 self-start lg:self-center">
            <button
              onClick={() => setActiveTab("files")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs cursor-pointer ${
                activeTab === "files"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Daftar Berkas & Kode
            </button>
            <button
              onClick={() => setActiveTab("guide")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs cursor-pointer ${
                activeTab === "guide"
                  ? "bg-white text-slate-900 shadow-xs border border-slate-200"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Panduan Upload cPanel
            </button>
          </div>
        </div>

        {/* Action Download Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {/* Main cPanel Package */}
          <a
            href="/yii2-penerbit-aisu.zip"
            download="yii2-penerbit-aisu.zip"
            className="p-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-sm flex flex-col justify-between group transition-none cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-emerald-800 text-xs font-bold mb-1">
                <span>Paket cPanel (Lengkap)</span>
                <span className="text-[10px] bg-emerald-200 text-emerald-900 px-1.5 py-0.2 rounded-xs font-mono">~6.1 MB</span>
              </div>
              <p className="text-[11px] text-emerald-950 leading-tight">
                Vendor Yii2 disertakan. Langsung ekstrak ke cPanel tanpa butuh Composer di hosting.
              </p>
            </div>
            <div className="mt-3 text-xs font-bold text-emerald-700 group-hover:text-emerald-900 flex items-center gap-1">
              <span>Unduh ZIP cPanel</span> &rarr;
            </div>
          </a>

          {/* Slim Package */}
          <a
            href="/yii2-penerbit-aisu-slim.zip"
            download="yii2-penerbit-aisu-slim.zip"
            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-sm flex flex-col justify-between group transition-none cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-slate-800 text-xs font-bold mb-1">
                <span>Slim ZIP (Source Code)</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-xs font-mono">~212 KB</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Hanya source code murni tanpa vendor. Untuk developer yang menjalankan composer install lokal.
              </p>
            </div>
            <div className="mt-3 text-xs font-bold text-slate-700 group-hover:text-slate-900 flex items-center gap-1">
              <span>Unduh Slim ZIP</span> &rarr;
            </div>
          </a>

          {/* Database SQL */}
          <a
            href="/database.sql"
            download="database.sql"
            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-sm flex flex-col justify-between group transition-none cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-slate-800 text-xs font-bold mb-1">
                <span>database.sql</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-xs font-mono">~12 KB</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Skema 4 tabel (buku, kategori, pengunjung, log) + 8 sampel buku ber-ISBN untuk phpMyAdmin.
              </p>
            </div>
            <div className="mt-3 text-xs font-bold text-slate-700 group-hover:text-slate-900 flex items-center gap-1">
              <span>Unduh SQL Dump</span> &rarr;
            </div>
          </a>

          {/* Deployment Guide */}
          <a
            href="/CPANEL_DEPLOYMENT_GUIDE.md"
            download="CPANEL_DEPLOYMENT_GUIDE.md"
            className="p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-sm flex flex-col justify-between group transition-none cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-slate-800 text-xs font-bold mb-1">
                <span>Panduan cPanel (.md)</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-xs font-mono">Lengkap</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Petunjuk step-by-step File Manager, MySQL Wizard, permissions, dan login admin.
              </p>
            </div>
            <div className="mt-3 text-xs font-bold text-slate-700 group-hover:text-slate-900 flex items-center gap-1">
              <span>Unduh Panduan</span> &rarr;
            </div>
          </a>
        </div>
      </div>

      {/* Guide Tab */}
      {activeTab === "guide" && (
        <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-lg font-bold text-slate-900">
              Langkah Cepat Upload & Menjalankan Yii2 di cPanel
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Ikuti 4 langkah mudah berikut untuk mengonlinekan website Penerbit AISU di hosting cPanel Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <div className="border border-slate-200 rounded-sm p-4 space-y-2 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900">Upload ZIP ke File Manager cPanel</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Login ke cPanel &rarr; buka <strong>File Manager</strong> &rarr; masuk ke folder <strong>public_html</strong>.
                Upload file <code>yii2-penerbit-aisu.zip</code>, lalu klik kanan &rarr; <strong>Extract</strong>.
              </p>
              <div className="text-[11px] bg-white border border-slate-200 p-2.5 rounded-xs font-mono text-slate-700">
                public_html/<br/>
                ├── .htaccess (otomatis arahkan ke web/)<br/>
                ├── config/<br/>
                ├── controllers/<br/>
                ├── models/<br/>
                ├── runtime/ (chmod 777)<br/>
                ├── vendor/ (Yii2 sudah ada di dalam)<br/>
                └── web/ (index.php, css, uploads/cover/)
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-slate-200 rounded-sm p-4 space-y-2 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900">Buat Database & Import database.sql</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Di cPanel, buka <strong>MySQL Database Wizard</strong>: buat nama database dan user (misal <code>cpaneluser_penerbit</code>). Beri centang <strong>ALL PRIVILEGES</strong>.
                Buka <strong>phpMyAdmin</strong> &rarr; pilih database tersebut &rarr; tab <strong>Import</strong> &rarr; pilih <code>database.sql</code> &rarr; klik <strong>Go</strong>.
              </p>
              <div className="text-[11px] bg-white border border-slate-200 p-2.5 rounded-xs text-slate-700">
                4 Tabel otomatis dibuat: <code>buku</code>, <code>kategori</code>, <code>pengunjung</code>, dan <code>pengunjung_log</code>.
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-slate-200 rounded-sm p-4 space-y-2 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900">Sesuaikan config/db.php</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka file <code>config/db.php</code> di File Manager cPanel (klik kanan &rarr; <strong>Edit</strong>):
              </p>
              <pre className="text-[11px] bg-slate-900 text-slate-100 p-2.5 rounded-xs font-mono overflow-x-auto">
{`'dsn' => 'mysql:host=localhost;dbname=cpaneluser_penerbit',
'username' => 'cpaneluser_dbuser',
'password' => 'PasswordDatabaseAnda',`}
              </pre>
            </div>

            {/* Step 4 */}
            <div className="border border-slate-200 rounded-sm p-4 space-y-2 bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900">Selesai & Login Administrator</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Buka domain Anda di browser: <code>https://domainanda.com/</code>.
              </p>
              <div className="text-[11px] bg-white border border-slate-200 p-2.5 rounded-xs space-y-1">
                <div><strong>URL Login:</strong> <code>https://domainanda.com/login</code></div>
                <div><strong>Username:</strong> <code>admin</code></div>
                <div><strong>Password:</strong> <code>admin123</code></div>
              </div>
              <p className="text-[11px] text-slate-500">
                Izin folder: pastikan <code>runtime/</code>, <code>web/assets/</code>, dan <code>web/uploads/cover/</code> memiliki permission <code>755</code> atau <code>777</code>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Explorer Grid */}
      {activeTab === "files" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left Column: File Tree */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-sm p-3.5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Daftar Berkas Yii2 ({filteredCatalog.length})
              </span>
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap gap-1 text-[11px]">
              {["all", "config", "controller", "model", "migration", "view", "web", "doc"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-2 py-0.5 rounded-xs capitalize cursor-pointer ${
                    filterCategory === cat
                      ? "bg-slate-900 text-white font-semibold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-1 max-h-[520px] overflow-y-auto pr-1">
              {filteredCatalog.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left p-2 rounded-xs text-xs font-mono transition-none cursor-pointer flex flex-col gap-0.5 ${
                      isSelected
                        ? "bg-blue-50 border border-blue-300 text-blue-900 font-bold"
                        : "hover:bg-slate-50 text-slate-700 border border-transparent"
                    }`}
                  >
                    <span className="truncate">{file.path}</span>
                    <span className="text-[10px] font-sans text-slate-500 font-normal truncate">
                      {file.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Code Viewer */}
          <div className="md:col-span-8 bg-white border border-slate-200 rounded-sm p-4 flex flex-col space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <div className="font-mono text-xs font-bold text-slate-900">
                  {selectedFile.path}
                </div>
                <div className="text-[11px] text-slate-500 font-sans mt-0.5">
                  {selectedFile.description}
                </div>
              </div>

              <button
                onClick={copyCode}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-sm border border-slate-300 cursor-pointer"
              >
                {copied ? "Tersalin!" : "Salin Kode"}
              </button>
            </div>

            <pre className="p-4 bg-slate-900 text-slate-100 text-xs font-mono rounded-sm overflow-x-auto flex-1 max-h-[500px] leading-relaxed">
              {activeContent}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};
