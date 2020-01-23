<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 19:21
 */

class Offence {
    private $conn;
    private $table = 'offences';

    public $id;
    public $title;
    public $description;
    public $theme_id;
    public $act_id;
    public $penalty;
    public $full_provision;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = 'SELECT * FROM ' . $this->table .' ORDER BY title';
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function readForAct()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE act_id =? ORDER BY title';
        $stmt = $this->conn->prepare($query);

        $this->act_id = htmlspecialchars(strip_tags($this->act_id));

        $stmt->bindParam(1, $this->act_id);

        $stmt->execute();
        return $stmt;
    }

    public function readForTheme()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE theme_id =? ORDER BY title';
        $stmt = $this->conn->prepare($query);

        $this->theme_id = htmlspecialchars(strip_tags($this->theme_id));

        $stmt->bindParam(1, $this->theme_id);

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
        $this->description = $row['description'];
        $this->theme_id = $row['theme_id'];
        $this->act_id = $row['act_id'];
        $this->penalty = $row['penalty'];
        $this->full_provision = $row['full_provision'];
    }

    public function create()
    {
        $query = 'INSERT INTO ' . $this->table . '
        SET 
        title = :title,
        description = :description,
        theme_id = :theme_id,
        act_id = :act_id,
        penalty = :penalty,
        full_provision = :full_provision
        ';
        $stmt = $this->conn->prepare($query);

        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->theme_id = htmlspecialchars(strip_tags($this->theme_id));
        $this->act_id = htmlspecialchars(strip_tags($this->act_id));
        $this->penalty = htmlspecialchars(strip_tags($this->penalty));
        $this->full_provision = htmlspecialchars(strip_tags($this->full_provision));

        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':theme_id', $this->theme_id);
        $stmt->bindParam(':act_id', $this->act_id);
        $stmt->bindParam(':penalty', $this->penalty);
        $stmt->bindParam(':full_provision', $this->full_provision);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update()
    {
        $query = 'UPDATE ' . $this->table . '
        SET 
        title = :title,
        description = :description,
        penalty = :penalty,
        full_provision = :full_provision
        WHERE id=:id
        ';
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->title = htmlspecialchars(strip_tags($this->title));
        $this->description = htmlspecialchars(strip_tags($this->description));
        $this->theme_id = htmlspecialchars(strip_tags($this->theme_id));
        $this->act_id = htmlspecialchars(strip_tags($this->act_id));
        $this->penalty = htmlspecialchars(strip_tags($this->penalty));
        $this->full_provision = htmlspecialchars(strip_tags($this->full_provision));

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':description', $this->description);
        $stmt->bindParam(':penalty', $this->penalty);
        $stmt->bindParam(':full_provision', $this->full_provision);

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