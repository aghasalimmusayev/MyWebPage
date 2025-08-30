const altLinks = document.querySelector(".alt_links")
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

function isMobile() {
    return window.innerWidth < 768;
}
function toggleAltLinks() {
    if (isMobile()) {
        altLinks.classList.toggle("open");
    }
}