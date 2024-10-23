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
  {
    id: "전역코스",
    name: "대구 Best of Best",
    image: "../img/course1.jpg",
    description: "대구 대표 관광지 30선 코스",
  },
  {
    id: "1코스",
    name: "대구 속 시간여행",
    image: "../img/course2.jpg",
    description: "대구의 역사와 문화를 체험하는 코스",
  },
  {
    id: "2코스",
    name: "이렇게 좋을 수가",
    image: "../img/course3.jpg",
    description: "대구 수성구와 가창의 명소 코스",
  },
  {
    id: "3코스",
    name: "금수강산",
    image: "../img/course4.jpg",
    description: "대구의 자연을 즐기는 여유로운 코스",
  },
  {
    id: "4코스",
    name: "팔공산",
    image: "../img/course5.jpg",
    description: "대구의 자연을 즐기는 여유로운 코스",
  },
];

// 코스 목록 렌더링
function renderCourseList() {
  const courseListElement = document.getElementById("course-list");
  courseListElement.innerHTML = ""; // 기존 내용 초기화

  courses.forEach((course) => {
    const courseElement = document.createElement("div");
    courseElement.className = "course-item";
    courseElement.innerHTML = `
      <h3>${course.name}</h3>
      <img src="${course.image}" alt="${course.name}">
      <p>${course.description}</p>
      <div class="tags">
        <span>#가족여행</span><span>#친구</span><span>#먹거리</span>
      </div>
    `;
    courseElement.addEventListener("click", () => onCourseClick(course));
    courseListElement.appendChild(courseElement);
  });

  // 나만의 관광지 추가
  const myTourElement = document.createElement("div");
  myTourElement.className = "course-item";
  myTourElement.innerHTML = `
    <h3>나만의 코스</h3>
    <img src="../img/map_img_plus.jpg" alt="이미지">
    <p>관광지</p>
    <div class="tags">
      <span>#가족여행</span><span>#친구</span><span>#먹거리</span>
    </div>
  `;
  courseListElement.appendChild(myTourElement);
}

async function onCourseClick(course) {
  try {
    // 기존 오버레이가 열려 있다면 닫음
    if (currentOverlay) {
      currentOverlay.setMap(null);
      currentOverlay = null;
    }

    await displayCourseMarkers(course.id);
    console.log(`${course.name} 코스가 선택되었습니다. 지도에 마커를 표시합니다.`);

    // 코스 데이터를 가져옵니다.
    const courseData = await getCourseData(course.id);

    // 코스 상세 정보 섹션을 표시합니다.
    const courseDetailElement = document.getElementById("course-detail");
    courseDetailElement.style.display = "block";

    // detail-title에 코스 이름과 닫기 버튼을 추가합니다.
    const detailTitleElement = document.getElementById("detail-title");
    detailTitleElement.innerHTML = `
      ${course.name} <span style="color: #077fff;">코스</span>
      <button id="close-course-detail" style="float: right; background: none; border: none; font-size: 1.5em; cursor: pointer;">&times;</button>
    `;

    // 닫기 버튼에 이벤트 리스너를 추가합니다.
    const closeButton = document.getElementById("close-course-detail");
    closeButton.addEventListener("click", () => {
      const courseDetailElement = document.getElementById("course-detail");
      courseDetailElement.style.display = "none";
    });

    if (courseData && courseData.length > 0) {
      // displayPlaceDetails 함수를 호출하여 장소 상세 정보를 표시합니다.
      displayPlaceDetails(courseData);
    }

    // 스크롤바를 최상단으로 이동
    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error(`코스 표시 중 오류가 발생했습니다:`, error.message);
    alert(`코스 표시 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.`);
  }
}

// JSON 파일에서 모든 코스 데이터를 가져오는 함수
let allCoursesData = null;

async function getCourseData(courseId) {
  try {
    if (!allCoursesData) {
      const response = await fetch(`../script/response.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      allCoursesData = jsonData.data;
    }
    // courseId에 해당하는 모든 관광지를 찾아 반환 (분류로 필터링)
    return allCoursesData.filter((place) => place.분류 === courseId);
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

let markers = []; // 현재 지도에 표시된 마커들을 저장할 배열
let currentOverlay = null; // 현재 열린 오버레이를 저장할 변수

// 커스텀 오버레이 내용을 생성하는 함수 수정
// 커스텀 오버레이 내용을 생성하는 함수
function createCustomOverlayContent(place) {
  return `
    <div class="custom-overlay" style="z-index: 10;">
      <button class="overlay-close" style="z-index: 11;">&times;</button>
      <div class="overlay-content">
        <img src="../img/detail_img_${place.관광지번호}.jpg" alt="${place.관광지}" class="overlay-image">
        <div class="overlay-info">
          <h3 class="overlay-title">${place.관광지}</h3>
          <p class="overlay-description">${place.코스설명}</p>
          <p class="overlay-address">${place.주소}</p>
          <button class="overlay-button" data-id="${place.관광지번호}" style="z-index: 11;">자세히 보기</button>
        </div>
      </div>
      <div class="overlay-arrow"></div>
    </div>
  `;
}

// 커스텀 오버레이를 생성하고 이벤트를 추가하는 함수
function createCustomOverlay(place, position) {
  const content = createCustomOverlayContent(place);
  const overlay = new kakao.maps.CustomOverlay({
    content: content,
    position: position,
    xAnchor: 0.5,
    yAnchor: 1.1,
    zIndex: 10,
  });

  // 오버레이가 지도에 추가될 때 이벤트 리스너 추가
  kakao.maps.event.addListener(overlay, "domready", function () {
    const overlayElement = overlay.getContent();
    const closeBtn = overlayElement.querySelector(".overlay-close");
    const detailBtn = overlayElement.querySelector(".overlay-button");

    // 닫기 버튼 이벤트 추가
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        overlay.setMap(null);
        currentOverlay = null;
      });
    }

    // 자세히 보기 버튼 이벤트 추가
    if (detailBtn) {
      detailBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openModal(place.관광지번호);
      });
    }
  });

  return overlay;
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
async function displayCourseMarkers(courseId) {
  // 기존 오버레이 제거
  if (currentOverlay) {
    currentOverlay.setMap(null);
    currentOverlay = null;
  }

  const coursePlaces = await getCourseData(courseId);

  if (coursePlaces.length === 0) {
    function createCustomOverlay(place, position) {
      const content = createCustomOverlayContent(place);
      const overlay = new kakao.maps.CustomOverlay({
        content: content,
        position: position,
        xAnchor: 0.5,
        yAnchor: 1.1,
      });

      // 오버레이가 지도에 추가될 때 이벤트 리스너 추가
      overlay.setMap = function (map) {
        kakao.maps.CustomOverlay.prototype.setMap.call(this, map);
        if (map) {
          setTimeout(() => {
            const closeBtn = this.getContent().querySelector(".overlay-close");
            if (closeBtn) {
              closeBtn.onclick = (e) => {
                e.preventDefault();
                this.setMap(null);
                currentOverlay = null;
              };
            }
          }, 0);
        }
      };

      return overlay;
    }
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

// 초기화 함
function init() {
  initMap();
  renderCourseList();

  // 전체 문서에 대한 클릭 이벤트 리스너 추가 (이벤트 위임)
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("overlay-close")) {
      event.preventDefault();
      if (currentOverlay) {
        currentOverlay.setMap(null);
        currentOverlay = null;
      }
    } else if (event.target.classList.contains("overlay-button")) {
      event.preventDefault();
      const spotId = event.target.getAttribute("data-id");
      openModal(spotId);
    }
  });
}

// 페이지 로드 시 초기화
window.addEventListener("load", init);

// displayPlaceDetails 함수 수정
function displayPlaceDetails(coursePlaces) {
  const placeDetailsContainer = document.getElementById("place-details");
  placeDetailsContainer.innerHTML = "";

  coursePlaces.forEach((place) => {
    const placeDetail = document.createElement("div");
    placeDetail.className = "place-detail";

    const placeImage = document.createElement("img");
    placeImage.className = "place-image";
    placeImage.src = `../img/detail_img_${place.관광지번호}.jpg`;
    placeImage.alt = place.관광지;

    const placeInfo = document.createElement("div");
    placeInfo.className = "place-info";

    const placeName = document.createElement("h3");
    placeName.className = "place-name";
    placeName.textContent = place.관광지;

    const placeDescription = document.createElement("p");
    placeDescription.className = "place-description";
    placeDescription.textContent = place.코스설명;

    placeInfo.appendChild(placeName);
    placeInfo.appendChild(placeDescription);

    placeDetail.appendChild(placeImage);
    placeDetail.appendChild(placeInfo);

    placeDetailsContainer.appendChild(placeDetail);

    placeDetail.addEventListener("click", () => {
      const marker = markers.find((m) => m.placeId === place.관광지번호);
      if (marker) {
        if (currentOverlay) {
          currentOverlay.setMap(null);
        }
        const overlay = createCustomOverlay(place, marker.getPosition());
        overlay.setMap(map);
        currentOverlay = overlay;
        map.setCenter(marker.getPosition());
      }
    });
  });
}

// 모달 창을 열기 위한 함수
function openModal(spotId) {
  console.log("openModal 함수 호출됨, spotId:", spotId);

  // 기존 모달 제거
  closeModal();

  fetch(`../php/modal.php?id=${spotId}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        console.error(data.error);
        return;
      }
      console.log("모달 데이터 받음:", data);
      const modalContainer = document.createElement("div");
      modalContainer.className = "modal-container";
      modalContainer.innerHTML = data.html;
      document.body.appendChild(modalContainer);

      const closeButton = modalContainer.querySelector(".close-button");
      if (closeButton) {
        closeButton.addEventListener("click", closeModal);
      }

      // 모달 외부 클릭 시 닫기
      modalContainer.addEventListener("click", function (event) {
        if (event.target === modalContainer) {
          closeModal();
        }
      });
    })
    .catch((error) => {
      console.error("모달 데이터를 가져오는 중 오류 발생:", error);
    });
}

// 모달 창을 닫기 위한 함수
function closeModal() {
  const existingModal = document.querySelector(".modal-container");
  if (existingModal) {
    existingModal.remove();
  }
}

// 전역 이벤트 리스너 (한 번만 등록)
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("overlay-button")) {
    console.log("자세히 보기 버튼 클릭됨");
    const spotId = event.target.getAttribute("data-id");
    console.log("관광지 ID:", spotId);
  }
});
