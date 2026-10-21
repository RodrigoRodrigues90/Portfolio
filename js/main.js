// Ano do rodapé sempre atualizado
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Fallback leve (sem GSAP ou com movimento reduzido) ---------- */
function simpleReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || !items.length || reduceMotion) return;
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach((el) => io.observe(el));
}

/* ---------- GSAP ---------- */
function splitWords(el) {
    // Separa o texto em palavras mascaradas, preservando <span class="accent">
    const walk = (node) => {
        [...node.childNodes].forEach((child) => {
            if (child.nodeType === 3) {
                const frag = document.createDocumentFragment();
                child.textContent.split(/(\s+)/).forEach((part) => {
                    if (!part) return;
                    if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
                    const w = document.createElement('span'); w.className = 'w';
                    const wi = document.createElement('span'); wi.className = 'wi';
                    wi.textContent = part; w.appendChild(wi); frag.appendChild(w);
                });
                child.replaceWith(frag);
            } else if (child.nodeType === 1) walk(child);
        });
    };
    walk(el);
    return el.querySelectorAll('.wi');
}

function initGsap() {
    const { gsap } = window;
    gsap.registerPlugin(ScrollTrigger);
    document.documentElement.classList.add('has-gsap');

    // Barra de progresso de leitura
    gsap.to('.progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: 0.2 }
    });

    // Entrada do hero
    const words = splitWords(document.querySelector('.hero h1'));
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.eyebrow', { y: 16, opacity: 0, duration: 0.6 })
      .from(words, { yPercent: 110, duration: 0.9, stagger: 0.06 }, '-=0.3')
      .from('.hero .lead', { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
      .from('.hero .btn', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      .from('.hero-photo img', { clipPath: 'inset(0 0 100% 0)', scale: 1.15, duration: 1.2, ease: 'power4.out' }, 0.2);

    // Moldura da foto "anda" levemente ao rolar (parallax)
    gsap.to('.hero-photo', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Cabeçalhos de seção
    gsap.utils.toArray('.section-head').forEach((head) => {
        const parts = head.children;
        gsap.from(parts, {
            y: 28, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: head, start: 'top 85%', once: true }
        });
    });

    // Cards de projeto: entrada em lote + parallax do print dentro do card
    gsap.set('.project', { y: 50, opacity: 0 });
    ScrollTrigger.batch('.project', {
        start: 'top 88%', once: true,
        onEnter: (batch) => gsap.to(batch, {
            y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power3.out', overwrite: true
        })
    });
    gsap.utils.toArray('.project-media img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -6 }, {
            yPercent: 6, ease: 'none',
            scrollTrigger: { trigger: img.closest('.project'), start: 'top bottom', end: 'bottom top', scrub: true }
        });
    });

    // Sobre: texto e caixa de tecnologias
    gsap.from('.about-text p', {
        y: 24, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true }
    });
    gsap.from('.skills', {
        x: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-grid', start: 'top 80%', once: true }
    });
    gsap.from('.skill-list li', {
        scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: '.skill-list', start: 'top 90%', once: true }
    });

    // Contato
    gsap.from('.contact-card', {
        y: 50, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-card', start: 'top 85%', once: true }
    });

    // Interações só para mouse (não em touch)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (fine.matches) {
        // Botões magnéticos
        document.querySelectorAll('.btn, .nav-cta').forEach((btn) => {
            const xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
            const yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
            btn.addEventListener('mousemove', (e) => {
                const r = btn.getBoundingClientRect();
                xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
                yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
            });
            btn.addEventListener('mouseleave', () => { xTo(0); yTo(0); });
        });

        // Foto com leve inclinação seguindo o mouse
        const photo = document.querySelector('.hero-photo img');
        const rx = gsap.quickTo(photo, 'rotationY', { duration: 0.6, ease: 'power3' });
        const ry = gsap.quickTo(photo, 'rotationX', { duration: 0.6, ease: 'power3' });
        gsap.set(photo, { transformPerspective: 800 });
        document.querySelector('.hero').addEventListener('mousemove', (e) => {
            rx(((e.clientX / innerWidth) - 0.5) * 10);
            ry(((e.clientY / innerHeight) - 0.5) * -8);
        });
        document.querySelector('.hero').addEventListener('mouseleave', () => { rx(0); ry(0); });
    }
}

/* ---------- Início ---------- */
window.addEventListener('DOMContentLoaded', () => {
    if (window.gsap && window.ScrollTrigger && !reduceMotion) initGsap();
    else simpleReveal();
});

/* ---------- Vídeos dos projetos: tocam só quando o card está visível ---------- */
(() => {
    const videos = document.querySelectorAll('.project-media video');
    if (!videos.length || reduceMotion || !('IntersectionObserver' in window)) return; // sem movimento: fica só o poster
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            const v = e.target;
            if (e.isIntersecting) { const p = v.play(); if (p && p.catch) p.catch(() => {}); }
            else v.pause();
        });
    }, { threshold: 0.35 });
    videos.forEach((v) => io.observe(v));
})();
