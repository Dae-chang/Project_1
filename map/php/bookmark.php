<?php
require_once '../../env.php';
session_start();

//북마크 목록 불러오기

function getUserBookmarkedLttractions($user_key, $DBCON)
{
    mysqli_set_charset($DBCON, 'utf8');
    $query = "SELECT attraction
              FROM bookmark
              WHERE user = '{$user_key}'";
    $result = mysqli_query($DBCON, $query);
    $attractions = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $attractions[] = $row;
    }
    // 2차원배열로 출력. json_decode필요
    // attraction항목만 2차원배열로 뱉으니 php로 사용할 경우 array_column(json_decode($data), 'attraction')을 써서 1차원배열로 정제할것
    return json_encode($attractions, JSON_UNESCAPED_UNICODE);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    $data = getUserBookmarkedLttractions($_SESSION['userID'], $DBCON);
    echo json_encode($data);
} else {
    echo "Invalid request method.";
}
