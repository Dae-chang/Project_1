<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대구 관광지 소개</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css" />
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css" />
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="../css/slide.css">
    <link rel="stylesheet" href="../../header/header.css">

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>


</head>

<body>
    <?php include '../../header/header.php';
    print_r("SESSION_userID: " . $_SESSION['userID']);
    print_r("<br/   >");
    print_r("SESSION_userName: " . $_SESSION['userName']);
    ?>

    <main>

        <?php include 'slide.php'; ?>

        <!-- 흰색 바탕 추가 -->
        <div class="white-space"></div>
        <!-- 숙소&교통편 안내 -->
        <section class="information-section" id="information">
            <div class="information" id="info1">
            <div class="info-text">
                <span>숙박을 기반으로 <strong>주변정보</strong>를 검색하고 싶을 땐?</span>
                
            </div>
                <a href="https://www.yeogi.com/domestic-accommodations?keyword=%EB%8C%80%EA%B5%AC&autoKeyword=&personal=2&freeForm=true/" target="_blank">
                    <img class="indexImg" src="../img/index_img_10.png" alt="여기어때">
                </a>
            </div>
            <div class="information" id="info2">
            <div class="info-text">
                <span><strong>360도 객실정보</strong>를</span>

                <span>보고싶을 땐?</span>
            </div>
                <a href="https://www.yanolja.com/search/%EB%8C%80%EA%B5%AC?pageKey=1729146887534" target="_blank">
                    <img class="indexImg" src="../img/index_img_9.png" alt="야놀자">
                </a>
            </div>
            <div class="information" id="info3">
            <div class="info-text">
                <span><strong>편안한 여행</strong>을 원할 땐?</span>
                <a href="https://www.letskorail.com/" target="_blank">
            </div>  
       
                <img class="indexImg" src="../img/index_img_11.png" alt="코레일">
      
            </a>
            </div>
        </section>

      <!-- 대구소개 유튜브 -->
      <section class="youtube-videos" id="youtube">
            <div class="video-container-1">
                <div class="video_title">
                    <img class="recommendPlaceLogo" src="../img/logo.png" art="로고">
                   
                </div>
                <p id="recommendPlace"> 추천 장소 <span style="color: #f52121;">영상</span></p>
            </div>

            <div class="video_boxes">
            <div class="video_box">
                <div class="test"> 
                <div class="youtube_box">
                    <iframe class="youtube_play"  src="https://www.youtube.com/embed/tFwOQTc80DM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                </div>
                    <li class="youtube_title">요즘힙스터 들은 가봐야 할 여행지</li>
                    </div>
            </div>
                   
            <div class="video_box">
            <div class="test"> 
                    <div class="youtube_box">
                        <iframe class="youtube_play" src="https://www.youtube.com/embed/mWTJxF3d-Kk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    </div>
                    <li class="youtube_title">추천가볼만한곳 ep1</li>
                    </div>
            </div>
                
            <div class="video_box">
            <div class="test"> 
            <div class="youtube_box">
                    <iframe class="youtube_play" src="https://www.youtube.com/embed/neNAp8ggSoc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>       
                    <li class="youtube_title">대구여행 TOP8</li>
                    </div>
            </div>
            </div>
        </section>



    </main>

    <footer>
        <p>&copy; 2023 대구 관광지 소개. 모든 권리 보유.</p>
    </footer>

    <!-- jQuery 추가 -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Slick 슬라이더 스크립트 추가 -->
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

    <script src="../script/attractionsSlider.js"></script>
    <script src="../script/slideShow.js"></script>


</body>

</html>