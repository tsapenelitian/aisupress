<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;

/**
 * Model class for table "pengunjung_log".
 *
 * @property int $id
 * @property string $ip_address
 * @property string|null $user_agent
 * @property string $url_visited
 * @property string|null $referer
 * @property string $visited_at
 */
class PengunjungLog extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%pengunjung_log}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ip_address', 'url_visited', 'visited_at'], 'required'],
            [['visited_at'], 'safe'],
            [['ip_address'], 'string', 'max' => 45],
            [['user_agent', 'url_visited', 'referer'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'ip_address' => 'IP Address',
            'user_agent' => 'Peramban / Browser',
            'url_visited' => 'Halaman Dikunjungi',
            'referer' => 'Sumber Rujukan',
            'visited_at' => 'Waktu Kunjungan',
        ];
    }

    /**
     * Simpan log kunjungan pengunjung secara asinkron/cepat
     */
    public static function logVisit()
    {
        try {
            $request = Yii::$app->request;
            $ip = $request->getUserIP() ?: '127.0.0.1';
            $ua = substr($request->getUserAgent() ?: '', 0, 250);
            $url = substr($request->getUrl() ?: '/', 0, 250);
            $referer = substr($request->getReferrer() ?: '', 0, 250);

            // Jangan mencatat aset statis atau background favicon
            if (preg_match('/\.(css|js|png|jpg|jpeg|gif|ico|svg|map)$/i', $url)) {
                return;
            }

            Yii::$app->db->createCommand()->insert('{{%pengunjung_log}}', [
                'ip_address' => $ip,
                'user_agent' => $ua,
                'url_visited' => $url,
                'referer' => $referer,
                'visited_at' => date('Y-m-d H:i:s'),
            ])->execute();
        } catch (\Exception $e) {
            // Fail silently
        }
    }
}
