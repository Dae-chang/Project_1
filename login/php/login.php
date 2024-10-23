<?php
require_once '../../env.php';
$KAKAO_LOGIN_URL = "https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=".KAKAO_REST_API_KEY."&redirect_uri=".SOCCIAL_REDIRECT_URI;
$NAVER_LOGIN_URL = "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=".NAVER_CLIENT_ID."&redirect_uri=".SOCCIAL_REDIRECT_URI."&state=".NAVER_STATE;
$GOOGLE_LOGIN_URL = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=".GOOGLE_CLIENT_ID."&redirect_uri=".SOCCIAL_REDIRECT_URI."&scope=".GOOGLE_SCOPE."&state=".GOOGLE_STATE;
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 - 대구의 창</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../../header/header.css">

</head>
<body>
<?php include '../../header/header.php'; ?>

    <main>
        <h1>로그인</h1>
        <p>대구의 창에서는 개인정보의 수집 및 보유 최소화를 위해 SNS 로그인을 활용하고 있습니다.</p>
        
        <button class="social-login-button naver-login" onclick="location.href='<?php echo $NAVER_LOGIN_URL; ?>'">네이버 로그인</button>
        <button class="social-login-button kakao-login" onclick="location.href='<?php echo $KAKAO_LOGIN_URL; ?>'">카카오 로그인</button>
        <button class="social-login-button google-login" onclick="location.href='<?php echo $GOOGLE_LOGIN_URL; ?>'">구글 로그인</button>
    </main>

    <footer>
        <p>&copy; 2023 대구 관광지 소개. 모든 권리 보유.</p>
    </footer>
</body>
</html>