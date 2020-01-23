<?php

/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 12/11/2018
 * Time: 12:37
 */
class User
{
    private $conn;
    private $table = 'users';

    public $id;
    public $email;
    public $password;
    public $role;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function read()
    {
        $query = 'SELECT * FROM ' . $this->table;
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
        $this->email = $row['email'];
        $this->password = $row['password'];
        $this->role = $row['role'];
    }

    public function create()
    {
        $query = 'INSERT INTO ' . $this->table . '
        SET 
        email = :email,
        password= :password
        ';
        $stmt = $this->conn->prepare($query);

        $this->email = htmlspecialchars(strip_tags($this->email));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update()
    {
        $query = 'UPDATE ' . $this->table . '
        SET 
         password=:password
        WHERE
        id=:id
        ';
        $stmt = $this->conn->prepare($query);

        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->password = htmlspecialchars(strip_tags($this->password));
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(':id', $this->id);
        $stmt->bindParam(':password', $this->password);

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

    public function emailExists()
    {
        $query = 'SELECT * FROM ' . $this->table . ' WHERE email=? LIMIT 0,1';
        $stmt = $this->conn->prepare($query);
        $this->email = htmlspecialchars(strip_tags($this->email));
        $stmt->bindParam(1, $this->email);
        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            $this->id = $row['id'];
            $this->email = $row['email'];
            $this->password = $row['password'];
            $this->role = $row['role'];

            return true;
        }
        return false;
    }

}
