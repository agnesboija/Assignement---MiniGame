// Click a button to earn points so that i can increase my score
// See my current score during the game so that i know how well i am doing
// See a countdown timer - setInterval() function


// Variables
let score = 0;
let timeLeft = 60;
let gameStarted = false;
let gameEnded = false;
let interval = null;

// HTML DOM-functions --> hur hittar jag dessa items
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const input1 = document.getElementById('name');
const label1 = document.getElementById('label1');
const finalMessage = document.getElementById('finalMessage');
const scoreboardList = document.getElementById('scoreboardList');

// Hide elements from start
input1.style.display = "none";
label1.style.display = "none";
button2.style.display = "none";

// Events
button1.addEventListener('click', () => {
  if (!gameEnded) {
    increaseScore();
  }

  if (!gameStarted) {
    startGame();
  }
});

button2.addEventListener('click', submitHighscore);

// Functions
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function countdown() {
  timeLeft--;
  timerDisplay.innerText = timeLeft;

  if (timeLeft <= 0) {
    timerDisplay.innerText = 0;
    endGame();
  }
}

function startGame() {
  interval = setInterval(countdown, 1000);
  gameStarted = true;
}

function endGame() {
  gameEnded = true;
  clearInterval(interval);

  button1.style.display = "none";
  input1.style.display = "block";
  label1.style.display = "block";
  button2.style.display = "block";

 finalMessage.innerText = "GAME OVER! Your final score is: " + score;
}

async function submitHighscore() {
  try {
  const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
    method: "POST",
    body: JSON.stringify({
      name: input1.value,
      score: score
    }),
  });

if (response.ok) {
  finalMessage.innerText =
    "GAME OVER! Your final score is: " + score + " - Your highscore was saved successfully!";

  setTimeout(getScoreBoardData, 1000);
}

else {
  finalMessage.innerText =
    "GAME OVER! Your final score is: " + score + " - Could not save your highscore.";
}
  } catch (error) {
    console.error(error);

    finalMessage.innerText =
      "GAME OVER! Your final score is: " + score + " - Error when saving your highscore.";
  }
}

function getScoreBoardData() {
  const url = 'https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec';

  fetch(url)
    .then(response => response.json())
    .then(data => {
        scoreboardList.innerHTML = "";

      data.sort((a, b) => b.score - a.score);

      data.forEach(player => {
        const li = document.createElement('li');
        li.innerText = player.name + " - " + player.score;
        scoreboardList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      scoreboardList.innerHTML = "<li>Could not load scoreboard.</li>";
    });
}

getScoreBoardData();

