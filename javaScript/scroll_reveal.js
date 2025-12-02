// Inicializa o ScrollReveal
const sr = ScrollReveal({
    // Configuração padrão que será usada em todas as chamadas .reveal()
    reset: true,  
});
sr.reveal('.scroll-down', {
    duration: 800,
    delay: 1500
})
sr.reveal('.rocket', {
    origin: 'bottom',
    distance: '20px',
    duration: 1500,
    delay: 1500
});

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
sr.reveal('.project-card', {
    origin: 'bottom',
    interval: 150, // Atraso entre o aparecimento de cada projeto
    duration: 800,
    delay: 100
});

// --- Animação dos Títulos de Seção (Geral) ---
sr.reveal('.section-title', { 
    origin: 'top', 
    distance: '20px', 
    duration: 800 
});
sr.reveal('.hero-content h1',{
    origin:'bottom',
    distance:'8px',
    duration:2000
})
sr.reveal('.hero-content h2',{
    origin:'left',
    distance:'28px',
    duration:2200
})
sr.reveal('.cta-button',{
    
    duration:1400
})