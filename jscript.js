//// GLOBAL SCOPE DECLARATIONS IF ANY /////




/// The Gameboard Object ////

const gameBoard = (function () {
    const playBoard = [];

    function makePlayBoard() {
        for (i=0;i<9;i++) {
            playBoard[i] = 0;
        };
        drawBoard()
    }
    

    function checkBoard() {
        console.log(playBoard);
    };

    function changeBoard(position, marker) {
        playBoard[position] = marker;
        drawBoard();
    };

    function drawBoard() {
        const gameArea = document.querySelector('.gameBoardArea');
        gameArea.innerHTML = '';
        let arrayIndex = 0;

        playBoard.forEach((el) =>{
            const gameTile = document.createElement('div');

            gameTile.id = arrayIndex;
            arrayIndex += 1;

            (el === 'X' || el === 'O') ? gameTile.textContent = el : gameTile.textContent = null;


            if (game.gameOn === true) {
                gameTile.addEventListener('click', (event) => {
                    (game.lastPlayer === 'O') ? playerOne.makePlay(event.target.id) : playerTwo.makePlay(event.target.id);
                    (playerTwo.isAI()) ? playerTwo.makeAIPlay(): '';                  
                });
            };
            

            gameTile.classList.add('oneTile');
            gameArea.appendChild(gameTile);
        });
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

    function illegalPlay(position) {
        if (playBoard[position] === 'X' || playBoard[position] === 'Y') {
            return true;
        };
        return false;
    };

    return {checkBoard, changeBoard, checkWin, makePlayBoard, illegalPlay, drawBoard};
 
})();

/// The Gameplay Object that controls the game ///

const game = (function () {

    let gameOn = true;
    let lastPlayer = 'O';

    function oneGameRound() {
        playerOne.makePlay();     
        playerTwo.makePlay();
    };

    function playRound (position, marker) {
        if (gameBoard.illegalPlay(position)) {
            if (playerTwo.isAI()) {
                (marker === 'X') ? playerOne.makePlay() : playerTwo.makeAIPlay();
            }
            else {
                (marker === 'X') ? playerOne.makePlay() : playerTwo.makePlay();
            };            
        }
        else {
            gameBoard.changeBoard(position, marker);
        };
        game.lastPlayer = marker;  
    };

 
    return {oneGameRound, playRound, gameOn, lastPlayer};

})();

/// The Player Object ///

function createPlayer (name, marker) {
    const userName = name;

    function makePlay(playPosition) {

        game.playRound(playPosition, marker);
        game.gameOn = gameBoard.checkWin();
    };

    function isAI() {
        return false;
    }

    return {name, makePlay, isAI};
};

//// The AI Object ///

function createAI (AIname,AImarker) {
    const {name, makePlay} = createPlayer(AIname, AImarker);

    function makeAIPlay () {
        let AIPosition = Math.floor(Math.random() * 9);
        makePlay(AIPosition);
    };

    function isAI() {
        return true
    };

    return {name, makeAIPlay, isAI}
}

///// MAIN CODE AREA ////

playerOne = createPlayer('One', 'X');
playerTwo = createAI('Two', 'O');

gameBoard.makePlayBoard()

//do {
//    game.oneGameRound();
//    gameBoard.checkBoard();   
//} while (game.gameOn);



