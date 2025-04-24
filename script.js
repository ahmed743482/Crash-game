
let multiplier = 1.0;
let playing = false;
let points = 100;
let bet = 10;

const multiplierDisplay = document.getElementById("multiplier");
const resultDisplay = document.getElementById("result");
const startBtn = document.getElementById("startBtn");
const cashOutBtn = document.getElementById("cashOutBtn");
const pointsDisplay = document.getElementById("points");
const betAmountInput = document.getElementById("betAmount");

let crashPoint;

function updatePointsDisplay() {
  pointsDisplay.innerText = "Your Points: " + points;
}

startBtn.onclick = () => {
  bet = parseInt(betAmountInput.value);
  if (playing || points < bet) return;

  playing = true;
  multiplier = 1.0;
  crashPoint = (Math.random() * 5 + 1).toFixed(2);
  resultDisplay.innerText = "";
  multiplierDisplay.innerText = multiplier.toFixed(2) + "x";
  cashOutBtn.disabled = false;
  points -= bet;
  updatePointsDisplay();

  let interval = setInterval(() => {
    multiplier += 0.05;
    multiplierDisplay.innerText = multiplier.toFixed(2) + "x";

    if (multiplier >= crashPoint) {
      clearInterval(interval);
      playing = false;
      cashOutBtn.disabled = true;
      resultDisplay.innerText = "Crashed at " + multiplier.toFixed(2) + "x! You lost.";
    }
  }, 100);
};

cashOutBtn.onclick = () => {
  if (!playing) return;
  let winnings = Math.floor(bet * multiplier);
  points += winnings;
  updatePointsDisplay();
  resultDisplay.innerText = "Cashed out at " + multiplier.toFixed(2) + "x! You win " + winnings + " points!";
};
