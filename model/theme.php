<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 19:32
 */

class Theme {
    private $conn;
    private $table = 'themes';

    public $id;
    public $title;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = 'SELECT * FROM ' . $this->table . ' ORDER BY title';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function read_single()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE id=?';
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->id);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        $this->id = $row['id'];
        $this->title = $row['title'];
    }

    public function create()
    {
        $query = 'INSERT INTO ' . $this->table . '
        SET 
        title = :title
        ';
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));

        $stmt->bindParam(':title', $this->title);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update()
    {
        $query = 'UPDATE ' . $this->table . '
        SET 
        title = :title
        WHERE id =:id
        ';
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->title = htmlspecialchars(strip_tags($this->title));

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':title', $this->title);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function delete()
    {
        $query = 'DELETE FROM ' . $this->table . ' WHERE id=:id';
        $stmt = $this->conn->prepare($query);
        $this->id = htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id', $this->id);
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}