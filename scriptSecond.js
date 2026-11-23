//GAMEBOARD
const Gameboard = (() => {
    let gameboard = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
    function returnGameboard() { return [...gameboard] };
    function gameboardInput(input, index) { gameboard[index] = input }
    function gameboardRestart() {
        gameboard = [
            null, null, null,
            null, null, null,
            null, null, null
        ];
    }
    return { returnGameboard, gameboardInput, gameboardRestart }
})();

//IGRAC
function Player(playerName, playerSign) {
    const name = playerName;

    function showName() { return name };

    return { showName }
}



const fields = document.querySelectorAll(".field");
const restartButton = document.getElementById("restart");
const playerForm = document.getElementById("playerForm");
const porukaIgracu = document.getElementById("PORUKA");

//DOMController (sve interakcija sa html)
const DOMController = (() => {

    //clearBoard
    function clearBoard() {
        fields.forEach(element => element.innerText = "")
    };

    //Provjeri da li je pobjednik jedan od igraca
    function checkForWinner() {
        const BC = Gameboard.returnGameboard();
        if ((BC[0] == BC[1] && BC[1] == BC[2] && BC[2] != null) ||
            (BC[3] == BC[4] && BC[4] == BC[5] && BC[5] != null) ||
            (BC[6] == BC[7] && BC[7] == BC[8] && BC[8] != null) ||

            (BC[0] == BC[3] && BC[3] == BC[6] && BC[6] != null) ||
            (BC[1] == BC[4] && BC[4] == BC[7] && BC[7] != null) ||
            (BC[2] == BC[5] && BC[5] == BC[8] && BC[8] != null) ||

            (BC[0] == BC[4] && BC[4] == BC[8] && BC[8] != null) ||
            (BC[2] == BC[4] && BC[4] == BC[6] && BC[6] != null)) {
            return true;
        }
        else { return false };
    };

    //Da li je igra gotova (nema polja vise)
    function isTheGameDone() {
        const BC = Gameboard.returnGameboard();
        let gameStatus = true;

        for (let i = 0; i < 9; i++) {
            if (BC[i] == null) {
                gameStatus = false;
            }
        }
        return gameStatus;
    };


    //registracija korisnika
    playerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let playerOne = Player(document.getElementById("first_player").value, "X");
        let playerTwo = Player(document.getElementById("second_player").value, "O");
        document.getElementById("submit").disabled = true;


        const gameStart = (() => {
            //klik na polje
            let gameOn = true;
            let playerTurn = true;
            fields.forEach(element => {
                element.addEventListener('click', function (event) {
                    //ako na polju nema nista crtaj iks ili oks
                    if (event.target.innerText == "" && gameOn) {
                        if (playerTurn) {
                            event.target.innerText = "X"
                            Gameboard.gameboardInput("X", event.target.id);
                            playerTurn = false;
                        }
                        else {
                            event.target.innerText = "O"
                            Gameboard.gameboardInput("O", event.target.id);
                            playerTurn = true;
                        }
                        //provjeri da li je igra gotova
                        if (checkForWinner()) {
                            porukaIgracu.innerText = "Pobjednik je: " + (playerTurn ? playerTwo.showName() : playerOne.showName());
                            gameOn = false;
                        }
                        else if (isTheGameDone()) {
                            porukaIgracu.innerText = "Nerjeseno!";
                            gameOn = false;
                        };
                    }
                });
            });

            //dugme restart round
            restartButton.addEventListener('click', function () {
                Gameboard.gameboardRestart();
                clearBoard();
                porukaIgracu.innerText = "";
                gameOn = true;
                playerTurn = true;

            });
        })();
    });
})();





