// 코스 데이터

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
        <button class="heart-button" data-id="${course.id}">❤️</button>
        <div class="tags">
          <span>#가족여행</span><span>#친구</span><span>#먹거리</span>
        </div>
      `;
    courseElement.addEventListener("click", () => onCourseClick(course));

    // 하트 버튼 클릭 이벤트 추가
    const heartButton = courseElement.querySelector(".heart-button");
    heartButton.addEventListener("click", (e) => {
      e.stopPropagation(); // 부모 클릭 이벤트 방지
      toggleHeartForCourse(course.id);
    });

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

// 하트 버튼 토글 함수
function toggleHeart(courseId) {
  const coursePlaces = allCoursesData.filter((place) => place.분류 === courseId);
  coursePlaces.forEach((place) => {
    const placeDetail = document.querySelector(`.place-detail[data-id="${place.관광지번호}"]`);
    if (placeDetail) {
      const heartButton = placeDetail.querySelector(".heart-button");
      heartButton.classList.toggle("active"); // 하트 버튼 상태 토글
    }
  });
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

// 전역 변수로 찜한 관광지 목록을 관리합니다.
let bookmarkedPlaces = new Set();

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

    // 하트 버튼 추가
    const heartButton = document.createElement("button");
    heartButton.className = "heart-button";
    heartButton.setAttribute("data-name", place.관광지);
    heartButton.innerHTML = "❤️";
    if (bookmarkedPlaces.has(place.관광지)) {
      heartButton.classList.add("active");
    }
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

// ... 기타 코스 관련 함수들 ...

// 코스 클릭 이벤트 핸들러
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

    // 하트 버튼 추가
    const heartButton = document.createElement("button");
    heartButton.className = "heart-button";
    heartButton.innerHTML = "❤️";
    heartButton.addEventListener("click", (e) => {
      e.stopPropagation(); // 부모 클릭 이벤트 방지
      toggleHeart(course.id);
    });

    // 코스 상세 정보에 하트 버튼 추가
    courseDetailElement.appendChild(heartButton);

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

// 코스의 모든 관광지 찜 상태 토글 함수
function toggleHeartForCourse(courseId) {
  const coursePlaces = allCoursesData.filter((place) => place.분류 === courseId);
  const allPlacesBookmarked = coursePlaces.every((place) => bookmarkedPlaces.has(place.관광지));

  coursePlaces.forEach((place) => {
    if (allPlacesBookmarked) {
      bookmarkedPlaces.delete(place.관광지);
    } else {
      bookmarkedPlaces.add(place.관광지);
    }
  });

  updateHeartButtonStates();
  console.log(`코스 "${courseId}" 찜 상태 변경됨`);
  console.log("현재 찜한 관광지 목록:", Array.from(bookmarkedPlaces));

  // 여기에 나중에 DB 연동 코드를 추가할 수 있습니다.
  // 예: updateCourseBookmarkInDatabase(courseId, !allPlacesBookmarked);
}

// 개별 관광지 하트 버튼 토글 함수
function toggleHeart(placeName) {
  if (bookmarkedPlaces.has(placeName)) {
    bookmarkedPlaces.delete(placeName);
  } else {
    bookmarkedPlaces.add(placeName);
  }

  updateHeartButtonStates();
  console.log(`관광지 "${placeName}" 찜 상태 변경됨`);
  console.log("현재 찜한 관광지 목록:", Array.from(bookmarkedPlaces));

  // 여기에 나중에 DB 연동 코드를 추가할 수 있습니다.
  // 예: updateBookmarkInDatabase(placeName, bookmarkedPlaces.has(placeName));
}

// 모든 하트 버튼 상태 업데이트 함수
function updateHeartButtonStates() {
  const heartButtons = document.querySelectorAll(".heart-button");
  heartButtons.forEach((button) => {
    const placeName = button.getAttribute("data-name");
    const courseId = button.getAttribute("data-id");

    if (placeName) {
      button.classList.toggle("active", bookmarkedPlaces.has(placeName));
    } else if (courseId) {
      const coursePlaces = allCoursesData.filter((place) => place.분류 === courseId);
      const allPlacesBookmarked = coursePlaces.every((place) => bookmarkedPlaces.has(place.관광지));
      button.classList.toggle("active", allPlacesBookmarked);
    }
  });
}

// 나중에 DB에서 찜 상태를 가져오는 함수 (예시)
function fetchBookmarkedPlacesFromDB() {
  // 여기에 DB에서 찜한 관광지 목록을 가져오는 코드를 추가합니다.
  // 예시로 빈 배열을 반환합니다.
  return [];
}

// 페이지 로드 시 찜 상태 초기화
function initializeHeartStates() {
  // 나중에 DB에서 찜한 관광지 목록을 가져와 초기화합니다.
  const bookmarkedPlacesArray = fetchBookmarkedPlacesFromDB();
  bookmarkedPlaces = new Set(bookmarkedPlacesArray);

  updateHeartButtonStates();
}

// 페이지 로드 시 찜 상태 초기화 함수 호출
document.addEventListener("DOMContentLoaded", initializeHeartStates);
