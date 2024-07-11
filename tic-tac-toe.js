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
    
    // method to insert player symbols into the gameboard
    function insertSymbols(row, column, symbol) {
        // define gameboard spaces using rows and columns based on the array's indices: array[row][column]
        if (row >= 0 && row < gameboard.length) {
            if (column >= 0 && column < gameboard[row].length) {
                if (gameboard[row][column] === "") {
                    // to insert the symbol, use splice()
                    gameboard[row].splice(column, 1, symbol);
                } else {
                    console.log(`row ${row}, column ${column} is already filled. Choose another space`);
                }
            }
        }
    }
    
    // turns the method getGameboard() into an object, 
    // which the user can access outside the IIFE by calling the method
    // using gameboardModule.getGameboard()
    // this ultimately allows access to the current state of the gameboard
    return {
        getGameboard: getGameboard,
        insertSymbols: insertSymbols
    };
})();
// method call: IIFEobject.methodOfObject() to show the gameboard in the console
let grid = gameboardModule.getGameboard();
console.log("Gameboard array:");
console.log(grid);
gameboardModule.insertSymbols(1, 1, 'X');
console.log("Gameboard array after inserting 'X' in the middle:");
console.log(grid);





// Factory function to create player objects
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
const player1 = createPlayer("Elsie", "O");
const player2 = createPlayer("Robert", "X");
console.log(`Player 1: ${player1.detail()}`);
console.log(`Player 2: ${player2.detail()}`);

// IIFE to create the game flow controller object and methods to track players' turn, validate moves, check for win/tie conditions, handle game reset
const gameControllerModule = (function(){
    // track players' turn
    // switch turns between player
    // validate move
    // check win/tie conditions
    // game reset
})();