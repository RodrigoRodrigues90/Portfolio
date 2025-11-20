// Inicializa o ScrollReveal
const sr = ScrollReveal({
    // Configuração padrão que será usada em todas as chamadas .reveal()
    reset: true, 
    duration: 2000, 
});
sr.reveal('.scroll-down', {
    origin: 'top',
    distance: '500px',
    duration: 800,
    delay: 1500
})

// --- Animação da Seção de Serviços e Skills (Cards) ---
sr.reveal('.service-card', { 
    origin: 'bottom',
    interval: 150, // Atraso entre o aparecimento de cada card
    duration: 800,
    delay: 100
});

// --- Animação da Seção Sobre Mim ---
sr.reveal('.about-text p', { 
    origin: 'left', 
    distance: '20px',
    duration: 1000,
    delay:200 
});
sr.reveal('.about-image-container', { 
    origin: 'right', 
    duration: 1000, 
    delay: 200 
});


// --- Animação da Seção de Projetos ---
// Animação para os cards de projeto: Slide-up e fade-in com atraso sequencial
sr.reveal('.project-card', {
    origin: 'bottom',
    interval: 150, // Atraso entre o aparecimento de cada projeto
    duration: 800,
    delay: 100
});

// --- Animação dos Títulos de Seção (Geral) ---
// Faz com que os títulos apareçam com um pequeno fade-up
sr.reveal('.section-title', { 
    origin: 'top', 
    distance: '20px', 
    duration: 800 
});