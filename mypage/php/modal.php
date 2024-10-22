<?php
// JSON 파일에서 데이터 로드
$jsonData = file_get_contents('../script/response.json');
$data = json_decode($jsonData, true);
$tourSpots = $data['data'];

// GET 파라미터로 전달된 관광지 ID 또는 이름
$spotId = isset($_GET['id']) ? $_GET['id'] : null;
$spotName = isset($_GET['name']) ? $_GET['name'] : null;

// 해당 관광지 정보 찾기
$spotInfo = null;
foreach ($tourSpots as $spot) {
    if (($spotId && $spot['관광지번호'] == $spotId) || ($spotName && $spot['관광지'] == $spotName)) {
        $spotInfo = $spot;
        break;
    }
}

// 관광지 정보가 없으면 에러 메시지 반환
if (!$spotInfo) {
    echo json_encode(['error' => '관광지 정보를 찾을 수 없습니다.']);
    exit;
}

// 모달 창 HTML 생성
$modalHtml = <<<HTML
<div class="modal-content">
    <div class="modal-image">
        <img src="../img/detail_img_{$spotInfo['관광지번호']}.jpg" alt="{$spotInfo['관광지']}">
    </div>
    <div class="modal-info">
        <h2>{$spotInfo['관광지']}</h2>
        <button class="close-button">&times;</button>
        <p class="description">{$spotInfo['코스 주제 설명']}</p>
        <p class="address"><strong>주소:</strong> {$spotInfo['주소']}</p>
        <p class="homepage"><strong>홈페이지:</strong> <a href="{$spotInfo['홈페이지']}" target="_blank">{$spotInfo['홈페이지']}</a></p>
        <button class="unfavorite-button" data-id="{$spotInfo['관광지번호']}">찜 취소</button>
    </div>
</div>
HTML;

// JSON 형식으로 응답
echo json_encode(['html' => $modalHtml]);
?>
