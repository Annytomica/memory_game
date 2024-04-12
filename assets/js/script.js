//Initial array of cards - never changes
const array = ['hippo', 'otter', 'dog', 'cow', 'fish', 'kiwi', 'worm', 'shrimp', 'frog', 'cat'];

//calling intial functions
defaultCardCode();
let animals = cardGenerator();
let hiddenArray = hiddenGenerator();

//allows checking of random arrays to ensure algorithim working and no duplicates
console.log("Cards:", animals);
console.log("Hidden:", hiddenArray);

/**
 * Adds default question mark to all cards at start of new game
 */
function defaultCardCode(){
  let cards = document.getElementsByClassName('cards');
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = '<i class="fa-solid fa-question fa-2xl"></i>';
  }
}

/**
 * 
 */
// to be used for active card icon code allocation
let activeCard = document.getElementById("active-card");

activeCard.addEventListener("click", function() {
    defaultCardCode();
    let animal = animals[Math.floor(Math.random() * 10)];
    let activeCardCode = animalCodeAllocator(animal);
    this.innerHTML = activeCardCode;
})



/**
 * Creates the randomised 'stack' of animal cards the active card is drawn from
 * Uses Durstenfeld/Fisher-Yates shuffle algorithim to randomise the original array.
 */
function cardGenerator() {
// Create a copy of the original array, using let x = y without slice would mean function modifies both arrays.
  let cards = array.slice(); 
  shuffle(cards);
  return cards; 
}
/**
 * Creates the randomised and reduced array of 4 hidden cards
 * Uses Durstenfeld/Fisher-Yates shuffle algorithim to randomise the original array.
 */
function hiddenGenerator() {
  let hidden = array.slice();
  shuffle(hidden);
  hidden.splice(0, 6);
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

/**
 * Allocates animal from hiddenArray to each hidden card,
 * using switch case statement
 */

function hiddenAnimalAllocator() {
  let hiddenAnimal;

  switch (this.Id) {
    case 'hidden1':
      hiddenAnimal = hiddenArray[0];
      break;
    case 'hidden2':
      hiddenAnimal = hiddenArray[1];
      break;
    case 'hidden3':
      hiddenAnimal = hiddenArray[2];
      break;
    case 'hidden4':
      hiddenAnimal = hiddenArray[3];
      break;
  }
  return hiddenAnimal
}

/**
 * This function allocates the correct icon html to the 'active' card 
 * to make animal visible, using a switch case statement.
 */
function animalCodeAllocator(){
  let animalCode;
  let animal = animals[Math.floor(Math.random() * 10)];
  
  switch (animal) {
    case 'hippo':
      animalCode = '<i class="fa-solid fa-hippo fa-xl"></i>';
      break;
    case 'otter':
      animalCode = '<i class="fa-solid fa-otter fa-xl"></i>';
      break;
    case 'dog':
      animalCode = '<i class="fa-solid fa-dog fa-xl"></i>';
      break;
    case 'cow':
      animalCode = '<i class="fa-solid fa-cow fa-xl"></i>';
      break;
    case 'fish':
      animalCode = '<i class="fa-solid fa-fish-fins fa-xl"></i>';
      break;
    case 'kiwi':
      animalCode = '<i class="fa-solid fa-kiwi-bird fa-xl"></i>';
      break;
    case 'worm':
      animalCode = '<i class="fa-solid fa-worm fa-xl"></i>';
      break;
    case 'shrimp':
      animalCode = '<i class="fa-solid fa-shrimp fa-xl"></i>';
      break;
    case 'frog':
      animalCode = '<i class="fa-solid fa-frog fa-xl"></i>';
      break;
    case 'cat':
      animalCode = '<i class="fa-solid fa-cat fa-xl"></i>';
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
