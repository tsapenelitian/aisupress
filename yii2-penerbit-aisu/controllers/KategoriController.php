<?php

namespace app\controllers;

use Yii;
use app\models\Kategori;
use yii\data\ActiveDataProvider;
use yii\web\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use yii\filters\AccessControl;

/**
 * KategoriController implements CRUD actions for Kategori model.
 */
class KategoriController extends Controller
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
            'verbs' => [
                'class' => VerbFilter::class,
                'actions' => [
                    'delete' => ['POST'],
                ],
            ],
        ];
    }

    /**
     * Lists all Kategori models.
     */
    public function actionIndex()
    {
        $dataProvider = new ActiveDataProvider([
            'query' => Kategori::find()->with('bukus'),
            'pagination' => [
                'pageSize' => 20,
            ],
            'sort' => [
                'defaultOrder' => ['id' => SORT_ASC],
            ],
        ]);

        return $this->render('index', [
            'dataProvider' => $dataProvider,
        ]);
    }

    /**
     * Creates a new Kategori model.
     */
    public function actionCreate()
    {
        $model = new Kategori();

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->session->setFlash('success', 'Kategori baru berhasil dibuat.');
            return $this->redirect(['index']);
        }

        return $this->render('create', [
            'model' => $model,
        ]);
    }

    /**
     * Updates an existing Kategori model.
     */
    public function actionUpdate($id)
    {
        $model = $this->findModel($id);

        if ($model->load(Yii::$app->request->post()) && $model->save()) {
            Yii::$app->session->setFlash('success', 'Kategori berhasil diperbarui.');
            return $this->redirect(['index']);
        }

        return $this->render('update', [
            'model' => $model,
        ]);
    }

    /**
     * Deletes an existing Kategori model.
     */
    public function actionDelete($id)
    {
        $model = $this->findModel($id);

        if ($model->getBukus()->count() > 0) {
            Yii::$app->session->setFlash('error', 'Kategori tidak dapat dihapus karena masih memiliki relasi buku aktif.');
            return $this->redirect(['index']);
        }

        $model->delete();
        Yii::$app->session->setFlash('success', 'Kategori berhasil dihapus.');

        return $this->redirect(['index']);
    }

    /**
     * Finds the Kategori model based on its primary key value.
     */
    protected function findModel($id)
    {
        if (($model = Kategori::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('Kategori tidak ditemukan.');
    }
}
