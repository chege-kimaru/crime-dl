<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 21:45
 */

include_once 'database.php';

$database = new Database();

$db = $database->connect();

$db->beginTransaction();

try {
    $db->exec("CREATE TABLE IF NOT EXISTS acts (
              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(500) NOT NULL  
              )");
    $db->exec("CREATE TABLE IF NOT EXISTS themes (
              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(500) NOT NULL  
              )");
    $db->exec("CREATE TABLE IF NOT EXISTS offences (
              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(500) NOT NULL,
              description VARCHAR(2000) NOT NULL,
              theme_id INT NOT NULL,  
              act_id INT NOT NULL,  
              penalty VARCHAR(2000) NOT NULL, 
              full_provision VARCHAR(2000) NOT NULL, 
              FOREIGN KEY (theme_id) REFERENCES themes(id),
              FOREIGN KEY (act_id) REFERENCES acts(id)
              )");
    $db->exec("CREATE TABLE IF NOT EXISTS cases (
              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
              offence_id INT NOT NULL,  
              description VARCHAR(2000) NOT NULL,
              FOREIGN KEY (offence_id) REFERENCES offences(id)
              )");
    $db->exec("CREATE TABLE IF NOT EXISTS users (
              id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
              email VARCHAR(255) NOT NULL UNIQUE,  
              password VARCHAR(255) NOT NULL,
              role INT NOT NULL DEFAULT 2
              )");

    $db->commit();
    echo "<h1>Done</h1>";
} catch (Exception $e) {
    $db->rollBack();
    echo $e->getMessage();
}