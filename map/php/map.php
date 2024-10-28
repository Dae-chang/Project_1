<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>대구 관광지 지도</title>
    <link rel="stylesheet" href="../css/styles.css"> 
    <link rel="stylesheet" href="../../header/header.css">
    <link rel="stylesheet" href="../css/modal.css"> <!-- 모달 CSS 추가 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

   
    <script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=dc62460607d7fe5bed6dabe6348dd72a&libraries=services"></script>
    <script src="../script/map.js"></script>
    <script src="../script/courses.js"></script>
    <script src="../script/ui.js"></script>
    <script src="../script/main.js"></script>
</head>
<body>
<?php include '../../header/header.php'; ?>

<main>
    <div style="display: flex; flex: 1;">
        <section id="course-list">
            <div class="course-count">전체 5건</div>
        </section>
        
        <section id="course-detail" style="display: none;">
            <div id="detail-container">
                <h2 id="detail-title"></h2>
            </div>
            <div id="place-details"></div>
        </section>

        <section id="map"></section>
    </div>
</main>

</body>
</html>
