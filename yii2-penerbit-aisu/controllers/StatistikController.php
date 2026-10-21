<?php

namespace app\controllers;

use Yii;
use app\models\Pengunjung;
use app\models\PengunjungLog;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\filters\AccessControl;

/**
 * StatistikController handles visitor analytics dashboard and logs for admin.
 */
class StatistikController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    /**
     * Tampilkan statistik dan ringkasan pengunjung
     */
    public function actionIndex()
    {
        $stats = Pengunjung::getStats();

        // 30 Hari terakhir
        $historyData = Pengunjung::find()
            ->orderBy(['tanggal' => SORT_DESC])
            ->limit(30)
            ->all();

        // Data Provider Log Pengunjung Terbaru
        $logDataProvider = new ActiveDataProvider([
            'query' => PengunjungLog::find()->orderBy(['visited_at' => SORT_DESC]),
            'pagination' => [
                'pageSize' => 25,
            ],
        ]);

        return $this->render('index', [
            'stats' => $stats,
            'historyData' => $historyData,
            'logDataProvider' => $logDataProvider,
        ]);
    }
}
