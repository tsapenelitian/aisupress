<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%kategori}}`.
 */
class m231021_000001_create_kategori_table extends Migration
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

        $this->createTable('{{%kategori}}', [
            'id' => $this->primaryKey(),
            'nama' => $this->string(100)->notNull(),
            'slug' => $this->string(120)->notNull()->unique(),
            'keterangan' => $this->text()->null(),
            'created_at' => $this->dateTime()->notNull(),
        ], $tableOptions);

        $this->createIndex('idx-kategori-slug', '{{%kategori}}', 'slug');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%kategori}}');
    }
}
