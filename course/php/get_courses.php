<?php
// require_once '../../env.php';
// session_start();

// function getUserCourses($user_key, $DBCON)
// {
//     mysqli_set_charset($DBCON, 'utf8');
//     $user_key = mysqli_real_escape_string($DBCON, $user_key); 
//     $query = "SELECT * FROM course WHERE user = '{$user_key}'";
//     $result = mysqli_query($DBCON, $query);
//     if (!$result) {
//         return json_encode(['error' => 'Database query failed']);
//     }
//     $courses = [];
//     while ($row = mysqli_fetch_assoc($result)) {
//         $courses[] = $row;
//     }
//     return $courses;
// }

// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     header('Content-Type: application/json');
//     if (!isset($_SESSION['userID'])) {
//         echo json_encode(['error' => 'User not logged in']);
//     } else {
//         $data = getUserCourses($_SESSION['userID'], $DBCON);
//         echo json_encode($data);
//     }
// } else {
//     http_response_code(405);
//     echo json_encode(['error' => 'Invalid request method']);
// }

?>