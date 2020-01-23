<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 03/12/2018
 * Time: 21:54
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
$email_exists = $user->emailExists();

include_once '../../config/core.php';
require_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

if ($email_exists && password_verify($data->password, $user->password)) {

    $token = array(
//        "iss" => $iss,
//        "aud" => $aud,
//        "iat" => $iat,
//        "nbf" => $nbf,
        "data" => array(
            "id" => $user->id,
            "email" => $user->email,
            "role" => $user->role
        )
    );

    // set response code
    http_response_code(200);

    // generate jwt
    $jwt = JWT::encode($token, JWT_KEY);
    echo json_encode(
        array(
            "message" => "Successful login.",
            "jwt" => $jwt,
            "role" => $user->role
        )
    );

} else {

    // set response code
    http_response_code(401);

    echo json_encode(array("message" => "Login failed."));
}