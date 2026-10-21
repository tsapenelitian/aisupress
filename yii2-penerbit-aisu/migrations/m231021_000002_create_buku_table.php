<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%buku}}`.
 */
class m231021_000002_create_buku_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE=InnoDB';
        }

        $this->createTable('{{%buku}}', [
            'id' => $this->primaryKey(),
            'judul' => $this->string(255)->notNull(),
            'slug' => $this->string(255)->notNull()->unique(),
            'penulis' => $this->string(200)->notNull(),
            'editor' => $this->string(200)->null(),
            'jumlah_halaman' => $this->integer()->notNull(),
            'isbn' => $this->string(30)->notNull()->unique(),
            'harga' => $this->decimal(12, 2)->notNull(),
            'sinopsis' => $this->text()->notNull(),
            'link_tokopedia' => $this->string(255)->null(),
            'link_shopee' => $this->string(255)->null(),
            'link_google_book' => $this->string(255)->null(),
            'link_google_play' => $this->string(255)->null(),
            'cover' => $this->string(255)->null(),
            'kategori_id' => $this->integer()->notNull(),
            'keterangan' => $this->text()->null(),
            'created_at' => $this->dateTime()->notNull(),
            'updated_at' => $this->dateTime()->notNull(),
        ], $tableOptions);

        // Indexes & Foreign Key
        $this->createIndex('idx-buku-slug', '{{%buku}}', 'slug');
        $this->createIndex('idx-buku-kategori_id', '{{%buku}}', 'kategori_id');
        $this->createIndex('idx-buku-isbn', '{{%buku}}', 'isbn');

        $this->addForeignKey(
            'fk-buku-kategori_id',
            '{{%buku}}',
            'kategori_id',
            '{{%kategori}}',
            'id',
            'RESTRICT',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropForeignKey('fk-buku-kategori_id', '{{%buku}}');
        $this->dropTable('{{%buku}}');
    }
}
