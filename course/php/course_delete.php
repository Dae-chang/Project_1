<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once '../../env.php';

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

try {
    mysqli_begin_transaction($DBCON);
    $courseID = $data['courseID'];

    $query1 = "DELETE FROM course WHERE `Key` = ?;";
    $stmt1 = mysqli_prepare($DBCON, $query1);
    mysqli_stmt_bind_param($stmt1, "s", $courseID);
    mysqli_stmt_execute($stmt1);
    mysqli_stmt_close($stmt1);

    $query2 = "DELETE FROM course_attraction WHERE `course_key` = ?;";
    $stmt2 = mysqli_prepare($DBCON, $query2);
    mysqli_stmt_bind_param($stmt2, "s", $courseID);
    mysqli_stmt_execute($stmt2);
    mysqli_stmt_close($stmt2);


    mysqli_commit($DBCON);

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    error_log("Error in delete course: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
