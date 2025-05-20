// ---------------------------
// GAME SETUP
// ---------------------------

//Initial array of cards - never changes
const originalArray = ['hippo', 'otter', 'dog', 'cow', 'fish', 'kiwi', 'worm', 'shrimp', 'frog', 'cat'];

/**
 * Game state object to keep track of active game data between function calls
 */
const gameState = {
  animalCards: [],
  hiddenArray: [],
  activeAnimal: null,
  isCardActive: false,
  guessMade: false,
};

// Cache DOM elements once on page load
const activeCard = document.getElementById("active-card");
const hiddenCard1 = document.getElementById('hidden1');
const hiddenCard2 = document.getElementById('hidden2');
const hiddenCard3 = document.getElementById('hidden3');
const hiddenCard4 = document.getElementById('hidden4');
const hiddenCards = [hiddenCard1, hiddenCard2, hiddenCard3, hiddenCard4];
const resultDisplay = document.getElementById("result");
const startButton = document.getElementById("startButton");
const clockElement = document.getElementById('clock');

// ---------------------------
// GAME INITIALIZATION
// ---------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Event listener for the start button
  startButton.addEventListener('click', () => {
    clearMessage();
    startGameTimer();
    newGame();
  });

  activeCard.addEventListener("click", handleActiveCardClick);

  hiddenCards.forEach(card => {
    card.addEventListener("click", handleHiddenCardClick);
  });
});

/**
 * Function that sets up new game
 */
function newGame() {
  gameState.animalCards = cardGenerator();
  gameState.hiddenArray = hiddenGenerator();
  gameState.activeAnimal = null;
  gameState.isCardActive = false;

  console.log("Cards:", gameState.animalCards);
  console.log("Hidden:", gameState.hiddenArray);

  resetCardStyles();
  setDefaultCardIcons();
  clearMessage();
}

/**
 * Handles clicking on the active card
 */
function handleActiveCardClick() {
  if (gameState.animalCards.length === 0) {
    resultDisplay.innerText = "All matches found! Start a new game.";
    return;
  }

  setDefaultCardIcons();
  clearMessage();

  // Randomly pick animal for active card
  const randomIndex = Math.floor(Math.random() * gameState.animalCards.length);
  gameState.activeAnimal = gameState.animalCards[randomIndex];
  gameState.isCardActive = true;
  gameState.guessMade = false;

  const icon = animalCodeAllocator(gameState.activeAnimal);
  activeCard.innerHTML = icon;
}

/**
 * Handles clicking on a hidden card
 */
function handleHiddenCardClick(event) {
  const hiddenCard = event.currentTarget;

  // Do nothing if no card drawn, guess made or this card is already matched
    if (!gameState.isCardActive || gameState.guessMade || hiddenCard.classList.contains("matched-cards")) {
    if (!gameState.isCardActive) {
      resultDisplay.innerText = "Draw a card first!";
    } else if (gameState.guessMade) {
      resultDisplay.innerText = "You've already guessed. Draw a new card!";
    }
    return;
  }

  const cardId = hiddenCard.id;
  const hiddenAnimal = hiddenAnimalAllocator(cardId);
  const hiddenIcon = animalCodeAllocator(hiddenAnimal);

  hiddenCard.innerHTML = hiddenIcon;

  // Mark that a guess has been made
  gameState.guessMade = true;

  // Check for a match
  if (hiddenAnimal === gameState.activeAnimal) {
    hiddenCard.className = "matched-cards";
    resultDisplay.innerText = "MATCH!";
    // Remove matched animal from pool
    gameState.animalCards = gameState.animalCards.filter(a => a !== hiddenAnimal);
    gameState.isCardActive = false;
    gameState.activeAnimal = null;

    checkAllMatches();
  } else {
    resultDisplay.innerText = "No Match. Try Again!";
    gameState.isCardActive = false;
    gameState.activeAnimal = null;
  }
}

/**
 * Resets all card styles for a new game
 */
function resetCardStyles() {
  hiddenCards.forEach(card => {
    card.className = "cards hidden-cards";
  });
}

/**
 * Adds default question mark icon to all cards
 */
function setDefaultCardIcons() {
  const cards = document.getElementsByClassName('cards');
  for (let i = 0; i < cards.length; i++) {
    cards[i].innerHTML = '<i class="fa-solid fa-question fa-2xl"></i>';
  }
}

/**
 * Checks if all hidden cards have been matched
 */
function checkAllMatches() {
  const allMatched = hiddenCards.every(card => card.className === "matched-cards");

  if (allMatched) {
    stopGameTimer();
    resultDisplay.innerHTML = `🎉 Congratulations! All match!<br>Your time was ${clockElement.textContent}`;
  }
}

/**
 * Maps hidden card ID to a specific animal
 */
function hiddenAnimalAllocator(cardId) {
  switch (cardId) {
    case 'hidden1':
      return gameState.hiddenArray[0];
    case 'hidden2':
      return gameState.hiddenArray[1];
    case 'hidden3':
      return gameState.hiddenArray[2];
    case 'hidden4':
      return gameState.hiddenArray[3];
    default:
      alert("Unexpected card. Please restart the game.");
      return null;
  }
}

/**
 * Maps animal names to font-awesome icon code
 */
function animalCodeAllocator(animal) {
  const iconMap = {
    hippo: 'hippo',
    otter: 'otter',
    dog: 'dog',
    cow: 'cow',
    fish: 'fish-fins',
    kiwi: 'kiwi-bird',
    worm: 'worm',
    shrimp: 'shrimp',
    frog: 'frog',
    cat: 'cat'
  };

  const icon = iconMap[animal];
  return icon ? `<i class="fa-solid fa-${icon} fa-xl"></i>` : '<i class="fa-solid fa-bug fa-xl"></i>';
}

/**
 * Clears any match message
 */
function clearMessage() {
  resultDisplay.innerText = "";
}

// ---------------------------
// CARD GENERATION / SHUFFLING
// ---------------------------

/**
 * Randomized stack of animal cards (active card deck)
 */
function cardGenerator() {
  const copy = originalArray.slice();
  shuffle(copy);
  return copy;
}

/**
 * Generates and returns a 4-card hidden set
 */
function hiddenGenerator() {
  const copy = originalArray.slice();
  shuffle(copy);
  return copy.slice(0, 4);
}

/**
 * Fisher-Yates shuffle algorithm
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ---------------------------
// GAME CLOCK FEATURE
// ---------------------------

let startTime = 0;
let gameTimer;

function updateClock() {
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - startTime;

  const minutes = String(Math.floor(elapsedTime / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0');

  clockElement.textContent = `${minutes}:${seconds}`;
}

function startGameTimer() {
  startTime = new Date().getTime();
  clearInterval(gameTimer);
  gameTimer = setInterval(updateClock, 1000);
}

function stopGameTimer() {
  clearInterval(gameTimer);
}

// ---------------------------
// INSTRUCTIONS MODAL
// ---------------------------
const modal = document.getElementById("instructionsModal");
const btn = document.getElementById("instructionsButton");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = event => {
  if (event.target === modal) modal.style.display = "none";
};