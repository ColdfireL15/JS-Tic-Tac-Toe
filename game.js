const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';  // X is the human player
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.innerText = `${currentPlayer} wins!`;
        isGameActive = false;
        return true;
    }

    if (!board.includes('')) {
        message.innerText = 'Draw!';
        isGameActive = false;
        return true;
    }

    return false;
}

function computerMove() {
    // Find the first available cell and make the move
    let availableCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
    if (availableCells.length > 0) {
        let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
        board[randomIndex] = 'O';
        cells[randomIndex].innerText = 'O';

        if (!handleResultValidation()) {
            currentPlayer = 'X'; // Switch back to human player
        }
    }
}

function userAction(cell, index) {
    if (board[index] === '' && isGameActive) {
        board[index] = 'X';
        cell.innerText = 'X';
        if (!handleResultValidation()) {
            currentPlayer = 'O';  // Computer plays after human
            setTimeout(computerMove, 500);  // Add a slight delay for realism
        }
    }
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (currentPlayer === 'X') {
            userAction(cell, index);
        }
    });
});

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.innerText = '');
    isGameActive = true;
    currentPlayer = 'X';
    message.innerText = '';
});
