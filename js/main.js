// Ano do rodapé sempre atualizado
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Entrada suave dos blocos ao rolar (sem bibliotecas).
// Se IntersectionObserver não existir, tudo fica visível.
(() => {
    const items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || !items.length) return;

    document.documentElement.classList.add('js');

    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target); // anima uma vez só
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach((el) => io.observe(el));
})();
