// 초기화 함수
function init() {
  // renderCourseList() 호출 제거

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

// 전역 이벤트 리스너
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("overlay-button")) {
    console.log("자세히 보기 버튼 클릭됨");
    const spotId = event.target.getAttribute("data-id");
    console.log("관광지 ID:", spotId);
  }
});
