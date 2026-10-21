<?php

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'penerbit-aisu',
    'name' => 'Penerbit Asosiasi Informatika Sumatera Utara',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'language' => 'id-ID',
    'sourceLanguage' => 'en-US',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],
    'components' => [
        'request' => [
            // Cookie validation key untuk keamanan form CSRF
            'cookieValidationKey' => 'aisu-publisher-secret-key-salt-748923748239478',
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
            'enableAutoLogin' => true,
            'loginUrl' => ['site/login'],
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'useFileTransport' => true,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,
        
        // Konfigurasi Pretty URL (menghilangkan web/index.php dan %2F)
        'urlManager' => [
            'enablePrettyUrl' => true,
            'showScriptName' => false,
            'enableStrictParsing' => false,
            'suffix' => '',
            'rules' => [
                // SEO & Web Standards
                'robots.txt' => 'site/robots',
                'sitemap.xml' => 'site/sitemap',
                
                // Public Pages
                '' => 'site/index',
                'katalog' => 'site/katalog',
                'katalog/<kategori:[\w\-]+>' => 'site/katalog',
                'buku/<slug:[\w\-]+>' => 'site/detail',
                'pengiriman' => 'site/pengiriman',
                'tentang' => 'site/tentang',
                'login' => 'site/login',
                'logout' => 'site/logout',
                
                // Administrator CRUD Routes
                'admin' => 'buku/index',
                'admin/buku' => 'buku/index',
                'admin/buku/create' => 'buku/create',
                'admin/buku/update/<id:\d+>' => 'buku/update',
                'admin/buku/delete/<id:\d+>' => 'buku/delete',
                'admin/buku/<id:\d+>' => 'buku/view',
                
                'admin/kategori' => 'kategori/index',
                'admin/kategori/create' => 'kategori/create',
                'admin/kategori/update/<id:\d+>' => 'kategori/update',
                'admin/kategori/delete/<id:\d+>' => 'kategori/delete',
                
                'admin/statistik' => 'statistik/index',
                
                // Standard default routes
                '<controller:\w+>/<action:\w+>' => '<controller>/<action>',
                '<controller:\w+>/<action:\w+>/<id:\d+>' => '<controller>/<action>',
            ],
        ],
        
        'assetManager' => [
            'bundles' => [
                // Minimalisasi script bawaan demi performa maksimal tanpa animasi
                'yii\web\JqueryAsset' => [
                    'jsOptions' => ['position' => \yii\web\View::POS_HEAD],
                ],
            ],
        ],
    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // konfigurasi opsional debugging saat dev
}

return $config;
