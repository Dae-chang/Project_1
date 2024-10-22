<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지 - 찜한 관광지 및 후기</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../../header/header.css">
    <link rel="stylesheet" href="../css/modal.css">
</head>
<body>
<?php include '../../header/header.php'; ?>

    <main>
        <section id="favorites">
            <p>내가 찜한 여행지 목록</p>
            <div class="favorites-grid">
                <?php
                $jsonData = file_get_contents('../script/response.json');
                $data = json_decode($jsonData, true);
                $tourSpots = $data['data'];

                $favorites = [
                    ['id' => 1, 'image' => '../img/detail_img_1.jpg'],
                    ['id' => 2, 'image' => '../img/detail_img_2.jpg'],
                    ['id' => 3, 'image' => '../img/detail_img_3.jpg'],
                    ['id' => 4, 'image' => '../img/detail_img_4.jpg'],
                    ['id' => 5, 'image' => '../img/detail_img_5.jpg'],
                    ['id' => 6, 'image' => '../img/detail_img_6.jpg'],
                    ['id' => 7, 'image' => '../img/detail_img_7.jpg'],
                    ['id' => 8, 'image' => '../img/detail_img_8.jpg'],
                    ['id' => 9, 'image' => '../img/detail_img_9.jpg'],
                    ['id' => 10, 'image' => '../img/detail_img_10.jpg'],
                ];
                $itemsPerPage = 6;
                $totalPages = ceil(count($favorites) / $itemsPerPage);
                $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;
                $start = ($currentPage - 1) * $itemsPerPage;
                $pageItems = array_slice($favorites, $start, $itemsPerPage);

                foreach ($pageItems as $item) {
                    $spotName = '';
                    foreach ($tourSpots as $spot) {
                        if ($spot['관광지번호'] == $item['id']) {
                            $spotName = $spot['관광지'];
                            break;
                        }
                    }
                    echo "<div class='favorite-item' data-name='{$spotName}'>";
                    echo "<img src='{$item['image']}' alt='찜한 관광지 {$item['id']}'>";
                    echo "<div class='overlay'><span>{$spotName}</span></div>";
                    // echo "<button class='heart-button' data-id='{$item['id']}'>❤️</button>";
                    echo "</div>";
                }
                ?>
            </div>
            <div class="pagination">
                <?php
                for ($i = 1; $i <= $totalPages; $i++) {
                    echo "<button onclick='changePage($i)'>$i</button>";
                }
                ?>
            </div>
        </section>

        <section id="reviews">
    <h2>내 후기 목록</h2>
    <ul class="review-list">
        <li class="review-item">
            <div class="review-header">
                <span class="review-title">대구 수목원 방문 후기</span>
                <span class="review-date">2023-05-15</span>
            </div>
            <div class="review-actions">
                <button class="edit-button">수정</button>
                <button class="delete-button">삭제</button>
            </div>
        </li>
        <li class="review-item">
            <div class="review-header">
                <span class="review-title">팔공산 등산 후기</span>
                <span class="review-date">2023-05-10</span>
            </div>
            <div class="review-actions">
                <button class="edit-button">수정</button>
                <button class="delete-button">삭제</button>
            </div>
        </li>
        <li class="review-item">
            <div class="review-header">
                <span class="review-title">동성로 맛집 탐방</span>
                <span class="review-date">2023-05-05</span>
            </div>
            <div class="review-actions">
                <button class="edit-button">수정</button>
                <button class="delete-button">삭제</button>
            </div>
        </li>
    </ul>
</section>
    </main>

    <footer>
        <p>&copy; 2023 대구 관광지 소개. 모든 권리 보유.</p>
    </footer>

    <script>
        function changePage(page) {
            window.location.href = `?page=${page}`;
        }

        // document.querySelectorAll('.heart-button').forEach(button => {
        //     button.addEventListener('click', function() {
        //         const id = this.getAttribute('data-id');
        //         // 여기에 찜 목록에서 제거하는 AJAX 요청을 추가할 수 있습니다.
        //         this.closest('.favorite-item').remove();
        //     });
        // });

        document.querySelectorAll('.favorite-item').forEach(item => {
            item.addEventListener('click', function() {
                const spotName = this.getAttribute('data-name');
                fetch(`modal.php?name=${encodeURIComponent(spotName)}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                    return;
                }
                const modalContainer = document.createElement('div');
                modalContainer.className = 'modal-container';
                modalContainer.innerHTML = data.html;
                document.body.appendChild(modalContainer);

                modalContainer.querySelector('.close-button').addEventListener('click', () => {
                    modalContainer.remove();
                });
            })
            .catch(error => console.error('Error:', error));
            });
        });
    </script>
</body>
</html>
