<?php
require_once '../../env.php';
session_start();

//북마크&북마크 해제

function bookmark($attraction_name, $user_key, $DBCON)
{
    $status = null;
    mysqli_set_charset($DBCON, 'utf8');
    $query = "SELECT *
              FROM bookmark
              WHERE user = '{$user_key}' 
              AND attraction = '{$attraction_name}'";
    $result = mysqli_query($DBCON, $query);
    $row = mysqli_fetch_array($result);
    if (!$row){
        $insert_query = "INSERT INTO bookmark (
        user,
        attraction
        ) VALUES (
        '$user_key',
        '$attraction_name'
        )";
        $result = mysqli_query($DBCON, $insert_query);
        $status = "INSERTED";
    }else{
        $delete_query = "DELETE FROM bookmark WHERE user='{$user_key}' AND attraction='{$attraction_name}'";
        $status="DELETED";
        $result = mysqli_query($DBCON, $delete_query);
    }
    return json_encode($status, JSON_UNESCAPED_UNICODE);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = json_decode(urldecode(file_get_contents('php://input')), true);
    $attraction = $data['attraction'];
    $response = bookmark($attraction, $_SESSION['userID'], $DBCON);
    echo json_encode($response);
} else {
    echo "Invalid request method.";
}
