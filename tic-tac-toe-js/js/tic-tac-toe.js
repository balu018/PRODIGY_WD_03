const N_SIZE = 3;
const EMPTY = '&nbsp;';
let turn = 'X';
let board;
let moves;

function init() {
    const gameBoard = document.createElement('table');
    gameBoard.setAttribute('border', 1);
    gameBoard.setAttribute('cellspacing', 0);

    board = Array.from({ length: N_SIZE }, () => Array(N_SIZE).fill(EMPTY));

    for (let i = 0; i < N_SIZE; i++) {
        const row = document.createElement('tr');
        gameBoard.appendChild(row);
        for (let j = 0; j < N_SIZE; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');
            cell.addEventListener('click', () => makeMove(cell, i, j));
            row.appendChild(cell);
        }
    }

    document.getElementById('tictactoe').appendChild(gameBoard);
    startNewGame();
}

function startNewGame() {
    moves = 0;
    turn = 'X';
    board = Array.from({ length: N_SIZE }, () => Array(N_SIZE).fill(EMPTY));
    document.querySelectorAll('td').forEach(cell => {
        cell.innerHTML = EMPTY;
        cell.classList.remove('win');
    });
    document.getElementById('turn').textContent = 'Player ' + turn;
}

function makeMove(cell, row, col) {
    if (cell.innerHTML !== EMPTY) return;
    cell.innerHTML = turn;
    board[row][col] = turn;
    moves += 1;

    if (checkWin(row, col)) {
        alert('Winner: Player ' + turn);
        startNewGame();
    } else if (moves === N_SIZE * N_SIZE) {
        alert('Draw');
        startNewGame();
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = 'Player ' + turn;
    }
}

function checkWin(row, col) {
    return (
        board[row].every(cell => cell === turn) || 
        board.every(row => row[col] === turn) || 
        (row === col && board.every((_, idx) => board[idx][idx] === turn)) || 
        (row + col === N_SIZE - 1 && board.every((_, idx) => board[idx][N_SIZE - idx - 1] === turn))
    );
}

init();

document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark', this.checked);
});
