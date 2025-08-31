const altLinks = document.querySelector(".alt_links")
const techImages = document.querySelectorAll('.tech_img');
const techInfos = document.querySelectorAll('.tech_info');
const techHead = document.querySelectorAll('.tech_head');

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

document.addEventListener('DOMContentLoaded', function () {
    techHead.forEach((head, index) => {
        head.addEventListener('click', function () {
            const currentInfo = techInfos[index];
            const isCurrentlyOpen = currentInfo.classList.contains("open");
            techInfos.forEach((info, i) => {
                info.classList.remove("open");
                techHead[i].classList.remove("active");
            });
            if (!isCurrentlyOpen) {
                currentInfo.classList.add("open");
                head.classList.add("active");
            }
        });
    });
});

// Dinamik il qur və kopyalara yay
(function () {
    const year = String(new Date().getFullYear());
    const yearMain = document.getElementById('year');
    if (yearMain) yearMain.textContent = year;
    document.querySelectorAll('.year-dup').forEach(el => el.textContent = year);
})();
