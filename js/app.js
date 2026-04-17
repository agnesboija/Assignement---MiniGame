// Click a button to earn points so that i can increase my score
// See my current score during the game so that i know how well i am doing
// See a countdown timer - setInterval() function


// Variables
let score = 0;
let timeleft = 60;
let gameStarted = false;
let gameEnded = false;


// HTML DOM-functions --> hur hittar jag dessa items
const button1 = document.getElementById('button1');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');


// UI Functions & Events (user intercept?)
button1.addEventListener('click', () => {
  if (!gameEnded) {
    increaseScore();
  }

  if (!gameStarted) {
    startGame();
  }
})


// Functions
function increaseScore() {
  score++; // Varje klick blir + (börjar från 0 iom score = 0)
  scoreDisplay.innerText = score;

}

function countdown() {
  timeleft--;
  console.log(timeleft);
  timerDisplay.innerText = timeleft;
  if (timeleft <= 0) {
    timerDisplay.innerText = 0;
    endGame();
  }
}

function startGame() {
  setInterval(countdown, 1000); // countdown timer, en gång varje sekund
gameStarted = true;
}

function endGame() {
  gameEnded = true;
}
