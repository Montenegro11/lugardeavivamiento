/* =========================================
   NAVBAR
========================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* =========================================
   MENÚ MÓVIL
========================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


/* =========================================
   HERO SLIDER
========================================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const heroDotsContainer = document.querySelector(".hero-dots");

const heroNext = document.querySelector(".hero-next");
const heroPrev = document.querySelector(".hero-prev");

let heroIndex = 0;


/* CREAR DOTS */

heroSlides.forEach((_, index) => {

    const dot = document.createElement("span");

    dot.classList.add("hero-dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        heroIndex = index;
        updateHero();
    });

    heroDotsContainer.appendChild(dot);

});


const heroDots = document.querySelectorAll(".hero-dot");


function updateHero() {

    heroSlides.forEach((slide, index) => {

        slide.classList.toggle(
            "active",
            index === heroIndex
        );

    });

    heroDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === heroIndex
        );

    });

}


heroNext.addEventListener("click", () => {

    heroIndex++;

    if (heroIndex >= heroSlides.length) {
        heroIndex = 0;
    }

    updateHero();

});


heroPrev.addEventListener("click", () => {

    heroIndex--;

    if (heroIndex < 0) {
        heroIndex = heroSlides.length - 1;
    }

    updateHero();

});


/* CAMBIO AUTOMÁTICO */

setInterval(() => {

    heroIndex++;

    if (heroIndex >= heroSlides.length) {
        heroIndex = 0;
    }

    updateHero();

}, 6500);


/* =========================================
   CARRUSELES
========================================= */

document.querySelectorAll(".photo-carousel").forEach(carousel => {

    const track = carousel.querySelector(".carousel-track");
    const images = track.querySelectorAll("img");

    const next = carousel.querySelector(".next");
    const prev = carousel.querySelector(".prev");

    let index = 0;


    function updateCarousel() {

        track.style.transform =
            `translateX(-${index * 100}%)`;

    }


    next.addEventListener("click", () => {

        index++;

        if (index >= images.length) {
            index = 0;
        }

        updateCarousel();

    });


    prev.addEventListener("click", () => {

        index--;

        if (index < 0) {
            index = images.length - 1;
        }

        updateCarousel();

    });


    /* AUTOMÁTICO */

    setInterval(() => {

        index++;

        if (index >= images.length) {
            index = 0;
        }

        updateCarousel();

    }, 6000);

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    ".schedule-card, .event-card, .testimonial-card, .gallery-image, .photo-card, .video-card, .contact-wrapper, .location-card"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    observer.observe(element);

});


/* =========================================
   FORMULARIO
========================================= */

const form = document.querySelector(".contact-form");

form.addEventListener("submit", event => {

    event.preventDefault();

    const button = form.querySelector("button");

    const originalText = button.innerHTML;

    button.innerHTML = "✓ Mensaje preparado";

    button.style.background = "#0b9d62";

    setTimeout(() => {

        button.innerHTML = originalText;

        button.style.background = "";

        form.reset();

    }, 2500);

});


/* =========================================
   GALERÍA - EFECTO LIGHTBOX
========================================= */

const galleryImages =
    document.querySelectorAll(".gallery-image img");


galleryImages.forEach(image => {

    image.parentElement.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "rgba(0,0,0,0.92)";
        overlay.style.zIndex = "5000";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.padding = "30px";
        overlay.style.cursor = "zoom-out";

        const largeImage =
            document.createElement("img");

        largeImage.src = image.src;

        largeImage.style.maxWidth = "95%";
        largeImage.style.maxHeight = "90vh";
        largeImage.style.objectFit = "contain";
        largeImage.style.borderRadius = "15px";
        largeImage.style.boxShadow =
            "0 30px 80px rgba(0,0,0,0.5)";

        overlay.appendChild(largeImage);

        document.body.appendChild(overlay);


        overlay.addEventListener("click", () => {

            overlay.remove();

        });

    });

});


/* =========================================
   ESC PARA CERRAR GALERÍA
========================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        const overlay =
            document.querySelector(
                'div[style*="z-index: 5000"]'
            );

        if (overlay) {
            overlay.remove();
        }

    }

});