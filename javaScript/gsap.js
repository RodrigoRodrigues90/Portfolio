document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother); // Registra os plugins
    // Cria a instância do ScrollSmoother e configurações
    let smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 2.5, // 2.5 é um bom valor de suavidade (smoothness)
        effects: true,
        smoothTouch: 1.5, // Suavidade para dispositivos touch

    });
    // Scroll para a seção de serviços ao clicar no botão "ver mais"
    let vermais = document.querySelector('.scroll-down');
    let servicos = document.querySelector('.next-section h2');
    let rocket = document.querySelector('.rocket');

    rocket.addEventListener('click', () => {
        smoother.scrollTo(0, true, "top top", 0.5);
    })
    vermais.addEventListener('click', () => {
        smoother.scrollTo(servicos, true, "top top", 0.5);
    })
});