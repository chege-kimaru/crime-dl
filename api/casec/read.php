<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 20:00
 */

header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');

include_once '../../config/database.php';
include_once '../../model/casec.php';

$database = new Database();
$db = $database->connect();

$casec = new CaseC($db);
$casec->offence_id = $_GET['offence_id'];

$result = $casec->read();
$num = $result->rowCount();

$acts_array = array();
$acts_array['data'] = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $act_item = array(
        'id' => $id,
        'offence_id' => $offence_id,
        'description' => $description
    );

    array_push($acts_array['data'], $act_item);
}
echo json_encode($acts_array);

