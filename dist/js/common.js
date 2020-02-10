$(document).ready(function() {
  $(".header-menu__burger").click(function() {
    $(".header-menu__burger, .menu-nav").toggleClass("active");
    $("body").toggleClass("lock");
  });
  $("#menu").on("click", "a", function(event) {
    event.preventDefault();
    var id = $(this).attr("href"),
      top = $(id).offset().top;
    $("body,html").animate({ scrollTop: top }, 1500);
    $(".header-menu__burger, .menu-nav").toggleClass("active");
    $("body").toggleClass("lock");
  });
  $(".slider").slick({
    arrows: true,
    apadtiveHeight: true,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "10px",
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 2,
          autoplay: true,
          autoplaySpeed: 3000,
          centerMode: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 1,
          autoplay: true,
          autoplaySpeed: 3000
        }
      }
    ]
  });
});
