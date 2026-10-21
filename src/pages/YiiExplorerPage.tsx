import React, { useState } from "react";
import { YII_FILES_CATALOG, YiiFile } from "../data/yiiFiles";

// Pre-loaded source code samples for inspection
const SAMPLE_CODES: Record<string, string> = {
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

  "config/db.php": `<?php

return [
    'class' => 'yii\\db\\Connection',
    'dsn' => 'mysql:host=localhost;dbname=aisu_penerbit',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8mb4',
    'enableSchemaCache' => true,
    'schemaCacheDuration' => 3600,
];`,

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
use yii\\helpers\\Inflector;

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

# Jika file fisik atau folder ada, layani langsung
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Teruskan seluruh request ke index.php
RewriteRule . index.php`,

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
      <div className="bg-white border border-slate-200 rounded-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            Paket Proyek Lengkap Yii2 Basic Template
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Yii2 Source Code Explorer & ZIP Download
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Seluruh berkas Controller, Model, View, Migrasi, Konfigurasi Pretty URL,
            Database SQL Dump, dan Panduan README siap pakai di server PHP 7.4.33.
          </p>
        </div>

        {/* Action Buttons: ZIP & SQL */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="/yii2-penerbit-aisu.zip"
            download="yii2-penerbit-aisu.zip"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Unduh yii2-penerbit-aisu.zip</span>
          </a>

          <a
            href="/database.sql"
            download="database.sql"
            className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-sm inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Unduh database.sql</span>
          </a>
        </div>
      </div>

      {/* Explorer Grid */}
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
    </div>
  );
};
