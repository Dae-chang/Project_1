let allCoursesData;
let selectedAttractions = new Set();

// 코스 만들기 버튼 렌더링
function renderCreateCourseButton() {
  const courseListElement = document.getElementById("course-list");
  courseListElement.innerHTML = ""; // 기존 내용 초기화

  const customCourseTitle = document.createElement("h2");
  customCourseTitle.textContent = "나만의 코스 만들기";
  customCourseTitle.style.textAlign = "center";
  customCourseTitle.style.marginBottom = "20px";
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
  placeDetailsContainer.style.display = "flex";
  placeDetailsContainer.style.flexDirection = "column";
  placeDetailsContainer.style.gap = "20px";

  for (let i = 0; i < attractions.length; i += 2) {
    const rowContainer = document.createElement("div");
    rowContainer.style.display = "flex";
    rowContainer.style.justifyContent = "space-between";
    rowContainer.style.gap = "20px";

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
  attractionElement.style.width = "calc(50% - 10px)";
  attractionElement.style.height = "160px";
  attractionElement.style.display = "flex";
  attractionElement.style.flexDirection = "column";
  attractionElement.style.alignItems = "center";
  attractionElement.style.justifyContent = "space-between";
  attractionElement.style.border = "1px solid #ddd";
  attractionElement.style.borderRadius = "8px";
  attractionElement.style.overflow = "hidden";
  attractionElement.style.position = "relative";
  attractionElement.style.cursor = "pointer";

  const imageContainer = document.createElement("div");
  imageContainer.style.width = "100%";
  imageContainer.style.height = "160px";
  imageContainer.style.overflow = "hidden";

  const image = document.createElement("img");
  image.src = `../img/detail_img_${place.관광지번호}.jpg`;
  image.alt = place.관광지;
  image.style.width = "100%";
  image.style.height = "100%";
  image.style.objectFit = "cover";

  imageContainer.appendChild(image);

  const nameContainer = document.createElement("div");
  nameContainer.style.width = "100%";
  nameContainer.style.height = "40px";
  nameContainer.style.display = "flex";
  nameContainer.style.alignItems = "center";
  nameContainer.style.justifyContent = "center";
  nameContainer.style.padding = "0px";
  nameContainer.style.boxSizing = "border-box";
  nameContainer.style.textAlign = "center";
  nameContainer.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
  nameContainer.style.position = "absolute";
  nameContainer.style.bottom = "0";

  const name = document.createElement("p");
  name.textContent = place.관광지;
  name.style.margin = "0";
  name.style.fontSize = "14px";
  name.style.fontWeight = "bold";

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
    element.style.border = "1px solid #ddd";
    element.style.boxShadow = "none";
    removeCheckmark(element);
    removeMarkerFromMap(place.관광지번호);
  } else {
    selectedAttractions.add(place.관광지번호);
    element.style.border = "2px solid #077fff";
    element.style.boxShadow = "0 0 10px rgba(7, 127, 255, 0.5)";
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
    checkmark.style.position = "absolute";
    checkmark.style.top = "10px";
    checkmark.style.right = "10px";
    checkmark.style.width = "20px";
    checkmark.style.height = "20px";
    checkmark.style.borderRadius = "50%";
    checkmark.style.backgroundColor = "#077fff";
    checkmark.style.display = "flex";
    checkmark.style.justifyContent = "center";
    checkmark.style.alignItems = "center";
    checkmark.innerHTML = "✓";
    checkmark.style.color = "white";
    checkmark.style.fontSize = "12px";
    checkmark.style.fontWeight = "bold";
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

    // 지도 중심 및 확대 레벨 조정
    const bounds = map.getBounds();
    bounds.extend(position);
    map.setBounds(bounds);
  } catch (error) {
    console.error(`${place.관광지}의 위치를 표시할 수 없습니다:`, error);
  }
}
// 지도에서 마커 제거
function removeMarkerFromMap(placeId) {
  const markerIndex = markers.findIndex((marker) => marker.placeId === placeId);
  if (markerIndex !== -1) {
    markers[markerIndex].setMap(null);
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
  }
  // 중복된 initMap() 호출 제거
});
