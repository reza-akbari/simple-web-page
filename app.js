const winingConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];

const cells = document.querySelectorAll(".board > *");
const gameState = [];
let isFinished = false;
let isUserTurn = true;

const move = (player, number) => {
  gameState[number] = player;
  cells[number].textContent = player;
  for (let i = 0; i < winingConditions.length; i++) {
    const condition = winingConditions[i];
    if (condition.every((n) => gameState[n] === player)) {
      const h1 = document.querySelector("h1");
      h1.textContent = player + " برنده شد!";
      h1.style.color = player === "X" ? "green" : "red";
      isFinished = true;
      setInterval(() => {
        i++;
        condition.forEach((n) => {
          cells[n].style.color = i % 2 ? "blue" : "red";
        });
      }, 200);
      break;
    }
  }
};

const findRandom = () => {
  const emptyNums = [];
  for (let num = 0; num < 9; num++) {
    if (!gameState[num]) {
      emptyNums.push(num);
    }
  }
  return emptyNums[Math.floor(Math.random() * emptyNums.length)];
};

const playComputer = () => {
  const random = findRandom();
  move("O", random);
  isUserTurn = true;
};

cells.forEach((cell, number) => {
  cell.addEventListener("click", () => {
    if (!isUserTurn || gameState[number]) {
      return;
    }
    isUserTurn = false;
    move("X", number);
    if (!isFinished) {
      setTimeout(playComputer, 500);
    }
  });
});

document
  .querySelector("button")
  .addEventListener("click", () => location.reload());
