const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start"); 
const restartButton = document.getElementById("restart"); 
const scoreDisplay = document.getElementById("score");

let score = 0;
let clickedCard = null;
let preventClick = false;
let combosFound = 0;

let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);

    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.dataset.color = color;
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

function handleCardClick(event) {
  if (preventClick || event.target === clickedCard) {
    return;
  }
  event.target.style.backgroundColor = event.target.classList[0]; 
  if (!clickedCard) {
    clickedCard = event.target;
  } else if (clickedCard.dataset.color === event.target.dataset.color) {
    combosFound++;
    clickedCard.removeEventListener('click', handleCardClick);
    event.target.removeEventListener('click', handleCardClick);
    clickedCard = null;
    if (combosFound === COLORS.length / 2) {
      alert('Game Over!');
    }
  } else {
    preventClick = true;
    setTimeout(() => {
      clickedCard.style.backgroundColor = "";
      event.target.style.backgroundColor = "";
      clickedCard = null;
      preventClick = false;
    }, 1000);
  }
  score++;
  scoreDisplay.innerText = `Score: ${score}`; 
}

function startGame() {
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

function restartGame() {
  while (gameContainer.firstChild) {
    gameContainer.firstChild.remove(); 
  }
  score = 0;
  combosFound = 0; 
  scoreDisplay.innerText = `Score: ${score}`;
  startGame();
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame); 
