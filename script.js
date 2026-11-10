function Gameboard() {
    const gameBoardFields = [
        null, null, null,
        null, null, null,
        null, null, null
    ];

    let player1 = Player();
    let player2 = Player();

    let score = document.querySelector("#rezultat");
    const playerForm = document.getElementById("playerForm");


    const restartButton = document.getElementById("restart")

    restartButton.addEventListener("click", function (event) {
        for (let i = 0; i < 9; i++) {
            gameBoardFields[i] = null;
            fields[i].innerText = null;
        }
        gameActive = true;
    });
    playerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        player1.giveName(document.getElementById("first_player").value);
        player2.giveName(document.getElementById("second_player").value);

        score.innerText = `${player1.returnName()} ${player1.showScore()} ${player2.returnName()} ${player2.showScore()}`;
    });

    let gameActive = true;

    let fields = document.querySelectorAll(".field");

    function handleClick(event) {
        if (player2.returnName() == undefined || player1.returnName() == undefined) {
            alert("Please enter player names!")
        }
        else {

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
            if (!playerTurn && gameActive) {
                document.getElementById("pobjednik").innerText = `Pobjednik je ${player1.returnName()}!`;
                player1.scoreIncrease();

                gameActive = false;
            }
            if (playerTurn && gameActive) {
                document.getElementById("pobjednik").innerText = `Pobjednik je ${player2.returnName()}!`;
                player2.scoreIncrease();
                gameActive = false;
            }
            score.innerText = `${player1.returnName()} ${player1.showScore()} ${player2.returnName()} ${player2.showScore()}`;
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
    let name;
    function giveName(ime) { name = ime };
    function returnName() { return name };
    function scoreIncrease() { score++; };
    function showScore() { return score };

    return { scoreIncrease, returnName, showScore, giveName }
};


//kad se pozove funkcija, promjeni igraca
let playerTurn = true;
function changePlayer() {
    playerTurn = !playerTurn;
};
