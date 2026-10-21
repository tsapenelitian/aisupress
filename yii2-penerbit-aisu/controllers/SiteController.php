<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use yii\web\Response;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use app\models\LoginForm;
use app\models\Buku;
use app\models\BukuSearch;
use app\models\Kategori;
use app\models\Pengunjung;

/**
 * SiteController handles public pages and authentication.
 */
class SiteController extends Controller
{
    /**
     * {@inheritdoc}
     */
    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::class,
                'only' => ['logout'],
                'rules' => [
                    [
                        'actions' => ['logout'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'logout' => ['post', 'get'],
                ],
            ],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function actions()
    {
        return [
            'error' => [
                'class' => 'yii\web\ErrorAction',
            ],
        ];
    }

    /**
     * Before Action: Real-time visitor tracking (non-blocking)
     */
    public function beforeAction($action)
    {
        if (parent::beforeAction($action)) {
            // Track public visits
            if (!in_array($action->id, ['robots', 'sitemap', 'error'])) {
                Pengunjung::trackVisit();
            }
            return true;
        }
        return false;
    }

    /**
     * Halaman Utama (Home)
     * - Highlight 6-8 buku terbaru
     * - Statistik pengunjung (hari ini, minggu ini, bulan ini, total)
     * - Header: Logo + Nama Penerbit
     * - Footer lengkap
     */
    public function actionIndex()
    {
        $bukuTerbaru = Buku::find()
            ->with('kategori')
            ->orderBy(['id' => SORT_DESC])
            ->limit(8)
            ->all();

        $statistik = Pengunjung::getStats();
        $totalBuku = Buku::find()->count();
        $kategoriList = Kategori::find()->all();

        return $this->render('index', [
            'bukuTerbaru' => $bukuTerbaru,
            'statistik' => $statistik,
            'totalBuku' => $totalBuku,
            'kategoriList' => $kategoriList,
        ]);
    }

    /**
     * Halaman Katalog Buku
     * - Grid buku sederhana
     * - Pencarian: Judul, Penulis, ISBN
     * - Filter Kategori
     * - Pagination sederhana
     * - Sorting: Terbaru, Harga Terendah, Harga Tertinggi, Judul A-Z
     */
    public function actionKatalog($kategori = null)
    {
        $searchModel = new BukuSearch();
        $params = Yii::$app->request->queryParams;

        if ($kategori !== null) {
            $cat = Kategori::findOne(['slug' => $kategori]);
            if ($cat) {
                $searchModel->kategori_id = $cat->id;
            }
        }

        $dataProvider = $searchModel->search($params, 12);
        $kategoriList = Kategori::find()->all();

        return $this->render('katalog', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'kategoriList' => $kategoriList,
            'currentSlug' => $kategori,
        ]);
    }

    /**
     * Halaman Detail Buku
     * - Cover buku (lazy load tanpa animasi)
     * - Judul, Penulis, Editor, Halaman, ISBN, Harga, Sinopsis
     * - Link Pembelian: Tokopedia, Shopee, Google Book, Google Play
     * - Keterangan
     * - Schema Markup Book (JSON-LD)
     */
    public function actionDetail($slug)
    {
        $model = Buku::find()->where(['slug' => $slug])->with('kategori')->one();
        if ($model === null) {
            throw new NotFoundHttpException('Buku yang Anda cari tidak ditemukan atau telah dipindahkan.');
        }

        $bukuTerkait = Buku::find()
            ->where(['kategori_id' => $model->kategori_id])
            ->andWhere(['!=', 'id', $model->id])
            ->orderBy(['id' => SORT_DESC])
            ->limit(4)
            ->all();

        return $this->render('detail', [
            'model' => $model,
            'bukuTerkait' => $bukuTerkait,
        ]);
    }

    /**
     * Halaman Pengiriman
     * Informasi pengiriman yang jelas dan ringkas
     */
    public function actionPengiriman()
    {
        return $this->render('pengiriman');
    }

    /**
     * Halaman Tentang
     * Profil penerbit, alamat, kontak
     */
    public function actionTentang()
    {
        return $this->render('tentang');
    }

    /**
     * Login Administrator
     */
    public function actionLogin()
    {
        if (!Yii::$app->user->isGuest) {
            return $this->redirect(['/admin']);
        }

        $model = new LoginForm();
        if ($model->load(Yii::$app->request->post()) && $model->login()) {
            Yii::$app->session->setFlash('success', 'Selamat datang kembali di panel administrator Penerbit AISU.');
            return $this->redirect(['/admin']);
        }

        $model->password = '';
        return $this->render('login', [
            'model' => $model,
        ]);
    }

    /**
     * Logout Administrator
     */
    public function actionLogout()
    {
        Yii::$app->user->logout();
        Yii::$app->session->setFlash('info', 'Anda telah berhasil keluar.');
        return $this->goHome();
    }

    /**
     * Sitemap.xml Dinamis untuk Google & Mesin Pencari
     */
    public function actionSitemap()
    {
        Yii::$app->response->format = Response::FORMAT_RAW;
        Yii::$app->response->headers->set('Content-Type', 'application/xml; charset=utf-8');

        $baseUrl = Yii::$app->params['siteUrl'] ?? 'https://penerbit.aisu.or.id';
        $bukus = Buku::find()->select(['slug', 'updated_at'])->all();
        $kategoris = Kategori::find()->select(['slug', 'created_at'])->all();

        return $this->renderPartial('sitemap', [
            'baseUrl' => $baseUrl,
            'bukus' => $bukus,
            'kategoris' => $kategoris,
        ]);
    }

    /**
     * Robots.txt Optimal
     */
    public function actionRobots()
    {
        Yii::$app->response->format = Response::FORMAT_RAW;
        Yii::$app->response->headers->set('Content-Type', 'text/plain; charset=utf-8');

        $baseUrl = Yii::$app->params['siteUrl'] ?? 'https://penerbit.aisu.or.id';
        $content = "User-agent: *\n";
        $content .= "Allow: /\n";
        $content .= "Disallow: /admin/\n";
        $content .= "Disallow: /site/login\n";
        $content .= "Disallow: /site/logout\n\n";
        $content .= "Sitemap: {$baseUrl}/sitemap.xml\n";

        return $content;
    }
}
