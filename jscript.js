//// GLOBAL SCOPE DECLARATIONS IF ANY /////



/// The Gameboard Object ////

const gameBoard = (function () {
    const startButton = document.querySelector('#start');
    const playerButton = document.querySelector('#vsPlayer');
    const AIButton = document.querySelector('#vsAI');

    const easyButton = document.querySelector('#Easy');
    const smartButton = document.querySelector('#Smart');
    const unbeatableButton = document.querySelector('#Unbeatable');

    const playBoard = [];

    easyButton.addEventListener('click', (event) => {
        easyButton.classList.add('selected');
        smartButton.classList.remove('selected');
        unbeatableButton.classList.remove('selected'); 
    });

    smartButton.addEventListener('click', (event) => {
        easyButton.classList.remove('selected');
        smartButton.classList.add('selected');
        unbeatableButton.classList.remove('selected'); 
    });

    unbeatableButton.addEventListener('click', (event) => {
        easyButton.classList.remove('selected');
        smartButton.classList.remove('selected');
        unbeatableButton.classList.add('selected'); 
    });

    

    playerButton.addEventListener('click', (event) => {
        playerButton.classList.add('selected');
        AIButton.classList.remove('selected');
        easyButton.disabled = true;
        smartButton.disabled = true;
        unbeatableButton.disabled = true; 
    });

    AIButton.addEventListener('click', (event) => {
        playerButton.classList.remove('selected');
        AIButton.classList.add('selected');
        easyButton.disabled = false;
        smartButton.disabled = false;
        unbeatableButton.disabled = false; 
    });

    startButton.addEventListener('click', (event) =>{
        playerOne = null;
        playerTwo = null;
        game.gameOn = 'ON';

        if (AIButton.classList == 'selected') {
            playerOne = createPlayer('One', 'X');
            if (easyButton.classList == 'selected') {
                playerTwo = createAI('Two', 'O', 'Easy');
            }
            else if (smartButton.classList == 'selected') {
                playerTwo = createAI('Two', 'O', 'Smart');
            }
            else if (unbeatableButton.classList == 'selected') {
                playerTwo = createAI('Two', 'O', 'Unbeatable');
            };
            
            makePlayBoard();
        }
        else {
            playerOne = createPlayer('One', 'X');
            playerTwo = createPlayer('Two', 'O',);
            makePlayBoard();
        }
    
        
    });

    function makePlayBoard() {

        for (i=0;i<9;i++) {
            playBoard[i] = 0;
        };
        game.lastPlayer = 'O';
        drawBoard()
    }
    

    function checkBoard() {
        console.log(playBoard);
    };


    function changeBoard(position, marker) {
        playBoard[position] = marker;
        game.gameOn = gameBoard.checkWin();
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


            if (game.gameOn === 'ON') {
                if (el === 0) {
                    gameTile.addEventListener('click', (event) => {
                        console.log('gameClick');
                        (game.lastPlayer === 'O') ? playerOne.makePlay(event.target.id) : playerTwo.makePlay(event.target.id);
                        if (game.gameOn === 'ON') {
                            (playerTwo.isAI()) ? playerTwo.makeAIPlay(): '';
                        };                        
                    });       
                };
                           

            };
            

            gameTile.classList.add('oneTile');
            gameArea.appendChild(gameTile);
        });
    };

    /// CheckWin function -- maybe refactored later

    function checkWin() {

        let result = playBoard.filter((item) => item == '0');
        console.log(result.length);

        if (playBoard[0] === 'X' && playBoard[1] === 'X' && playBoard[2] === 'X') {
            return 'X';
        }
        else if (playBoard[0] === 'O' && playBoard[1] === 'O' && playBoard[2] === 'O') {
            return 'O';
        }
        else if (playBoard[3] === 'X' && playBoard[4] === 'X' && playBoard[5] === 'X') {
            return 'X';
        }
        else if (playBoard[3] === 'O' && playBoard[4] === 'O' && playBoard[5] === 'O') {
            return 'O';
        }
        else if (playBoard[6] === 'X' && playBoard[7] === 'X' && playBoard[8] === 'X') {
            return 'X';
        }
        else if (playBoard[6] === 'O' && playBoard[7] === 'O' && playBoard[8] === 'O') {
            return 'O';
        }
        else if (playBoard[0] === 'X' && playBoard[3] === 'X' && playBoard[6] === 'X') {
            return 'X';
        }
        else if (playBoard[0] === 'O' && playBoard[3] === 'O' && playBoard[6] === 'O') {
            return 'O';
        }
        else if (playBoard[1] === 'X' && playBoard[4] === 'X' && playBoard[7] === 'X') {
            return 'X';
        }
        else if (playBoard[1] === 'O' && playBoard[4] === 'O' && playBoard[7] === 'O') {
            return 'O';
        }
        else if (playBoard[2] === 'X' && playBoard[5] === 'X' && playBoard[8] === 'X') {
            return 'X';
        }
        else if (playBoard[2] === 'O' && playBoard[5] === 'O' && playBoard[8] === 'O') {
            return 'O';
        }
        else if (playBoard[0] === 'X' && playBoard[4] === 'X' && playBoard[8] === 'X') {
            return 'X';
        }
        else if (playBoard[0] === 'O' && playBoard[4] === 'O' && playBoard[8] === 'O') {
            return 'O';
        }
        else if (playBoard[2] === 'X' && playBoard[4] === 'X' && playBoard[6] === 'X') {
            return 'X';
        }
        else if (playBoard[2] === 'O' && playBoard[4] === 'O' && playBoard[6] === 'O') {
            return 'O';
        }
        else if (result.length === 0) {
            return 'DRAW';
        };

        return 'ON';
    };

    function illegalPlay(position) {
        if (playBoard[position] === 'X' || playBoard[position] === 'O') {
            console.log(game.lastPlayer);
            return true;
        };
        return false;
    };

    return {playBoard, checkBoard, changeBoard, checkWin, makePlayBoard, illegalPlay, drawBoard};
 
})();

/// The Gameplay Object that controls the game ///

const game = (function () {

    let gameOn = 'ON';
    let lastPlayer = 'O';

    function playRound (position, marker) {
        if (gameBoard.illegalPlay(position)) {
            if (playerTwo.isAI()) {
                (game.lastPlayer = 'X') ? playerTwo.makeAIPlay(): '';
            };           
        }
        else {
            gameBoard.changeBoard(position, marker);
            game.lastPlayer = marker;  
        };        
    };

 
    return {playRound, gameOn, lastPlayer};

})();

/// The Player Object ///

function createPlayer (name, marker) {
    const userName = name;

    function makePlay(playPosition) {
        game.playRound(playPosition, marker);
    };

    function isAI() {
        return false;
    }

    return {name, makePlay, isAI};
};

//// The AI Object ///

function createAI (AIname,AImarker, AIDifficulty) {
    const {name, makePlay} = createPlayer(AIname, AImarker);
    const miniMaxScore = [];



    function makeAIPlay () {
        if (AIDifficulty === 'Easy') {
            makeRandomPlay();
        }
        else {
            makeMiniMaxPlay();
        };
        
    };

    function makeRandomPlay() {
        let AIPosition = Math.floor(Math.random() * 9);
            makePlay(AIPosition);
    };

    /// basic MiniMax for Moderate AI

    function makeMiniMaxPlay() {
        const originalBoard = gameBoard.playBoard
        let arrayIndex = 0;
        let optimalAIPosition = 9;
        let isWin = 0;

        console.log(originalBoard);

        for (i=0;i<9;i++) {
            miniMaxScore[i] = 'Occupied';
        };

        oneMiniMaxLoop(originalBoard);
        

        arrayIndex = 0;

        gameBoard.playBoard = originalBoard;
        console.log(miniMaxScore);

        miniMaxScore.forEach((el) =>{
            if (el==10) {
                optimalAIPosition = arrayIndex;
                isWin = 1;
            }
            else if (el == '-10') {
                (isWin == 1) ? '' : optimalAIPosition = arrayIndex;
            }
            else if (el==0) {
                (optimalAIPosition == 9) ? optimalAIPosition = arrayIndex : '';
            };
            console.log(arrayIndex);
            arrayIndex += 1;
        });

        if (miniMaxScore[4] != 'Occupied' && AIDifficulty == 'Unbeatable') {
            let firstRound = miniMaxScore.filter((item) => item == 'Occupied');
            (firstRound.length == 1) ? optimalAIPosition = 4 : '';
        }
        else {
            let firstRound = miniMaxScore.filter((item) => item == 'Occupied');
            (firstRound.length == 1) ? optimalAIPosition = 9 : '';
        }

        
        
        console.log(`I want to play ${optimalAIPosition}`);
        (optimalAIPosition == 9) ? makeRandomPlay() : makePlay(optimalAIPosition);

    };

    function oneMiniMaxLoop(originalBoard) {
        let arrayIndex = 0;
        let stackLastPalyer = game.lastPlayer
        gameBoard.playBoard.forEach((el) => {
            if (el===0) {

                if (stackLastPlyer = 'X') {
                    gameBoard.playBoard[arrayIndex] = 'O';
                    let whoWon = gameBoard.checkWin();
                    if (whoWon === 'O') {
                        miniMaxScore[arrayIndex] = 10;
                    }
                    else {
                        miniMaxScore[arrayIndex] = 0;
                    };

                    gameBoard.playBoard[arrayIndex] = 'X';
                    whoWon = gameBoard.checkWin();
                    gameBoard.playBoard[arrayIndex] = 0;
                    if (whoWon === 'X') {
                        (miniMaxScore[arrayIndex] == 10) ? '' : miniMaxScore[arrayIndex] = '-10';
                    };
                };
                
                
                
            };
            gameBoard.playBoard = originalBoard;
            arrayIndex += 1;
        });
    };

    

    function isAI() {
        return true
    };

    return {name, makeAIPlay, isAI};
};

///// MAIN CODE AREA ////



//gameBoard.makePlayBoard()




