(() => {
    'use strict';

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

    // Navbar
    const navbar = $('#navbar');
    const menuToggle = $('#menuToggle');
    const navMenu = $('#navMenu');

    const updateNavbar = () => navbar?.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    menuToggle?.addEventListener('click', () => {
        const open = navMenu?.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(!!open));
    });

    $$('.nav-menu a').forEach(link => link.addEventListener('click', () => {
        navMenu?.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
    }));

    // Hero slider
    const heroSlides = $$('.hero-slide');
    const heroDots = $('.hero-dots');
    let heroIndex = 0;
    let heroTimer;

    if (heroSlides.length) {
        heroSlides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `hero-dot${i === 0 ? ' active' : ''}`;
            dot.type = 'button';
            dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
            dot.addEventListener('click', () => showHero(i, true));
            heroDots?.appendChild(dot);
        });

        const showHero = (index, resetTimer = false) => {
            heroIndex = (index + heroSlides.length) % heroSlides.length;
            heroSlides.forEach((slide, i) => slide.classList.toggle('active', i === heroIndex));
            $$('.hero-dot').forEach((dot, i) => dot.classList.toggle('active', i === heroIndex));
            if (resetTimer) restartHero();
        };

        const restartHero = () => {
            clearInterval(heroTimer);
            heroTimer = setInterval(() => showHero(heroIndex + 1), 6000);
        };

        $('.hero-prev')?.addEventListener('click', () => showHero(heroIndex - 1, true));
        $('.hero-next')?.addEventListener('click', () => showHero(heroIndex + 1, true));
        restartHero();
    }

    // Automatic photo carousels. Each carousel advances independently.
    $$('.photo-carousel[data-carousel]').forEach((carousel) => {
        const track = $('.carousel-track', carousel);
        const slides = $$('img', track);
        const prev = $('.carousel-btn.prev', carousel);
        const next = $('.carousel-btn.next', carousel);
        const progress = $('.carousel-progress span', carousel);
        if (!track || slides.length < 2) return;

        let index = 0;
        let timer;
        let paused = false;

        const render = (animate = true) => {
            track.style.transition = animate ? 'transform .75s cubic-bezier(.2,.7,.2,1)' : 'none';
            track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
            if (progress) progress.style.width = `${((index + 1) / slides.length) * 100}%`;
        };

        const go = (direction) => {
            index = (index + direction + slides.length) % slides.length;
            render(true);
        };

        const start = () => {
            clearInterval(timer);
            timer = setInterval(() => { if (!paused) go(1); }, 5000);
        };

        prev?.addEventListener('click', () => { go(-1); start(); });
        next?.addEventListener('click', () => { go(1); start(); });

        carousel.addEventListener('mouseenter', () => { paused = true; });
        carousel.addEventListener('mouseleave', () => { paused = false; });
        carousel.addEventListener('focusin', () => { paused = true; });
        carousel.addEventListener('focusout', () => { paused = false; });

        let touchStart = 0;
        carousel.addEventListener('touchstart', e => { touchStart = e.changedTouches[0].clientX; }, { passive: true });
        carousel.addEventListener('touchend', e => {
            const delta = e.changedTouches[0].clientX - touchStart;
            if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1);
        }, { passive: true });

        render(false);
        start();
    });

    // Lightweight gallery lightbox: only uses the existing event images.
    const gallery = $('.gallery-carousel');
    if (gallery) {
        const lightbox = document.createElement('div');
        lightbox.className = 'image-lightbox';
        lightbox.innerHTML = '<button type="button" aria-label="Cerrar">×</button><img alt="Vista ampliada">';
        document.body.appendChild(lightbox);
        const boxImage = $('img', lightbox);
        const close = () => lightbox.classList.remove('open');
        $('button', lightbox)?.addEventListener('click', close);
        gallery.addEventListener('dblclick', e => {
            if (e.target.tagName !== 'IMG') return;
            boxImage.src = e.target.src;
            boxImage.alt = e.target.alt;
            lightbox.classList.add('open');
        });
        lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    }

    // Contact form: no fake server submission. Keeps the interaction honest.
    $('#contactForm')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const button = $('.submit-btn', event.currentTarget);
        if (!button) return;
        const original = button.innerHTML;
        button.innerHTML = 'Mensaje preparado ✓';
        button.disabled = true;
        setTimeout(() => {
            event.currentTarget.reset();
            button.innerHTML = original;
            button.disabled = false;
        }, 1800);
    });
})();
