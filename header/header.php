
<header id="home">
    <nav class="header-nav">
        <a href="../../index/php/index.php#home">HOME</a>
        <a href="../../index/php/index.php#information">숙소 찾기</a>
        <a href="../../index/php/index.php#youtube">추천영상</a>
    </nav>

    <div class="user-actions">
        <a href="../../login/php/login.php">로그인</a>
        <a href="../../mypage/php/mypage.php">마이페이지</a>
    </div>

    <div class="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="side-menu">
        <a href="../../login/php/login.php">로그인</a>
        <a href="../../mypage/php/mypage.php">마이페이지</a>
    </div>

    

</header>


<script>
        document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const sideMenu = document.querySelector(".side-menu");

    hamburgerMenu.addEventListener("click", function () {
        if (sideMenu.style.right === "0px") {
            sideMenu.style.right = "-200px";
        } else {
            sideMenu.style.right = "0px";
        }
    });

    // 사이드 메뉴 외부 클릭 시 닫기
  document.addEventListener("click", function (event) {
    if (!sideMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                sideMenu.style.right = "-200px";
            }
        });
    });

    </script>