
function updateCopyrightYear() {
    const copyrightYear = document.querySelector(".year");

    copyrightYear.textContent = new Date().getFullYear();
};
updateCopyrightYear();



// IIFE to create the gameboard object and methods to interact with it
const gameboardModule = (function() {
    const gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];

    function getGameboard() {
        return gameboard;
    }

    const allSquares = document.querySelectorAll(".square");

        allSquares.forEach((square) => {
            square.addEventListener("click", () => {
                square.classList.add("selected");
                console.log(square.id);
            })
        })
    
    function insertSymbol(row, column, symbol) {
        
        if (row >= 0 && row < gameboard.length) {
            if (column >= 0 && column < gameboard[row].length) {
                if (gameboard[row][column] === "") {
                    gameboard[row][column] = symbol;
                    if (checkWinTie(symbol)) {
                        gameControllerModule.setGameOver(true);
                    }; 
                } else {
                    console.log(`row ${row}, column ${column} is already filled. Choose another space`);
                }
            }
        }
    }

    function checkWinTie(symbol) {
        if ((gameboard[0][0] === symbol && gameboard[0][1] === symbol && gameboard[0][2] === symbol) || 
        (gameboard[1][0] === symbol && gameboard[1][1] === symbol && gameboard[1][2] === symbol) || 
        (gameboard[2][0] === symbol && gameboard[2][1] === symbol && gameboard[2][2] === symbol) || 
        (gameboard[0][0] === symbol && gameboard[1][0] === symbol && gameboard[2][0] === symbol) || 
        (gameboard[0][1] === symbol && gameboard[1][1] === symbol && gameboard[2][1] === symbol) || 
        (gameboard[0][2] === symbol && gameboard[1][2] === symbol && gameboard[2][2] === symbol) || 
        (gameboard[0][0] === symbol && gameboard[1][1] === symbol && gameboard[2][2] === symbol) || 
        (gameboard[0][2] === symbol && gameboard[1][1] === symbol && gameboard[2][0] === symbol)) {
            console.log(`${gameControllerModule.getCurrentPlayer().name} wins!`);
            return true;
        } else {
            console.log("keep playing the game");
        }

        let tie = true;
        for (let row = 0; row < gameboard.length; row++) {
            for (let column = 0; column < gameboard[row].length; column++) {
                if (gameboard[row][column] === "") {
                    tie = false;
                    break;
                }
            }
            if (!tie) break;
        }
        if (tie) {
            console.log("It's a tie");
            return true;
        }

        return false;
    }

    function resetGameboard() {
        for (let row = 0; row < gameboard.length; row++) {
            for (let column = 0; column < gameboard[row].length; column++) {
                gameboard[row][column] = "";
            }
        }
    }
    
    return {
        getGameboard: getGameboard,
        insertSymbol: insertSymbol,
        resetGameboard: resetGameboard
    };
})();

const createPlayer = (name, symbol) => {
    const player = {
        name: name,
        symbol: symbol,
        detail: () => {
            return `${player.name} is using ${player.symbol}`;
        }
    };
    return player;
};


// IIFE to create the game flow controller object and methods to track players' turn, validate moves, check for win/tie conditions, handle game reset
const gameControllerModule = (function(){
    let currentPlayer;
    let playerOne;
    let playerTwo;
    let toggle = false;
    let gameOver = false;

    function startGame() {
        const resultsBox =document.getElementById("results");
        const startButton = document.getElementById("start-button");
        const startPopup = document.getElementById("start-modal");
        const submitButton = document.getElementById("submit-button");

        const playerOneStats = document.getElementById("one-stats");
        const playerTwoStats = document.getElementById("two-stats");
        const displayPlayerOneName = document.getElementById("name-one");
        const displayPlayerTwoName = document.getElementById("name-two");
        const displayPlayOneSymbol = document.getElementById("first-symbol");
        const displayPlayTwoSymbol = document.getElementById("second-symbol");

        startButton.addEventListener("click", () => {
            startButton.classList.add("invisible");
            startPopup.classList.remove("invisible");
            startPopup.classList.add("flex");        
        })
    
        submitButton.addEventListener("click", (event) => {
            event.preventDefault();

            const playerOneName = document.getElementById("player-one-name").value;
            const playerTwoName = document.getElementById("player-two-name").value;
            const playerOneSymbol = document.getElementById("player-one-symbol").value;
            const playerTwoSymbol = document.getElementById("player-two-symbol").value;

            if (playerOneName !== "" && playerTwoName !== "" && playerOneSymbol !== "" && playerTwoSymbol !== "") {
                if (playerOneSymbol !== playerTwoSymbol) {
                    playerOne = createPlayer(playerOneName, playerOneSymbol);
                    playerTwo = createPlayer(playerTwoName, playerTwoSymbol);
                    console.log(`Player 1: ${playerOne.detail()}`);
                    console.log(`Player 2: ${playerTwo.detail()}`);
                    startPopup.classList.remove("flex");
                    startPopup.classList.add("invisible");
                    resultsBox.style.width = "10px";
                    playerOneStats.classList.remove("invisible");
                    playerTwoStats.classList.remove("invisible");
                    displayPlayerOneName.textContent = `${playerOne.name}`;
                    displayPlayerTwoName.textContent = `${playerTwo.name}`;
                    displayPlayOneSymbol.textContent = `${playerOne.symbol}`;
                    displayPlayTwoSymbol.textContent = `${playerTwo.symbol}`;
                } else {
                    alert("The symbols can't be the same");
                }
            } else {
                alert("You're missing something");
            }
        });
    }

    function getCurrentPlayer() {
        return currentPlayer;
    }

    function switchPlayers(row, column) {    
        if (gameOver) {
            console.log('Game over, no more moves');
            return;
        }

        console.log(`${currentPlayer.name} is playing this turn`);
        if (gameboardModule.getGameboard()[row][column] === '') {
            gameboardModule.insertSymbol(row, column, currentPlayer.symbol);
            if (gameOver) {
                console.log("The game is over, no more valid moves. Reset the game to play a new game");
            } else {
                currentPlayer = toggle ? playerOne : playerTwo;
                toggle = !toggle;
                console.log(`${currentPlayer.name} is playing the next turn`);
            }
        } else {
            console.log(`You cannot make that move, choose a new space, ${currentPlayer.name}`);
        }
    }

    function setGameOver(value) {
        gameOver = value;
    }

    function resetGame() {
        gameboardModule.resetGameboard();
        currentPlayer = playerOne;
        toggle = false;
        gameOver = false;
        console.log(`You've reset the game and ${currentPlayer.name} is starting the new game.`);
    }

    return {
        startGame: startGame,
        getCurrentPlayer: getCurrentPlayer,
        switchPlayers: switchPlayers,
        setGameOver: setGameOver,
        resetGame: resetGame
    };
})();

gameControllerModule.startGame();

document.getElementById("submit-button").addEventListener("click", () => {
    const playerOne = gameControllerModule.getCurrentPlayer();
    if (playerOne) {
        console.log(`This should display Player 1: ${playerOne.detail()}`);
    }
})

