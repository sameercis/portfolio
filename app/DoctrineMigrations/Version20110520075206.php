<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration,
    Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your need!
 */
class Version20110520075206 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is autogenerated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql");
        
        $this->addSql("CREATE TABLE blog_posts (id INT AUTO_INCREMENT NOT NULL, title VARCHAR(255) NOT NULL, text LONGTEXT NOT NULL, PRIMARY KEY(id)) ENGINE = InnoDB");
        $this->addSql("CREATE TABLE blog_posts_tags (post_id INT NOT NULL, tag_id INT NOT NULL, INDEX IDX_332A8F764B89032C (post_id), INDEX IDX_332A8F76BAD26311 (tag_id), PRIMARY KEY(post_id, tag_id)) ENGINE = InnoDB");
        $this->addSql("CREATE TABLE blog_tags (id INT AUTO_INCREMENT NOT NULL, text VARCHAR(255) NOT NULL, PRIMARY KEY(id)) ENGINE = InnoDB");
        $this->addSql("ALTER TABLE blog_posts_tags ADD FOREIGN KEY (post_id) REFERENCES blog_posts(id)");
        $this->addSql("ALTER TABLE blog_posts_tags ADD FOREIGN KEY (tag_id) REFERENCES blog_tags(id)");
    }

    public function down(Schema $schema)
    {
        // this down() migration is autogenerated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() != "mysql");
        
        $this->addSql("ALTER TABLE blog_posts_tags DROP FOREIGN KEY ");
        $this->addSql("ALTER TABLE blog_posts_tags DROP FOREIGN KEY ");
        $this->addSql("DROP TABLE blog_posts");
        $this->addSql("DROP TABLE blog_posts_tags");
        $this->addSql("DROP TABLE blog_tags");
    }
}