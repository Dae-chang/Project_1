<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once '../../env.php';

try {
    $userKey = $_SESSION['userID'];

    // 사용자의 코스 목록 조회
    $query = "
        SELECT 
            c.Key as course_id,
            c.name as course_name,
            c.created_at,
            GROUP_CONCAT(ca.attraction_name) as attractions
        FROM course c
        LEFT JOIN course_attraction ca ON c.Key = ca.course_key
        WHERE c.user_key = ?
        GROUP BY c.Key
        ORDER BY c.created_at DESC
    ";

    $stmt = mysqli_prepare($DBCON, $query);
    mysqli_stmt_bind_param($stmt, "s", $userKey);

    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("코스 목록 조회 실패: " . mysqli_error($DBCON));
    }

    $result = mysqli_stmt_get_result($stmt);
    $courses = [];

    while ($row = mysqli_fetch_assoc($result)) {
        $row['attractions'] = $row['attractions'] ? explode(',', $row['attractions']) : [];
        $courses[] = $row;
    }

    echo json_encode(['success' => true, 'courses' => $courses]);
} catch (Exception $e) {
    error_log("Error in course listing: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

mysqli_close($DBCON);
