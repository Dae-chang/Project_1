<?php
session_start(); // 세션 시작
?>

<header id="home">
    <div class="header-left">
        <img src="../../header/header_img/logo.png" alt="로고">
    </div>
    <nav class="header-nav">
        <a href="../../index/php/index.php#home">HOME</a>
        <a href="../../map/php/map.php">추천 여행지</a>
        <a href="../../course/php/map.php">나만의 여행지</a>
    </nav>

    <a href="../../index/php/index.php#home" class="mobile-logo"></a>

    <div class="user-actions">
        <?php if (isset($_SESSION['userID'])): ?>
            <a href="../../logout.php">로그아웃</a>
        <?php else: ?>
            <a href="../../login/php/login.php">로그인</a>
        <?php endif; ?>
    </div>

    <div class="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="side-menu">
        <?php if (isset($_SESSION['userID'])): ?>
            <a href="../../logout.php">로그아웃</a>
        <?php else: ?>
            <a href="../../login/php/login.php">로그인</a>
        <?php endif; ?>
        <a href="../../map/php/map.php">추천 여행지</a>
        <a href="../../course/php/map.php">나만의 여행지</a>
    </div>



</header>


<script>
    document.addEventListener("DOMContentLoaded", function() {
        const hamburgerMenu = document.querySelector(".hamburger-menu");
        const sideMenu = document.querySelector(".side-menu");

        hamburgerMenu.addEventListener("click", function() {
            if (sideMenu.style.right === "0px") {
                sideMenu.style.right = "-200px";
            } else {
                sideMenu.style.right = "0px";
            }
        });

        // 사이드 메뉴 외부 클릭 시 닫기
        document.addEventListener("click", function(event) {
            if (!sideMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                sideMenu.style.right = "-200px";
            }
        });

        // 화면 크기 변경 감지하여 사이드 메뉴 닫기
        window.addEventListener("resize", function() {
            if (window.innerWidth > 768) { // PC 화면 크기일 때 (768px는 필요에 따라 조정 가능)
                sideMenu.style.right = "-200px";
            }
        });
    });
</script>