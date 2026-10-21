<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;

/**
 * BukuSearch represents the model behind the search form of `app\models\Buku`.
 */
class BukuSearch extends Buku
{
    public $keyword;
    public $search_by;
    public $sort_by;

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'kategori_id', 'jumlah_halaman'], 'integer'],
            [['judul', 'penulis', 'editor', 'isbn', 'slug', 'keyword', 'search_by', 'sort_by'], 'safe'],
            [['harga'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     * @return ActiveDataProvider
     */
    public function search($params, $pageSize = 12)
    {
        $query = Buku::find()->joinWith('kategori');

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => $pageSize,
                'defaultPageSize' => $pageSize,
            ],
            'sort' => [
                'defaultOrder' => ['id' => SORT_DESC],
            ],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        // Filter Kategori
        $query->andFilterWhere(['buku.kategori_id' => $this->kategori_id]);

        // Spesifik Search: Judul, Penulis, ISBN
        if (!empty($this->keyword)) {
            $keyword = trim($this->keyword);
            if ($this->search_by === 'penulis') {
                $query->andFilterWhere(['like', 'buku.penulis', $keyword]);
            } elseif ($this->search_by === 'isbn') {
                $query->andFilterWhere(['like', 'buku.isbn', $keyword]);
            } elseif ($this->search_by === 'judul') {
                $query->andFilterWhere(['like', 'buku.judul', $keyword]);
            } else {
                // Default universal search across all 3 fields
                $query->andWhere([
                    'or',
                    ['like', 'buku.judul', $keyword],
                    ['like', 'buku.penulis', $keyword],
                    ['like', 'buku.isbn', $keyword],
                ]);
            }
        }

        // Sorting (Terbaru, Harga Terendah, Harga Tertinggi, Judul A-Z)
        switch ($this->sort_by) {
            case 'harga_asc':
                $query->orderBy(['buku.harga' => SORT_ASC]);
                break;
            case 'harga_desc':
                $query->orderBy(['buku.harga' => SORT_DESC]);
                break;
            case 'judul_asc':
                $query->orderBy(['buku.judul' => SORT_ASC]);
                break;
            case 'judul_desc':
                $query->orderBy(['buku.judul' => SORT_DESC]);
                break;
            case 'terlama':
                $query->orderBy(['buku.id' => SORT_ASC]);
                break;
            case 'terbaru':
            default:
                $query->orderBy(['buku.id' => SORT_DESC]);
                break;
        }

        return $dataProvider;
    }
}
