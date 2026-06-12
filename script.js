// Quiz Questions
const questions = [
    {
        question: "What do I find the best about you, according to you?",
        answers: [
            { text: "You listen to my weird things", points: 10 },
            { text: "You can make my day better", points: 10 },
            { text: "Always there to listen to me", points: 10 },
            { text: "Help me be emotionally open without the fear of getting judged", points: 20 }
        ]
    },
    {
        question: "When I mess up, what should I do to make up for it?",
        answers: [
            { text: "Apologize immediately", points: 15 },
            { text: "Listen to what you think about it", points: 15 },
            { text: "Admit my mistake and try to be better next time", points: 15 },
            { text: "Honestly say everything clear", points: 25 }
        ]
    },
    {
        question: "How would you describe our friendship?",
        answers: [
            { text: "Pretty solid one silly joke and mistake won't break it", points: 20 },
            { text: "Two suicidal teens", points: 20 },
            { text: "Enough to handle disagreements", points: 20 },
            { text: "Better than any friendship you can find online (you're getting good at this!)", points: 30 }
        ]
    },
    {
        question: "Do you like the way it is right now? or want me to improve anything",
        answers: [
            { text: "Be more thoughtful with with my replies", points: 15 },
            { text: "Listen to your feelings and text according to your mood", points: 15 },
            { text: "Try to understand you better", points: 15 },
            { text: "Just be my natural self", points: 25 }
        ]
    },
    {
        question: "Deep down are you actually okay?",
        answers: [
            { text: "Yeah,I am doing just fine", points: 15 },
            { text: "Dont ask me (okay..)", points: 5 },
            { text: "I hope so, I just need time alone(understandable no worries)", points: 20 },
            { text: "Want me to annoy you every day to make it better?", points: 25 }
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
            emoji: '😉',
            title: 'You\'re Amazing!',
            message: `You got ${score} points! You nailed it didn't you. Congrats now tell me in dms what do you want as a gift for the highest score`
        };
    } else if (score >= 100) {
        result = {
            emoji: '🙂',
            title: 'Pretty Good!',
            message: `You got ${score} points! Ah, Almost got it. But still it was a great attempt dw`
        };
    } else if (score >= 80) {
        result = {
            emoji: '😶',
            title: 'Not Bad!',
            message: `You got ${score} points! Looks like we both need to text even more, to understand each other`
        };
    } else {
        result = {
            emoji: '🤔',
            title: 'Okay, I Deserved That!',
            message: `You got ${score} points! Yeah.. I really messed up didn't I? But I'm here now and I actually care about fixing it.`
        };
    }

    resultEmoji.textContent = result.emoji;
    resultTitle.textContent = result.title;
    resultMessage.textContent = result.message;
    
    // Add your custom message here
    customMessageBox.innerHTML = '✨ <em>I sometimes get scared that you are starting to get bored of me. If you someday actually do just let me know I'll try something new ig? Also I'm not serious all the time so dont take my joke seriously. I can never be rude to people whom I'm comfortable with. It lowkey feels like I did a crime or something 😭</em> ✨';
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
            emoji: '❤',
            title: 'YES! 🎉',
            message: 'Tysm, I'll try my best to be the best person you've ever met'
        };
    } else if (response === 'maybe') {
        finalMessage = {
            emoji: '🤝',
            title: 'I\'ll work up for it dw',
            message: 'I understand. I wont pressure you with things and let you have your time alone sometimes because everybody needs a personal space at the end of the day. Nothing to be feel bad about'
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
