<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * Model class for table "pengunjung".
 *
 * @property int $id
 * @property string $tanggal
 * @property int $total_hits
 * @property string $created_at
 * @property string $updated_at
 */
class Pengunjung extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%pengunjung}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['tanggal'], 'required'],
            [['tanggal', 'created_at', 'updated_at'], 'safe'],
            [['total_hits'], 'integer'],
            [['tanggal'], 'unique'],
        ];
    }

    /**
     * Catat kunjungan secara real-time dan efisien
     */
    public static function trackVisit()
    {
        $today = date('Y-m-d');
        $now = date('Y-m-d H:i:s');

        try {
            // Upsert / atomic increment pengunjung harian
            $sql = "INSERT INTO {{%pengunjung}} (tanggal, total_hits, created_at, updated_at) 
                    VALUES (:tgl, 1, :now, :now) 
                    ON DUPLICATE KEY UPDATE total_hits = total_hits + 1, updated_at = :now";
            
            Yii::$app->db->createCommand($sql, [
                ':tgl' => $today,
                ':now' => $now,
            ])->execute();

            // Log detail pengunjung di tabel pengunjung_log
            PengunjungLog::logVisit();
        } catch (\Exception $e) {
            // Fail silently agar tidak pernah mengganggu atau memperlambat render halaman public
            Yii::error('Pengunjung track error: ' . $e->getMessage(), __METHOD__);
        }
    }

    /**
     * Dapatkan statistik ringkas (Hari Ini, Minggu Ini, Bulan Ini, Total)
     */
    public static function getStats()
    {
        $today = date('Y-m-d');
        $sevenDaysAgo = date('Y-m-d', strtotime('-6 days'));
        $firstDayOfMonth = date('Y-m-01');

        $hariIni = (int) (self::find()->where(['tanggal' => $today])->sum('total_hits') ?: 0);
        $mingguIni = (int) (self::find()->where(['>=', 'tanggal', $sevenDaysAgo])->sum('total_hits') ?: 0);
        $bulanIni = (int) (self::find()->where(['>=', 'tanggal', $firstDayOfMonth])->sum('total_hits') ?: 0);
        $total = (int) (self::find()->sum('total_hits') ?: 0);

        return [
            'hariIni' => $hariIni,
            'mingguIni' => $mingguIni,
            'bulanIni' => $bulanIni,
            'total' => $total,
        ];
    }
}
