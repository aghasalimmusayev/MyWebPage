const altLinks = document.querySelector(".alt_links")
const techImages = document.querySelectorAll('.tech_img');
const techInfos = document.querySelectorAll('.tech_info');
const techHead = document.querySelectorAll('.tech_head');
const spacer = document.querySelector('.tech_spacer');
const technologiesContent = document.querySelector(".technologies_content")

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
$('.logo').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 800);
});
function isMobile() {
    return window.innerWidth < 900;
}

// document.addEventListener('DOMContentLoaded', function () {
//     techHead.forEach((head, index) => {
//         head.addEventListener('click', function () {
//             const currentInfo = techInfos[index];
//             const isOpen = currentInfo.style.height && currentInfo.style.height !== '0px';
//             techInfos.forEach((info, i) => {
//                 info.style.height = '0px';
//                 info.style.border = 'none';
//                 info.style.margin = '0px';
//                 spacer.style.height = '0px';
//                 techHead[i].classList.remove('active');
//             });
//             if (!isOpen) {
//                 currentInfo.style.height = currentInfo.scrollHeight + 'px';
//                 spacer.style.height = currentInfo.scrollHeight + 'px';
//                 currentInfo.style.border = '1px solid var(--line_color)';
//                 currentInfo.style.marginTop = '8px';
//                 head.classList.add('active');
//             }
//         });
//     });
// });

(function () {
    const year = String(new Date().getFullYear());
    document.querySelectorAll('.year-dup').forEach(el => el.textContent = year);
})();

// Şəkilləri dinamik olaraq yerləşdirmək üçün
document.addEventListener('DOMContentLoaded', function () {
    const altLinksItems = document.querySelectorAll('.alt_links li');
    altLinksItems.forEach(item => {
        const img = item.querySelector('img');
        item.addEventListener('mouseenter', function () {
            if (img) {
                const rect = item.getBoundingClientRect();
                img.style.left = (rect.left - 300) + 'px';
                img.style.top = rect.top + 'px';
            }
        });
    });
});

const scrollToTopBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 600 || document.documentElement.scrollTop > 600) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // const clickAudio = document.getElementById('click-audio');
    // if (clickAudio) {
    //     clickAudio.currentTime = 0;
    //     clickAudio.play();
    // }
});