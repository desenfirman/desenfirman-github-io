$(document).ready(function () {


    $('#leftmenu-trigger').on('click', function () {
        $('#page-leftbar').toggleClass('expanded');
        $('#sidebar_overlay').toggleClass('active');
        $('#page-leftbar>span' ).toggleClass('expanded');
        $('body').toggleClass('disable-overflow');
    });

    $('#sidebar_overlay').on('click', function(){
        $('#page-leftbar').toggleClass('expanded');
        $('#sidebar_overlay').toggleClass('active');
        $('body').toggleClass('disable-overflow');
    });

    $('#search_button').on('click', function () {
        $('#search_overlay').toggleClass('active');
        $('#search').toggleClass('active');
        $('body').toggleClass('disable-overflow');
        $('#search_overlay').css({overflow: 'auto'});
    });

    $('#close_button').on('click', function () {
        $('#search_overlay').toggleClass('active');
        $('#search').toggleClass('active');
        $('body').toggleClass('disable-overflow');
    });




});