




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

const game = (function () {
    

    function playRound (position, marker) {
        gameBoard.changeBoard(position, marker);
    };
 
    return {playRound};

})();