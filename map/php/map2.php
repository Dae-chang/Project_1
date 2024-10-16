<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>대구 중구 지도</title>
    <style>
    #map {
        width: 100%;
        height: 400px;
    }
    </style>
</head>
<body>
    <div id="course-info" style="width: 100%; height: 200px; overflow-x: auto; display: flex; border: 1px solid #ccc; padding: 10px;">
        <div id="course1" class="course" style="min-width: 200px; margin-right: 20px; cursor: pointer;">
            <h3>코스 타이틀: 대구 속 시간여행</h3>
            <p>코스 주제: 컬러풀한 도심 한가운데 옛이야기가 주절댄다...</p>
        </div>
        <div id="course2" class="course" style="min-width: 200px; margin-right: 20px; cursor: pointer;">
            <h3>코스 타이틀: 이렇게 좋을 수가</h3>
            <p>코스 주제: 대구에서 대구 사람처럼 여행 할 수 있을까?...</p>
        </div>
        <div id="course3" class="course" style="min-width: 200px; margin-right: 20px; cursor: pointer;">
            <h3>코스 타이틀: 금수강산</h3>
            <p>코스 주제: 흔희 대구는 여행지라기 보다는 복잡한 대도시 이미지를 갖고있다...</p>
        </div>
        <div id="course4" class="course" style="min-width: 200px; cursor: pointer;">
            <h3>코스 타이틀: 팔공산 힐링</h3>
            <p>코스 주제: 병풍처럼 대구를 감싸 안은 팔공산은 대구 시민들이 앞 다투어 자랑하는 명산이다...</p>
        </div>
    </div>

    <script>
        var markers = [];
        var infowindows = [];

        function clearMarkers() {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
                infowindows[i].close();
            }
            markers = [];
            infowindows = [];
        }

        function createMarkers(locations) {
            locations.forEach(function(loc, index) {
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(loc.lat, loc.lng),
                    map: map
                });

                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="padding:5px;">' + 
                             loc.name + 
                             '<br><button onclick="closeInfoWindow(' + index + ')" style="margin-top:5px;">닫기</button>' +
                             '</div>'
                });

                kakao.maps.event.addListener(marker, 'click', function() {
                    infowindow.open(map, marker);
                });

                markers.push(marker);
                infowindows.push(infowindow);
            });
        }

        document.querySelectorAll('.course').forEach(function(courseElement) {
            courseElement.addEventListener('click', function() {
                clearMarkers();
                var courseId = this.id;
                var locations;

                switch(courseId) {
                    case 'course1':
                        locations = [
                            {name: "계산성당", lat: 35.8688, lng: 128.5936},
                            {name: "성모당", lat: 35.8673, lng: 128.5969},
                            {name: "삼성상회", lat: 35.8687, lng: 128.5890},
                            {name: "김광석다시그리기길", lat: 35.8701, lng: 128.5912},
                            {name: "서문시장", lat: 35.8714, lng: 128.5814}
                        ];
                        break;
                    case 'course2':
                        locations = [
                            {name: "앞산전망대", lat: 35.8244, lng: 128.5724},
                            {name: "대구스타디움", lat: 35.8314, lng: 128.6814},
                            {name: "녹동서원", lat: 35.7891, lng: 128.4943},
                            {name: "대구미술관", lat: 35.8314, lng: 128.6814},
                            {name: "대구숲", lat: 35.7891, lng: 128.4943},
                            {name: "스파밸리", lat: 35.7891, lng: 128.4943},
                            {name: "수성못", lat: 35.8264, lng: 128.6214}
                        ];
                        break;
                    case 'course3':
                        locations = [
                            {name: "비슬산 참꽃군락지", lat: 35.6991, lng: 128.5214},
                            {name: "디아크", lat: 35.8714, lng: 128.6014},
                            {name: "대구 수목원", lat: 35.7914, lng: 128.5314},
                            {name: "마비정 벽화마을", lat: 35.8014, lng: 128.5514},
                            {name: "도둥서원", lat: 35.7714, lng: 128.5114},
                            {name: "서문진 주막촌", lat: 35.8514, lng: 128.5714},
                            {name: "낙동강자전거 길", lat: 35.8714, lng: 128.6014}
                        ];
                        break;
                    case 'course4':
                        locations = [
                            {name: "갓바위", lat: 35.9891, lng: 128.6943},
                            {name: "아양기찻길", lat: 35.8814, lng: 128.6314},
                            {name: "동화사", lat: 35.9891, lng: 128.6943},
                            {name: "방짜유기박물관", lat: 35.9014, lng: 128.6514},
                            {name: "시민안전테마파크", lat: 35.9214, lng: 128.6714},
                            {name: "동화사 템플스테이", lat: 35.9891, lng: 128.6943},
                            {name: "팔공산 단풍축제", lat: 35.9891, lng: 128.6943}
                        ];
                        break;
                }

                createMarkers(locations);
                map.setCenter(new kakao.maps.LatLng(locations[0].lat, locations[0].lng));
                map.setLevel(8);
            });
        });

        function closeInfoWindow(index) {
            infowindows[index].close();
        }
    </script>
    <div id="map"></div>
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=dc62460607d7fe5bed6dabe6348dd72a"></script>
    <script>
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(35.8714354, 128.601445), // 대구 중구의 위도와 경도
            level: 5 // 지도의 확대 레벨
        };

        var map = new kakao.maps.Map(container, options);

        function closeInfoWindow(index) {
            infowindows[index].close();
        }
    </script>
</body>
</html>
