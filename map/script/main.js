// 초기화 함수
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
    alert(
      `코스 표시 중 오류가 발생했습니다. 자세한 내용은 콘솔을 확인해주세요.`
    );
  }
}

// 페이지 로드 시 초기화
window.addEventListener("load", init);

// 전역 이벤트 리스너
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("overlay-button")) {
    console.log("자세히 보기 버튼 클릭됨");
    const spotId = event.target.getAttribute("data-id");
    console.log("관광지 ID:", spotId);
  }
});
