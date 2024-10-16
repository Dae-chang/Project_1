// 상수 정의
const DAEGU_CENTER = { lat: 35.8714, lng: 128.6014 };
const MAP_LEVEL = 3;

// 전역 변수
let map;

// 지도 초기화
function initMap() {
  const mapContainer = document.getElementById("map");
  const mapOption = {
    center: new kakao.maps.LatLng(DAEGU_CENTER.lat, DAEGU_CENTER.lng),
    level: MAP_LEVEL,
  };
  map = new kakao.maps.Map(mapContainer, mapOption);
}

// 코스 데이터
const courses = [
  { id: 1, name: "대구 Best of Best", image: "path/to/image1.jpg", description: "대구 대표 관광지 30선 코스" },
  { id: 2, name: "대구 속 시간여행", image: "path/to/image2.jpg", description: "대구의 역사와 문화를 체험하는 코스" },
  { id: 3, name: "이렇게 좋을 수가", image: "path/to/image3.jpg", description: "대구 수성구와 가창의 명소 코스" },
  { id: 4, name: "금수강산", image: "path/to/image4.jpg", description: "대구의 자연을 즐기는 여유로운 코스" },
  { id: 5, name: "팔공산", image: "path/to/image5.jpg", description: "대구의 자연을 즐기는 여유로운 코스" },
];

// 코스 목록 더링
function renderCourseList() {
  const courseListElement = document.getElementById("course-list");
  courses.forEach((course) => {
    const courseElement = document.createElement("div");
    courseElement.className = "course-item";
    courseElement.innerHTML = `
            <img src="${course.image}" alt="${course.name}">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
        `;
    courseElement.addEventListener("click", () => onCourseClick(course));
    courseListElement.appendChild(courseElement);
  });
}

// 코스 클릭 이벤트 핸들러
async function onCourseClick(course) {
  try {
    await displayCourseMarkers(course.id);
    console.log(`${course.name} 코스가 선택되었습니다. 지도에 마커를 표시합니다.`);
  } catch (error) {
    console.error(`코스 표시 중 오류가 발생했습니다:`, error);
    alert(`코스 표시 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.`);
  }
}

// JSON 파일에서 코스 데이터를 가져오는 함수
async function getCourseData(courseId) {
  try {
    const response = await fetch(`../script/response_${courseId}.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("코스 데이터를 가져오는 중 오류 발생:", error);
    return [];
  }
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

// 마커를 생성하고 지도에 표시하는 함수
function addMarker(position, title) {
  new kakao.maps.Marker({
    position: position,
    map: map,
    title: title,
  });
}

// 코스의 모든 관광지를 지도에 표시하는 함수
async function displayCourseMarkers(courseId) {
  const courseData = await getCourseData(courseId);

  if (!Array.isArray(courseData) || courseData.length === 0) {
    console.error("코스 데이터가 비어있거나 올바른 형식이 아닙니다.");
    return;
  }

  const bounds = new kakao.maps.LatLngBounds(); // 지도 범위 객체 생성

  const markerPromises = courseData.map(async (place) => {
    if (!place || !place.주소 || !place.관광지) {
      console.error("올바르지 않은 장소 데이터:", place);
      return;
    }

    try {
      const position = await getCoordinates(place.주소);
      addMarker(position, place.관광지);
      bounds.extend(position); // 마커 위치를 지도 범위에 추가
    } catch (error) {
      console.error(`${place.관광지}의 위치를 표시할 수 없습니다:`, error);
    }
  });

  await Promise.all(markerPromises);

  if (!bounds.isEmpty()) {
    map.setBounds(bounds); // 모든 마커가 보이도록 지도 범위 조정
  } else {
    console.error("유효한 마커가 없습니다.");
  }
}

// 초기화 함수
function init() {
  initMap();
  renderCourseList();
}

// 페이지 로드 시 초기화
window.addEventListener("load", init);
