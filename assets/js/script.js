//Initial array of cards - never changes
const originalArray = ['hippo', 'otter', 'dog', 'cow', 'fish', 'kiwi', 'worm', 'shrimp', 'frog', 'cat'];

// Select the start button
const startButton = document.getElementById('startButton');

// Event listener for the start button
startButton.addEventListener('click', function() {
  clearMessage();
  startGameTimer();
  newGame();
});

/**
 * Function that loads and resets all game features for new game to start
 */
function newGame() {

  //calling intial functions
  let animalCards = cardGenerator();
  let hiddenArray = hiddenGenerator();

  //allows checking of random arrays to ensure algorithim working and no duplicates
  console.log("Cards:", animalCards);
  console.log("Hidden:", hiddenArray);

  /**
   * Defining HTML Elements for global access by functions
   */
  const activeCard = document.getElementById("active-card");
  const hiddenCard1 = document.getElementById('hidden1');
  const hiddenCard2 = document.getElementById('hidden2');
  const hiddenCard3 = document.getElementById('hidden3');
  const hiddenCard4 = document.getElementById('hidden4');
  let hiddenCards = [hiddenCard1, hiddenCard2, hiddenCard3, hiddenCard4];

  /**
   * Calling initial functions to reset the game cards
   */
  resetHiddenCard();
  defaultCardCode();

  /**
   * resets class name for hidden cards to "cards hidden-cards"
   */
  function resetHiddenCard() {
    for (let i = 0; i < hiddenCards.length; i++) {
      hiddenCards[i].className = "cards hidden-cards";
    }
  }

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
   * Event listener that allocates active card icon code for each new card draw
   */
  activeCard.addEventListener("click", function() {
    defaultCardCode();
    clearMessage();
    let animal = animalCards[Math.floor(Math.random() * animalCards.length)];
    let activeCardCode = animalCodeAllocator(animal);
    this.innerHTML = activeCardCode;
    hiddenCards = [hiddenCard1, hiddenCard2, hiddenCard3, hiddenCard4];
    hiddenCardEvent();
  });

  /**
   * Function to call Event listener for hidden cards
   * My Mentor Oluwafemi Medale provided guidance on how to use .forEach and => get this function to work
   */
  const hiddenCardEvent = () => {
    for (let i = 0; i < hiddenCards.length; i++) {
      hiddenCards[i].addEventListener("click", function handleClick() {
        cardMatchCheck(hiddenCards[i]);
        // Remove the event listener after one click by emptying array
        hiddenCards = [];
      });
    }
  };

  /**
   * function that allocates icon code to clicked hidden card
   * and checks for match to active card
   * and checks if four hidden cards have been matched and game is over
   */
  function cardMatchCheck(hiddenCard) {
    let hiddenCardId = hiddenCard.id;

    // allocates icon code to clicked hidden card
    let animal = hiddenAnimalAllocator(hiddenCardId);
    let hiddenCardCode = animalCodeAllocator(animal);

    //checks if hidden card matches active card
    hiddenCard.innerHTML = hiddenCardCode;
      if (hiddenCard.innerHTML === activeCard.innerHTML) {      
      hiddenCard.className = "matched-cards";
      document.getElementById("result").innerText = "MATCH!";

      // removes matched animal from animalCards array so no longer in active card deck
      animalCards = animalCards.filter(animalCard => animalCard !== animal);

      // checks if all four hidden cards have been matched and game is over
      allMatch();
    } else {
      document.getElementById("result").innerText = "No Match. Try Again!";
    }
  }

  /**
   *function for checking if all hidden cards have been matched and game is over
   */
  function allMatch() {
    
    if (hiddenCard1.className === "matched-cards"
          && hiddenCard2.className === "matched-cards"
          && hiddenCard3.className === "matched-cards"
          && hiddenCard4.className === "matched-cards") {
            stopGameTimer();
            document.getElementById("result").innerHTML = `Congratulations! All match!
            Your time was ${clockElement.textContent}`;
          }
  }

  /**
  * Allocates animal from hiddenArray to each hidden card,
  * using switch case statement
  */
  function hiddenAnimalAllocator(hiddenCardId) {
    let hiddenAnimal;

    switch (hiddenCardId) {
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
  function animalCodeAllocator(animal){
    let animalCode;
    
    switch (animal) {
      case 'hippo':
        animalCode = '<i class="fa-solid fa-hippo fa-xl" aria-hidden="true"></i>';
        break;
      case 'otter':
        animalCode = '<i class="fa-solid fa-otter fa-xl" aria-hidden="true"></i>';
        break;
      case 'dog':
        animalCode = '<i class="fa-solid fa-dog fa-xl" aria-hidden="true"></i>';
        break;
      case 'cow':
        animalCode = '<i class="fa-solid fa-cow fa-xl" aria-hidden="true"></i>';
        break;
      case 'fish':
        animalCode = '<i class="fa-solid fa-fish-fins fa-xl" aria-hidden="true"></i>';
        break;
      case 'kiwi':
        animalCode = '<i class="fa-solid fa-kiwi-bird fa-xl" aria-hidden="true"></i>';
        break;
      case 'worm':
        animalCode = '<i class="fa-solid fa-worm fa-xl" aria-hidden="true"></i>';
        break;
      case 'shrimp':
        animalCode = '<i class="fa-solid fa-shrimp fa-xl" aria-hidden="true"></i>';
        break;
      case 'frog':
        animalCode = '<i class="fa-solid fa-frog fa-xl" aria-hidden="true"></i>';
        break;
      case 'cat':
        animalCode = '<i class="fa-solid fa-cat fa-xl" aria-hidden="true"></i>';
        break;
    }
    return animalCode
  }
}

/**
 * Clears the message from card matching attempt
 */
function clearMessage() {
  document.getElementById("result").innerText = "";
}

/**
 * Creates the randomised 'stack' of animal cards the active card is drawn from
 * Uses Durstenfeld/Fisher-Yates shuffle algorithim to randomise the original array.
 */
function cardGenerator() {
// Create a copy of the original array, using let x = y without slice would mean function modifies both arrays.
  let cards = originalArray.slice(); 
  shuffle(cards);
  return cards; 
}
/**
 * Creates the randomised and reduced array of 4 hidden cards
 * Uses Durstenfeld/Fisher-Yates shuffle algorithim to randomise the original array.
 */
function hiddenGenerator() {
  let hidden = originalArray.slice();
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
 * The code for this Game Clock feature was generated by ChatGPT.
 * The clock counts up each time a new game is started.
 * this allows the player to 'compete' to get a faster time
 */

// Select the clock element
const clockElement = document.getElementById('clock');

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

// Starts the game timer
function startGameTimer() {
  startTime = new Date().getTime();
  gameTimer = setInterval(updateClock, 1000);
}

//stops the game timer but does not clear it
function stopGameTimer() {
  clearInterval(gameTimer);
}

/**
 * Modal funcionality - from W3Schools example
 */
// Get the modal
const modal = document.getElementById("instructionsModal");

// Get the button that opens the modal
const btn = document.getElementById("instructionsButton");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}