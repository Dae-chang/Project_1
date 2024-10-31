let selectedAttractions = new Set();
let allCoursesData = null;

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
    <img src="../img/map_img_plus.jpg" alt="모든 관광지" class="create-course-image">
  `;
  createCourseButton.addEventListener("click", displayAllAttractions);
  courseListElement.appendChild(createCourseButton);
}

// 모든 관광지 표시
async function displayAllAttractions() {
  console.log("Current login status:", isLoggedIn); // 디버깅용
  if (typeof isLoggedIn === "undefined" || !isLoggedIn) {
    alert("로그인이 필요한 서비스입니다.");
    window.location.href = "../../login/php/login.php";
    return;
  }

  try {
    // 기존 마커 모두 삭제
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    // 선택된 관광지 화
    selectedAttractions.clear();

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
      모든 관광지 <span class="detail-title-highlight">목록</span>
      <button id="close-course-detail">&times;</button>
    `;

    const closeButton = document.getElementById("close-course-detail");
    closeButton.addEventListener("click", () => {
      courseDetailElement.style.display = "none";
      // 닫기 버튼 클릭 시에도 마커와 선택 초기화
      markers.forEach((marker) => marker.setMap(null));
      markers = [];
      selectedAttractions.clear();
    });

    await displayAllAttractionsGrid(allCoursesData, "create");

    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error("관광지 표시 중 오류 발생:", error);
    alert("관광지 표시 중 오류가 발생했습니다. 자세한 용은 콘솔을 확인해주세요.");
  }
}

// 모든 관광지를 그리드 형태로 표시 (mode 파라미터 추가)
async function displayAllAttractionsGrid(attractions, mode = "create") {
  const placeDetailsContainer = document.getElementById("place-details");
  placeDetailsContainer.innerHTML = "";
  placeDetailsContainer.className = "attraction-grid";

  for (let i = 0; i < attractions.length; i += 2) {
    const rowContainer = document.createElement("div");
    rowContainer.className = "attraction-row";

    for (let j = i; j < i + 2 && j < attractions.length; j++) {
      const place = attractions[j];
      // mode에 따라 다른 방식으로 관광지 요소 생성
      const attractionElement = mode === "create" ? createSelectableAttractionElement(place) : createReadOnlyAttractionElement(place);
      rowContainer.appendChild(attractionElement);
    }

    placeDetailsContainer.appendChild(rowContainer);
  }
}

// 선택 가능한 관광지 요소 생성 (새 코스 만들기용)
function createSelectableAttractionElement(place) {
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

  // 선택 이벤트 추가
  attractionElement.addEventListener("click", () => toggleAttractionSelection(attractionElement, place));

  return attractionElement;
}

// 읽기 전용 관광지 요소 생성 (코스 상세보기용)
function createReadOnlyAttractionElement(place) {
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

  return attractionElement;
}

// 관광지 선택 토글
async function toggleAttractionSelection(element, place) {
  const isSelected = selectedAttractions.has(place.관광지번호);
  const attractionGrid = document.querySelector(".attraction-grid");

  if (isSelected) {
    selectedAttractions.delete(place.관광지번호);
    element.classList.remove("attraction-selected");
    removeCheckmark(element);
    removeMarkerFromMap(place.관광지번호);
  } else {
    if (selectedAttractions.size >= 7) {
      alert("한 코스에는 최대 7개의 관광지만 저장 가능합니다.");
      return;
    }

    selectedAttractions.add(place.관광지번호);
    element.classList.add("attraction-selected");
    addCheckmark(element);
    await addMarkerToMap(place);
  }

  // 선택된 관광지가 있을 때 그리드 너비 조정
  if (selectedAttractions.size > 0) {
    attractionGrid.classList.add("has-selected");
  } else {
    attractionGrid.classList.remove("has-selected");
  }

  // 선택된 관광지가 있을 때 확인 버튼 표시/숨김 처리
  updateConfirmationButton();
}

// 확인 버튼 업데이트 함수 추가
function updateConfirmationButton() {
  let confirmationDiv = document.getElementById("attraction-confirmation");

  if (selectedAttractions.size > 0) {
    if (!confirmationDiv) {
      confirmationDiv = document.createElement("div");
      confirmationDiv.id = "attraction-confirmation";
      confirmationDiv.className = "confirmation-fixed";

      // 선택된 관광지가 있을 때만 입력과 확인 버튼 표시
      confirmationDiv.innerHTML = `
        ${
          selectedAttractions.size > 0
            ? `
          <div class="course-name-input">
            <input type="text" id="course-name" placeholder="코스 이름을 입력하세요">
          </div>
        `
            : ""
        }
        <button id="confirm-attractions" class="confirm-btn">확인</button>
      `;

      document.getElementById("course-detail").appendChild(confirmationDiv);

      // 확인 버튼 클릭 이벤트
      document.getElementById("confirm-attractions").addEventListener("click", async () => {
        const courseName = document.getElementById("course-name").value.trim();

        if (!courseName) {
          alert("코스 이름을 입력해주세요.");
          return;
        }

        // 선택된 관광지 정보 가져오기
        const attractions = [];
        for (let attractionId of selectedAttractions) {
          const attraction = allCoursesData.find((item) => item.관광지번호 === parseInt(attractionId));
          if (attraction) {
            attractions.push({
              관광지: attraction.관광지,
            });
          }
        }

        // 선택된 관광지가 없는 경우 처리
        if (attractions.length === 0) {
          alert("선택된 관광지가 없습니다.");
          return;
        }

        try {
          const response = await fetch("../php/course_create.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              courseName: courseName,
              attractions: attractions,
            }),
          });

          console.log("응답 상태:", response.status);
          const responseData = await response.json();
          console.log("응답 데이터:", responseData);

          if (!response.ok) {
            throw new Error(responseData.error || "코스 생성에 실패했습니다.");
          }

          alert("새로운 코스가 생성되었습니다!");

          // 선택된 관광지 초기화
          selectedAttractions.clear();

          // 마커 제거
          markers.forEach((marker) => marker.setMap(null));
          markers = [];

          // attraction-confirmation 창 제거
          const confirmationDiv = document.getElementById("attraction-confirmation");
          if (confirmationDiv) {
            confirmationDiv.remove();
          }

          // 상세 패널 닫기
          document.getElementById("course-detail").style.display = "none";

          // 코스 목록 새로고침
          await loadUserCourses();
        } catch (error) {
          console.error("코스 생성 중 오류:", error);
          alert("코스 생성 중 오류가 발생했습니다: " + error.message);
        }
      });
    }
  } else {
    if (confirmationDiv) {
      confirmationDiv.remove();
    }
  }
}

// 코스 목록 로드
async function loadUserCourses() {
  try {
    const response = await fetch("../php/course_user.php", {
      credentials: "include",
    });

    if (!response.ok) {
      if (response.status === 401) {
        window.location.href = "../../login/php/login.php";
        return;
      }
      throw new Error("코스 목록을 불러오는데 실패했습니다.");
    }

    const data = await response.json();
    if (data.success) {
      renderUserCourses(data.courses);
    }
  } catch (error) {
    console.error("코스 목록 로딩 중 오류:", error);
    renderCreateCourseButton();
  }
}

// 사용자의 코스 목록을 렌더링하는 함수
function renderUserCourses(courses) {
  const courseListElement = document.getElementById("course-list");
  courseListElement.innerHTML = "";

  const customCourseTitle = document.createElement("h2");
  customCourseTitle.textContent = "나의 코스 목록";
  customCourseTitle.className = "custom-course-title";
  courseListElement.appendChild(customCourseTitle);

  // 코스 생성 버튼 추가
  const createCourseButton = document.createElement("div");
  createCourseButton.className = "course-item";
  createCourseButton.innerHTML = `
    <h3>새로운 코스 만들기</h3>
    <img src="../img/map_img_plus.jpg" alt="코스 만들기" class="create-course-image">
  `;
  createCourseButton.addEventListener("click", displayAllAttractions);
  courseListElement.appendChild(createCourseButton);

  // 사용자의 코스 목록 렌더링
  if (courses && courses.length > 0) {
    courses.forEach((course) => {
      const courseElement = document.createElement("div");
      courseElement.className = "course-item";
      courseElement.innerHTML = `
        <h3>${course.course_name}</h3>
        <p>생성일: ${course.created_at}</p>
      `;

      // 삭제 버튼 추가
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "삭제하기";
      deleteButton.addEventListener("click", async () => {
        const confirmDelete = confirm(`"${course.course_name}" 코스를 삭제하시겠습니까?`);
        if (confirmDelete) {
          try {
            const response = await fetch("../php/course_delete.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                courseID: course.course_id,
              }),
            });

            if (!response.ok) {
              throw new Error("삭제에 실패했습니다.");
            }

            alert("코스가 삭제되었습니다.");
            // 코스 목록 새로고침
            await loadUserCourses();
          } catch (error) {
            console.error("코스 삭제 중 오류:", error);
            alert("코스 삭제 중 오류가 발생했습니다: " + error.message);
          }
        }
      });

      courseElement.appendChild(deleteButton);
      courseElement.addEventListener("click", () => displayCourseDetails(course));
      courseListElement.appendChild(courseElement);
    });
  }
}

// 코스 상세 정보를 표시하는 함수
async function displayCourseDetails(course) {
  try {
    // allCoursesData가 없는 경우 먼저 데이터를 로드
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
      ${course.course_name} <span class="detail-title-highlight">관광지 목록</span>
      <button id="close-course-detail">&times;</button>
    `;

    const closeButton = document.getElementById("close-course-detail");
    closeButton.addEventListener("click", () => {
      courseDetailElement.style.display = "none";
    });

    // course.attractions를 사용하여 관광지 정보 매칭
    const attractionsWithDetails = course.attractions.map((attractionName) => {
      const fullDetails = allCoursesData.find((item) => item.관광지 === attractionName);
      return fullDetails || { 관광지: attractionName };
    });

    // 읽기 전용 모드로 관광지 표
    await displayAllAttractionsGrid(attractionsWithDetails, "view");

    // 코스 이름 입력 창 닫기
    const confirmationDiv = document.getElementById("attraction-confirmation");
    if (confirmationDiv) {
      confirmationDiv.remove();
    }

    // 지도 마커 업데이트
    markers.forEach((marker) => marker.setMap(null));
    markers = [];

    for (const attraction of attractionsWithDetails) {
      await addMarkerToMap(attraction);

      // CustomOverlay 추가
      const overlay = new kakao.maps.CustomOverlay({
        position: new kakao.maps.LatLng(attraction.위도, attraction.경도), // 위도, 경도 사용
        content: `<div class="custom-overlay">${attraction.관광지}</div>`,
        yAnchor: 1,
      });
      overlay.setMap(map);
    }

    courseDetailElement.scrollTop = 0;
  } catch (error) {
    console.error("코스 상세 정보를 불러오는 중 오류가 발생했습니다: ", error);
    alert(`코스 상세 정보를 불러오는 중 오류가 발생했습니다: ${error.message}`);
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

// 페이지 로드 시 초기
document.addEventListener("DOMContentLoaded", () => {
  loadUserCourses();
  if (typeof initMap === "function" && !window.mapInitialized) {
    initMap();
    window.mapInitialized = true;
  }
});

// 커 업데이트 함수 (비동기)
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
