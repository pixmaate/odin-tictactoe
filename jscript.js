//// GLOBAL SCOPE DECLARATIONS IF ANY /////




/// The Gameboard Object ////

const gameBoard = (function () {
    const playBoard = [];

    function makePlayBoard() {
        for (i=0;i<9;i++) {
            playBoard[i] = 0;
        };
    }
    

    function checkBoard() {
        console.log(playBoard);
    };

    function changeBoard(position, marker) {
        playBoard[position] = marker;
    };

    /// CheckWin function -- maybe refactored later

    function checkWin() {

        let result = playBoard.filter((item) => item == '0');
        console.log(result);

        if (playBoard[0] === 'X' && playBoard[1] === 'X' && playBoard[2] === 'X') {
            return false;
        }
        else if (playBoard[0] === 'O' && playBoard[1] === 'O' && playBoard[2] === 'O') {
            return false;
        }
        else if (playBoard[3] === 'X' && playBoard[4] === 'X' && playBoard[5] === 'X') {
            return false;
        }
        else if (playBoard[3] === 'O' && playBoard[4] === 'O' && playBoard[5] === 'O') {
            return false;
        }
        else if (playBoard[6] === 'X' && playBoard[7] === 'X' && playBoard[8] === 'X') {
            return false;
        }
        else if (playBoard[6] === 'O' && playBoard[7] === 'O' && playBoard[8] === 'O') {
            return false;
        }
        else if (playBoard[0] === 'X' && playBoard[3] === 'X' && playBoard[6] === 'X') {
            return false;
        }
        else if (playBoard[0] === 'O' && playBoard[3] === 'O' && playBoard[6] === 'O') {
            return false;
        }
        else if (playBoard[1] === 'X' && playBoard[4] === 'X' && playBoard[7] === 'X') {
            return false;
        }
        else if (playBoard[1] === 'O' && playBoard[4] === 'O' && playBoard[7] === 'O') {
            return false;
        }
        else if (playBoard[2] === 'X' && playBoard[5] === 'X' && playBoard[8] === 'X') {
            return false;
        }
        else if (playBoard[2] === 'O' && playBoard[5] === 'O' && playBoard[8] === 'O') {
            return false;
        }
        else if (playBoard[0] === 'X' && playBoard[4] === 'X' && playBoard[8] === 'X') {
            return false;
        }
        else if (playBoard[0] === 'O' && playBoard[4] === 'O' && playBoard[8] === 'O') {
            return false;
        }
        else if (playBoard[2] === 'X' && playBoard[4] === 'X' && playBoard[6] === 'X') {
            return false;
        }
        else if (playBoard[2] === 'O' && playBoard[4] === 'O' && playBoard[6] === 'O') {
            return false;
        }
        else if (result.length === 0) {
            return false;
        };

        return true;
    };

    return {checkBoard, changeBoard, checkWin, makePlayBoard};
 
})();

/// The Gameplay Object that controls the game ///

const game = (function () {

    let gameOn = '';

    function oneGameRound() {
        playerOne.makePlay();
        game.gameOn = gameBoard.checkWin();
        playerTwo.makePlay();
        game.gameOn = gameBoard.checkWin();
    };

    function playRound (position, marker) {
        gameBoard.changeBoard(position, marker);
    };

 
    return {oneGameRound, playRound, gameOn};

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

gameBoard.makePlayBoard()

do {
    game.oneGameRound();
    gameBoard.checkBoard();   
} while (game.gameOn);



