<?php
require_once './env.php';

function idChecheckQuery($socialId, $socialPass, $socialType, $DBCON){
    $query = "SELECT * FROM member WHERE id='{$socialId}'
    AND pass='{$socialPass}'
    AND social_id='{$socialId}'
    AND social_type='{$socialType}'";
    $result = mysqli_query($DBCON, $query);
    return $result;
};

function userRegisterQuery($socialId, $socialPass, $socialType, $DBCON){
    date_default_timezone_set('Asia/Seoul');
    $date = date("y-m-d h:i:s");

    $insertQuery = "INSERT INTO member (
    id,
    pass,
    created_at,
    social_type,
    social_id
    ) VALUES (
    '{$socialId}',
    '{$socialPass}',
    '{$date}',
    '{$socialType}',
    '{$socialId}'
    )";
    $result = mysqli_query($DBCON,$insertQuery);
    return $result;
}


?>