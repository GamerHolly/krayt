$(document).ready(function(){
    $('.header-menu__burger').click(function(){
        $('.header-menu__burger, .menu-nav').toggleClass('active');
        $('body').toggleClass('lock');
    });
    $('.slider').slick({
        arrows: true,
        apadtiveHeight: true,
        slidesToShow:3,
        centerMode: true,
        centerPadding: '10px',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                arrows: false,
                dots:true,
                slidesToShow: 3
              }
            },
            {
              breakpoint: 480,
              settings: {
                arrows: false,
                dots:true,
                slidesToShow: 1
              }
            }
          ]
    });
});