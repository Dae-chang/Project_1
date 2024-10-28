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

let allCoursesData;

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

  // 내가 찜한 곳 보기
  const myTourElement = document.createElement("div");
  myTourElement.className = "course-item";
  myTourElement.innerHTML = `
      <h3>내가 찜한 곳</h3>
      <img src="../img/map_img_plus.jpg" alt="이미지" style="width: 200px; height: 200px;">
    `;
  myTourElement.addEventListener("click", onMyBookmarksClick);
  courseListElement.appendChild(myTourElement);
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

    // place-name-container 생성 (이름과 하트 버튼을 감싸는 컨테이너)
    const placeNameContainer = document.createElement("div");
    placeNameContainer.className = "place-name-container";

    const placeName = document.createElement("h3");
    placeName.className = "place-name";
    placeName.textContent = place.관광지;

    const heartButton = document.createElement("button");
    heartButton.className = "heart-button";
    heartButton.setAttribute("data-name", place.관광지);
    const isBookmarked = bookmarkedPlaces.has(place.관광지);
    heartButton.innerHTML = isBookmarked ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';

    heartButton.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleHeart(place.관광지);
    });

    const placeDescription = document.createElement("p");
    placeDescription.className = "place-description";
    placeDescription.textContent = place.코스설명;

    // 요소들을 순서대로 추가
    placeNameContainer.appendChild(placeName);
    placeNameContainer.appendChild(heartButton);

    placeInfo.appendChild(placeNameContainer);
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
    const courseData = allCoursesData.filter((place) => place.분류 === course.id);

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
    console.error(`코스 표시 중 오류가 발생했습:`, error.message);
    alert(`코스 시 중 가 발생했습니다. 자세한 내용은 콘을 확인해주세요.`);
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
      // 문자열로 Font Awesome 아이콘 HTML 처리
      button.innerHTML = bookmarkedPlaces.has(placeName) ? '<i class="fa-solid fa-heart"></i>' : '<i class="fa-regular fa-heart"></i>';
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
async function onMyBookmarksClick() {
  try {
    // 찜한 관광지 데이터 가져오기
    const bookmarkedAttractions = await fetchBookmarkedAttractions();

    // 중복 제거를 위해 Set 사용
    const uniqueBookmarkedAttractions = new Set(bookmarkedAttractions);

    // 중복이 제거된 찜한 관광지만 필터링
    const bookmarkedPlaces = allCoursesData.filter((place) => uniqueBookmarkedAttractions.has(place.관광지));

    // 중복 제거된 결과에서 첫 번째 항목만 선택
    const uniqueBookmarkedPlaces = Array.from(new Map(bookmarkedPlaces.map((place) => [place.관광지, place])).values());

    await displayCourseMarkers(null, uniqueBookmarkedPlaces);

    // 코스 상세 정보 섹션 표시
    const courseDetailElement = document.getElementById("course-detail");
    courseDetailElement.style.display = "block";

    // detail-title 업데이트
    const detailTitleElement = document.getElementById("detail-title");
    detailTitleElement.innerHTML = `
        내가 찜한 곳 <span style="color: #077fff;">목록</span>
        <button id="close-course-detail" style="float: right; background: none; border: none; font-size: 1.5em; cursor: pointer;">&times;</button>
      `;

    // 닫기 버튼 이벤트 리스너 가
    const closeButton = document.getElementById("close-course-detail");
    closeButton.addEventListener("click", () => {
      courseDetailElement.style.display = "none";
    });

    // 찜한 관광지 상세 정보 표시
    await displayPlaceDetails(uniqueBookmarkedPlaces);

    // 하트 버튼 상태 업데이트
    await updateHeartButtonStates();

    // 스크롤바 최상단으로 이동
    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error("찜한 곳 표시 중 오류 발생:", error);
    alert("찜한 곳 표시 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.");
  }
}
