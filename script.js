
function Gameboard() {
    const gameBoardFields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    function Player() {
        let score = 0;
        function scoreIncrease() { score++; };
        function scoreReset() { score = 0 };
        function showScore() { return score };

        return { scoreIncrease, scoreReset, showScore }
    };

    function checkForWinner() {
        if ((gameBoardFields[0] == gameBoardFields[1] == gameBoardFields[2] !== null) ||
            (gameBoardFields[3] == gameBoardFields[4] == gameBoardFields[5] !== null) ||
            (gameBoardFields[6] == gameBoardFields[7] == gameBoardFields[8] !== null) ||

            (gameBoardFields[0] == gameBoardFields[3] == gameBoardFields[6] !== null) ||
            (gameBoardFields[1] == gameBoardFields[4] == gameBoardFields[7] !== null) ||
            (gameBoardFields[2] == gameBoardFields[5] == gameBoardFields[8] !== null) ||

            (gameBoardFields[0] == gameBoardFields[4] == gameBoardFields[8] !== null) ||
            (gameBoardFields[2] == gameBoardFields[4] == gameBoardFields[6] !== null)) {
            console.log("We have a winner!");
        }

    };
    function gameFlow() {
        let gameFinished = false;
        let playerTurn = true;
        /* if(!gameFinished){
            for (let i = 0; i < 3; i++){

            }
        };  */


        let player1 = Player();
        let player2 = Player();

        let fields = document.querySelectorAll(".field");

        function handleClick(event) {
            if (playerTurn) {
                event.target.textContent = "X";
                playerTurn = false;
                gameBoardFields[event.target.id] = "X";
            }
            else {
                event.target.textContent = "O";
                playerTurn = true;
                gameBoardFields[event.target.id] = "O";
            }
            checkForWinner();
        }

        fields.forEach((element, index) => {
            element.addEventListener('click', handleClick)


        });
    };
    gameFlow();
};

Gameboard();
