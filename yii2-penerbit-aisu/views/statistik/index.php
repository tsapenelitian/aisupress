<?php

use yii\helpers\Html;
use yii\widgets\LinkPager;

/** @var yii\web\View $this */
/** @var array $stats */
/** @var app\models\Pengunjung[] $historyData */
/** @var yii\data\ActiveDataProvider $logDataProvider */

$this->title = 'Statistik & Log Pengunjung';
?>
<div class="statistik-index">
    <div style="margin-bottom:20px;">
        <h1 style="font-size:1.4rem; font-weight:700; color:#1a202c;"><?= Html::encode($this->title) ?></h1>
        <p style="font-size:0.875rem; color:#718096;">Pantau lalu lintas kunjungan situs penerbit secara real-time dan terperinci.</p>
    </div>

    <!-- Ringkasan Angka Pengunjung -->
    <div class="stats-grid" style="margin-bottom:24px;">
        <div class="stat-box">
            <div class="stat-value"><?= number_format($stats['hariIni']) ?></div>
            <div class="stat-label">Hari Ini</div>
        </div>
        <div class="stat-box">
            <div class="stat-value"><?= number_format($stats['mingguIni']) ?></div>
            <div class="stat-label">Minggu Ini</div>
        </div>
        <div class="stat-box">
            <div class="stat-value"><?= number_format($stats['bulanIni']) ?></div>
            <div class="stat-label">Bulan Ini</div>
        </div>
        <div class="stat-box">
            <div class="stat-value"><?= number_format($stats['total']) ?></div>
            <div class="stat-label">Total Kunjungan</div>
        </div>
    </div>

    <!-- Log Kunjungan Terbaru -->
    <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:4px; padding:20px;">
        <h2 style="font-size:1.1rem; font-weight:700; color:#1a202c; margin-bottom:12px;">Log Kunjungan Terbaru</h2>
        
        <div style="overflow-x:auto;">
            <table class="data-table">
                <thead>
                    <tr>
                        <th style="width:160px;">Waktu</th>
                        <th style="width:130px;">IP Address</th>
                        <th>Halaman Dikunjungi</th>
                        <th>Peramban / User-Agent</th>
                        <th>Sumber Rujukan</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($logDataProvider->getCount() > 0): ?>
                        <?php foreach ($logDataProvider->getModels() as $log): ?>
                            <tr>
                                <td style="font-size:0.8rem; font-variant-numeric:tabular-nums;"><?= Html::encode($log->visited_at) ?></td>
                                <td><code><?= Html::encode($log->ip_address) ?></code></td>
                                <td><strong><?= Html::encode($log->url_visited) ?></strong></td>
                                <td style="font-size:0.75rem; color:#718096; max-width:250px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="<?= Html::encode($log->user_agent) ?>">
                                    <?= Html::encode($log->user_agent ?: 'Unknown') ?>
                                </td>
                                <td style="font-size:0.8rem; color:#4a5568;"><?= Html::encode($log->referer ?: 'Direct / Organik') ?></td>
                            </tr>
                        <?php endforeach; ?>
                    <?php else: ?>
                        <tr>
                            <td colspan="5" style="text-align:center; padding:20px; color:#718096;">Belum ada catatan log pengunjung.</td>
                        </tr>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>

        <!-- Pagination Log -->
        <div style="margin-top:16px; display:flex; justify-content:center;">
            <?= LinkPager::widget([
                'pagination' => $logDataProvider->pagination,
                'options' => ['class' => 'pagination', 'style' => 'display:flex; list-style:none; gap:6px;'],
                'linkOptions' => ['class' => 'btn btn-secondary', 'style' => 'padding:4px 10px; font-size:0.8rem;'],
            ]) ?>
        </div>
    </div>
</div>
