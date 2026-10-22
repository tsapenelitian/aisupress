<?php

/**
 * Konfigurasi Koneksi Database MySQL Yii2 untuk cPanel / Shared Hosting
 *
 * Catatan untuk cPanel:
 * - Biasanya nama database dan user di cPanel diawali username akun cPanel,
 *   contoh: 'akunanda_aisudb' dan 'akunanda_dbuser'.
 * - Host di cPanel umumnya tetap 'localhost'.
 */

return [
    'class' => 'yii\db\Connection',
    // Sesuaikan dbname dengan nama database di cPanel Anda
    'dsn' => 'mysql:host=localhost;dbname=aisu_penerbit',
    
    // Sesuaikan username database cPanel Anda
    'username' => 'root',
    
    // Sesuaikan password user database cPanel Anda
    'password' => '',
    
    'charset' => 'utf8mb4',

    // Optimasi Schema Cache untuk Performa Maksimal di Server Produksi
    'enableSchemaCache' => YII_ENV_PROD,
    'schemaCacheDuration' => 86400, // 24 jam
    'schemaCache' => 'cache',
];
