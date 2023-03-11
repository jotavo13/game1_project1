

// Get all the card elements and store them in a variable
let squarePlay = document.querySelectorAll('.SquarePic');
let roomSquare = document.querySelectorAll('.room-SquarePic')

squarePlay.forEach(Square => Square.addEventListener('click', flipCard));

// Initialize variables for tracking the flipped squarePlay
let hasFlippedCard = false;
let lockBoard = false;
let firstChoice;
let secondChoice;


// Function to flip a card
function flipCard() {
  if (lockBoard) return;
  if (this === firstChoice) return;

  this.classList.add('is-flipped');

  if (!hasFlippedCard) {
    // First card flipped
    hasFlippedCard = true;
    firstChoice = this;
    return;
  }

  // Second card flipped
  secondChoice = this;
  checkForMatch();
  checkWin();

}

// Function to check if two squarePlay match
function checkForMatch() {
  let isMatch = firstChoice.dataset.pic === secondChoice.dataset.pic;

  // If squarePlay match, disable them and reset the tracking variables
  isMatch ? disablesquarePlay() : unflipsquarePlay();
}

// Function to disable a matched pair of squarePlay
function disablesquarePlay() {
  firstChoice.removeEventListener('click', flipCard);
  secondChoice.removeEventListener('click', flipCard);

  firstChoice.classList.add('is-matched');
  secondChoice.classList.add('is-matched');


  resetBoard();

 
}

// Function to unflip a pair of unmatched squarePlay
function unflipsquarePlay() {
  lockBoard = true;

  setTimeout(() => {
    firstChoice.classList.remove('is-flipped');
    secondChoice.classList.remove('is-flipped');

    resetBoard();
  }, 1000);
}


// Function to reset the tracking variables
function resetBoard() {
  hasFlippedCard = false;
  lockBoard = false;
  firstChoice = null;
  secondChoice = null;
}

// // Function to shuffle the squarePlay
// (function shuffle() {
//   squarePlay.forEach(Square => {
//     let randomPos = Math.floor(Math.random() * 16);
//     Square.style.order = randomPos;
//   });
// })();

function shuffle() {
  roomSquare.forEach((Square) => {
    let randomPos = Math.floor(Math.random() * 16);
    // https://www.w3schools.com/jsref/prop_style_order.asp
    Square.style.order = randomPos;
  });
};

shuffle();





//the checkWin is puting the already pair cards into an array and then cecking if that arricy 
 // function checkWin() {
//   console.log(squarePlay);
//   const allCardsDisabled = squarePlay.every((square) => {
//     return (square.hasAttribute('is-flipped')) === true;
//   });
//   console.log(allCardsDisabled);
//   if (allCardsDisabled === true) {
//     alert('Congratulations, you have won the game!');
//   }
// }

function checkWin() {
  let isWon = true;
  console.log(squarePlay)
  squarePlay.forEach(square => {
    if (!square.classList.contains('is-matched')) {
      isWon = false;
    }
    console.log(squarePlay);
  });

  if (isWon) {
    alert('Congratulations! You have won the game!');
  }
}