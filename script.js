function Gameboard() {
    const gameBoardFields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    let player1 = Player();
    let player2 = Player();

    let gameActive = true;

    let fields = document.querySelectorAll(".field");



    function handleClick(event) {
        if (playerTurn && event.target.textContent == "" && gameActive) {
            event.target.textContent = "X";
            gameBoardFields[event.target.id] = "X";
            changePlayer();
        }
        if (!playerTurn && event.target.textContent == "" && gameActive) {
            event.target.textContent = "O";
            gameBoardFields[event.target.id] = "O";
            changePlayer();
        }
        checkForWinner();
    }

    fields.forEach((element, index) => {
        element.addEventListener('click', handleClick)
    });


    function checkForWinner() {
        if ((gameBoardFields[0] == gameBoardFields[1] && gameBoardFields[1] == gameBoardFields[2] && gameBoardFields[2] != null) ||
            (gameBoardFields[3] == gameBoardFields[4] && gameBoardFields[4] == gameBoardFields[5] && gameBoardFields[5] != null) ||
            (gameBoardFields[6] == gameBoardFields[7] && gameBoardFields[7] == gameBoardFields[8] && gameBoardFields[8] != null) ||

            (gameBoardFields[0] == gameBoardFields[3] && gameBoardFields[3] == gameBoardFields[6] && gameBoardFields[6] != null) ||
            (gameBoardFields[1] == gameBoardFields[4] && gameBoardFields[4] == gameBoardFields[7] && gameBoardFields[7] != null) ||
            (gameBoardFields[2] == gameBoardFields[5] && gameBoardFields[5] == gameBoardFields[8] && gameBoardFields[8] != null) ||

            (gameBoardFields[0] == gameBoardFields[4] && gameBoardFields[4] == gameBoardFields[8] && gameBoardFields[8] != null) ||
            (gameBoardFields[2] == gameBoardFields[4] && gameBoardFields[4] == gameBoardFields[6] && gameBoardFields[6] != null)) {
            if (!playerTurn) {
                document.getElementById("pobjednik").innerText = "Pobjednik je X!";
                gameActive = false;
            }
            if (playerTurn) {
                document.getElementById("pobjednik").innerText = "Pobjednik je O!"
                gameActive = false;
            }

        }
        else if (gameBoardFields.filter(field => field == null).length === 0) {
            document.getElementById("pobjednik").innerText = "NERJESENO"
            gameActive = false;
        };
    };
};
Gameboard();

//kreiraj objekat igraca
function Player() {
    let score = 0;
    function scoreIncrease() { score++; };
    function scoreReset() { score = 0 };
    function showScore() { return score };

    return { scoreIncrease, scoreReset, showScore }
};


//kad se pozove funkcija, promjeni igraca
let playerTurn = true;
function changePlayer() {
    playerTurn = !playerTurn;
};
