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
    ?>

    <main>

        <?php include 'slide.php'; ?>

        <!-- 흰색 바탕 추가 -->
        <div class="white-space"></div>
        <!-- 숙소&교통편 안내 -->
        <section class="information-section" id="information">
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
        <section class="youtube-videos" id="youtube">
            <div class="video-container-1">
                <div class="youtube-videos-title">
                    <p>대구의 <span style="color: #204cab;">창</span></p>
                    <p>추천 장소 <span style="color: #f52121;">영상</span></p>
                </div>

                <div class="video_small_container">
                    <div class="video small">
                        <iframe width="300" height="300" src="https://www.youtube.com/embed/tFwOQTc80DM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                    </div>
                    <div class="video small">
                        <iframe width="300" height="300" src="https://www.youtube.com/embed/mWTJxF3d-Kk" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

                    </div>
                </div>
            </div>
            <div class="video-container-2">
                <div class="video large">
                    <iframe width="500" height="500" src="https://www.youtube.com/embed/neNAp8ggSoc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

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