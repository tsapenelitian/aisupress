<?php

namespace app\controllers;

use Yii;
use app\models\Buku;
use app\models\BukuSearch;
use app\models\Kategori;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;
use yii\web\UploadedFile;
use yii\helpers\ArrayHelper;

/**
 * BukuController implements CRUD actions for Buku model.
 */
class BukuController extends Controller
{
    public $layout = 'main';

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
                        'roles' => ['@'], // Hanya user login yang berhak mengelola buku
                    ],
                ],
            ],
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Buku models for admin.
     */
    public function actionIndex()
    {
        $searchModel = new BukuSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams, 15);
        $kategoriList = ArrayHelper::map(Kategori::find()->all(), 'id', 'nama');

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
            'kategoriList' => $kategoriList,
        ]);
    }

    /**
     * Displays a single Buku model.
     */
    public function actionView($id)
    {
        return $this->render('view', [
            'model' => $this->findModel($id),
        ]);
    }

    /**
     * Creates a new Buku model.
     * Handles file upload to web/uploads/cover/
     */
    public function actionCreate()
    {
        $model = new Buku();
        $kategoriList = ArrayHelper::map(Kategori::find()->all(), 'id', 'nama');

        if ($model->load(Yii::$app->request->post())) {
            $model->coverFile = UploadedFile::getInstance($model, 'coverFile');
            if ($model->coverFile) {
                $model->uploadCover();
            }

            if ($model->save()) {
                Yii::$app->session->setFlash('success', 'Buku baru berhasil ditambahkan.');
                return $this->redirect(['view', 'id' => $model->id]);
            } else {
                Yii::$app->session->setFlash('error', 'Gagal menyimpan buku. Periksa kembali isian form.');
            }
        }

        return $this->render('create', [
            'model' => $model,
            'kategoriList' => $kategoriList,
        ]);
    }

    /**
     * Updates an existing Buku model.
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $kategoriList = ArrayHelper::map(Kategori::find()->all(), 'id', 'nama');
        $oldCover = $model->cover;

        if ($model->load(Yii::$app->request->post())) {
            $model->coverFile = UploadedFile::getInstance($model, 'coverFile');
            if ($model->coverFile) {
                $model->uploadCover();
            } else {
                $model->cover = $oldCover;
            }

            if ($model->save()) {
                Yii::$app->session->setFlash('success', 'Data buku berhasil diperbarui.');
                return $this->redirect(['view', 'id' => $model->id]);
            } else {
                Yii::$app->session->setFlash('error', 'Gagal memperbarui data buku.');
            }
        }

        return $this->render('update', [
            'model' => $model,
            'kategoriList' => $kategoriList,
        ]);
    }

    /**
     * Deletes an existing Buku model.
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);
        
        // Hapus file cover fisik bila ada
        if (!empty($model->cover)) {
            $coverPath = Yii::getAlias('@app/web/uploads/cover/' . $model->cover);
            if (file_exists($coverPath)) {
                @unlink($coverPath);
            }
        }

        $model->delete();
        Yii::$app->session->setFlash('success', 'Buku berhasil dihapus dari sistem.');

        return $this->redirect(['index']);
    }

    /**
     * Finds the Buku model based on its primary key value.
     */
    protected function findModel($id)
    {
        if (($model = Buku::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('Halaman buku yang diminta tidak ditemukan.');
    }
}
