<?php
session_start();
header('Content-Type: application/json; charset=utf-8');
require_once '../../env.php';


// POST 데이터 받기
$rawData = file_get_contents('php://input');
$data = json_decode($rawData, true);


try {
    mysqli_begin_transaction($DBCON);
    
    $userKey = $_SESSION['userID'];
    
    // 코스 생성
    $query = "INSERT INTO course (user_key, name, created_at) VALUES (?, ?, NOW())";
    $stmt = mysqli_prepare($DBCON, $query);
    mysqli_stmt_bind_param($stmt, "ss", $userKey, $data['courseName']);
    
    if (!mysqli_stmt_execute($stmt)) {
        throw new Exception("코스 생성 실패: " . mysqli_error($DBCON));
    }

    $courseKey = mysqli_insert_id($DBCON);

    // 코스-관광지 연결
    $query = "INSERT INTO course_attraction (course_key, attraction_name) VALUES (?, ?)";
    $stmt = mysqli_prepare($DBCON, $query);

    foreach ($data['attractions'] as $attraction) {
        $attractionName = $attraction['관광지'];  // response.json의 "관광지" 필드값 사용
        mysqli_stmt_bind_param($stmt, "is", $courseKey, $attractionName);
        if (!mysqli_stmt_execute($stmt)) {
            throw new Exception("관광지 연결 실패: " . mysqli_error($DBCON));
        }
    }

    mysqli_commit($DBCON);
    echo json_encode([
        'success' => true, 
        'message' => '코스가 생성되었습니다.',
        'courseId' => $courseKey
    ]);

} catch (Exception $e) {
    error_log("Error in course creation: " . $e->getMessage());
    mysqli_rollback($DBCON);
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} finally {
    mysqli_close($DBCON);
}
?>