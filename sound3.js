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

        const target = e.target.closest('a, .logo, .menuBar, .tech_head, #scrollToTop, #soundToggle');
        if (!target) return;

        playClick();
    });
    // Tab-a qayıdanda return sound
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && audioEnabled) {
            returnAudio.currentTime = 0;
            returnAudio.play().catch(() => { });
        }
    });
});