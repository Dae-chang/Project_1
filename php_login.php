<?php
session_start();
require_once './env.php';
require_once './user_repository.php';
$code = $_GET['code'];
//클래스 설정
$SocialLogin;


//구글
if (array_key_exists('scope', $_GET)) {
    $SocialLogin = new SocialLoginController(
        $code,
        "https://www.googleapis.com/oauth2/v4/token",
        GOOGLE_CLIENT_ID,
        GOOGLE_PASSWORD,
        SOCIAL_REDIRECT_URI,
        "https://www.googleapis.com/oauth2/v3/userinfo",
        "GOOGLE",
        'sub',
        $DBCON
    );
    //네이버
} else if (array_key_exists('state', $_GET)) {
    $SocialLogin = new SocialLoginController(
        $code,
        "https://nid.naver.com/oauth2.0/token",
        NAVER_CLIENT_ID,
        NAVER_SECRET,
        SOCIAL_REDIRECT_URI,
        "https://openapi.naver.com/v1/nid/me",
        "NAVER",
        'id',
        $DBCON
    );
    //카카오
} else {
    $SocialLogin = new SocialLoginController(
        $code,
        "https://kauth.kakao.com/oauth/token",
        KAKAO_REST_API_KEY,
        "",
        SOCIAL_REDIRECT_URI,
        "https://kapi.kakao.com/v2/user/me",
        "KAKAO",
        'id',
        $DBCON
    );
}

$SocialLogin->work();

class SocialLoginController
{
    private $tokenRequestUrl;
    private $client_id;
    private $client_secret;
    private $redirect_uri;
    private $profileRequestUrl;
    private $socialType;
    private $socialIdSelect;
    private $data;
    private $DBCON;

    public function __construct(
        $code,
        $tokenRequestUrl,
        $client_id,
        $client_secret,
        $redirect_uri,
        $profileRequestUrl,
        $socialType,
        $socialIdSelect,
        $DBCON
    ) {
        $this->tokenRequestUrl = $tokenRequestUrl;
        $this->client_id = $client_id;
        $this->client_secret = $client_secret;
        $this->redirect_uri = $redirect_uri;
        $this->profileRequestUrl = $profileRequestUrl;
        $this->socialType = $socialType;
        $this->socialIdSelect = $socialIdSelect;
        $this->DBCON = $DBCON;
        $this->data = [
            'code' => $code,
            'client_id' => $this->client_id,
            'client_secret' => $this->client_secret,
            'redirect_uri' => $this->redirect_uri,
            'grant_type' => 'authorization_code'
        ];
    }

    public function work()
    {
        $token = $this->fetch($this->tokenRequestUrl, $this->data);
        $accessToken = $token['access_token'];
        $profileRequestHeader = [
            "Authorization: Bearer {$accessToken}"
        ];
        $profile = fetch($this->profileRequestUrl, [], $profileRequestHeader); //유저 정보
        $socialId = $this->socialType == "NAVER" ?
            $profile['response'][$this->socialIdSelect] : //네이버는 response를 따로 추가해줘야함
            $profile[$this->socialIdSelect];


        $result = idChecheckQuery($socialId, $this->socialType, $this->DBCON);
        $row = mysqli_fetch_array($result);

        //회원체크
        if ($row) {
            $_SESSION['userID'] = $row['Key'];


            $_SESSION['userName'] = $row['name'];

            echo "<script>";
            echo "window.location.href='./index/php/';";
            echo "</script>";
            exit;
        } else {

            $userName = $this->socialType == "NAVER"
                ? $profile['response']['name']
                : ($this->socialType == "KAKAO"
                    ? $profile['properties']['nickname']
                    : $profile['name']);
            $_SESSION['userName'] = $userName;



            $registerResult = userRegisterQuery($socialId, $this->socialType, $userName, $this->DBCON);
            //회원가입 완료 후 세션 부여.
            $result = idChecheckQuery($socialId, $this->socialType, $this->DBCON);

            //쿼리 질의 실행한 결과 값
            $row = mysqli_fetch_array($result);
            $_SESSION['userID'] = $row['Key'];
        }
        echo "<script>";
        echo "alert('회원가입 완료');";
        echo "window.location.href='./index/php/';";
        echo "</script>";
        exit;
    }



    private function fetch($url, $bodyData, $header = array())
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
}
