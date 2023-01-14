var timerEl = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var startPage = document.querySelector(".instructions");

//global variables for quiz 
var quizEl = document.querySelector("#quiz");
var questionEl = document.getElementById("question");
var choiceEL = Array.from(document.getElementsByClassName("choice"));
var correctEl = document.querySelector("#correct");
var wrongEl = document.querySelector("#wrong");
var scoreEl = document.getElementById("finalscores");

//empty object to keep track of which questions have been shown and which are left 
var currentQuery = {};

var allQuestions = [
    {
        question: "What type of data is enclosed in quotation marks?", 
        choice1: "Number",
        choice2: "Boolean",
        choice3: "String",
        choice4: "BigInt",
        answer: 3,   
    },
    {
        question: "Which of the following is a primitive datatype?", 
        choice1: "String", 
        choice2: "Boolean", 
        choice3: "Number",
        choice4:  "All of the above",
        answer: 4,        
    },
    {
        question: "What type of data is a boolean?", 
        choice1: "String", 
        choice2: "True/False",
        choice3:  "Key/Value",
        choice4:  "Variables",
        answer: 2,        
    },
    {
        question: "What type of data is enclosed in brackets and seperated by commas?", 
        choice1: "Object", 
        choice2: "Array", 
        choice3: "BigInt",
        choice4:  "Variables",
        answer: 2,        
    },
    {
        question: "What property would you use to determine the how many items are in a string?", 
        choice1: "While loop",
        choice2:  "&&", 
        choice3: ".push", 
        choice4: ".length",
        answer: 4,        
    },
    {
        question: "What is a function inside of an object called?", 
        choice1: "Function", 
        choice2: "Varibable", 
        choice3: "Method", 
        choice4: "Nested Function",
        answer: 3,        
    },
    {
        question: "Which of the following would call the function 'startGame'?", 
        choice1: "startGame()", 
        choice2: "init: startGame", 
        choice3: "startGame", 
        choice4: "function startGame()",
        answer: 1,        
    },
    {
        question: "What selector would you use to change all <p> elements?", 
        choice1: ".setAttribute", 
        choice2: ".selectElement", 
        choice3: ".createElement", 
        choice4: ".querySelectorAll",
        answer: 4,        
    },
    {
        question: "How can you target an element's attribute with JavaScript?", 
        choices1: ".target", 
        choice2: ".setAttribute", 
        choice3: ".removeAttribute", 
        choice4: ".getAttribute",
        answer: 4,        
    },
    {
        question: "Which arthmetic operator returns the remainder of two numbers?", 
        choice1: "*", 
        choice2: "/", 
        choice3: "%", 
        choice4: "||",
        answer: 3,        
    },
]
//to take questions out of all questions arary
var questionsLeft = [];
//question counter 
var questionIndex = 0;

// User score variables
var score = 0;

//Variables for when user completes quiz
var finish = document.querySelector("#finish")
var timerWon = document.querySelector("#uh-oh");
var congrats = document.querySelector("#congrats");
var initialsInput = document.getElementById('initials');
var submitBtn = document.getElementById("submitscore");
var goToScores = document.getElementById("scoreslist");
var goHome = document.querySelector('#goHome');



//empty global variable to hold timer 
var timer;
var timerCount;


// start quiz: timer and questions render
function startQuiz() {
    timerCount = 121;
    //reset questions and score (just to be safe)
    qIndex = 0;
    score = 0;
    startTimer();
    startPage.style.display="none";
    quizEl.style.display="flex";
    // spread operator to get full copy of array w/o affecting questionEl array
    questionsLeft = [...allQuestions];
    renderNextQuestion();
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


function renderNextQuestion() {
    //makes sure the correct/wrong feedback goes away when new question renders
    correctEl.style.display="none";
    wrongEl.style.display="none";

    //display questions in random order via questionsLeft = no repeats
    var questioncCounter = Math.floor(Math.random() * questionsLeft.length);
    //if you answer all questions before timer end, go to congrats page
    if (questionsLeft.length === 0) {
       return youWon(); 
    }

    // if timer runs out before you answer all questions, go to uh-oh page
    if (timerCount === 0) {
        return timedOut();
    }
    //increase question counter by 1 as game progresses
    questionIndex++;

   //get the question displayed on screen from the question property of the array of questions left
    currentQuery = questionsLeft[questioncCounter];
    questionEl.innerText = currentQuery.question;
   // for each instance of choiceEL (which is class="choice") find the dataset number and match it to the same number @end of choice#: in 'current query' array
    choiceEL.forEach(choiceEL => {
        var number = choiceEL.dataset['number'];
        choiceEL.innerText = currentQuery['choice' + number];
    });

    //get rid of questions as they are answered so they don't repeat
    questionsLeft.splice(questioncCounter, 1);
    
}

//for each choice element button, listen for click and check data attribute #
choiceEL.forEach(choiceEL => {
    choiceEL.addEventListener('click', e => {
        // use dataset number of clicked choice to see what user clicked
        var userChoice = e.target;
        var userAnswer = userChoice.dataset["number"];
        //strictly = will return false bc 
        if (userAnswer == currentQuery.answer) {
            correctEl.style.display="flex";
            //ten points per correct question
            score += 10;
            //localStorage.setItem 
        }

        if (userAnswer != currentQuery.answer) {
            wrongEl.style.display="flex";
            //if wrong loose 10 seconds on timer
            timerCount -= 10;
        }
        // allows correct/wrong to display on screen for 1500 milliseconds before calling render function which clears wrong/correctEl
        setTimeout(renderNextQuestion, 1500);
        
    });
})

function setScore() {
    score.textContent = scoreEl
    localStorage.setItem("scoreCount", score);
}

function showScores() {
    // Get stored value from user storage, if it exists
    var storedScore = localStorage.getItem("scoreCount");
    // If stored value doesn't exist, set counter to 0
    if (storedScore === null) {
      scoreCounter = 0;
    } else {
      // If a value is retrieved from client storage set the winCounter to that value
      score = storedScore;
    }
    //Render win count to page
    scoreEl.textContent = score;
}

function saveScore() {
    //get initials value from input box
    var userInitials = initialsInput.value;
    
    // check if input box is empty
    if (initialsInput !== '') {
        //get saved scores from local storage or if none give empty array
        var savedHighScores = JSON.parse(window.localStorage.getItem('savedHighScores')) || [];
        //user saves their score = follow this format
        var latestScore = {score: score, initials: userInitials};
        //save scores+initials to local storage
        savedHighScores.push(latestScore);
        window.localStorage.setItem('savedHighScores', JSON.stringify(savedHighScores));
        //bring user back to home page 
        return homePage();
    }
}




function youWon() {
    quizEl.style.display="none";
    timerWon.style.display="none";
    finish.style.display="flex"
    congrats.style.display="flex";
    scoreEl.textContent = score;
    //stop timer running
    clearInterval(timer);
    goHome.addEventListener('click', homePage);
}

function timedOut() {
    quizEl.style.display="none";
    finish.style.display="flex";
    congrats.style.display="none";
    timerWon.style.display="flex";
    scoreEl.textContent = score;
    goHome.addEventListener('click', homePage)
}


function homePage() {
    startPage.style.display="flex";
    finish.style.display="none"
    quizEl.style.display="none";
    timerWon.style.display="none";
    congrats.style.display="none";
}


//when view high scores is clicked, run viewScores


//when submit score bt is clicked, run saveScore
submitBtn.addEventListener("click", saveScore);

// When startBtn is clicked, run function startGame
startButton.addEventListener("click", startQuiz);


