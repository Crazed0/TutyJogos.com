document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const bestscoreDisplay = document.getElementById('bestscore')
    const resultDisplay = document.getElementById('result');
    let squares = [];
    const width = 4;
    let score = 0;
    let bestscore = 0;
    let myTimer;
    let countdown = 0;

    // create the playing board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }
    createBoard();

    // generate a new number
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            addColours();
            checkForGameOver();
        } else {
            generate();
        }
    }

    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML
                let totalTwo = squares[i + 1].innerHTML
                let totalThree = squares[i + 2].innerHTML
                let totalFour = squares[i + 3].innerHTML
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

                let filteredRow = row.filter(num => num)
                let missing = 4 - filteredRow.length
                let zeros = Array(missing).fill(0)
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0]
                squares[i + 1].innerHTML = newRow[1]
                squares[i + 2].innerHTML = newRow[2]
                squares[i + 3].innerHTML = newRow[3]
            }
        }
    }

    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = filteredColumn.concat(zeros)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + width].innerHTML
            let totalThree = squares[i + (width * 2)].innerHTML
            let totalFour = squares[i + (width * 3)].innerHTML
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filteredColumn = column.filter(num => num)
            let missing = 4 - filteredColumn.length
            let zeros = Array(missing).fill(0)
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0]
            squares[i + width].innerHTML = newColumn[1]
            squares[i + (width * 2)].innerHTML = newColumn[2]
            squares[i + (width * 3)].innerHTML = newColumn[3]
        }
    }

    // assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    // restart game after losing
    function restartGame() {
        clearInterval(myTimer);
        resultDisplay.innerHTML = '';
        score = 0;
        scoreDisplay.innerHTML = score;
        for (let i = 0; i < squares.length; i++) {
            squares[i].innerHTML = 0;
        }
        generate();
        generate();
        myTimer = setInterval(addColours, 50);
    }

    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + 1].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combinedTotal
                squares[i + width].innerHTML = 0
                score += combinedTotal
                scoreDisplay.innerHTML = score
            }
        }
        checkForWin()
    }

    //assign functions to keyCodes
    function control(e) {
        if (e.keyCode === 37) {
            keyLeft()
        } else if (e.keyCode === 38) {
            keyUp()
        } else if (e.keyCode === 39) {
            keyRight()
        } else if (e.keyCode === 40) {
            keyDown()
        }
    }
    document.addEventListener('keyup', control)

    function keyRight() {
        moveRight()
        combineRow()
        moveRight()
        generate()
    }

    function keyLeft() {
        moveLeft()
        combineRow()
        moveLeft()
        generate()
    }

    function keyUp() {
        moveUp()
        combineColumn()
        moveUp()
        generate()
    }

    function keyDown() {
        moveDown()
        combineColumn()
        moveDown()
        generate()
    }

    //check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = 'Ganhaste!'
                document.removeEventListener('keyup', control)
                setTimeout(() => clear(), 3000)
            }
        }
    }

    function restarttimer() {
        if (countdown) {
            resultDisplay.innerHTML = `A reiniciar em ${countdown} segundos`;
            countdown--;
            setTimeout(restarttimer, 1000);
        } else {
            restartGame();
        }
    }

    //clear timer
    function clear() {
        clearInterval(myTimer)
    }


    //add colours
    function addColours() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) squares[i].style.backgroundColor = '#afa192'
            else if (squares[i].innerHTML == 2) squares[i].style.backgroundColor = '#eee4da'
            else if (squares[i].innerHTML == 4) squares[i].style.backgroundColor = '#ede0c8'
            else if (squares[i].innerHTML == 8) squares[i].style.backgroundColor = '#f2b179'
            else if (squares[i].innerHTML == 16) squares[i].style.backgroundColor = '#ffcea4'
            else if (squares[i].innerHTML == 32) squares[i].style.backgroundColor = '#e8c064'
            else if (squares[i].innerHTML == 64) squares[i].style.backgroundColor = '#ffab6e'
            else if (squares[i].innerHTML == 128) squares[i].style.backgroundColor = '#fd9982'
            else if (squares[i].innerHTML == 256) squares[i].style.backgroundColor = '#ead79c'
            else if (squares[i].innerHTML == 512) squares[i].style.backgroundColor = '#76daff'
            else if (squares[i].innerHTML == 1024) squares[i].style.backgroundColor = '#beeaa5'
            else if (squares[i].innerHTML == 2048) squares[i].style.backgroundColor = '#d7d4f0'
        }
    }
    addColours()

    myTimer = setInterval(addColours, 50)

    // add event listener for keyup
    document.addEventListener('keyup', control);

    function control(e) {
        if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function checkForGameOver() {
        // Check if there are any available moves
        if (!canMoveLeft() && !canMoveRight() && !canMoveUp() && !canMoveDown()) {
            resultDisplay.innerHTML = 'Perdeste!';
            if (score > bestscore) {
                bestscoreDisplay.innerHTML = score;
            }
            countdown = 3;
            setTimeout(restarttimer, 1000);
        }
    }

    // Function to check if there are any available moves to the left
    function canMoveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 !== 0 && squares[i].innerHTML !== '0') {
                if (squares[i - 1].innerHTML === '0' || squares[i - 1].innerHTML === squares[i].innerHTML) {
                    return true;
                }
            }
        }
        return false;
    }

    // Function to check if there are any available moves to the right
    function canMoveRight() {
        for (let i = 0; i < 16; i++) {
            if ((i + 1) % 4 !== 0 && squares[i].innerHTML !== '0') {
                if (squares[i + 1].innerHTML === '0' || squares[i + 1].innerHTML === squares[i].innerHTML) {
                    return true;
                }
            }
        }
        return false;
    }

    // Function to check if there are any available moves upwards
    function canMoveUp() {
        for (let i = 0; i < 16; i++) {
            if (i >= 4 && squares[i].innerHTML !== '0') {
                if (squares[i - 4].innerHTML === '0' || squares[i - 4].innerHTML === squares[i].innerHTML) {
                    return true;
                }
            }
        }
        return false;
    }

    // Function to check if there are any available moves downwards
    function canMoveDown() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML !== '0') {
                if (squares[i + 4].innerHTML === '0' || squares[i + 4].innerHTML === squares[i].innerHTML) {
                    return true;
                }
            }
        }
        return false;
    }
});

// Add the click event listeners for the buttons
document.getElementById('left').addEventListener('click', keyLeft);
document.getElementById('up').addEventListener('click', keyUp);
document.getElementById('down').addEventListener('click', keyDown);
document.getElementById('right').addEventListener('click', keyRight);

function back() {
    window.location.href = "file:///C:/Users/USER/Desktop/website/index.html"; // Redirect to the other game page
}