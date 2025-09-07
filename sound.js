document.addEventListener("DOMContentLoaded", () => {
    const hoverAudio = document.getElementById("hover-audio");
    const clickAudio = document.getElementById("click-audio");
    const returnAudio = document.getElementById("return-audio");

    hoverAudio.volume = 0.9;
    clickAudio.volume = 0.9;
    returnAudio.volume = 0.9;

    // unlock (mobil üçün)
    const unlock = () => {
        [hoverAudio, clickAudio, returnAudio].forEach(a => {
            a.play().then(() => { a.pause(); a.currentTime = 0; }).catch(() => { });
        });
        ["pointerdown", "touchstart", "keydown", "click"].forEach(t =>
            document.removeEventListener(t, unlock, { capture: true })
        );
    };
    ["pointerdown", "touchstart", "keydown", "click"].forEach(t =>
        document.addEventListener(t, unlock, { capture: true })
    );

    // ---- Hover səsi yalnız desktop üçün ----
    const supportsHover = matchMedia("(hover:hover)").matches;
    if (supportsHover) {
        document.querySelectorAll("a, .logo, .menuBar, .tech_head").forEach(el => {
            el.addEventListener("mouseenter", () => {
                hoverAudio.currentTime = 0;
                hoverAudio.play().catch(() => { });
            });
        });
    }

    // ---- Click səsi ----
    document.querySelectorAll("a, .logo, .menuBar, .tech_head").forEach(el => {
        el.addEventListener("click", (e) => {
            // əvvəlcə click səsini çal
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });

            // naviqasiyanı gecikdir (səsin kəsilməməsi üçün)
            if (el.tagName.toLowerCase() === "a") {
                const href = el.getAttribute("href") || "";
                const isHash = href === "" || href === "#" || href.startsWith("#");
                const isNewTab = el.target === "_blank";
                if (!isHash && !isNewTab) {
                    e.preventDefault();
                    setTimeout(() => { window.location.href = href; }, 200);
                }
            }
        });
    });

    // ---- Return səsi (geri qayıdanda və ya səhifə görünəndə) ----
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            returnAudio.currentTime = 0;
            returnAudio.play().catch(() => { });
        }
    });
});
