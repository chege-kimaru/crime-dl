<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 03/12/2018
 * Time: 21:26
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Methods, Access-Control-Allow-Origin, Content-Type,
 X-Requested-With, Authorization');

include_once '../../config/Database.php';
include_once '../../model/User.php';

$database = new Database();
$db = $database->connect();

$user = new User($db);

$data = json_decode(file_get_contents("php://input"));

$user->email = $data->email;
$user->password = $data->password;

if($user->create()) {
    http_response_code(200);
    echo json_encode(array('message'=>'Registration successful'));
} else {
    http_response_code(500);
    echo json_encode(array('message'=>'Registration failed'));
}