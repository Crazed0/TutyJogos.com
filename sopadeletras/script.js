const palavras = [
    "CASA", "CARRO", "LIVRO", "ESCOLA", "COMPUTADOR",
    "MESA", "CADEIRA", "LAPIS", "CANETA", "GATO",
    "CACHORRO", "FUTEBOL", "BICICLETA", "TECLADO", "JANELA",
    "BANANA", "ABACAXI", "MORANGO", "LARANJA", "MACA",
    "CHOCOLATE", "PIPOCA", "PAO", "QUEIJO",
    "CAVALO", "BICHO", "GATO", "CACHORRO", "RATO",
    "FLORESTA", "RIO", "LAGO", "MONTANHA", "PRAIA",
    "CAMPO", "ESTRELA", "SOL", "LUA", "TERRA",
    "MARTE", "VENUS", "JUPITER", "SATURNO", "URANO",
    "NEPTUNO", "PLUTAO", "ASTRO", "COMETA", "GALAXIA",
    "PLANETA", "ORBITA", "ESTACAO", "ESPACO", "SATELITE",
    "FOGUETE", "NAVE", "EXPLORACAO", "ASTRONAUTA", "ECLIPSE",
    "COSMOS", "CONSTELACAO", "ESTELA", "NEBULOSA", "BURACO",
    "NEGRO", "COSMO", "CIENCIA", "ASTRONOMIA", "ASTROFISICA",
    "TELESCOPIO", "BINOCULO", "OBSERVATORIO", "PLANISFERIO", "ESFERA",
    "MAGNETISMO", "GRAVIDADE", "ELETROMAGNETISMO", "FISICA", "QUIMICA",
    "BIOLOGIA", "GEOLOGIA", "COSMOLOGIA", "EVOLUCAO", "BIG",
    "BANG", "RELATIVIDADE", "EINSTEIN", "NEWTON", "KEPLER",
    "GALILEU", "HUBBLE", "TEORIA", "MODELO", "EQUACAO"
];

const sopaDeLetras = document.getElementById('sopa-de-letras');
const listaPalavras = document.createElement('ul');
let selectedPalavras;
document.body.appendChild(listaPalavras);

const grid = [];
let todasEncontradas = [];
let palavrasporencontrar = palavras.splice();
let palavrasusadas = [];
let palavrasencontradas = 0;

function gerarSopaDeLetras() {
    for (let i = 0; i < 10; i++) {
        grid[i] = [];
        for (let j = 0; j < 10; j++) {
            grid[i][j] = ''; // Initialize the grid with empty spaces
            const cell = document.createElement('div');
            cell.classList.add('celula');
            cell.dataset.row = i;
            cell.dataset.col = j;
            sopaDeLetras.appendChild(cell);
        }
    }

    preencherEspacosVazios();
    colocarPalavras();
}


function preencherEspacosVazios() {
    const celulasVazias = document.querySelectorAll('.celula');
    celulasVazias.forEach(celula => {
        if (celula.textContent === '') {
            celula.textContent = gerarLetraAleatoria();
        }
    });
}

function colocarPalavras() {
    const shuffledPalavras = palavras.slice().sort(() => Math.random() - 0.5);
    selectedPalavras = shuffledPalavras.slice(0, 5);
    selectedPalavras.forEach(palavra => {
        let direction;
        let row, col;
        do {
            direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
            row = Math.floor(Math.random() * 10);
            col = Math.floor(Math.random() * 10);
        } while (!palavraPodeSerColocada(palavra, row, col, direction));

        colocarPalavra(palavra, row, col, direction);
    });
}


function palavraPodeSerColocada(palavra, row, col, direction) {
    if (direction === 'horizontal') {
        if (col + palavra.length > 10) return false;
        for (let j = 0; j < palavra.length; j++) {
            if (grid[row][col + j] !== '' && grid[row][col + j] !== palavra[j]) {
                return false;
            }
        }
        return true;
    } else {
        if (row + palavra.length > 10) return false;
        for (let j = 0; j < palavra.length; j++) {
            if (grid[row + j][col] !== '' && grid[row + j][col] !== palavra[j]) {
                return false;
            }
        }
        return true;
    }
}

function colocarPalavra(palavra, row, col, direction) {
    const cells = [];
    palavrasusadas.push(palavra);
    document.getElementById("palavrasnasopa1").innerHTML = palavrasusadas.join(" || ");

    if (direction === 'horizontal') {
        for (let j = 0; j < palavra.length; j++) {
            const cell = sopaDeLetras.querySelector(`.celula[data-row='${row}'][data-col='${col + j}']`);
            grid[row][col + j] = palavra[j]; // Atualiza a grade com a letra
            cells.push(cell);
            cell.textContent = palavra[j];
        }
    } else {
        for (let j = 0; j < palavra.length; j++) {
            const cell = sopaDeLetras.querySelector(`.celula[data-row='${row + j}'][data-col='${col}']`);
            grid[row + j][col] = palavra[j]; // Atualiza a grade com a letra
            cells.push(cell);
            cell.textContent = palavra[j];
        }
    }

    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            selecionarPalavra(cells, palavra);
        });
    });
}

function selecionarPalavra(cells, palavra) {
    const todasSelecionadas = cells.every(cell => cell.classList.contains('selecionada'));

    if (!todasSelecionadas) {
        cells.forEach(cell => {
            cell.classList.add('selecionada');
        });
        updatePalavrasNaoEncontradas(palavra);
    }
}


function updatePalavrasNaoEncontradas(palavra) {
    const index = palavrasusadas.indexOf(palavra);
    if (index > -1) {
        palavrasusadas.splice(index, 1);
    }
    palavrasencontradas++;
    document.getElementById("palavrasnasopa1").innerHTML = palavrasusadas.join(" || ");
    document.getElementById("palavrasencontradas").innerHTML = `Palavras Encontradas: ${palavrasencontradas}`;

    if (palavrasusadas.length == 0) {
        setTimeout(reiniciarJogo,2000);
    }
}

function reiniciarJogo() {
    todasEncontradas = [];
    palavrasporencontrar = palavras.slice();
    sopaDeLetras.innerHTML = '';
    listaPalavras.innerHTML = '';
    palavrasusadas = [];
    gerarSopaDeLetras();
}


function gerarLetraAleatoria() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letras.charAt(Math.floor(Math.random() * letras.length));
}

gerarSopaDeLetras();

function back() {
    window.location.href = "https://tutyjogos.pt/index.html"; // Redirect to the other game page
}