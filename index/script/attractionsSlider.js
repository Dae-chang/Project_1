$(document).ready(function () {
  $(".attractions-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: '<button type="button" class="slick-prev">이전</button>',
    nextArrow: '<button type="button" class="slick-next">다음</button>',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
