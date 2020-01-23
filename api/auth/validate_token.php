<?php
/**
 * Created by PhpStorm.
 * User: Kevin Chege
 * Date: 03/12/2018
 * Time: 22:20
 */
include_once '../../config/core.php';
require_once '../../vendor/autoload.php';

use \Firebase\JWT\JWT;

foreach (apache_request_headers() as $header=>$value) {
    if($header == 'Authorization') {
        $jwt = $value;
    }
}
$loggedInUser = null;
if($jwt){
    try {
        // decode jwt
        $decoded = JWT::decode($jwt, JWT_KEY, array('HS256'));
        $loggedInUser = $decoded->data;
    } catch (Exception $e) {
        $loggedInUser = null;
    }
}