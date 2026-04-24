// Click a button to earn points so that i can increase my score
// See my current score during the game so that i know how well i am doing
// See a countdown timer - setInterval() function


// Variables - De här variablerna håller koll på spelets tillstånd:
let score = 0;
let timeLeft = 60;
let gameStarted = false;
let gameEnded = false;
let interval = null;


// HTML DOM-functions --> hur hittar jag dessa items.
// Jag hämtar elementen från HTML så att jag kan ändra text, visa/dölja saker & lägga till data på sidan.
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const input1 = document.getElementById('name');
const label1 = document.getElementById('label1');
const finalMessage = document.getElementById('finalMessage');
const scoreboardList = document.getElementById('scoreboardList');

// Det här gör att namnfältet och submit-knappen inte syns när spelet startar.
// Jag vill att spelaren ska spela klart. Efter det ska man kunna skriva namn & skicka in sin score.
input1.style.display = "none";
label1.style.display = "none";
button2.style.display = "none";

// Events
// Jag använder event listeners för att reagera på användarens klick.
// Button 1: om spelet inte är slut så ökas poängen, om spelet inte startat än startas timern.
// Button 2: när man klickar på submit körs submitHighscore
button1.addEventListener('click', () => {
  if (!gameEnded) {
    increaseScore();
  }

  if (!gameStarted) {
    startGame();
  }
});

button2.addEventListener('click', submitHighscore);

// Varje klick ger ger ett poäng och sedan uppdateras score-displayen direkt i DOM:en.
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

// Countdown körs varje sekund och monskar tiden. När tiden är slut anropas endGame.
function countdown() {
  timeLeft--;
  timerDisplay.innerText = timeLeft;

  if (timeLeft <= 0) {
    timerDisplay.innerText = 0;
    endGame();
  }
}

// Spelet startar första gången man klickar och sätter igång timern med setInterval.
function startGame() {
  interval = setInterval(countdown, 1000);
  gameStarted = true;
}

//När tiden är slut stoppas timern, spelknappen göms och fältet för namn + knappen för att skicka highscore.visas.
function endGame() {
  gameEnded = true;
  clearInterval(interval);

  button1.style.display = "none";
  input1.style.display = "block";
  label1.style.display = "block";
  button2.style.display = "block";

  finalMessage.innerText = "GAME OVER! Your final score is: " + score;
}

// Om requesten lyckas visas ett bekräftelsemeddelande & hämtar leaderboarden.
// Jag använder try/catch för felhantering så att ett tydligt meddelande visas om något går fel.
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

      getScoreBoardData();

    } else {
      finalMessage.innerText =
        "GAME OVER! Your final score is: " + score + " - Could not save your highscore.";
    }
  } catch (error) {
    console.error(error);

    finalMessage.innerText =
      "GAME OVER! Your final score is: " + score + " - Error when saving your highscore.";
  }
}

// Här hämtas leaderboarden, sorterar resultaten från högst till lägst och skriver ut dom som en numrerad lista på sidan.
// Om leaderboarden inte kan hämtas visar jag ett felmedddelande istället.
function getScoreBoardData() {
  const url = 'https://script.google.com/macros/s/AKfycbys5aEPMvNCutyhNYYCcQcCjzsi2UtqNspmKyCH-AicJxJbCJMrAoT0LUaYaXhTWA8n/exec';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      scoreboardList.innerHTML = "";

      data.sort((a, b) => b.score - a.score);

      data.slice(0, 20).forEach(player => {
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

// Jag kör denna direkt när sidan öppnas så att leaderboarden (nästan) syns direkt.
getScoreBoardData();

