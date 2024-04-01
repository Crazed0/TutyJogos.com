const words = [
    "amor", "felicidade", "paz", "familia", "amigo",
    "saude", "comida", "agua", "casa", "escola",
    "trabalho", "natureza", "sol", "lua", "estrela",
    "ceu", "terra", "mar", "rio", "montanha",
    "praia", "floresta", "animais", "cachorro", "gato",
    "passaro", "peixe", "arvore", "flor", "fruta",
    "maca", "banana", "laranja", "morango", "uva",
    "abacaxi", "limao", "melancia", "chocolate",
    "bolo", "pao", "queijo", "arroz", "feijao",
    "carne", "frango", "peixe", "verdura", "batata"
];

let usedWords = [];
let randomWordIndex = -1;
let correctGuesses = 0;
let wrongGuesses = 0;


function shuffleWord(word) {
    return word.split('').sort(function(){return 0.5-Math.random()}).join('');
}

function displayWord() {
    // Check if all words have been unscrambled
    if (usedWords.length === words.length) {
        alert("Parabéns! Você desembaralhou todas as palavras!");
        usedWords = [];
        displayFoundWords();
    }

    let originalWord = "";
    // Keep selecting a random word until it's not used
    do {
        randomWordIndex = Math.floor(Math.random() * words.length);
        originalWord = words[randomWordIndex];
    } while (usedWords.includes(originalWord));

    usedWords.push(originalWord);

    let scrambledWord = "";
    // Keep scrambling until it's different from the original word
    do {
        scrambledWord = shuffleWord(originalWord);
    } while (scrambledWord === originalWord);

    document.getElementById("word").innerHTML = scrambledWord;
}

function checkAnswer() {
    const guess = document.getElementById("guess").value.toLowerCase();
    if (guess === words[randomWordIndex]) {
        correctGuesses++;
        document.getElementById("score").innerHTML = `Palavras Encontradas: ${correctGuesses} | Erros: ${wrongGuesses}`;
        displayFoundWords();
        setTimeout(newWord, 500); // Restart after 0.5 seconds
    } else {
        wrongGuesses++;
        document.getElementById("score").innerHTML = `Palavras Encontradas: ${correctGuesses} | Erros: ${wrongGuesses}`;
    }
}

function displayFoundWords() {
    const foundWordsList = document.getElementById("found-words-list");
    foundWordsList.innerHTML = ""; // Clear previous list

    usedWords.forEach(word => {
        const listItem = document.createElement("li");
        listItem.textContent = word;
        foundWordsList.appendChild(listItem);
    });
}


function newWord() {
    document.getElementById("guess").value = "";
    displayWord();
}

// Display initial word on page load
displayWord();

// Add input event listener to the text input field
document.getElementById("guess").addEventListener("input", function() {
    checkAnswer();
});

function back() {
    window.location.href = "https://tutyjogos.pt/index.html"; // Redirect to the other game page
}

// Add event listener for Enter key press
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        darDica();
    }
    // Check if the pressed key is the space bar
    if (event.key === " ") {
        // Prevent the default behavior of the space key (typing a space)
        event.preventDefault();
    }
});

function darDica() {
    const word = words[randomWordIndex];
    const guessInput = document.getElementById("guess");
    const guess = guessInput.value.toLowerCase();
    // Check if the word is already guessed or partially guessed
    if (guess === word || word.startsWith(guess)) {
        // Find the next letter to reveal
        let nextLetter = "";
        for (let i = 0; i < Math.ceil(word.length / 3); i++) {
            if (!guess.includes(word[i])) {
                nextLetter = word[i];
                break;
            }
        }
        // Update the guess input field with the revealed letter
        guessInput.value += nextLetter;
    }
}

// Modify the checkAnswer function to handle automatic checking and hints
function checkAnswer() {
    const guess = document.getElementById("guess").value.toLowerCase();
    const word = words[randomWordIndex];
    if (guess === word) {
        correctGuesses++;
        document.getElementById("score").innerHTML = `Palavras Encontradas: ${correctGuesses} | Erros: ${wrongGuesses}`;
        displayFoundWords();
        setTimeout(newWord, 500); // Restart after 0.5 seconds
        // Clear the input field
        document.getElementById("guess").value = "";
    } else if (word.startsWith(guess)) {
        // If the entered letters match the beginning of the word, allow further input
        return;
    } else {
        wrongGuesses++;
        document.getElementById("score").innerHTML = `Palavras Encontradas: ${correctGuesses} | Erros: ${wrongGuesses}`;
    }
}


