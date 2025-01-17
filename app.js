const squares = document.querySelectorAll(".square");
const timeLeft = document.querySelector("#time-left");
const score = document.querySelector("#score");

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
  squares.forEach((square) => {
    square.classList.remove("mole");
    square.classList.remove("bonus-mole");
  });

  let randomSquare = squares[Math.floor(Math.random() * squares.length)];

  const isBonusMole = Math.random() < 0.2; 
  if (isBonusMole) {
    randomSquare.classList.add("bonus-mole");
  } else {
    randomSquare.classList.add("mole"); 
  }

  hitPosition = {
    id: randomSquare.id,
    isBonus: isBonusMole,
  };
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition?.id) {
      result += hitPosition.isBonus ? 5 : 1;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 500);
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert("GAME OVER! Your final score is " + result);
  }
}

let countDownTimerId = setInterval(countDown, 1000);
moveMole();
