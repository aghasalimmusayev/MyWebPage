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
    document.querySelectorAll(".links a, .logo").forEach(a => {
        a.addEventListener("mouseenter", onHover);
        a.addEventListener("focusin", onHover);
    });
    document.querySelectorAll(".links a, .logo").forEach(a => {
        a.addEventListener("click", (e) => {
            const href = a.getAttribute("href") || "";
            const isHashOrEmpty = href === "" || href === "#" || href.startsWith("#");
            const isNewTab = a.target === "_blank";
            hoverAudio.pause();
            hoverAudio.currentTime = 0;
            clickAudio.currentTime = 0;
            clickAudio.play().catch(() => { });
            if (!isHashOrEmpty && !isNewTab) {
                e.preventDefault();
                setTimeout(() => { window.location.href = href; }, 130);
            } else if (isHashOrEmpty) {
                e.preventDefault();
            }
        });
    });
});
