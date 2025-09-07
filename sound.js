document.addEventListener("DOMContentLoaded", () => {
    const hoverAudio = document.getElementById("hover-audio");
    const clickAudio = document.getElementById("click-audio");
    const returnAudio = document.getElementById("return-audio");

    hoverAudio.volume = 0.9;
    returnAudio.volume = 0.9;
    clickAudio.volume = 0.9;

    let isTouchDevice = false;
    let isClicking = false;
    let audioUnlocked = false;

    // Daha güclü unlock funksiyası
    const unlockAudio = async () => {
        if (audioUnlocked) return;

        try {
            const audios = [hoverAudio, clickAudio, returnAudio];

            // Hər bir audio üçün unlock
            for (const audio of audios) {
                await audio.play();
                audio.pause();
                audio.currentTime = 0;
            }

            audioUnlocked = true;
            console.log('Audio unlocked successfully');

            // İlk return səsi
            setTimeout(() => {
                returnAudio.currentTime = 0;
                returnAudio.play().catch(e => console.log('Return audio failed:', e));
            }, 300);

        } catch (error) {
            console.log('Audio unlock failed:', error);
        }

        // Event listenerləri təmizlə
        ["pointerdown", "touchstart", "click", "keydown"].forEach(eventType => {
            document.removeEventListener(eventType, unlockAudio, { capture: true });
        });
    };

    // Bütün mümkün eventlər üçün unlock
    ["pointerdown", "touchstart", "click", "keydown"].forEach(eventType => {
        document.addEventListener(eventType, unlockAudio, { capture: true });
    });

    // Touch detection
    document.addEventListener("touchstart", () => {
        isTouchDevice = true;
    }, { once: true });

    let moved = false;
    document.addEventListener("pointermove", () => { moved = true; }, { once: true });

    const playHover = () => {
        if (!moved || isTouchDevice || isClicking || !audioUnlocked) return;

        try {
            hoverAudio.currentTime = 0;
            hoverAudio.play().catch(() => { });
        } catch (e) {
            console.log('Hover audio failed:', e);
        }
    };

    const playClick = () => {
        if (!audioUnlocked) return;

        isClicking = true;

        try {
            hoverAudio.pause();
            hoverAudio.currentTime = 0;
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
        } catch (e) {
            console.log('Click audio failed:', e);
        }

        setTimeout(() => {
            isClicking = false;
        }, 300);
    };

    // Event handlerləri
    document.querySelectorAll("a, .logo, .menuBar, .tech_head").forEach(el => {
        el.addEventListener("mouseenter", playHover);
        el.addEventListener("pointerdown", playClick);
        el.addEventListener("touchstart", playClick); // Əlavə touch support
    });

    // Link click handling
    document.querySelectorAll("a").forEach(a => {
        a.addEventListener("click", (e) => {
            const href = a.getAttribute("href") || "";
            const isHashOrEmpty = href === "" || href === "#" || href.startsWith("#");
            const isNewTab = a.target === "_blank";

            if (isHashOrEmpty) {
                e.preventDefault();
                return;
            }
            if (isNewTab) return;

            e.preventDefault();
            let navigated = false;
            const NAV_FALLBACK_MS = 250;

            const navigate = () => {
                if (navigated) return;
                navigated = true;
                window.location.href = href;
            };

            if (audioUnlocked && isFinite(clickAudio.duration) && clickAudio.duration > 0) {
                clickAudio.addEventListener("ended", navigate, { once: true });
                setTimeout(navigate, NAV_FALLBACK_MS);
            } else {
                setTimeout(navigate, NAV_FALLBACK_MS);
            }
        });
    });

    // Visibility change
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible" && audioUnlocked) {
            try {
                returnAudio.currentTime = 0;
                returnAudio.play().catch(() => { });
            } catch (e) {
                console.log('Return audio failed:', e);
            }
        }
    });
});