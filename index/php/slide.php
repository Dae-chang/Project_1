<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>슬라이드 페이지</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
        }
        header {
            background-color: #f8f8f8;
            padding: 20px;
            text-align: center;
        }
        .logo {
            max-width: 200px;
            margin-bottom: 10px;
        }
        .btn {
            padding: 10px 20px;
            margin: 0 5px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
        main {
            position: relative;
            height: calc(100vh - 200px);
        }
        #home {
            height: 100%;
        }
        #slideshow {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1s ease-in-out;
            object-fit: contain;
            background-color: #f0f0f0;
        }
        .slide.active {
            opacity: 1;
        }
        footer {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            position: fixed;
            bottom: 0;
            width: 100%;
        }
    </style>
</head>
<body>
    <header>
        <img src="../img/logo.png" alt="로고" class="logo">
        <div>
            <a href="#" class="btn">로그인</a>
            <a href="#" class="btn">마이페이지</a>
        </div>
    </header>

    <main>
        <section id="home">
            <div id="slideshow">
                <img src="../img/index_img_1.jpg" alt="이미지 1" class="slide">
                <img src="../img/index_img_2.jpg" alt="이미지 2" class="slide">
                <img src="../img/index_img_3.jpg" alt="이미지 3" class="slide">
                <img src="../img/index_img_4.jpg" alt="이미지 4" class="slide">
                <img src="../img/index_img_5.jpg" alt="이미지 5" class="slide">
            </div>
        </section>
    </main>

    <footer>
        footer
    </footer>

    <script>
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        function showSlide(index) {
            slides[currentSlide].classList.remove('active');
            slides[index].classList.add('active');
            currentSlide = index;
            
        }

        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        showSlide(0);
        setInterval(nextSlide, 3000);
    </script>
</body>
</html>
