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
    </style>
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=dc62460607d7fe5bed6dabe6348dd72a"></script>
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

    <script>
        // 카카오맵 초기화
        var mapContainer = document.getElementById('map');
        var mapOption = {
            center: new kakao.maps.LatLng(35.8714, 128.6014), // 대구 동성로 좌표
            level: 3
        };
        var map = new kakao.maps.Map(mapContainer, mapOption);

        // 코스 데이터 (예시, 실제로는 JSON 파일에서 로드할 예정)
        var courses = [
            { id: 1, name: "동성로 코스", image: "path/to/image1.jpg", description: "동성로 주변 관광지 코스" },
            { id: 2, name: "팔공산 코스", image: "path/to/image2.jpg", description: "팔공산 등산 및 주변 관광지 코스" },
            { id: 3, name: "수성구 코스", image: "path/to/image3.jpg", description: "수성구 주요 관광지 코스" },
            { id: 4, name: "달성군 코스", image: "path/to/image4.jpg", description: "달성군 역사 문화 코스" },
            { id: 5, name: "북구 코스", image: "path/to/image5.jpg", description: "북구 자연 관광 코스" }
        ];

        // 코스 목록 렌더링
        var courseListElement = document.getElementById('course-list');
        courses.forEach(function(course) {
            var courseElement = document.createElement('div');
            courseElement.className = 'course-item';
            courseElement.innerHTML = `
                <img src="${course.image}" alt="${course.name}">
                <h3>${course.name}</h3>
                <p>${course.description}</p>
            `;
            courseElement.addEventListener('click', function() {
                // 여기에 해당 코스의 관광지 마커를 지도에 표시하는 로직 추가
                alert(course.name + " 코스가 선택되었습니다. 지도에 마커를 표시합니다.");
            });
            courseListElement.appendChild(courseElement);
        });
    </script>
</body>
</html>
