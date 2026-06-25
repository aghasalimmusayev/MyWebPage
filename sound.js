document.addEventListener("DOMContentLoaded", () => {
    const hoverAudio = document.getElementById("hover-audio");
    const clickAudio = document.getElementById("click-audio");
    const returnAudio = document.getElementById("return-audio");
    const soundToggle = document.getElementById("soundToggle");
    const scrollBtn = document.getElementById('scrollToTop');
    // Audio volume settings
    hoverAudio.volume = 0.9;
    returnAudio.volume = 0.7;
    clickAudio.volume = 0.9;
    let audioEnabled = false;
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
            unlockAudio();
            console.log('🔊 Səs effektləri aktivdir');
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
        } else {
            console.log('🔇 Səs effektləri deaktivdir');
            [hoverAudio, clickAudio].forEach(audio => {
                audio.pause();
                audio.currentTime = 0;
            });
        }
    });
    // Mobile/Desktop detect
    const isTouchDevice = () => {
        return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    };
    // Hover sound effect
    const playHover = (e) => {
        if (!audioEnabled || isTouchDevice()) return;
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
    // Bütün interaktiv elementlərə hover (scrollToTop və soundToggle XARİC)
    document.querySelectorAll('a, .logo, .menuBar, #soundToggle, #scrollToTop').forEach(el => {
        el.addEventListener('mouseenter', playHover);
    });
    // Click events (sound toggle xaric)
    document.addEventListener('pointerdown', (e) => {
        if (e.target.closest('#soundToggle')) return;
        const target = e.target.closest('a, .logo, .menuBar, #soundToggle, #scrollToTop');
        if (!target) return;
        playClick();
    });
    // Səhifəyə geri qayıdanda (back/forward cache)
    window.addEventListener('pageshow', (e) => {
        if (e.persisted && audioEnabled) {
            returnAudio.currentTime = 0;
            returnAudio.play().catch(err => console.warn('pageshow return sound:', err));
        }
    });
    // Tab-a geri qayıdanda
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && audioEnabled) {
            returnAudio.currentTime = 0;
            returnAudio.play().catch(err => console.warn('visibilitychange return sound:', err));
        }
    });
});
