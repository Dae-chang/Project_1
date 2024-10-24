<?php
//카카오 로그인
const KAKAO_REST_API_KEY = "1c2e71b6817d17c1174629b10e1d4a12";
const KAKAO_REDIRECT_URI = "http://localhost/kakao_login.php";  //로그인 성공시 보내는 링크
//네이버 로그인
const NAVER_CLIENT_ID = "QM3EYD4O57DH8SsLEckC";
const NAVER_REDIRECT_URI = "http://localhost/naver_login.php";
const NAVER_SECRET = "JMM3dQQWNO";
//대조해서 일치만 하면 됨
const NAVER_STATE = "RAMDOM_STATE";
//구글 로그인
const GOOGLE_CLIENT_ID = "249545565036-4icvhm2iivp1nb6jji4jivbdkkbreo2s.apps.googleusercontent.com";
const GOOGLE_PASSWORD = "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";
const GOOGLE_REDIRECT_URI = "http://localhost/google_login.php";
const GOOGLE_SCOPE = "https://www.googleapis.com/auth/userinfo.email";
const GOOGLE_STATE = "RANDOM_STATE";

const SOCIAL_REDIRECT_URI = "http://localhost/Project_1/php_login.php";

$DBCON = mysqli_connect(
    'localhost', //DB주소
    'root', //DB아이디
    '', //DB비밀번호
    'daechang' //DB명
);


function fetch($url, $bodyData, $header = array())
{


    $body = json_encode($bodyData);
    $bodyString = http_build_query($bodyData);
    $returnUrl = $url . "?" . $bodyString;

    //curl은 다양한 프로토콜로 데이터 전송이 가능한 것
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $returnUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
    //문자열로 변환
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    //header 입력
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    //curl 실행
    $response = curl_exec($ch);
    curl_close($ch);
    //응답받은 json 디코딩
    $data = json_decode($response, true);
    return $data;
}
