// Garante que o ScrollTrigger está registrado
gsap.registerPlugin(ScrollTrigger);

/**
 * Função para dividir o texto de um elemento em spans para cada letra.
 * (Mantenha esta função no seu arquivo)
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

// 1. Divide o parágrafo em spans de letras
const heroLetters = splitTextIntoSpans('.hero-content h2');

if (heroLetters) {
    // 2. Animação de Fade-In e Scale-in (Estilhaçada)
    gsap.from(heroLetters, {
        scrollTrigger: {
            trigger: ".hero-content h2",
            start: "top 85%", 
            toggleActions: "play none none none",
        },
        // O efeito criativo:
        opacity: 0, 
        scale: 0.3, // Começa um pouco menor (zoom-in)
        rotation: 'random(-10, 10)', // Começa levemente rotacionado (estilhaço)
        stagger: 0.04, // Atraso pequeno para a chuva de letras
        ease: "back.out(2)", // Efeito de salto acentuado no final
        
    });
}