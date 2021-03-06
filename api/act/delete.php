<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 21:35
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Methods, Access-Control-Allow-Origin, Content-Type, X-Requested-With, Authorization');

require_once '../auth/validate_token.php';
if($loggedInUser == null || $loggedInUser->role != 1) {
    http_response_code(401);
    exit;
}

include_once '../../config/database.php';
include_once '../../model/act.php';

$database = new Database();
$db = $database->connect();

$act = new Act($db);

$data = json_decode(file_get_contents("php://input"));

$act->id = $data->id;

if($act->delete()) {
   http_response_code(200);
   echo json_encode(array("message"=>"Success"));
} else {
    http_response_code(500);
    echo json_encode(array("Error"=>"Error"));
}