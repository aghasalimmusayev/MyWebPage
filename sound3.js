document.addEventListener("DOMContentLoaded", () => {
    const hoverAudio = document.getElementById("hover-audio");
    const clickAudio = document.getElementById("click-audio");
    const returnAudio = document.getElementById("return-audio");
    const soundToggle = document.getElementById("soundToggle");

    // Audio volume settings
    hoverAudio.volume = 0.9;
    returnAudio.volume = 0.9;
    clickAudio.volume = 0.9;

    let audioEnabled = false; // Default: OFF

    // Audio unlock funksiyası
    const unlockAudio = () => {
        [hoverAudio, clickAudio, returnAudio].forEach(audio => {
            audio.play().then(() => {
                audio.pause();
                audio.currentTime = 0;
            }).catch(() => { });
        });
    };

    // Sound toggle button click
    soundToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        audioEnabled = !audioEnabled;
        soundToggle.classList.toggle('active', audioEnabled);

        if (audioEnabled) {
            // İlk dəfə aktivləşəndə unlock edirik
            unlockAudio();
            console.log('🔊 Səs effektləri aktivdir');

            // Toggle səsini çal
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
        } else {
            console.log('🔇 Səs effektləri deaktivdir');

            // Bütün səsləri dayandır
            [hoverAudio, clickAudio].forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    });

    // Hover sound effect
    const playHover = () => {
        if (!audioEnabled) return;
        hoverAudio.currentTime = 0;
        hoverAudio.play().catch(() => { });
    };

    // Click sound effect
    const playClick = () => {
        if (!audioEnabled) return;
        hoverAudio.pause();
        hoverAudio.currentTime = 0;
        clickAudio.currentTime = 0;
        clickAudio.play().catch(() => { });
    };

    // Bütün interaktiv elementlərə hover effect
    document.querySelectorAll('a, .logo, .menuBar, .tech_head, #scrollToTop, #soundToggle').forEach(el => {
        el.addEventListener('mouseenter', playHover);
    });

    // Click events (sound toggle xaric)
    document.addEventListener('pointerdown', (e) => {
        // Sound toggle-ı atla
        if (e.target.closest('#soundToggle')) return;

        const target = e.target.closest('a, .logo, .menuBar, .tech_head');
        if (!target) return;

        playClick();
    });

    // Link naviqasiyası
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || '';
            const isHash = href === '' || href === '#' || href.startsWith('#');
            const isNewTab = link.target === '_blank';

            if (isHash) {
                e.preventDefault();
                return;
            }

            if (isNewTab) return;

            e.preventDefault();

            let navigated = false;
            const navigate = () => {
                if (navigated) return;
                navigated = true;
                window.location.href = href;
            };

            if (audioEnabled && clickAudio.duration > 0) {
                clickAudio.addEventListener('ended', navigate, { once: true });
                setTimeout(navigate, 250);
            } else {
                navigate();
            }
        });
    });

    // Scroll to top button
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        scrollBtn.addEventListener('mouseenter', playHover);
        scrollBtn.addEventListener('click', playClick);
    }

    // Tab-a qayıdanda return sound
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && audioEnabled) {
            returnAudio.currentTime = 0;
            returnAudio.play().catch(() => { });
        }
    });

    // jQuery menu toggle ilə sound
    $('#checkbox').on('change', function () {
        $('.links').toggleClass('open');
        if (audioEnabled) {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
        }
    });

    // Smooth scroll links (jQuery)
    $('a[href^="#"]').on('click', function (e) {
        if (audioEnabled) {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
        }

        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 800);
        }
    });

    // Logo click
    $('.logo').on('click', function (e) {
        if (audioEnabled) {
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
        }

        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Technologies accordion
    const techHead = document.querySelectorAll('.tech_head');
    const techInfos = document.querySelectorAll('.tech_info');
    const spacer = document.querySelector('.tech_spacer');

    techHead.forEach((head, index) => {
        head.addEventListener('click', function () {
            if (audioEnabled) {
                clickAudio.currentTime = 0;
                clickAudio.play().catch(() => { });
            }

            const currentInfo = techInfos[index];
            const isOpen = currentInfo.style.height && currentInfo.style.height !== '0px';

            techInfos.forEach((info, i) => {
                info.style.height = '0px';
                info.style.border = 'none';
                info.style.margin = '0px';
                spacer.style.height = '0px';
                techHead[i].classList.remove('active');
            });

            if (!isOpen) {
                currentInfo.style.height = currentInfo.scrollHeight + 'px';
                spacer.style.height = currentInfo.scrollHeight + 'px';
                currentInfo.style.border = '1px solid var(--line_color)';
                currentInfo.style.marginTop = '8px';
                head.classList.add('active');
            }
        });
    });

    // Year update
    (function () {
        const year = String(new Date().getFullYear());
        document.querySelectorAll('.year-dup').forEach(el => el.textContent = year);
    })();

    // Alt links dynamic positioning
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

    // Scroll to top button visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600 || document.documentElement.scrollTop > 600) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
});