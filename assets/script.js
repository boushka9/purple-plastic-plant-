var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var startPage = document.querySelector(".instructions");
var quizEl = document.querySelector("#quiz");
var timerWon = document.querySelector("#uh-oh");
var congrats = document.querySelector("#congrats")
var wrongEl = document.querySelector("#wrong");
var correctEl = document.querySelector("#correct");

var questions = [
    {
        pregunta: "What type of data is enclosed in quotation marks?", //pregunta is  question in spanish
        choices: ["Number", "Boolean", "String", "BigInt"],
        answer: "String",   
    },
    {
        pregunta: "Which of the following is a primitive datatype?", 
        choices: ["String", "Boolean", "Number", "All of the above"],
        answer: "All of the above",        
    },
    {
        pregunta: "What type of data is enclosed in brackets and seperated by spaces?", 
        choices: ["Object", "Array", "BigInt", "Variables"],
        answer: "Array",        
    },
    {
        pregunta: "What type of data is enclosed in brackets and seperated by spaces?", 
        choices: ["Object", "Array", "BigInt", "Variables"],
        answer: "Array",        
    },
    {
        pregunta: "What property would you use to determine the how many items are in an array?", 
        choices: ["While loop", "&&", ".push", ".length"],
        answer: ".length",        
    },
    {
        pregunta: "What is a function inside of an object called?", 
        choices: ["Method", "Varibable", "Function", "Nested Object"],
        answer: "Method",        
    },
    {
        pregunta: "Which of the following would call the function 'startGame'?", 
        choices: ["startGame", "init: startGame", "startGame()", "function startGame()"],
        answer: "startGame()",        
    },
    {
        pregunta: "What selector would you use to change all <p> elements?", 
        choices: [".setAttribute", ".selectElement", ".createElement", ".querySelectorAll"],
        answer: ".querySelectorAll",        
    },
    {
        pregunta: "How can you target an element's attribute with JavaScript?", 
        choices: [".getAttribute", ".setAttribute", ".removeAttribute", ".callAttribute"],
        answer: ".getAttribute",        
    },
    {
        pregunta: "Which arthmetic operator returns the remainder of two numbers?", 
        choices: ["*", "/", "%", "|"],
        answer: "%",        
    },
]

//Use for questions array to start at first item (object) in array 
var qIndex = 0

//empty global variable to hold timer 
var timer;
var timerCount;


// start quiz: timer and questions render
function startQuiz() {
    timerCount = 101;
    startTimer();
    startPage.style.display="none";
    quizEl.style.display="flex";
    renderQuestions();
}


// Starts timer and triggers (timedOut function to end quiz within or as own func?)
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;

    // if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
      //function to be made
      timedOut();
    }
  }, 1000);
}


function timedOut() {
    startPage.style.display="none";
    quizEl.style.display="none";
    timerWon.style.display="flex"
}

// When startBtn is clicked, run function startGame
startButton.addEventListener("click", startQuiz);


