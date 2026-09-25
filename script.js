document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================= */

    const passwordScreen = document.getElementById("passwordScreen");
    const doorScreen = document.getElementById("doorScreen");
    const birthdayScreen = document.getElementById("birthdayScreen");
    const mainContent = document.getElementById("mainContent");

    const passwordInput = document.getElementById("passwordInput");
    const unlockBtn = document.getElementById("unlockBtn");
    const passwordMessage = document.getElementById("passwordMessage");

    const doors = document.querySelector(".doors");
    const openDoorBtn = document.getElementById("openDoorBtn");

    const enterMemoriesBtn = document.getElementById("enterMemoriesBtn");

    const backgroundMusic =
        document.getElementById("backgroundMusic");

    const envelopeBtn =
        document.getElementById("envelopeBtn");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const closeLightbox =
        document.getElementById("closeLightbox");

    const particlesContainer = document.body;

    const SECRET_PASSWORD = "072525";


    /* =========================
       INITIAL STATE
    ========================= */

    if (doorScreen) {
        doorScreen.classList.add("hidden");
    }

    if (birthdayScreen) {
        birthdayScreen.classList.add("hidden");
    }

    if (mainContent) {
        mainContent.classList.add("hidden");
    }

    if (lightbox) {
        lightbox.classList.add("hidden");
    }


    /* =========================
       PARTICLES
    ========================= */

    function createParticles() {

        for (let i = 0; i < 45; i++) {

            const particle =
                document.createElement("div");

            particle.className = "particle";

            particle.style.left =
                Math.random() * 100 + "vw";

            particle.style.animationDuration =
                (5 + Math.random() * 8) + "s";

            particle.style.animationDelay =
                Math.random() * 5 + "s";

            particle.style.opacity =
                Math.random();

            particlesContainer.appendChild(
                particle
            );
        }
    }

    createParticles();


    /* =========================
       PASSWORD
    ========================= */

    function unlockWebsite() {

        if (!passwordInput) return;

        const enteredPassword =
            passwordInput.value.trim();

        if (enteredPassword === SECRET_PASSWORD) {

            if (passwordMessage) {
                passwordMessage.textContent =
                    "Correct! ❤️";

                passwordMessage.style.color =
                    "#4dff88";
            }

            if (backgroundMusic) {

                backgroundMusic.volume = 0.45;

                backgroundMusic
                    .play()
                    .catch(() => {});
            }

            passwordScreen.classList.add(
                "is-leaving"
            );

            setTimeout(() => {

                passwordScreen.classList.add(
                    "hidden"
                );

                doorScreen.classList.remove(
                    "hidden"
                );

            }, 1000);

        } else {

            if (passwordMessage) {
                passwordMessage.textContent =
                    "Wrong password 😭 Try again.";

                passwordMessage.style.color =
                    "#ff4d4d";
            }

            passwordInput.value = "";

            passwordInput.focus();
        }
    }


    if (unlockBtn) {

        unlockBtn.addEventListener(
            "click",
            unlockWebsite
        );
    }


    if (passwordInput) {

        passwordInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {
                    unlockWebsite();
                }

            }
        );
    }


    /* =========================
       OPEN DOOR
    ========================= */

    if (openDoorBtn) {

        openDoorBtn.addEventListener(
            "click",
            () => {

                if (!doors) return;

                doors.classList.add("open");

                openDoorBtn.style.opacity = "0";

                openDoorBtn.style.pointerEvents =
                    "none";

                const doorContent =
                    document.querySelector(
                        ".door-content"
                    );

                if (doorContent) {

                    doorContent.style.opacity =
                        "0";

                    doorContent.style.transition =
                        "opacity .5s ease";
                }

                setTimeout(() => {

                    doorScreen.classList.add(
                        "is-leaving"
                    );

                    setTimeout(() => {

                        doorScreen.classList.add(
                            "hidden"
                        );

                        birthdayScreen.classList.remove(
                            "hidden"
                        );

                    }, 800);

                }, 2200);
            }
        );
    }


    /* =========================
       BIRTHDAY → MEMORIES
    ========================= */

    if (enterMemoriesBtn) {

        enterMemoriesBtn.addEventListener(
            "click",
            () => {

                birthdayScreen.classList.add(
                    "is-leaving"
                );

                setTimeout(() => {

                    birthdayScreen.classList.add(
                        "hidden"
                    );

                    mainContent.classList.remove(
                        "hidden"
                    );

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 1000);
            }
        );
    }


    /* =========================
       ENVELOPE
    ========================= */

    if (envelopeBtn) {

        envelopeBtn.addEventListener(
            "click",
            () => {

                const isOpening =
                    !envelopeBtn.classList.contains(
                        "open"
                    );

                envelopeBtn.classList.toggle(
                    "open"
                );

                const letterContent =
                    document.querySelector(
                        ".letter-content"
                    );

                if (letterContent) {

                    letterContent.classList.toggle(
                        "hidden",
                        !isOpening
                    );
                }
            }
        );


        /* Keyboard support */

        envelopeBtn.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    envelopeBtn.click();
                }
            }
        );
    }


    /* =========================
       MEMORY LIGHTBOX
    ========================= */

    const memoryImages =
        document.querySelectorAll(
            ".memory-card img"
        );

    memoryImages.forEach((image) => {

        image.addEventListener(
            "click",
            () => {

                if (
                    !lightbox ||
                    !lightboxImage
                ) {
                    return;
                }

                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt || "Memory";

                lightbox.classList.remove(
                    "hidden"
                );
            }
        );

    });


    /* =========================
       CLOSE LIGHTBOX
    ========================= */

    function closeImageViewer() {

        if (!lightbox) return;

        lightbox.classList.add(
            "hidden"
        );

        if (lightboxImage) {

            lightboxImage.src = "";
        }
    }


    if (closeLightbox) {

        closeLightbox.addEventListener(
            "click",
            closeImageViewer
        );
    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target === lightbox
                ) {

                    closeImageViewer();
                }

            }
        );
    }


    /* =========================
       ESCAPE KEY
    ========================= */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeImageViewer();
            }

        }
    );

});