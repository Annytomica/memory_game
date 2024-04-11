//Initial array of cards - never changes
const array = ['hippo', 'otter', 'dog', 'cow', 'fish', 'kiwi', 'worm', 'shrimp', 'frog', 'cat'];

/**
 * These functions generate random arrays for the hidden cards and active card stack.
 * They take advantage of the Durstenfeld/Fisher-Yates shuffle algorithim to randomise the original array.
 */

//creates the randomised 'stack' of animal cards the active card is drawn from
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

/**  Durstenfeld shuffle algorithm
 * for randomising order of an array without bias to location within array
 * optimised version of Fisher-Yates shuffle
 * JavaScript code for algorithim taken from ashleedawg's answer on stackoverflow
*/
function shuffle(x) {
  for (let i = x.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
}

let animals = cardGenerator();
let hiddenArray = hiddenGenerator();

//allows checking of random arrays to ensure algorithim working and no duplicates
console.log("Cards:", animals);
console.log("Hidden:", hiddenArray);

/**
 * This function allocates the correct icon html to the 'active' card 
 * to make animal visible, using a switch case statement.
 */
function animalCodeAllocator(){
  let animalCode;
  let animal = animals[Math.floor(Math.random() * 10)];
  
  switch (animal) {
    case 'hippo':
      animalCode = '<i class="fa-light fa-hippo"></i>';
      break;
    case 'otter':
      animalCode = '<i class="fa-light fa-otter"></i>';
      break;
    case 'dog':
      animalCode = '<i class="fa-light fa-dog"></i>';
      break;
    case 'cow':
      animalCode = '<i class="fa-light fa-cow"></i>';
      break;
    case 'fish':
      animalCode = '<i class="fa-light fa-fish-fins"></i>';
      break;
    case 'kiwi':
      animalCode = '<i class="fa-light fa-kiwi-bird"></i>';
      break;
    case 'worm':
      animalCode = '<i class="fa-light fa-worm"></i>';
      break;
    case 'shrimp':
      animalCode = '<i class="fa-light fa-shrimp"></i>';
      break;
    case 'frog':
      animalCode = '<i class="fa-light fa-frog"></i>';
      break;
    case 'cat':
      animalCode = '<i class="fa-light fa-cat"></i>';
      break;
  }
  console.log(animal);
  console.log(animalCode);
  return animalCode
}

let cardCode = animalCodeAllocator();
console.log(cardCode);

// can remove console logs from final code. they are there to check code is working at each step


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
