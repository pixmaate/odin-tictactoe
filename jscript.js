//// GLOBAL SCOPE DECLARATIONS IF ANY /////




/// The Gameboard Object ////

const gameBoard = (function () {
    const playBoard = [];
    for (i=0;i<9;i++) {
        playBoard[i] = 0;
    };

    function checkBoard() {
        console.log(playBoard);
    };

    function changeBoard(position, marker) {
        playBoard[position] = marker;
    };

    return {checkBoard, changeBoard};
 
})();

/// The Gameplay Object that controls the game ///

const game = (function () {
    
    function oneGameRound() {
        playerOne.makePlay();
        playerTwo.makePlay();
    };

    function playRound (position, marker) {
        gameBoard.changeBoard(position, marker);
    };
 
    return {playRound, oneGameRound};

})();

/// The Player Object ///

function createPlayer (name, marker) {
    const userName = name;

    function makePlay() {
        playPosition = prompt("Please pick");
        game.playRound(playPosition, marker);
    };

    return {name, makePlay};
};

///// MAIN CODE AREA ////

playerOne = createPlayer('One', 'X');
playerTwo = createPlayer('Two', 'O');

game.oneGameRound();
gameBoard.checkBoard();