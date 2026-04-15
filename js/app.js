// Click a button to earn points so that i can increase my score
// See my current score during the game so that i know how well i am doing
// See a countdown timer - setIntervall function


// Variables
let score = 0;

// HTML DOM-functions --> hur hittar jag dessa items
const button = document.getElementById('knapp1');
const scoreDisplay = document.getElementById('scoreDisplay');


// UI Functions (user intercept?)
button.addEventListener('click', () => {
  increaseScore(); // Vad som händer när jag klickar
})

// Functions
function increaseScore() {
  score++; // Varje klick blir + (börjar från 0 iom score = 0)
  scoreDisplay.innerText = score;

}

