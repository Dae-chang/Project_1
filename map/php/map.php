<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대구 관광지 지도</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        header {
            background-color: #f8f8f8;
            padding: 20px;
            text-align: center;
            position: relative;
        }
        .logo {
            max-width: 200px;
            margin: 0 auto;
        }
        .user-actions {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .btn {
            padding: 10px 20px;
            margin: 0 5px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        main {
            display: flex;
            flex: 1;
        }
        #course-list {
            width: 360px;
            height: 920px;
            overflow-y: auto;
        }
        .course-count {
            width: 360px;
            height: 100px;
            background-color: white;
            color: black;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 18px;
            font-weight: bold;
        }
        .course-item {
            width: 360px;
            height: 300px;
            border: 1px solid #ddd;
            margin-bottom: 10px;
            padding: 10px;
            box-sizing: border-box;
        }
        .course-item img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        #map {
            width:  100%;
            height: 920px;
        }   
       
         /* 모바일 모드 */
        @media (max-width: 768px) {
            main {
                flex-direction: column;
            }

            #course-list {
                width: 100%;
                height: auto;
                order: 2;
                background-color: #f9f9f9;
                border-top: 1px solid #ddd;
            }

            #map {
                width: 100%;
                height: 400px;
                order: 1;
            }

            .course-item {
                flex-direction: row;
                padding: 10px 5px;
            }

            .course-item img {
                width: 60px;
                height: 60px;
                margin-right: 10px;
            }

            .course-details h3 {
                font-size: 14px;
            }

            .course-details p {
                font-size: 12px;
                color: #666;
            }
        }
    </style>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=dc62460607d7fe5bed6dabe6348dd72a&libraries=services"></script>
    <script src="../script/map.js" defer></script>
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
        <section id="course-list">
            <div class="course-count">전체 5건</div>
            <!-- 코스 목록은 JavaScript로 동적으로 추가될 예정입니다 -->
        </section>
        <section id="map"></section>
    </main>
</body>
</html>
