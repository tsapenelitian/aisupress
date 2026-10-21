<?php

namespace app\models;

use Yii;
use yii\db\ActiveRecord;
use yii\helpers\Inflector;

/**
 * Model class for table "kategori".
 *
 * @property int $id
 * @property string $nama
 * @property string $slug
 * @property string|null $keterangan
 * @property string $created_at
 *
 * @property Buku[] $bukus
 */
class Kategori extends ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%kategori}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nama'], 'required', 'message' => '{attribute} wajib diisi.'],
            [['keterangan'], 'string'],
            [['created_at'], 'safe'],
            [['nama'], 'string', 'max' => 100],
            [['slug'], 'string', 'max' => 120],
            [['slug'], 'unique', 'message' => 'Slug ini sudah digunakan.'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nama' => 'Nama Kategori',
            'slug' => 'Slug URL',
            'keterangan' => 'Deskripsi Kategori',
            'created_at' => 'Waktu Dibuat',
        ];
    }

    /**
     * Auto generate slug and timestamp before save
     */
    public function beforeSave($insert)
    {
        if (parent::beforeSave($insert)) {
            if (empty($this->slug)) {
                $this->slug = Inflector::slug($this->nama);
            }
            if ($insert && empty($this->created_at)) {
                $this->created_at = date('Y-m-d H:i:s');
            }
            return true;
        }
        return false;
    }

    /**
     * Gets query for [[Bukus]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getBukus()
    {
        return $this->hasMany(Buku::class, ['kategori_id' => 'id']);
    }

    /**
     * Hitung total buku per kategori
     */
    public function getTotalBuku()
    {
        return $this->getBukus()->count();
    }
}
