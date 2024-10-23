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

// ... 기타 코스 관련 함수들 ...
