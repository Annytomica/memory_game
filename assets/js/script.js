/**
 * This function generates random arrays for the hidden cards and active card stack.
 * It takes advantage of the Fisher-Yates shuffle algorithim to randomise the original array.
 */
//Initial array of cards - never changes
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//creates the randomised 'stack' of cards the active card is drawn from
function cardGenerator() {
// Create a copy of the original array, using let x = y without slice would mean function modifies both arrays.
  let cards = array.slice(); 
  shuffle(cards);
  return cards; 
}

// creates the randomised and reduced array of 4 hidden cards 
function hiddenGenerator() {
  let hidden = array.slice();
  shuffle(hidden);
  hidden.splice(0, 7);
  return hidden; 
}

// Fisher-Yates shuffle algorithm
function shuffle(x) {
  for (let i = x.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
}

let cardsArray = cardGenerator();
let hiddenArray = hiddenGenerator();

//allows checking of random arrays to ensure algorithim working and no duplicates
console.log("Cards:", cardsArray);
console.log("Hidden:", hiddenArray);





/**
 * The code for this Game Clock feature was generated by ChatGPT.
 * The clock counts up each time a new game is started.
 * this allows the player to 'compete' to get a faster time
 */

// Select the clock element
const clockElement = document.getElementById('clock');

// Select the start button
const startButton = document.getElementById('startButton');

let startTime = 0;
let gameTimer;

// Function to update the clock display
function updateClock() {
  let currentTime = new Date().getTime();
  let elapsedTime = currentTime - startTime;

  let minutes = Math.floor(elapsedTime / 60000);
  let seconds = Math.floor((elapsedTime % 60000) / 1000);

  // Add leading zeros if necessary
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Update the clock display
  clockElement.textContent = minutes + ':' + seconds;
}

// Event listener for the start button
startButton.addEventListener('click', function() {
  // Start the game timer
  startTime = new Date().getTime();
  gameTimer = setInterval(updateClock, 1000);
});

/**
 * This is the end of the game clock code from CHatGPT
 */
