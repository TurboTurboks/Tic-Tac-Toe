
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
                console.log(gameBoardFields);
            }
            else {
                event.target.textContent = "O";
                playerTurn = true;
                gameBoardFields[event.target.id] = "O";
                console.log(gameBoardFields);
            }
        }

        fields.forEach((element, index) => {
            element.addEventListener('click', handleClick)
            

        });
    };
    gameFlow();
};

Gameboard();
