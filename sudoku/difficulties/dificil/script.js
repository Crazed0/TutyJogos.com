const difficultyLevel = `dificil`
let usingNumber = null

function printBoard(board) {
    for (let i = 0; i < 9; i++) {
        if (i % 3 === 0 && i !== 0) {
            console.log("- - - - - - - - - - - - ");
        }
        for (let j = 0; j < 9; j++) {
            if (j % 3 === 0 && j !== 0) {
                process.stdout.write("| ");
            }
            process.stdout.write(board[i][j] + " ");
        }
        console.log();
    }
}

function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num || board[Math.floor(row / 3) * 3 + Math.floor(x / 3)][Math.floor(col / 3) * 3 + x % 3] === num) {
            return false;
        }
    }
    return true;
}

function solveSudoku(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) {
                            return true;
                        } else {
                            board[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateSudoku() {
    const sudokuBoard = document.getElementById('sudoku-board');
    const size = 9;
    const board = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
    fillSudoku(board, difficultyLevel);
    renderSudoku(board, sudokuBoard);
}

function fillSudoku(board, difficultyLevel) {
    let filledCells;
    switch (difficultyLevel) {
        case 'superfacil':
            filledCells = Math.floor(Math.random() * 5) + 60; // Adjusted range for very easy level
            break;
        case 'facil':
            filledCells = Math.floor(Math.random() * 5) + 45; // Adjusted range for very easy level
            break;
        case 'medio':
            filledCells = Math.floor(Math.random() * 5) + 35; // Adjusted range for easy level
            break;
        case 'dificil':
            filledCells = Math.floor(Math.random() * 5) + 30; // Adjusted range for medium level
            break;
        case 'professional':
            filledCells = Math.floor(Math.random() * 5) + 25; // Adjusted range for hard level
            break;
        case 'perito':
            filledCells = Math.floor(Math.random() * 5) + 15; // Adjusted range for very hard level
            break;
        case 'deus':
            filledCells = Math.floor(Math.random() * 5) + 9; // Adjusted range for insane level
            break;
        default:
            filledCells = Math.floor(Math.random() * 5) + 45; // Default to very_easy level
            break;
    }
    console.log(difficultyLevel);

    let count = 0;
    while (count < filledCells) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        const num = Math.floor(Math.random() * 9) + 1;

        if (board[row][col] === 0 && isSafe(board, row, col, num)) {
            board[row][col] = num;
            count++;
        }
    }
}

function renderSudoku(board, sudokuBoard) {
    // Clear the Sudoku board
    sudokuBoard.innerHTML = '';

    // Add number buttons above the board
    const numberButtons = document.querySelectorAll('.number-button');

    // Add click event listener to each number button
    numberButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            usingNumber = event.target.textContent;
            console.log("Using number:", usingNumber);
        });
    });

    // Render each cell in the Sudoku board
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('sudoku-cell');
            if (cell !== 0) {
              cellElement.classList.add('pre-filled');
            }
            cellElement.textContent = cell !== 0 ? cell : '';
            cellElement.contentEditable = false;
            if (cell === 0) {
                cellElement.addEventListener('click', () => {
                    if (usingNumber !== null) {
                        const num = parseInt(usingNumber);
                        if (isSafe(board, rowIndex, colIndex, num)) {
                            board[rowIndex][colIndex] = num;
                            cellElement.textContent = num;
                        }
                    }
                });
            }
            sudokuBoard.appendChild(cellElement);
        });
    });
}



function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num || board[Math.floor(row / 3) * 3 + Math.floor(x / 3)][Math.floor(col / 3) * 3 + x % 3] === num) {
            return false;
        }
    }
    return true;
}

function back() {
    window.location.href = "https://tutyjogos.pt/sudoku/selector/difficulty.html"; // Redirect to the other game page
}

function checkSudokuSolved(board) {
    // Check if all cells are filled
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return false; // If any cell is empty, Sudoku is not solved
            }
        }
    }

    // Check rows and columns
    for (let i = 0; i < 9; i++) {
        const rowSet = new Set();
        const colSet = new Set();
        for (let j = 0; j < 9; j++) {
            if (rowSet.has(board[i][j]) || colSet.has(board[j][i])) {
                return false; // If there are duplicates in rows or columns, Sudoku is not solved
            }
            rowSet.add(board[i][j]);
            colSet.add(board[j][i]);
        }
    }

    // Check 3x3 squares
    for (let row = 0; row < 9; row += 3) {
        for (let col = 0; col < 9; col += 3) {
            const squareSet = new Set();
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (squareSet.has(board[row + i][col + j])) {
                        return false; // If there are duplicates in 3x3 squares, Sudoku is not solved
                    }
                    squareSet.add(board[row + i][col + j]);
                }
            }
        }
    }

    return true; // Sudoku is solved if it passes all checks
}

function generateSudoku() {
    const sudokuBoard = document.getElementById('sudoku-board');
    const size = 9;
    const board = Array.from({ length: size }, () => Array.from({ length: size }, () => 0));
    fillSudoku(board, difficultyLevel);
    renderSudoku(board, sudokuBoard);

    // Add event listener to solve button
    const solveButton = document.getElementById('solve-button');
    solveButton.addEventListener('click', function() {
        solveSudoku(board); // Call solveSudoku function when the solve button is clicked
        renderSudoku(board, sudokuBoard); // Render the solved Sudoku board
    });
}



