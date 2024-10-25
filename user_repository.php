<?php
// env.php 파일의 경로를 상대 경로로 변경
require_once __DIR__ . '/env.php';

function idChecheckQuery($socialId, $socialType, $DBCON)
{
    $query = "SELECT * FROM user WHERE 
    id='{$socialId}'
    AND social_type='{$socialType}'";
    $result = mysqli_query($DBCON, $query);
    return $result;
};

function userRegisterQuery($socialId, $socialType, $userName, $DBCON)
{
    date_default_timezone_set('Asia/Seoul');
    $date = date("y-m-d h:i:s");

    $insertQuery = "INSERT INTO user (
    id,
    social_type,
    recent_login,
    name
    ) VALUES (
    '{$socialId}',
    '{$socialType}',
    '{$date}',
    '{$userName}'
    )";
    $result = mysqli_query($DBCON, $insertQuery);
    return $result;
}

function getUserFavorites($userId, $DBCON)
{
    $query = "SELECT attraction FROM bookmark WHERE user = '{$userId}'";
    $result = mysqli_query($DBCON, $query);
    $favorites = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $favorites[] = $row;
    }
    return $favorites;
}
