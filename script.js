// Quiz Questions
const questions = [
    {
        question: "What's the best thing about having a friend like you?",
        answers: [
            { text: "They actually listen to me", points: 10 },
            { text: "They make me laugh even on bad days", points: 10 },
            { text: "They're always there when it matters", points: 10 },
            { text: "All of the above!", points: 20 }
        ]
    },
    {
        question: "When I messed up, what should I have done?",
        answers: [
            { text: "Owned up to it immediately", points: 15 },
            { text: "Actually listened to your side", points: 15 },
            { text: "Apologized without excuses", points: 15 },
            { text: "All of these honestly", points: 25 }
        ]
    },
    {
        question: "How would you describe our friendship?",
        answers: [
            { text: "Pretty solid, one mistake won't break it", points: 20 },
            { text: "Strong enough to weather a few storms", points: 20 },
            { text: "Worth fighting for", points: 20 },
            { text: "All of the above (you're getting good at this!)", points: 30 }
        ]
    },
    {
        question: "What do you want me to do differently?",
        answers: [
            { text: "Be more thoughtful with your words", points: 15 },
            { text: "Actually consider my feelings", points: 15 },
            { text: "Communicate better when things go wrong", points: 15 },
            { text: "Everything mentioned here", points: 25 }
        ]
    },
    {
        question: "Deep down, are we actually okay?",
        answers: [
            { text: "Yeah, I just needed you to recognize it", points: 25 },
            { text: "We will be if you mean it", points: 25 },
            { text: "I hope so, that's why I'm playing this", points: 20 },
            { text: "Let me finish this game first", points: 20 }
        ]
    }
];

let currentQuestion = 0;
let score = 0;

// Start Game
function startGame() {
    currentQuestion = 0;
    score = 0;
    hideScreen('introScreen');
    showScreen('quizScreen');
    displayQuestion();
}

// Display Question
function displayQuestion() {
    const question = questions[currentQuestion];
    const questionText = document.getElementById('questionText');
    const answersContainer = document.getElementById('answersContainer');
    const questionNum = document.getElementById('questionNum');
    const progressFill = document.getElementById('progressFill');

    questionText.textContent = question.question;
    questionNum.textContent = currentQuestion + 1;
    answersContainer.innerHTML = '';

    // Update progress bar
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';

    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer.text;
        button.onclick = () => selectAnswer(answer, button);
        answersContainer.appendChild(button);
    });
}

// Select Answer
function selectAnswer(answer, button) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.disabled = true);

    button.classList.add('selected');
    score += answer.points;
    document.getElementById('currentScore').textContent = score;

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            displayQuestion();
        } else {
            showResults();
        }
    }, 800);
}

// Show Results
function showResults() {
    hideScreen('quizScreen');
    showScreen('resultsScreen');

    const resultEmoji = document.getElementById('resultEmoji');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    const customMessageBox = document.getElementById('customMessageBox');

    let result = {};

    if (score >= 120) {
        result = {
            emoji: '🌟',
            title: 'You\'re Amazing!',
            message: `You got ${score} points! Wow, you really understand me. I promise to do better and never take you for granted.`
        };
    } else if (score >= 100) {
        result = {
            emoji: '😊',
            title: 'Pretty Good!',
            message: `You got ${score} points! You know me well. I appreciate your patience and I genuinely want to make things right.`
        };
    } else if (score >= 80) {
        result = {
            emoji: '🤔',
            title: 'Not Bad!',
            message: `You got ${score} points! Looks like we both need to communicate better. Let's work on this together.`
        };
    } else {
        result = {
            emoji: '😅',
            title: 'Okay, I Deserved That!',
            message: `You got ${score} points! Yeah... I really messed up didn't I? But I'm here now and I actually care about fixing this.`
        };
    }

    resultEmoji.textContent = result.emoji;
    resultTitle.textContent = result.title;
    resultMessage.textContent = result.message;
    
    // Add your custom message here
    customMessageBox.innerHTML = '✨ <em>A special message from your friend is waiting below...</em> ✨';
}

// Handle Forgiveness Response
function handleForgiveness(response) {
    hideScreen('resultsScreen');
    showScreen('responseScreen');

    const responseEmoji = document.getElementById('responseEmoji');
    const responseTitle = document.getElementById('responseTitle');
    const responseMessage = document.getElementById('responseMessage');

    let finalMessage = {};

    if (response === 'yes') {
        finalMessage = {
            emoji: '💚',
            title: 'YES! 🎉',
            message: 'Thank you so much! I promise I\'ll do better. You mean the world to me and I\'m grateful you gave me another chance. Let\'s make this right!'
        };
    } else if (response === 'maybe') {
        finalMessage = {
            emoji: '🤝',
            title: 'I\'ll Earn It',
            message: 'I understand. I won\'t rush you. I\'ll show you through my actions that I genuinely care and that this won\'t happen again. You deserve better.'
        };
    } else {
        finalMessage = {
            emoji: '😔',
            title: 'I Know, I Know...',
            message: 'You have every right to be mad. I won\'t make excuses. But please know I\'m truly sorry and I\'m ready to work on being a better friend to you.'
        };
    }

    responseEmoji.textContent = finalMessage.emoji;
    responseTitle.textContent = finalMessage.title;
    responseMessage.textContent = finalMessage.message;
}

// Reset Game
function resetGame() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('currentScore').textContent = '0';
    hideScreen('responseScreen');
    showScreen('introScreen');
}

// Screen Navigation
function hideScreen(screenId) {
    document.getElementById(screenId).classList.remove('active');
}

function showScreen(screenId) {
    document.getElementById(screenId).classList.add('active');
}
