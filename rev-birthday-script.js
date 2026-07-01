// Memory Game Logic
const cards = ['🌸', '🌸', '💙', '💙', '🎀', '🎀', '✨', '✨', '🌸', '🌸', '💙', '💙', '🎀', '🎀', '✨', '✨'];
let shuffledCards = [];
let firstCard = null;
let secondCard = null;
let isChecking = false;
let matchedPairs = 0;
let moveCount = 0;

// Shuffle array using Fisher-Yates
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize Game
function initializeGame() {
    shuffledCards = shuffleArray(cards);
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    
    shuffledCards.forEach((card, index) => {
        const cardElement = document.createElement('button');
        cardElement.className = 'card';
        cardElement.dataset.index = index;
        cardElement.dataset.value = card;
        cardElement.textContent = '?';
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard(e) {
    const card = e.target;
    
    if (isChecking || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    card.textContent = card.dataset.value;
    
    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        moveCount++;
        document.getElementById('moveCount').textContent = moveCount;
        isChecking = true;
        
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.value === secondCard.dataset.value) {
        // Match found
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedPairs++;
        document.getElementById('matchCount').textContent = matchedPairs;
        
        resetCards();
        
        if (matchedPairs === 8) {
            setTimeout(showVictory, 500);
        }
    } else {
        // No match
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '?';
            secondCard.textContent = '?';
            resetCards();
        }, 1000);
    }
}

function resetCards() {
    firstCard = null;
    secondCard = null;
    isChecking = false;
}

function resetGame() {
    matchedPairs = 0;
    moveCount = 0;
    document.getElementById('moveCount').textContent = '0';
    document.getElementById('matchCount').textContent = '0/8';
    document.getElementById('victorySection').classList.add('hidden');
    initializeGame();
}

function showVictory() {
    // Victory message will only show after clicking YES
}

// Friendship Question Logic
function answerYes() {
    const victorySection = document.getElementById('victorySection');
    victorySection.classList.remove('hidden');
    
    // Trigger celebration
    celebrationEffect();
}

function moveNoButton() {
    const noBtn = document.getElementById('noBtn');
    const randomX = Math.random() * 300 - 150;
    const randomY = Math.random() * 300 - 150;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

function celebrationEffect() {
    // Create burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createHeartBurst();
        }, i * 100);
    }
}

function createHeartBurst() {
    const heart = document.createElement('div');
    heart.textContent = '💙';
    heart.style.position = 'fixed';
    heart.style.fontSize = '30px';
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.top = Math.random() * window.innerHeight + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '999';
    document.body.appendChild(heart);
    
    const duration = 2000;
    const startTime = Date.now();
    
    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            heart.style.opacity = 1 - progress;
            heart.style.transform = `translateY(${-progress * 200}px) scale(${1 + progress * 0.5})`;
            requestAnimationFrame(animate);
        } else {
            heart.remove();
        }
    }
    
    animate();
}

// Initialize game when page loads
window.addEventListener('DOMContentLoaded', initializeGame);
