<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once '../../env.php';

$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);

try {
    $courseID = $data['courseID'];
    
    // 트랜잭션 시작 전에 autocommit 비활성화
    mysqli_autocommit($DBCON, FALSE);
    
    // course_attraction 테이블 먼저 삭제
    $query1 = "DELETE FROM course_attraction WHERE course_key = ?;";
    $stmt1 = mysqli_prepare($DBCON, $query1);
    mysqli_stmt_bind_param($stmt1, "s", $courseID);
    if (!mysqli_stmt_execute($stmt1)) {
        throw new Exception("course_attraction 삭제 실패");
    }
    mysqli_stmt_close($stmt1);

    // course 테이블 삭제
    $query2 = "DELETE FROM course WHERE `Key` = ?;";
    $stmt2 = mysqli_prepare($DBCON, $query2);
    mysqli_stmt_bind_param($stmt2, "s", $courseID);
    if (!mysqli_stmt_execute($stmt2)) {
        throw new Exception("course 삭제 실패");
    }
    mysqli_stmt_close($stmt2);

    // 모든 쿼리가 성공적으로 실행되면 커밋
    if (!mysqli_commit($DBCON)) {
        throw new Exception("커밋 실패");
    }

    echo json_encode(['success' => true]);
} catch (Exception $e) {
    // 오류 발생 시 롤백
    mysqli_rollback($DBCON);
    error_log("Error in delete course: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    // autocommit 다시 활성화
    mysqli_autocommit($DBCON, TRUE);
}
