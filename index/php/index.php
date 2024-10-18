<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대구 관광지  소개</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css">
    <link rel="stylesheet" href="../css/slide.css">
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

</head>
<body>
<header>


<nav class="header-nav">
    <a href="#">HOME</a>
    <a href="#">숙소 찾기</a>
    <a href="#">추천영상</a>
</nav>

<div class="user-actions">
    <a href="#">로그인</a>
    <a href="#">마이페이지</a>
</div>
</header>

    <main>

    <?php include 'slide.php'; ?>
    <div class="white-space"></div>

        <section id="attractions">
        <h2>대구 관광지 코스</h2>
        

        </section>
        <!-- 흰색 바탕 추가 -->
        <div class="white-space"></div>
        <!-- 숙소&교통편 안내 -->
        <section class="information-section">
            <div class="information" id="info1">
                <span>숙소를 찾으신다면?</span>
                <a href="https://www.yeogi.com/domestic-accommodations?keyword=%EB%8C%80%EA%B5%AC&autoKeyword=&personal=2&freeForm=true/" target="_blank">
                    <img src="../img/index_img_6.jpg" alt="여기어때">
                </a>
            </div>
            <div class="information" id="info2">
                <span>다른 숙소 옵션을 원하시나요?</span>
                <a href="https://www.yanolja.com/search/%EB%8C%80%EA%B5%AC?pageKey=1729146887534" target="_blank">
                    <img src="../img/index_img_7.jpg" alt="야놀자">
                </a>
            </div>
            <div class="information" id="info3">
                <span>기차표 예매가 필요하신가요?</span>
                <a href="https://www.letskorail.com/" target="_blank">
                    <img src="../img/index_img_8.jpg" alt="코레일">
                </a>
            </div>
        </section>
        <!-- 흰색 바탕 추가 -->
        <div class="white-space"></div>
        <!-- 대구소개 유튜브 -->
        <section class="youtube-videos">
            <h2>대구의 창 추천 영상 모음</h2>
            <div class="video-container">
                <div class="video small">
                    <iframe width="300" height="300" src="https://www.youtube.com/embed/VIDEO_ID_1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <p>대구 명소 소개 1</p>
                </div>
                <div class="video small">
                    <iframe width="300" height="300" src="https://www.youtube.com/embed/VIDEO_ID_2" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <p>대구 명소 소개 2</p>
                </div>
                <div class="video large">
                    <iframe width="500" height="500" src="https://www.youtube.com/embed/VIDEO_ID_3" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                    <p>대구 명소 소개 3</p>
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
