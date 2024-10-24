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

function findWinningMove(player) {
    // Look for an opportunity to win when it's computer turn
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // If two O are aligned plays the third
        if (a === player && b === player && c === '') return winCondition[2];
        if (a === player && c === player && b === '') return winCondition[1];
        if (b === player && c === player && a === '') return winCondition[0];
    }
    return null;
}

function computerMove() {
    if (!isGameActive) return;

    // Look for winning opportunity
    let winningMove = findWinningMove('O');
    
    // If found plays it
    if (winningMove !== null) {
        board[winningMove] = 'O';
        cells[winningMove].innerText = 'O';
    } else {
        // Else check if human is about to win and block it
        let blockingMove = findWinningMove('X');
        if (blockingMove !== null) {
            board[blockingMove] = 'O';
            cells[blockingMove].innerText = 'O';
        } else {
            // Else plays randomly
            let availableCells = board.map((val, index) => val === '' ? index : null).filter(val => val !== null);
            if (availableCells.length > 0) {
                let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
                board[randomIndex] = 'O';
                cells[randomIndex].innerText = 'O';
            }
        }
    }

    if (!handleResultValidation()) {
        currentPlayer = 'X';  // Then human turn again
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
