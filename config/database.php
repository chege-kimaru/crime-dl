<?php

/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 12/11/2018
 * Time: 12:09
 */
class Database
{
    //DB Params
    /******CHANGE THESE PARAMS AS PER YOUR ENVIRONMENT**********/
    private $host = 'localhost:3306';
    private $db_name = 'crime_dl';
    private $username = 'root';
    private $password = 'kevinkimaru';
    /******CHANGE THESE PARAMS AS PER YOUR ENVIRONMENT**********/

    private $conn;

    //DB Connect
    public function connect()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name,
                $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            throw $e;
        }
        return $this->conn;
    }
}