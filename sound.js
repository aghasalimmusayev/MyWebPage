document.addEventListener("DOMContentLoaded", () => {
    const hoverAudio = document.getElementById("hover-audio");
    const clickAudio = document.getElementById("click-audio");

    hoverAudio.volume = 0.1;
    clickAudio.volume = 0.7;

    const unlock = () => {
        [hoverAudio, clickAudio].forEach(a => {
            a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => { });
        });
        ["pointerdown", "pointermove", "keydown", "touchstart", "click"].forEach(t =>
            document.removeEventListener(t, unlock, { capture: true })
        );
    };
    ["pointerdown", "pointermove", "keydown", "touchstart", "click"].forEach(t =>
        document.addEventListener(t, unlock, { capture: true })
    );
    let moved = false;
    document.addEventListener("pointermove", () => { moved = true; }, { once: true });
    const onHover = () => {
        if (!moved) return;
        hoverAudio.currentTime = 0;
        hoverAudio.play().catch(() => { });
    };
    document.querySelectorAll(".links a, .logo").forEach(el => {
        el.addEventListener("mouseenter", onHover);
        el.addEventListener("focusin", onHover);
    });
    document.addEventListener("pointerdown", (e) => {
        const a = e.target.closest(".links a, .logo");
        if (!a) return;
        hoverAudio.pause(); hoverAudio.currentTime = 0;
        clickAudio.currentTime = 0;
        clickAudio.play().catch(() => { });
    });
    document.querySelectorAll(".links a, .logo").forEach(a => {
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
            const NAV_FALLBACK_MS = 250; // istəyə görə 150–300 arası seçə bilərsən
            const go = () => {
                if (navigated) return;
                navigated = true;
                window.location.href = href;
            };
            if (isFinite(clickAudio.duration) && clickAudio.duration > 0) {
                clickAudio.addEventListener("ended", go, { once: true });
                setTimeout(go, NAV_FALLBACK_MS);
            } else {
                setTimeout(go, NAV_FALLBACK_MS);
            }
        });
    });
});
