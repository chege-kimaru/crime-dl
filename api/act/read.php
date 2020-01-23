<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 22/12/2018
 * Time: 20:00
 */
header('Access-Control-Allow-Origin: *');
header('Content-Type:application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Methods, Access-Control-Allow-Origin, Content-Type, X-Requested-With, Authorization');



include_once '../../config/database.php';
include_once '../../model/act.php';

$database = new Database();
$db = $database->connect();

$act = new Act($db);

$result = $act->read();
$num = $result->rowCount();

$acts_array = array();
$acts_array['data'] = array();
while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
    extract($row);

    $act_item = array(
        'id' => $id,
        'title' => $title
    );

    array_push($acts_array['data'], $act_item);
}
echo json_encode($acts_array);

