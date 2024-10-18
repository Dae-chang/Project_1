<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대구 관광지  소개</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css"/>
</head>
<body>
<header>
    <div class="user-actions">
        <a href="#login" class="btn">로그인</a>
        <a href="#mypage" class="btn">마이페이지</a>
    </div>
    <div class="logo">
        <img src="" alt="대구의창 로고">
    </div>
</header>

    <main>
        <section id="home">
            <div id="slideshow">
                <img src="../img/index_img_1.jpg" alt="대구 이미지 1" class="slide">
                <img src="../img/index_img_2.jpg" alt="대구 이미지 2" class="slide">
                <img src="../img/index_img_3.jpg" alt="대구 이미지 3" class="slide">
                <img src="../img/index_img_4.jpg" alt="대구 이미지 4" class="slide">
                <img src="../img/index_img_5.jpg" alt="대구 이미지 5" class="slide">
            </div>
         </section>





        <section id="attractions">
        <h2>대구 관광지 코스</h2>
        <div class="attractions-slider">
            <div class="attraction-item">
                <img src="../img/course1.jpg" alt="관광지 코스 1">
                <h3>코스 1: 역사 탐방</h3>
                <p>대구의 풍부한 역사를 체험하는 코스입니다.</p>
                <a href="course1.php" class="btn">자세히 보기</a>
            </div>
            <div class="attraction-item">
                <img src="../img/course2.jpg" alt="관광지 코스 2">
                <h3>코스 2: 문화 체험</h3>
                <p>대구의 다양한 문화를 즐길 수 있는 코스입니다.</p>
                <a href="course2.php" class="btn">자세히 보기</a>
            </div>
            <div class="attraction-item">
                <img src="../img/course3.jpg" alt="관광지 코스 3">
                <h3>코스 3: 자연 탐방</h3>
                <p>대구의 아름다운 자연을 만끽할 수 있는 코스입니다.</p>
                <a href="course3.php" class="btn">자세히 보기</a>
            </div>
            <div class="attraction-item">
                <img src="../img/course4.jpg" alt="관광지 코스 4">
                <h3>코스 4: 맛집 투어</h3>
                <p>대구의 맛있는 음식을 즐길 수 있는 코스입니다.</p>
                <a href="course4.php" class="btn">자세히 보기</a>
            </div>
            <div class="attraction-item">
                <img src="../img/course5.jpg" alt="관광지 코스 5">
                <h3>코스 5: 쇼핑 여행</h3>
                <p>대구의 다양한 쇼핑 명소를 둘러보는 코스입니다.</p>
                <a href="course5.php" class="btn">자세히 보기</a>
            </div>
        </div>
        <!-- 화살표 추가 -->
        <button class="slick-prev">이전</button>
        <button class="slick-next">다음</button>
        </section>
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
        <!-- 대구소개 유튜브 -->
        <section >
        <div class="youtube">
        <iframe 
    width="1903" 
    height="938" 
    src="https://www.youtube.com/embed/AcNBb1Ok6Ak?si=FxCV0IXGrQGbuiVK&mute=1" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
</iframe>
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
