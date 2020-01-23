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
include_once '../../model/offence.php';

$database = new Database();
$db = $database->connect();

$offence = new Offence($db);

$theme_id = $_GET['theme_id'];
$act_id = $_GET['act_id'];

if (!empty($theme_id)) {
    $offence->theme_id = $_GET['theme_id'];
    $result = $offence->readForTheme();
} else if (!empty($act_id)) {
    $offence->act_id = $_GET['act_id'];
    $result = $offence->readForAct();
} else {
    $result = $offence->read();
}

$acts_array = array();
$acts_array['data'] = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $act_item = array(
        'id' => $id,
        'title' => $title,
        'description' => $description,
        'theme_id' => $theme_id,
        'act_id' => $act_id,
        'penalty' => $penalty,
        'full_provision' => $full_provision
    );

    array_push($acts_array['data'], $act_item);
}
echo json_encode($acts_array);

