// 상수 정의
const DAEGU_CENTER = { lat: 35.8714, lng: 128.6014 };
const MAP_LEVEL = 3;

// 전역 변수
let map;
let markers = [];
let currentOverlay = null;

// 지도 초기화
function initMap() {
  if (window.mapInitialized) {
    console.log("지도가 이미 초기화되었습니다.");
    return;
  }

  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: new kakao.maps.LatLng(DAEGU_CENTER.lat, DAEGU_CENTER.lng),
    level: MAP_LEVEL,
  };
  map = new kakao.maps.Map(mapContainer, mapOption);
  window.mapInitialized = true;
}

// 주소를 위도, 경도로 변환하는 함수
function getCoordinates(address) {
  return new Promise((resolve, reject) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        resolve(new kakao.maps.LatLng(result[0].y, result[0].x));
      } else {
        reject(new Error("주소를 변환할 수 없습니다."));
      }
    });
  });
}

// 마커를 생성하고 지도에 추가하는 함수 수정
function addMarker(position, place) {
  const marker = new kakao.maps.Marker({
    position: position,
    map: map,
  });
  marker.placeId = place.관광지번호;
  markers.push(marker);

  const overlay = createCustomOverlay(place, position);

  kakao.maps.event.addListener(marker, "click", () => {
    if (currentOverlay) {
      currentOverlay.setMap(null);
    }
    overlay.setMap(map);
    currentOverlay = overlay;
  });

  return marker;
}

// 모든 마커 지도에서 제거하는 함수
function removeMarkers() {
  console.log("기존 마커 제거 시작");
  // 배열에 저장된 각 마커를 지도에서 제거
  markers.forEach((marker) => {
    marker.setMap(null); // 마커를 도에서 제거하여 보이지 않게 함
    console.log("마커 제거됨:", marker); // 마커 제거 로그
  });
  markers = []; // 배열을 초기화하여 기존 마커 정보를 제거
  console.log("기존 마커 제거 완료");
}

// 코스의 모든 관광지 에 표시하는 함수
async function displayCourseMarkers(courseId, bookmarkedPlaces) {
  // 기존 오버레이 제거

  if (!courseId) {
    console.log("북마크된 장소:", bookmarkedPlaces);

    // 기존 오버레이 제거
    if (currentOverlay) {
      currentOverlay.setMap(null);
      currentOverlay = null;
    }

    removeMarkers();

    const bounds = new kakao.maps.LatLngBounds();

    const markerPromises = bookmarkedPlaces.map(async (place) => {
      try {
        const position = await getCoordinates(place.주소);
        addMarker(position, place);
        bounds.extend(position);
      } catch (error) {
        console.error(`${place.관광지}의 위치를 표시할 수 없습니다:`, error);
      }
    });

    await Promise.all(markerPromises);

    if (markers.length > 0) {
      map.setBounds(bounds);
    } else {
      console.warn("표시할 마커가 없습니다.");
    }

    console.log("북마크된 장소 마커 추가 완료");
  }

  if (currentOverlay) {
    currentOverlay.setMap(null);
    currentOverlay = null;
  }

  const coursePlaces = await getCourseData(courseId);

  if (coursePlaces.length === 0) {
    console.error("코스 데이터가 비어있습니다.");
    return;
  }

  removeMarkers();

  const bounds = new kakao.maps.LatLngBounds();

  const markerPromises = coursePlaces.map(async (place) => {
    try {
      const position = await getCoordinates(place.주소);
      addMarker(position, place);
      bounds.extend(position);
    } catch (error) {
      console.error(`${place.관광지}의 위치를 표시할 수 없습니다:`, error);
    }
  });

  await Promise.all(markerPromises);
  map.setBounds(bounds);
  console.log("새로운 마커 추가 완료");
}
