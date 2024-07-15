// Use factory functions as much as possible
// Use IIFE for single instance: gameboard, displayController

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
    
    function insertSymbols(row, column, symbol) {
        
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
    
    return {
        getGameboard: getGameboard,
        insertSymbols: insertSymbols,
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

let grid = gameboardModule.getGameboard(); // remove later

// IIFE to create the game flow controller object and methods to track players' turn, validate moves, check for win/tie conditions, handle game reset
const gameControllerModule = (function(){
    const playerOne = createPlayer("Elsie", "O");
    const playerTwo = createPlayer("Robert", "X");

    console.log(`Player 1: ${playerOne.detail()}`);
    console.log(`Player 2: ${playerTwo.detail()}`);

    let currentPlayer = playerOne;
    let toggle = false;
    let gameOver = false;

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
            gameboardModule.insertSymbols(row, column, currentPlayer.symbol);
            currentPlayer = toggle ? playerOne : playerTwo;
            toggle = !toggle;
            console.log(`${currentPlayer.name} is playing the next turn`);
        } else {
            console.log(`You cannot make that move, choose a new space, ${currentPlayer.name}`);
        }
    }

    function setGameOver(value) {
        gameOver = value;
    }

    return {
        getCurrentPlayer: getCurrentPlayer,
        switchPlayers: switchPlayers,
        setGameOver: setGameOver
    };
})();

console.log(`${gameControllerModule.getCurrentPlayer().name} is playing first`);
console.log(grid);
