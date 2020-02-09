$(document).ready(function(){
    $('.header-menu__burger').click(function(){
        $('.header-menu__burger, .menu-nav').toggleClass('active');
        $('body').toggleClass('lock');
    });
});