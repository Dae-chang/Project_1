<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대구 관광지 지도</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/header.css">
   
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=dc62460607d7fe5bed6dabe6348dd72a&libraries=services"></script>
    <script src="../script/map.js" defer></script>
</head>
<body>
<?php include 'header.php'; ?>
    <main>
        <section id="course-list">
            <div class="course-count">전체 5건</div>
            <!-- 코스 목록은 JavaScript로 동적으로 추가될 예정입니다 -->
        </section>
        <section id="map"></section>
    </main>
</body>
</html>
