$('#checkbox').on('change', function () {
    $('.links').toggleClass('open');
});

$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 100
        }, 800);
    }
});