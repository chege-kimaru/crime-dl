<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 19:22
 */

class CaseC
{
    private $conn;
    private $table = 'cases';

    public $id;
    public $offence_id;
    public $description;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE offence_id=?';
        $stmt = $this->conn->prepare($query);
        $this->offence_id = htmlspecialchars(strip_tags($this->offence_id));
        $stmt->bindParam(1, $this->offence_id);
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
        $this->offence_id = $row['offence_id'];
        $this->description = $row['description'];
    }

    public function create()
    {
        $query = 'INSERT INTO ' . $this->table . '
        SET 
        description = :description,
        offence_id = :offence_id
        ';
        $stmt = $this->conn->prepare($query);

        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->offence_id = htmlspecialchars(strip_tags($this->offence_id));

        $stmt->bindParam(':offence_id', $this->offence_id);
        $stmt->bindParam(':description', $this->description);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update()
    {
        $query = 'UPDATE ' . $this->table . '
        SET 
        description = :description
        WHERE id = :id
        ';
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->description = htmlspecialchars(strip_tags($this->description));

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':description', $this->description);

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