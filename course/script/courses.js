let allCoursesData;

// 코스 목록 렌더링
function renderCourseList() {
  const courseListElement = document.getElementById("course-list");
  courseListElement.innerHTML = ""; // 기존 내용 초기화

  // "나만의 코스 만들기" 텍스트 추가
  const customCourseTitle = document.createElement("h2");
  customCourseTitle.textContent = "나만의 코스 만들기";
  customCourseTitle.style.textAlign = "center";
  customCourseTitle.style.marginBottom = "20px";
  courseListElement.appendChild(customCourseTitle);

  // "모든 관광지" 버튼 추가
  const allAttractionsElement = document.createElement("div");
  allAttractionsElement.className = "course-item";
  allAttractionsElement.innerHTML = `
    <h3>관광지 추가하기 </h3>
    <img src="../img/map_img_plus.jpg" alt="모든 관광지" style="width: 200px; height: 200px;">
  `;
  allAttractionsElement.addEventListener("click", displayAllAttractions);
  courseListElement.appendChild(allAttractionsElement);
}

// JSON 파일에서 모든 코스 데이터를 가져오는 함수
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

// 사용자의 북마크된 관광지 목록을 가져오는 함수
async function fetchBookmarkedAttractions() {
  try {
    const response = await fetch("../php/bookmark.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("북마크 데이터를 가져오는데 실패했습니다.");
    }
    const data = await response.json();
    return JSON.parse(data).map((item) => decodeURIComponent(item.attraction));
  } catch (error) {
    console.error("북마크 데이터 가져오기 오류:", error);
    return [];
  }
}

// 전역 변수로 찜한 관광지 목록을 관리합니다.
let bookmarkedPlaces = new Set();

// displayPlaceDetails를 비동기 함수로 변경
async function displayPlaceDetails(coursePlaces) {
  const placeDetailsContainer = document.getElementById("place-details");
  placeDetailsContainer.innerHTML = "";

  // 북마크된 관광지 목록을 가져옵니다.
  const bookmarkedAttractions = await fetchBookmarkedAttractions();
  bookmarkedPlaces = new Set(bookmarkedAttractions);

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

    // 하트 버튼 추가
    const heartButton = document.createElement("button");
    heartButton.className = "heart-button";
    heartButton.setAttribute("data-name", place.관광지);
    const isBookmarked = bookmarkedPlaces.has(place.관광지);
    heartButton.innerHTML = isBookmarked ? "🤍" : "❤️";

    heartButton.addEventListener("click", (e) => {
      e.stopPropagation(); // 부모 클릭 이벤트 방지
      toggleHeart(place.관광지);
    });

    placeInfo.appendChild(placeName);
    placeInfo.appendChild(placeDescription);
    placeInfo.appendChild(heartButton); // 하트 버튼을 정보에 추가

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

// 코스 클릭 이벤트 핸들러
async function onCourseClick(course) {
  try {
    // 기존 오버레이가 열려 있다면 닫음
    if (currentOverlay) {
      currentOverlay.setMap(null);
      currentOverlay = null;
    }

    await displayCourseMarkers(course.id);
    console.log(
      `${course.name} 코스가 선택되었습니다. 지도에 마커를 표시합니다.`
    );

    // 코스 데이터를 가져옵니다.
    const courseData = allCoursesData.filter(
      (place) => place.분류 === course.id
    );

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
      // displayPlaceDetails 함수를 비동기적으로 호출합니다.
      await displayPlaceDetails(courseData);
    }

    // 하트 버튼 상태를 업데이트합니다.
    await updateHeartButtonStates();

    // 스크롤바를 최상단으로 이동
    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error(`코스 표시 중 오류가 발생했습니다:`, error.message);
    alert(`코스 시 중 가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.`);
  }
}

function updateCourseBookmarkInDatabase(attraction) {
  fetch("../php/bookmark_handler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      attraction: encodeURIComponent(attraction),
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

// 개별 관광지 하트 버튼 토글 함수
function toggleHeart(placeName) {
  if (bookmarkedPlaces.has(placeName)) {
    bookmarkedPlaces.delete(placeName);
  } else {
    bookmarkedPlaces.add(placeName);
  }

  updateHeartButtonStates();
  updateCourseBookmarkInDatabase(placeName);
  console.log(`관광지 "${placeName}" 찜 상태 변경됨`);
  console.log("현재 찜한 관광지 목록:", Array.from(bookmarkedPlaces));
}

// 모든 하트 버튼 상태 업데이트 함
async function updateHeartButtonStates() {
  const heartButtons = document.querySelectorAll(".heart-button");
  heartButtons.forEach((button) => {
    const placeName = button.getAttribute("data-name");
    if (placeName) {
      button.innerHTML = bookmarkedPlaces.has(placeName) ? "🤍" : "❤️";
    }
  });
}

// 페이지 로드 시 찜 상태 초기화
async function initializeHeartStates() {
  try {
    // DB에서 찜한 관광지 목록을 가져와 초기화합니다.
    await getCourseData();
    const bookmarkedPlacesArray = await fetchBookmarkedAttractions();
    bookmarkedPlaces = new Set(bookmarkedPlacesArray);
    console.log("현재 찜한 관광지 목록:", Array.from(bookmarkedPlaces));

    // 모든 코스 데이터를 미리 로드합니다.
    if (!allCoursesData) {
      const response = await fetch(`../script/response.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      allCoursesData = jsonData.data;
    }

    // 코스 목록을 렌더링합니다.
    renderCourseList();

    // 초기 하트 버튼 상태를 업데이트합니다.
    await updateHeartButtonStates();
  } catch (error) {
    console.error("초기화 중 오류 발생:", error);
  }
}

// 페이지 로드 시 찜 상태 초기화 함수 호출
document.addEventListener("DOMContentLoaded", initializeHeartStates);

// 내가 찜한 곳 클릭 이벤트 핸들러
async function displayAllAttractions() {
  try {
    // 모든 관광지 데이터 가져오기
    if (!allCoursesData) {
      const response = await fetch(`../script/response.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      allCoursesData = jsonData.data;
    }

    // 코스 상세 정보 섹션 표시
    const courseDetailElement = document.getElementById("course-detail");
    courseDetailElement.style.display = "block";

    // detail-title 업데이트
    const detailTitleElement = document.getElementById("detail-title");
    detailTitleElement.innerHTML = `
      모든 관광지 <span style="color: #077fff;">목록</span>
      <button id="close-course-detail" style="float: right; background: none; border: none; font-size: 1.5em; cursor: pointer;">&times;</button>
    `;

    // 닫기 버튼 이벤트 리스너 추가
    const closeButton = document.getElementById("close-course-detail");
    closeButton.addEventListener("click", () => {
      courseDetailElement.style.display = "none";
    });

    // 모든 관광지 표시
    await displayAllAttractionsGrid(allCoursesData);

    // 스크롤바 최상단으로 이동
    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error("관광지 표시 중 오류 발생:", error);
    alert(
      "관광지 표시 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요."
    );
  }
}

// 모든 관광지를 그리드 형태로 표시 (가로로 두 개씩)
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

// 개별 관광지 요소 생성 함수
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

  const name = document.createElement("p");
  name.textContent = place.관광지;
  name.style.margin = "0";
  name.style.fontSize = "14px";
  name.style.fontWeight = "bold";

  nameContainer.appendChild(name);

  attractionElement.appendChild(imageContainer);
  attractionElement.appendChild(nameContainer);

  return attractionElement;
}
