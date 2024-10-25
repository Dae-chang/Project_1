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
                require_once '../../env.php';
                require_once '../../user_repository.php';


                $userId = $_SESSION['userID'] ?? null;

                if (!$userId) {
                    echo "<p>로그인이 필요합니다.</p>";
                } else {
                    $favorites = getUserFavorites($userId, $DBCON);
                    $jsonData = file_get_contents('../script/response.json');
                    $data = json_decode($jsonData, true);
                    $tourSpots = $data['data'];

                    $itemsPerPage = 6;
                    $totalPages = ceil(count($favorites) / $itemsPerPage);
                    $currentPage = isset($_GET['page']) ? $_GET['page'] : 1;
                    $start = ($currentPage - 1) * $itemsPerPage;
                    $pageItems = array_slice($favorites, $start, $itemsPerPage);

                    foreach ($pageItems as $item) {
                        $spotInfo = null;
                        foreach ($tourSpots as $spot) {
                            if ($spot['관광지'] == $item['attraction']) {
                                $spotInfo = $spot;
                                break;
                            }
                        }
                        if ($spotInfo) {
                            echo "<div class='favorite-item' data-name='{$spotInfo['관광지']}'>";
                            echo "<img src='../img/detail_img_{$spotInfo['관광지번호']}.jpg' alt='찜한 관광지 {$spotInfo['관광지']}'>";
                            echo "<div class='overlay'><span>{$spotInfo['관광지']}</span></div>";
                            echo "</div>";
                        }
                    }
                }
                ?>
            </div>
            <div class="pagination">
                <?php
                if (isset($totalPages)) {
                    for ($i = 1; $i <= $totalPages; $i++) {
                        echo "<button onclick='changePage($i)'>$i</button>";
                    }
                }
                ?>
            </div>
        </section>

    </main>

    <footer>
        <p>&copy; 2023 대구 관광지 소개. 모든 권리 보유.</p>
    </footer>

    <script>
        function changePage(page) {
            window.location.href = `?page=${page}`;
        }

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
