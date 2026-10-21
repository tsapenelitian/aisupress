<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\helpers\Inflector;
use yii\web\UploadedFile;

/**
 * Model class for table "buku".
 *
 * @property int $id
 * @property string $judul
 * @property string $slug
 * @property string $penulis
 * @property string|null $editor
 * @property int $jumlah_halaman
 * @property string $isbn
 * @property float $harga
 * @property string $sinopsis
 * @property string|null $link_tokopedia
 * @property string|null $link_shopee
 * @property string|null $link_google_book
 * @property string|null $link_google_play
 * @property string|null $cover
 * @property int $kategori_id
 * @property string|null $keterangan
 * @property string $created_at
 * @property string $updated_at
 *
 * @property Kategori $kategori
 */
class Buku extends ActiveRecord
{
    /**
     * @var UploadedFile|null instance upload file cover
     */
    public $coverFile;

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%buku}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['judul', 'penulis', 'jumlah_halaman', 'isbn', 'harga', 'sinopsis', 'kategori_id'], 'required', 'message' => '{attribute} wajib diisi.'],
            [['jumlah_halaman', 'kategori_id'], 'integer', 'message' => '{attribute} harus berupa angka bulat.'],
            [['harga'], 'number', 'min' => 0, 'message' => '{attribute} harus berupa nominal angka valid.'],
            [['sinopsis', 'keterangan'], 'string'],
            [['created_at', 'updated_at'], 'safe'],
            [['judul', 'slug', 'link_tokopedia', 'link_shopee', 'link_google_book', 'link_google_play', 'cover'], 'string', 'max' => 255],
            [['penulis', 'editor'], 'string', 'max' => 200],
            [['isbn'], 'string', 'max' => 30],
            [['isbn'], 'unique', 'message' => 'Nomor ISBN ini sudah terdaftar.'],
            [['slug'], 'unique', 'message' => 'Slug URL ini sudah terdaftar.'],
            [['kategori_id'], 'exist', 'skipOnError' => true, 'targetClass' => Kategori::class, 'targetAttribute' => ['kategori_id' => 'id'], 'message' => 'Kategori yang dipilih tidak valid.'],
            [['link_tokopedia', 'link_shopee', 'link_google_book', 'link_google_play'], 'url', 'defaultScheme' => 'https', 'message' => 'Format URL tidak valid.'],
            [['coverFile'], 'file', 'skipOnEmpty' => true, 'extensions' => 'png, jpg, jpeg, webp', 'maxSize' => 2 * 1024 * 1024, 'tooBig' => 'Ukuran berkas cover maksimal 2MB.'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'judul' => 'Judul Buku',
            'slug' => 'Slug URL',
            'penulis' => 'Penulis',
            'editor' => 'Editor',
            'jumlah_halaman' => 'Jumlah Halaman',
            'isbn' => 'ISBN',
            'harga' => 'Harga (Rp)',
            'sinopsis' => 'Sinopsis',
            'link_tokopedia' => 'Link Tokopedia',
            'link_shopee' => 'Link Shopee',
            'link_google_book' => 'Link Google Book',
            'link_google_play' => 'Link Google Play',
            'cover' => 'File Cover',
            'coverFile' => 'Upload Cover Baru',
            'kategori_id' => 'Kategori',
            'keterangan' => 'Keterangan Tambahan',
            'created_at' => 'Waktu Ditambahkan',
            'updated_at' => 'Waktu Diperbarui',
        ];
    }

    /**
     * Generate slug dan timestamp otomatis
     */
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if (empty($this->slug)) {
                $baseSlug = Inflector::slug($this->judul);
                $this->slug = $baseSlug ?: 'buku-' . time();
            }

            $now = date('Y-m-d H:i:s');
            if ($insert) {
                $this->created_at = $now;
            }
            $this->updated_at = $now;

            return true;
        }
        return false;
    }

    /**
     * Proses penyimpanan berkas upload cover ke web/uploads/cover/
     */
    public function uploadCover()
    {
        if ($this->validate(['coverFile']) && $this->coverFile) {
            $uploadDir = Yii::getAlias('@app/web/uploads/cover/');
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            $fileName = Inflector::slug($this->judul) . '_' . time() . '.' . $this->coverFile->extension;
            $filePath = $uploadDir . $fileName;

            if ($this->coverFile->saveAs($filePath)) {
                $this->cover = $fileName;
                return true;
            }
        }
        return false;
    }

    /**
     * URL Cover Buku
     */
    public function getCoverUrl()
    {
        if ($this->cover && file_exists(Yii::getAlias('@app/web/uploads/cover/' . $this->cover))) {
            return Yii::$app->request->baseUrl . '/uploads/cover/' . $this->cover;
        }
        return Yii::$app->request->baseUrl . '/uploads/cover/default-book.png';
    }

    /**
     * Gets query for [[Kategori]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getKategori()
    {
        return $this->hasOne(Kategori::class, ['id' => 'kategori_id']);
    }

    /**
     * Format harga Rupiah
     */
    public function getFormattedHarga()
    {
        return 'Rp ' . number_format($this->harga, 0, ',', '.');
    }

    /**
     * Generate Schema.org Book JSON-LD untuk SEO Ekstrem
     */
    public function getSchemaJsonLd()
    {
        $siteUrl = Yii::$app->params['siteUrl'] ?? 'https://penerbit.aisu.or.id';
        $canonicalUrl = $siteUrl . '/buku/' . $this->slug;
        $coverUrl = !empty($this->cover) ? $siteUrl . '/uploads/cover/' . $this->cover : Yii::$app->params['logoUrl'];

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Book',
            'name' => $this->judul,
            'headline' => $this->judul,
            'url' => $canonicalUrl,
            'image' => $coverUrl,
            'isbn' => $this->isbn,
            'numberOfPages' => (int) $this->jumlah_halaman,
            'bookFormat' => 'https://schema.org/Paperback',
            'inLanguage' => 'id',
            'author' => [
                '@type' => 'Person',
                'name' => $this->penulis,
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => Yii::$app->params['namaPenerbit'],
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => Yii::$app->params['logoUrl'],
                ],
            ],
            'description' => strip_tags($this->sinopsis),
            'offers' => [
                '@type' => 'Offer',
                'price' => (string) $this->harga,
                'priceCurrency' => 'IDR',
                'availability' => 'https://schema.org/InStock',
                'url' => $canonicalUrl,
                'seller' => [
                    '@type' => 'Organization',
                    'name' => Yii::$app->params['namaPenerbit'],
                ],
            ],
        ];

        if (!empty($this->editor)) {
            $schema['editor'] = [
                '@type' => 'Person',
                'name' => $this->editor,
            ];
        }

        return json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }
}
