<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 23/11/2018
 * Time: 10:22
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Methods, Access-Control-Allow-Origin, Content-Type, X-Requested-With, Authorization');


include_once '../../config/database.php';
include_once '../../model/casec.php';

include_once '../auth/validate_token.php';
if($loggedInUser == null || $loggedInUser->role != 1) {
    http_response_code(401);
    exit;
}

$database = new Database();
$db = $database->connect();

$casec = new CaseC($db);

$data = json_decode(file_get_contents("php://input"));

$casec->offence_id = $data->offence_id;
$casec->description = $data->description;

if($casec->create()) {
    echo json_encode(
        array('message' => 'Successfully created')
    );
    http_response_code(200);
} else {
    echo json_encode(
        array('message' => 'An error occurred')
    );
    http_response_code(500);
}