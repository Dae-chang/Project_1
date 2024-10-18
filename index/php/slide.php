<section id="home">
        <div class="swiper-container">
            <div class="swiper-wrapper">
            <div class="swiper-slide">
                <img src="../img/Untitled1.jpg" alt="슬라이드 1">
                <div class="progress-bar">
                    <span class="slide-number">1/5</span>
                    <div class="progress"></div>
                </div>
            </div>
            <div class="swiper-slide">
                <img src="../img/Untitled2.jpg" alt="슬라이드 2">
                <div class="progress-bar">
                    <span class="slide-number">2/5</span>
                    <div class="progress"></div>
                </div>
            </div>
            <div class="swiper-slide">
                <img src="../img/Untitled3.jpg" alt="슬라이드 3">
                <div class="progress-bar">
                    <span class="slide-number">3/5</span>
                    <div class="progress"></div>
                </div>
            </div>
            <div class="swiper-slide">
                <img src="../img/Untitled4.jpg" alt="슬라이드 4">
                <div class="progress-bar">
                    <span class="slide-number">4/5</span>
                    <div class="progress"></div>
                </div>
            </div>
            <div class="swiper-slide">
                <img src="../img/Untitled5.jpg" alt="슬라이드 5">
                <div class="progress-bar">
                    <span class="slide-number">5/5</span>
                    <div class="progress"></div>
                </div>
            </div>
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </div>

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script>
        const swiper = new Swiper('.swiper-container', {
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            speed: 800, // 전환 속도를 800ms로 설정
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                init: function () {
                    this.autoplay.stop();
                    this.autoplay.start();
                    updateProgress(this);
                },
                autoplayTimeLeft: function (s, time, progress) {
                    updateProgress(this, progress);
                },
                slideChange: function () {
                    updateProgress(this, 1);
                }
            },
        });

        function updateProgress(swiper, progress) {
            const currentSlide = swiper.realIndex;
            const totalSlides = swiper.slides.length;
            const progressBar = swiper.slides[currentSlide].querySelector('.progress');
            const slideNumber = swiper.slides[currentSlide].querySelector('.slide-number');
            
            if (progress === undefined) {
                progress = 1 - (swiper.autoplay.timeLeft / swiper.params.autoplay.delay);
            }
            
            progressBar.style.width = `${(1 - progress) * 100}%`;
            slideNumber.textContent = `${currentSlide + 1}/${totalSlides}`;
        }

        // 수동 조작 시 로딩 바 리셋
        swiper.on('slideChangeTransitionEnd', function () {
            updateProgress(this, 1);
        });
    </script>
</section>
