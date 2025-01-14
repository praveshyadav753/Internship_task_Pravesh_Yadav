// Quiz data
import {quizzes} from "./quizzes.js"  
// const quizzes = [
//     {
//         title: "General Knowledge Quiz",
//         questions: [
//             {
//                 question: "What is the capital of France?",
//                 options: ["Berlin", "Madrid", "Paris", "Rome"],
//                 correctAnswer: 2, // Index of "Paris"
//             },
//             {
//                 question: "Who wrote 'Hamlet'?",
//                 options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
//                 correctAnswer: 1, // Index of "William Shakespeare"
//             },
//         ],
//     },
//     {
//         title: "Math Quiz",
//         questions: [
//             {
//                 question: "What is 2 + 2?",
//                 options: ["3", "4", "5", "6"],
//                 correctAnswer: 1, // Index of "4"
//             },
//             {
//                 question: "What is the square root of 16?",
//                 options: ["2", "3", "4", "5"],
//                 correctAnswer: 2, // Index of "4"
//             },
//         ],
//     },
// ];

// Elements
const quizTitleEl = document.getElementById("quiz-title");
const quizSelectionEl = document.getElementById("quiz-selection");
const quizContainerEl = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resetBtn = document.getElementById("reset-btn");
const homeButton = document.getElementById("home-btn");
const activate  = document.getElementById("btn-activate");

let currentQuizIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
quizoptions()
// Load a question
function loadQuestion() {
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;

    // Clear previous options
    optionsContainer.innerHTML = "";

    // Create options
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.className = "btn btn-outline-primary d-block w-100 my-2";
        button.textContent = option;
        button.onclick = () => checkAnswer(index);

        optionsContainer.appendChild(button);
    });

    // Clear feedback
    feedbackEl.textContent = "";
}

// Check answer
// Check answer
function checkAnswer(selectedIndex) {
    const currentQuiz = quizzes[currentQuizIndex];
    const currentQuestion = currentQuiz.questions[currentQuestionIndex];

    // Get all the buttons (options)
    const buttons = Array.from(optionsContainer.children);

    // Loop through the options and update button styles
    buttons.forEach((button, index) => {
        if (index === selectedIndex) {
            if (index === currentQuestion.correctAnswer) {
                // Correct answer - green
                button.classList.remove("btn-outline-primary");
                button.classList.add("btn-success");
            } else {
                // Wrong answer - red
                button.classList.remove("btn-outline-primary");
                button.classList.add("btn-danger");
            }
        } else {
            // If not selected, keep the default button style
            button.classList.remove("btn-outline-primary");
            button.classList.add("btn-secondary");
        }

        // Disable all options after answering
        button.disabled = true;
    });

    // Show feedback
    if (selectedIndex === currentQuestion.correctAnswer) {
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
        score++;
    } else {
        feedbackEl.textContent =
            "Wrong! The correct answer is: " +
            currentQuestion.options[currentQuestion.correctAnswer];
        feedbackEl.style.color = "red";
    }
}

// Handle "Next" button
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    const currentQuiz = quizzes[currentQuizIndex];
    if (currentQuestionIndex < currentQuiz.questions.length) {
        loadQuestion();
    } else {
        // Show final score
        questionEl.textContent = `Quiz Completed! Your Score: ${score} / ${currentQuiz.questions.length}`;
        optionsContainer.innerHTML = "";
        feedbackEl.textContent = "";
        nextBtn.classList.add("d-none");
        resetBtn.classList.remove("d-none");
        homeButton.classList.remove("d-none");
        
    }
});

// Handle "Reset" button
resetBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    quizSelectionEl.classList.remove("d-none");
    quizContainerEl.classList.add("d-none");
    quizTitleEl.textContent = "Select a Quiz";
});
// Handle "Home" button
homeButton.addEventListener("click", () => {
    // Reset quiz state
    score = 0;
    currentQuizIndex = 0;
    currentQuestionIndex = 0;

    // Show quiz selection screen
    quizSelectionEl.classList.remove("d-none");
    quizContainerEl.classList.add("d-none");
    

    // Reset the quiz title and feedback
    quizTitleEl.textContent = "Select a Quiz";
    feedbackEl.textContent = "";
    optionsContainer.innerHTML = "";
    
    // Reload quiz options
    quizoptions();
});

// Start a quiz




function quizoptions() {
    
    const containerEl = document.getElementById("quiz-selection"); // Parent container
    let html = '<ul class="list-group">'; // Start of the list

    quizzes.forEach((quiz, index) => {
        html += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${quiz.title}</span>
            <button class="btn btn-primary" data-quiz-index="${index}">Start</button>  </li>
        `;
    });

    html += '</ul>'; // Close the list
    containerEl.innerHTML = html; // Inject the HTML into the container
    containerEl.addEventListener('click', function(event) {
        // Check if the clicked element is a button
        if (event.target && event.target.matches("button")) {
            const quizIndex = event.target.getAttribute("data-quiz-index"); // Get the quiz index from the button's data attribute
            startQuiz(quizIndex); // Call startQuiz with the clicked quiz index
        }
    });
}

function startQuiz(quizIndex) {
    resetBtn.classList.add("d-none");
        homeButton.classList.add("d-none");
        nextBtn.classList.remove("d-none");
    currentQuizIndex = quizIndex;
    currentQuestionIndex = 0;
    score = 0;

    quizSelectionEl.classList.add("d-none");
    quizContainerEl.classList.remove("d-none");
    quizTitleEl.textContent = quizzes[quizIndex].title;

    loadQuestion();
}