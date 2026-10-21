<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%pengunjung}}`.
 */
class m231021_000003_create_pengunjung_table extends Migration
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

        $this->createTable('{{%pengunjung}}', [
            'id' => $this->primaryKey(),
            'tanggal' => $this->date()->notNull()->unique(),
            'total_hits' => $this->integer()->notNull()->defaultValue(1),
            'created_at' => $this->dateTime()->notNull(),
            'updated_at' => $this->dateTime()->notNull(),
        ], $tableOptions);

        $this->createIndex('idx-pengunjung-tanggal', '{{%pengunjung}}', 'tanggal');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%pengunjung}}');
    }
}
