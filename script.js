const questions = [{
        question: "How does JavaScript handle code with even a single tiny typo mistake?",
        answers: [{
                text: "It ignores the typo and continues execution",
                correct: false
            },
            {
                text: "It displays a warning but executes the code",
                correct: false
            },
            {
                text: "It prompts the user to fix the typo",
                correct: false
            },
            {
                text: "It rejects and does not work if there is even the most minuscule syntax error mistake",
                correct: true
            },

        ]
    },
    {
        question: "How do you comment a single line of code in JavaScript?",
        answers: [{
                text: "/* comment */",
                correct: false
            },
            {
                text: "# comment",
                correct: false
            },
            {
                text: "// comment",
                correct: true
            },
            {
                text: "*** comment ***",
                correct: false
            },
        ]
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        answers: [{
                text: "==",
                correct: false
            },
            {
                text: "===",
                correct: true
            },
            {
                text: "=",
                correct: false
            },
            {
                text: "!==",
                correct: false
            },

        ]
    },
    {
        question: "What does the acronym 'DOM'stand for in JavaScript?",
        answers: [{
                text: "Document Object Model",
                correct: true
            },
            {
                text: "Dynamic Object Manipulation",
                correct: false
            },
            {
                text: "Data Object Model",
                correct: false
            },
            {
                text: "Document Order Model",
                correct: false
            },
        ]
    },
    {
        question: "What is the result of the expression 3 + '3' in JavaScript?",
        answers: [{
                text: "6",
                correct: false
            },
            {
                text: "'33'",
                correct: true
            },
            {
                text: "33",
                correct: false
            },
            {
                text: "Error",
                correct: false
            },
        ]
    },
    {
        question: "What is the purpose of the ‘typeof’ operator in JavaScript?",
        answers: [{
                text: "To check if a variable is defined",
                correct: false
            },
            {
                text: "To determine the type of a value or variable",
                correct: true
            },
            {
                text: "To convert a string to uppercase",
                correct: false
            },
            {
                text: "To create a new variable",
                correct: false
            },

        ]
    },
    {
        question: "What is the purpose of the `addEventListener` method in JavaScript?",
        answers: [{
                text: "To multiply two numbers",
                correct: false
            },
            {
                text: "To add event listeners to HTML elements ",
                correct: true
            },
            {
                text: "To create a loop",
                correct: false
            },
            {
                text: "To change the background color",
                correct: false
            },
        ]
    }, {
        question: "What does the term 'API' stand for in web development?",
        answers: [{
                text: "Application Programming Interface",
                correct: true
            },
            {
                text: "Advanced Programming Integration",
                correct: false
            },
            {
                text: "Automated Program Interaction",
                correct: false
            },
            {
                text: "Application Protocol Interface",
                correct: false
            },
        ]
    }, {
        question: "What is the purpose of the JSON.parse method in JavaScript?",
        answers: [{
                text: "To format text",
                correct: false
            },
            {
                text: "To parse JSON strings into JavaScript objects",
                correct: true
            },
            {
                text: "To create a new array",
                correct: false
            },
            {
                text: "To check if an element is a paragraph",
                correct: false
            },
        ]
    }, {
        question: "In JavaScript fetch, when using the HTTP method GET, where is the data typically included?",
        answers: [{
                text: "In the request body",
                correct: false
            },
            {
                text: "In the request headers",
                correct: false
            },
            {
                text: "In the URL parameters",
                correct: true
            },
            {
                text: "In the response body",
                correct: false
            },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();