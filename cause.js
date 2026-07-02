 // Reasons database
 const reasons = [
    { 
        text: "You're such a kind and wonderful person, and I feel lucky to share such a good bond with you. 💜", 
        emoji: "🌙",
        gif: "gif1.gif"
    },
    { 
        text: "May your day be filled with love, laughter, and endless joy. 🌸 ", 
        emoji: "💜",
        gif: "gif2.gif"
    },
    { 
        text: "Wishing you success, happiness, and everything your heart desires. ✨ ", 
        emoji: "🦋",
        gif: "gif1.gif"
    },
    { 
        text: "Stay the amazing girl you are—always spreading positivity around. Have the happiest year ahead! 🥳 ", 
        emoji: "⭐",
        gif: "gif2.gif"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card with gif
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Friendship Memory">`;
    
    card.appendChild(text);
    card.appendChild(gifOverlay);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                }
            });

            // Animate and reveal the Teddy Hug ending section
            gsap.to('.teddy-hug', {
                scale: 1,
                duration: 1,
                delay: 0.2,
                ease: "elastic.out(1, 0.75)"
            });
            gsap.to('.ending-text', {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.4,
                ease: "power2.out"
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }
}

// Initialize button click — single listener handles both modes
shuffleButton.addEventListener('click', () => {
    // If in story mode, navigate to last page
    if (shuffleButton.classList.contains('story-mode')) {
        gsap.to('body', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                window.location.href = 'last.html';
            }
        });
        return;
    }

    // Otherwise, show next reason with a bounce
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements — Hinata themed
function createFloatingElement() {
    const elements = ['🌙', '✨', '💜', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    const duration = Math.random() * 10 + 10;
    gsap.timeline({ onComplete: () => element.remove() })
        .to(element, { opacity: 0.8, duration: 1 })
        .to(element, {
            y: -500,
            duration: duration,
            ease: "none"
        }, 0)
        .to(element, { opacity: 0, duration: 1.5 }, duration - 1.5);
}

// Create initial floating elements
setInterval(createFloatingElement, 2000);