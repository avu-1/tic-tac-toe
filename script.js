// Game state and data structures
const gameState = {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    scores: {
        X: 0,
        O: 0,
    },
    gameActive: true,
};

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');
const scoreXElement = document.getElementById('scoreX');
const scoreOElement = document.getElementById('scoreO');
const resetButton = document.getElementById('resetButton');
const winnerPopup = document.getElementById('winnerPopup');
const winnerMessage = document.getElementById('winnerMessage');
const closePopupButton = document.getElementById('closePopup');

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initGame() {
    cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('player-x', 'player-o');
        cell.addEventListener('click', handleCellClick);
    });
    messageElement.innerHTML = `Player <span class="player-x">X</span>'s turn`;
    gameState.board.fill(null);
    gameState.gameActive = true;
}

function handleCellClick(event) {
    const cellIndex = event.target.dataset.index;
    if (!gameState.board[cellIndex] && gameState.gameActive) {
        gameState.board[cellIndex] = gameState.currentPlayer;
        event.target.textContent = gameState.currentPlayer;
        event.target.classList.add(gameState.currentPlayer === 'X' ? 'player-x' : 'player-o');
        checkForWinner();
        if (gameState.gameActive) switchPlayer();
    }
}

function switchPlayer() {
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    messageElement.innerHTML = `Player <span class="player-${gameState.currentPlayer.toLowerCase()}">${gameState.currentPlayer}</span>'s turn`;
}

function checkForWinner() {
    let roundWon = false;
    for (let i = 0; i < winningCombos.length; i++) {
        const [a, b, c] = winningCombos[i];
        if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameState.gameActive = false;
        winnerMessage.innerHTML = `Player <span class="player-${gameState.currentPlayer.toLowerCase()}">${gameState.currentPlayer}</span> wins!`;
        winnerPopup.style.display = 'flex';
        gameState.scores[gameState.currentPlayer]++;
        updateScores();
    } else if (!gameState.board.includes(null)) {
        gameState.gameActive = false;
        winnerMessage.textContent = 'It\'s a draw!';
        winnerPopup.style.display = 'flex';
    }
}


function updateScores() {
    scoreXElement.textContent = gameState.scores.X;
    scoreOElement.textContent = gameState.scores.O;
}

resetButton.addEventListener('click', initGame);


closePopupButton.addEventListener('click', () => {
    winnerPopup.style.display = 'none';
    initGame();
});

initGame();
