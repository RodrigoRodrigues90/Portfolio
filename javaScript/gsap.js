document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    // --- Seletores de Elementos ---
    let vermais = document.querySelector('.scroll-down');
    let nextSection = document.querySelector('.next-section h2'); // Seção completa
    let rocket = document.querySelector('.rocket');

    // --- Variáveis de Escopo e matchMedia ---
    let mm = gsap.matchMedia();
    let smoother; // Variável para a instância do ScrollSmoother

    // --- Funções de Handler (Reutilizáveis em Mobile e Desktop) ---
    
    // Handler para o botão "rocket" (scroll para o topo)
    const rocketHandler = () => {
        if (smoother) {
            // Se o ScrollSmoother estiver ativo (Desktop)
            smoother.scrollTo(0, true, "top top", 1.5);
        } else {
            // Fallback para scroll nativo (Mobile)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Handler para o botão "ver mais"
    const vermaisHandler = () => {
        if (smoother) {
            // Se o ScrollSmoother estiver ativo (Desktop)
            smoother.scrollTo(nextSection, true, "top top", 1.5);
        } else {
            // Fallback para scroll nativo (Mobile)
            // Usa scrollIntoView para a seção completa
            nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // --- 1. Breakpoint para DESKTOP (>= 800px) ---
    mm.add("(min-width: 800px)", () => {
        
        // Cria a instância do ScrollSmoother
        smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 2.5,
            effects: true,
            // smoothTouch é intencionalmente omitido aqui, 
            // pois queremos controle fino no desktop e scroll nativo no mobile.
        });

        // Adiciona listeners usando os handlers
        rocket.addEventListener('click', rocketHandler);
        vermais.addEventListener('click', vermaisHandler);

        // Função de cleanup: o que acontece quando a tela for redimensionada para mobile
        return () => {
            // Destrói a instância do ScrollSmoother
            if (smoother) {
                smoother.kill();
                smoother = null;
            }
            // Remove listeners para evitar duplicidade ou conflitos
            rocket.removeEventListener('click', rocketHandler);
            vermais.removeEventListener('click', vermaisHandler);
        };
    });

    // --- 2. Breakpoint para MOBILE (< 800px) ---
    mm.add("(max-width: 799px)", () => {

        // O ScrollSmoother NÃO é inicializado aqui.

        // Adiciona listeners para usar o scroll nativo (via fallback nos handlers)
        rocket.addEventListener('click', rocketHandler);
        vermais.addEventListener('click', vermaisHandler);
        
        // Função de cleanup: o que acontece quando a tela for redimensionada para desktop
        return () => {
            // Remove listeners
            rocket.removeEventListener('click', rocketHandler);
            vermais.removeEventListener('click', vermaisHandler);
        };
    });
});