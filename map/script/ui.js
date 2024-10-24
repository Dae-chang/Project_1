// 커스텀 오버레이 관련 함수들
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

// 하트 버튼 클릭 이벤트 추가
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("heart-button")) {
    const spotId = event.target.getAttribute("data-id");
    event.target.classList.toggle("active"); // 하트 버튼 상태 토글
    console.log(`관광지 ${spotId} 찜 상태 변경됨`);
  }
});
