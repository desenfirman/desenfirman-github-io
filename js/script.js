$(document).ready(function () {

    $('#leftmenu-trigger').on('click', function () {
        $('#page-leftbar').toggleClass('expanded');
        $('.overlay').toggleClass('active');
        $('#page-leftbar>span' ).toggleClass('expanded');
    });

});