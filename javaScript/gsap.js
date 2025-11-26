gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/**
 * Função para dividir o texto de um elemento em spans para cada letra.
 */
function splitTextIntoSpans(selector) {
    const element = document.querySelector(selector);
    if (!element) return;
    const text = element.textContent;
    let newHTML = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i] === ' ' ? '&nbsp;' : text[i];
        newHTML += `<span>${char}</span>`;
    }
    element.innerHTML = newHTML;
    return element.querySelectorAll('span');
}

const heroLetters = splitTextIntoSpans('.hero-content h2');
if (heroLetters) {
    gsap.from(heroLetters, {
        scrollTrigger: {
            trigger: ".hero-content h2",
            start: "top 85%",
            toggleActions: "play none none none",
        },
        delay: 0.6,
        opacity: 0,
        stagger: 0.04,
        ease: "back.out(9)",
    });
}


//=======ANIMAÇÕES DO FOGUETE=========//

//referencias de elementos html
const rocket = document.querySelector('.rocket');
const rocket2 = document.querySelector('.rocket2');
const heroTitle = document.querySelector('.hero-content h1');
const skills = document.querySelector('.skills-container');
const footer = document.getElementById('footer');

//(timeline)
let rocketTimeline;
let rocketTimelineSkills;


//Define os caminhos de movimento do foguete em varias seções
function createRocketPathHero() {
    const W = heroTitle.offsetWidth;
    const L = heroTitle.offsetLeft;

    const FINAL_X = (W / 2);
    const FINAL_Y = 300;

    return [
        { x: W, y: 20 },
        { x: W - 10, y: -35 },
        { x: L, y: -5 },
        { x: FINAL_X, y: FINAL_Y },
    ];
}
function createRocketPathSkills() {
    const W = skills.offsetWidth + 100;
    const L = skills.offsetLeft - 100;

    return [
        { x: L, y: 0 },
        { x: W , y: 1 },
    ];

}
function createRocketAnimation() {
    window.onload = function() {
        if (rocket && rocket2) {
            rocket.style.display = 'block';
            rocket2.style.display = 'block' // Mostra o foguete após o carregamento da página
        }
    }

    if (!rocket || !heroTitle) return;

    const ANIMATION_DURATION = 3.5;

    rocketTimeline = gsap.timeline({
        defaults: {
            duration: ANIMATION_DURATION,
            ease: "linear",
        },
        scrollTrigger: {
            trigger: heroTitle,
            start: "top 80%",
            end: "bottom 80%",
            invalidateOnRefresh: true,
            toggleActions: "play none none none",
        }
    });

    rocketTimeline.set(rocket, { scale: 0.1, rotation: 0 }, 0);

    rocketTimeline.to(rocket, {
        motionPath: {
            path: createRocketPathHero(), //calcula o caminho
            align: heroTitle,
            alignOrigin: [0.5, 0.5],
            autoRotate: 45,
            ease: "power1.out"
        },
        scale: 1.3,
    }, 0);

    rocketTimeline.to(rocket, {
        y: "+=5",
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.easeInOut"
        // O parâmetro "+=0" garante que esta animação comece imediatamente APÓS o tween anterior terminar.
    }, "+=0");
}


function rocketFlyingSkills() {

    const ANIMATION_DURATION = 10;

    //trigger
    rocketTimelineSkills = gsap.timeline({
        defaults: {
            duration: ANIMATION_DURATION ,
            ease: "power4.InOut",
        },
        scrollTrigger: {
            trigger: skills,
            start:"top 50%",
            toggleActions: "play none none none",
        }
    });

    rocketTimeline.set(rocket2, { scale: 0.1, rotation: 0 }, 0);

    rocketTimelineSkills.from(rocket2, { 
        motionPath: {
            path: createRocketPathSkills(), 
            align: skills,
            alignOrigin: [0.5, 0.5],
            autoRotate: 230,
            ease: "power1.easeInOut"
        },
        scale: 0.2, 
        rotation: 230,
    }, 0);
}

createRocketAnimation();
rocketFlyingSkills();