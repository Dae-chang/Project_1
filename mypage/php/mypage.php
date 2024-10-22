<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>마이페이지 - 찜한 관광지 및 후기</title>
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="../css/header.css">
</head>
<body>
<?php include 'header.php'; ?>

    <main>
        <section id="favorites">
            <h2>찜한 관광지</h2>
            <div class="favorites-grid">
                <?php
                $favorites = [
                    ['id' => 1, 'image' => '../img/favorite1.jpg'],
                    ['id' => 2, 'image' => '../img/favorite2.jpg'],
                    ['id' => 3, 'image' => '../img/favorite3.jpg'],
                    ['id' => 4, 'image' => '../img/favorite4.jpg'],
                    ['id' => 5, 'image' => '../img/favorite5.jpg'],
                    ['id' => 6, 'image' => '../img/favorite6.jpg'],
                    ['id' => 7, 'image' => '../img/favorite7.jpg'],
                    ['id' => 8, 'image' => '../img/favorite8.jpg'],
                    ['id' => 9, 'image' => '../img/favorite9.jpg'],
                    ['id' => 10, 'image' => '../img/favorite10.jpg'],
                ];
                $itemsPerPage = 6;
                $totalPages = ceil(count($favorites) / $itemsPerPage);
                $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;
                $start = ($currentPage - 1) * $itemsPerPage;
                $pageItems = array_slice($favorites, $start, $itemsPerPage);

                foreach ($pageItems as $item) {
                    echo "<div class='favorite-item'>";
                    echo "<img src='{$item['image']}' alt='찜한 관광지 {$item['id']}'>";
                    echo "<button class='heart-button' data-id='{$item['id']}'>❤️</button>";
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
                    <span class="review-title">대구 수목원 방문 후기</span>
                    <span class="review-date">2023-05-15</span>
                </li>
                <li class="review-item">
                    <span class="review-title">팔공산 등산 후기</span>
                    <span class="review-date">2023-05-10</span>
                </li>
                <li class="review-item">
                    <span class="review-title">동성로 맛집 탐방</span>
                    <span class="review-date">2023-05-05</span>
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

        document.querySelectorAll('.heart-button').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                // 여기에 찜 목록에서 제거하는 AJAX 요청을 추가할 수 있습니다.
                this.closest('.favorite-item').remove();
            });
        });
    </script>
</body>
</html>
