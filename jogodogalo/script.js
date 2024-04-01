document.addEventListener('DOMContentLoaded', function () {
    const cells = document.querySelectorAll('.cell');
    const status = document.getElementById('status');
    const result = document.getElementById('result');
    const resetButton = document.getElementById('reset-btn');
    let currentPlayer = 'X';
    let winner = null;
    let countdown = null;
    let scoreO = 0, scoreX = 0;

    // Add event listeners to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (!cell.textContent && !winner) {
                cell.textContent = currentPlayer;
                checkWin();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Vez do Jogador ${currentPlayer}`;

                if (isBoardFull()) {
                    countdown = 3;
                    highlightDrawCells([0, 1, 2, 3, 4, 5, 6, 7, 8])
                }
            }
        });
    });

    // Function to check if the board is full
    function isBoardFull() {
        return [...cells].every(cell => cell.textContent);
    }

    // Function to start the countdown
    function startCountdown() {
        if (countdown) {
            status.textContent = `A reiniciar em ${countdown} segundos`;
            countdown--;
            setTimeout(startCountdown, 1000);
        } else {
            resetBoard();
        }
    }

    // Function to reset the board
    function resetBoard() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winner');
            cell.classList.remove('draw');
        });
        currentPlayer = 'X';
        winner = null;
        status.textContent = 'Vez do Jogador X';
        result.textContent = '';

        countdown = null;
    }

    // Function to check for a winner
    function checkWin() {
        if (winner) {
            return;
        }
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
            [0, 4, 8], [2, 4, 6]             // Diagonal
        ];
        winningCombos.forEach(combo => {
            const [a, b, c] = combo;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                winner = cells[a].textContent;
                highlightWinningCells(combo);
                status.textContent = `Jogador ${winner} venceu!`;
                switch (winner) {
                    case "X":
                        scoreX++;
                        break;

                    case "O":
                        scoreO++;
                        break;
                }
                updateScore();
            }
        });
    }

    // Function to highlight the winning cells
    function highlightWinningCells(cellsIndexes) {
        cellsIndexes.forEach(index => {
            cells[index].classList.add('winner');
            countdown = 3;
        });
        setTimeout(startCountdown,1000)
    }

    function highlightDrawCells(cellsIndexes) {
        cellsIndexes.forEach(index => {
            cells[index].classList.add('draw');
        });
        startCountdown();
    }

    function updateScore () {
        document.getElementById("score").innerHTML = `Jogador X = ${scoreX} | Jogador O = ${scoreO}`;
    }
});

function back() {
    window.location.href = "file:///C:/Users/USER/Desktop/website/index.html"; // Redirect to the other game page
}