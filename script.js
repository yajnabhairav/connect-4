const gameBoard = document.querySelector('.game-board');
const statusDisplay = document.getElementById('status');
const currentPlayerDisplay = document.getElementById('current-player');
let currentPlayer = 'player1';
let gameActive = true;

// Create the game board
for (let i = 0; i < 42; i++) {
  const cell = document.createElement('div');
  cell.addEventListener('click', handleCellClick);
  gameBoard.appendChild(cell);
}

function handleCellClick(event) {
  const cell = event.target;
  const column = Array.from(gameBoard.children).indexOf(cell) % 7;

  // Check if the column is not full
  for (let i = 5; i >= 0; i--) {
    if (!gameBoard.children[i * 7 + column].classList.contains('player1') && !gameBoard.children[i * 7 + column].classList.contains('player2')) {
      gameBoard.children[i * 7 + column].classList.add(currentPlayer);
      checkWin(i, column);
      // Switch the current player after placing the disc
      currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
      currentPlayerDisplay.textContent = currentPlayer === 'player1' ? 'Player 1' : 'Player 2';
      break;
    }
  }
}

function checkWin(row, column) {
  const playerClass = currentPlayer;

  // Check all possible win conditions
  if (
    checkDirection(row, column, 1, 0, playerClass) || // Horizontal
    checkDirection(row, column, 0, 1, playerClass) || // Vertical
    checkDirection(row, column, 1, 1, playerClass) || // Diagonal \
    checkDirection(row, column, 1, -1, playerClass)   // Diagonal /
  ) {
    statusDisplay.textContent = `${playerClass === 'player1' ? 'Player 1' : 'Player 2'} Wins!`;
    gameActive = false;
  }
}

function checkDirection(row, column, rowIncrement, colIncrement, playerClass) {
  let count = 0;

  for (let i = -3; i <= 3; i++) {
    const r = row + i * rowIncrement;
    const c = column + i * colIncrement;

    if (r >= 0 && r < 6 && c >= 0 && c < 7 && gameBoard.children[r * 7 + c].classList.contains(playerClass)) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0; // Reset count if the sequence breaks
    }
  }
  return false;
}

// Reset the game
document.getElementById('reset-btn').addEventListener('click', () => {
  gameBoard.querySelectorAll('div').forEach(cell => {
    cell.classList.remove('player1', 'player2');
  });
  currentPlayer = 'player1';
  currentPlayerDisplay.textContent = 'Player 1';
  statusDisplay.textContent = 'Current Player: Player 1';
  gameActive = true;
});
