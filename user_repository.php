<?php
require_once './env.php';

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
