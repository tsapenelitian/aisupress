<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%pengunjung_log}}`.
 */
class m231021_000004_create_pengunjung_log_table extends Migration
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

        $this->createTable('{{%pengunjung_log}}', [
            'id' => $this->primaryKey(),
            'ip_address' => $this->string(45)->notNull(),
            'user_agent' => $this->string(255)->null(),
            'url_visited' => $this->string(255)->notNull(),
            'referer' => $this->string(255)->null(),
            'visited_at' => $this->dateTime()->notNull(),
        ], $tableOptions);

        $this->createIndex('idx-log-visited_at', '{{%pengunjung_log}}', 'visited_at');
        $this->createIndex('idx-log-ip', '{{%pengunjung_log}}', 'ip_address');
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('{{%pengunjung_log}}');
    }
}
