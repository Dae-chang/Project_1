let allCoursesData;
let selectedAttractions = new Set();

// 코스 만들기 버튼 렌더링
function renderCreateCourseButton() {
  const courseListElement = document.getElementById("course-list");
  courseListElement.innerHTML = ""; // 기존 내용 초기화

  const customCourseTitle = document.createElement("h2");
  customCourseTitle.textContent = "나만의 코스 만들기";
  customCourseTitle.className = "custom-course-title";
  courseListElement.appendChild(customCourseTitle);

  const createCourseButton = document.createElement("div");
  createCourseButton.className = "course-item";
  createCourseButton.innerHTML = `
    <h3>관광지 추가하기</h3>
    <img src="../img/map_img_plus.jpg" alt="모든 관광지" style="width: 200px; height: 200px;">
  `;
  createCourseButton.addEventListener("click", displayAllAttractions);
  courseListElement.appendChild(createCourseButton);
}

// 모든 관광지 표시
async function displayAllAttractions() {
  try {
    if (!allCoursesData) {
      const response = await fetch(`../script/response.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      allCoursesData = jsonData.data;
    }

    const courseDetailElement = document.getElementById("course-detail");
    courseDetailElement.style.display = "block";

    const detailTitleElement = document.getElementById("detail-title");
    detailTitleElement.innerHTML = `
      모든 관광지 <span style="color: #077fff;">목록</span>
      <button id="close-course-detail" style="float: right; background: none; border: none; font-size: 1.5em; cursor: pointer;">&times;</button>
    `;

    const closeButton = document.getElementById("close-course-detail");
    closeButton.addEventListener("click", () => {
      courseDetailElement.style.display = "none";
    });

    await displayAllAttractionsGrid(allCoursesData);

    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error("관광지 표시 중 오류 발생:", error);
    alert(
      "관광지 표시 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요."
    );
  }
}

// 모든 관광지를 그리드 형태로 표시
async function displayAllAttractionsGrid(attractions) {
  const placeDetailsContainer = document.getElementById("place-details");
  placeDetailsContainer.innerHTML = "";
  placeDetailsContainer.className = "attraction-grid";

  for (let i = 0; i < attractions.length; i += 2) {
    const rowContainer = document.createElement("div");
    rowContainer.className = "attraction-row";

    for (let j = i; j < i + 2 && j < attractions.length; j++) {
      const place = attractions[j];
      const attractionElement = createAttractionElement(place);
      rowContainer.appendChild(attractionElement);
    }

    placeDetailsContainer.appendChild(rowContainer);
  }
}

// 개별 관광지 요소 생성
function createAttractionElement(place) {
  const attractionElement = document.createElement("div");
  attractionElement.className = "attraction-item";

  const imageContainer = document.createElement("div");
  imageContainer.className = "attraction-image-container";

  const image = document.createElement("img");
  image.src = `../img/detail_img_${place.관광지번호}.jpg`;
  image.alt = place.관광지;
  image.className = "attraction-image";

  imageContainer.appendChild(image);

  const nameContainer = document.createElement("div");
  nameContainer.className = "attraction-name-container";

  const name = document.createElement("p");
  name.textContent = place.관광지;
  name.className = "attraction-name";

  nameContainer.appendChild(name);

  attractionElement.appendChild(imageContainer);
  attractionElement.appendChild(nameContainer);

  attractionElement.addEventListener("click", () =>
    toggleAttractionSelection(attractionElement, place)
  );

  return attractionElement;
}

// 관광지 선택 토글
async function toggleAttractionSelection(element, place) {
  const isSelected = selectedAttractions.has(place.관광지번호);

  if (isSelected) {
    selectedAttractions.delete(place.관광지번호);
    element.classList.remove("attraction-selected");
    removeCheckmark(element);
    removeMarkerFromMap(place.관광지번호);
  } else {
    selectedAttractions.add(place.관광지번호);
    element.classList.add("attraction-selected");
    addCheckmark(element);
    await addMarkerToMap(place);
  }
}

// 체크마크 추가
function addCheckmark(element) {
  let checkmark = element.querySelector(".checkmark");
  if (!checkmark) {
    checkmark = document.createElement("div");
    checkmark.className = "checkmark";
    checkmark.innerHTML = "✓";
    element.appendChild(checkmark);
  }
  checkmark.style.display = "flex";
}

// 체크마크 제거
function removeCheckmark(element) {
  const checkmark = element.querySelector(".checkmark");
  if (checkmark) {
    checkmark.style.display = "none";
  }
}

// 지도에 마커 추가
async function addMarkerToMap(place) {
  try {
    const position = await getCoordinates(place.주소);
    const marker = addMarker(position, place); // map.js의 addMarker 함수 사용
    markers.push(marker);

    // 모든 마커가 보이도록 지도 조정
    adjustMapToShowAllMarkers();
  } catch (error) {
    console.error(`${place.관광지}의 위치를 표시할 수 없습니다:`, error);
  }
}

// 모든 마커가 보이도록 지도 조정
function adjustMapToShowAllMarkers() {
  if (markers.length === 0) return;

  const bounds = new kakao.maps.LatLngBounds();

  for (let i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }

  map.setBounds(bounds);

  // 선택적: 최소 줌 레벨 설정
  const currentLevel = map.getLevel();
  const maxZoomLevel = 10; // 원하는 최대 줌 아웃 레벨 설정
  if (currentLevel > maxZoomLevel) {
    map.setLevel(maxZoomLevel);
  }
}

// 지도에서 마커 제거
function removeMarkerFromMap(placeId) {
  const markerIndex = markers.findIndex((marker) => marker.placeId === placeId);
  if (markerIndex !== -1) {
    const markerToRemove = markers[markerIndex];
    markerToRemove.setMap(null);
    markers.splice(markerIndex, 1);
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

// 페이지 로드 시 초기화
document.addEventListener("DOMContentLoaded", () => {
  renderCreateCourseButton();
  if (typeof initMap === "function" && !window.mapInitialized) {
    initMap(); // 지도 초기화 함수 호출 (map.js에 정의되어 있어야 함)
    window.mapInitialized = true;

    // 지도 이벤트 리스너 추가
    kakao.maps.event.addListener(map, "dragend", () => {
      updateMarkers().catch((error) =>
        console.error("마커 업데이트 중 오류 발생:", error)
      );
    });
    kakao.maps.event.addListener(map, "zoom_changed", () => {
      updateMarkers().catch((error) =>
        console.error("마커 업데이트 중 오류 발생:", error)
      );
    });
  }
});

// 마커 업데이트 함수 (비동기)
async function updateMarkers() {
  for (let i = markers.length - 1; i >= 0; i--) {
    const marker = markers[i];
    if (!selectedAttractions.has(marker.placeId)) {
      marker.setMap(null);
      markers.splice(i, 1);
    }
  }

  // 선택된 관광지의 마커가 지도 범위 내에 있는지 확인하고 필요한 경우 다시 추가
  for (const placeId of selectedAttractions) {
    const place = allCoursesData.find((p) => p.관광지번호 === placeId);
    if (place) {
      const position = await getCoordinates(place.주소);
      const bounds = map.getBounds();
      if (bounds.contain(position)) {
        const existingMarker = markers.find((m) => m.placeId === placeId);
        if (!existingMarker) {
          const newMarker = addMarker(position, place);
          markers.push(newMarker);
        }
      }
    }
  }

  // 마커 업데이트 후 지도 조정
  adjustMapToShowAllMarkers();
}
