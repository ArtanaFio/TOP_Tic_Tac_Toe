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

    // method to check for win and tie conditions
    function checkWinTie(row, column, symbol) {
        //if () {
            //console.log(``);
        //s}

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
console.log("Gameboard array:");
console.log(gameboardModule.getGameboard());
gameboardModule.insertSymbols(1, 1, 'X');
console.log("Gameboard array after inserting 'X' in the middle:");
console.log(gameboardModule.getGameboard());


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
console.log(`Player 1: ${createPlayer("Elsie", "O").detail()}`);
console.log(`Player 2: ${createPlayer("Robert", "X").detail()}`);

// IIFE to create the game flow controller object and methods to track players' turn, validate moves, check for win/tie conditions, handle game reset
const gameControllerModule = (function(){
    // track players' turn
    // switch turns between player
    // validate move
    // check win/tie conditions
    // game reset
})();