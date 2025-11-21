// Garante que o ScrollTrigger está registrado
gsap.registerPlugin(ScrollTrigger);

/**
 * Função para dividir o texto de um elemento em spans para cada letra.
 */
function splitTextIntoSpans(selector) {
    const element = document.querySelector(selector);
    if (!element) return;

    const text = element.textContent;
    let newHTML = '';

    // Cria um <span> para cada caractere (incluindo espaços)
    for (let i = 0; i < text.length; i++) {
        // Verifica se é um espaço para evitar quebra de linha indesejada em spans vazios
        const char = text[i] === ' ' ? '&nbsp;' : text[i];
        newHTML += `<span>${char}</span>`;
    }

    // Substitui o conteúdo original pelo novo HTML com spans
    element.innerHTML = newHTML;
    
    // Retorna todos os novos spans
    return element.querySelectorAll('span');
}

// --- ANIMAÇÃO DE ENTRADA ESTILHAÇADA (SEÇÃO ABOUT ME) ---
const heroLetters = splitTextIntoSpans('.hero-content h2');

if (heroLetters) {
    gsap.from(heroLetters, {
        scrollTrigger: {
            trigger: ".hero-content h2",
            start: "top 85%", 
            toggleActions: "play none none none",
        },
        delay:0.6,
        opacity: 0, // Começa um pouco menor (zoom-in)
        stagger: 0.04, // Atraso pequeno para a chuva de letras
        ease: "back.out(9)", // Efeito de salto acentuado no final
        
    });
}