const cells =
document.querySelectorAll(".cell");

const statusText =
document.querySelector("#status");

const resetBtn =
document.querySelector("#resetBtn");

const newMatchBtn =
document.querySelector("#newMatchBtn");

const startBtn =
document.querySelector("#startBtn");

const playerXInput =
document.querySelector("#playerX");

const playerOInput =
document.querySelector("#playerO");

const xName =
document.querySelector("#xName");

const oName =
document.querySelector("#oName");

const xScoreText =
document.querySelector("#xScore");

const oScoreText =
document.querySelector("#oScore");

let playerX = "Player X";
let playerO = "Player O";

let xScore = 0;
let oScore = 0;

let currentPlayer = "X";
let gameActive = false;

const winningPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]
];

startBtn.addEventListener("click",()=>{

    playerX =
    playerXInput.value || "Player X";

    playerO =
    playerOInput.value || "Player O";

    xName.innerText = playerX;
    oName.innerText = playerO;

    gameActive = true;

    statusText.innerText =
    `${playerX}'s Turn`;

});

cells.forEach(cell=>{

    cell.addEventListener("click",()=>{

        if(
            cell.innerText !== "" ||
            !gameActive
        ){
            return;
        }

        cell.innerText =
        currentPlayer;

        checkWinner();

        if(gameActive){

            currentPlayer =
            currentPlayer === "X"
            ? "O"
            : "X";

            statusText.innerText =
            currentPlayer === "X"
            ? `${playerX}'s Turn`
            : `${playerO}'s Turn`;
        }

    });

});

function checkWinner(){

    for(let pattern of winningPatterns){

        let a =
        cells[pattern[0]].innerText;

        let b =
        cells[pattern[1]].innerText;

        let c =
        cells[pattern[2]].innerText;

        if(
            a === "" ||
            b === "" ||
            c === ""
        ){
            continue;
        }

        if(a === b && b === c){

            gameActive = false;

            if(a === "X"){

                xScore++;

                xScoreText.innerText =
                xScore;

                if(xScore === 5){

                    statusText.innerText =
                    `🏆 ${playerX} is the Champion!`;

                    return;
                }

                statusText.innerText =
                `🎉 ${playerX} Wins This Round!`;
            }
            else{

                oScore++;

                oScoreText.innerText =
                oScore;

                if(oScore === 5){

                    statusText.innerText =
                    `🏆 ${playerO} is the Champion!`;

                    return;
                }

                statusText.innerText =
                `🎉 ${playerO} Wins This Round!`;
            }

            return;
        }
    }

    let draw =
    [...cells].every(
        cell => cell.innerText !== ""
    );

    if(draw){

        gameActive = false;

        statusText.innerText =
        "🤝 Match Draw!";
    }
}

resetBtn.addEventListener("click",()=>{

    if(
        xScore === 5 ||
        oScore === 5
    ){
        return;
    }

    cells.forEach(cell=>{

        cell.innerText = "";

    });

    currentPlayer = "X";

    gameActive = true;

    statusText.innerText =
    `${playerX}'s Turn`;

});

newMatchBtn.addEventListener("click",()=>{

    xScore = 0;
    oScore = 0;

    xScoreText.innerText = 0;
    oScoreText.innerText = 0;

    cells.forEach(cell=>{

        cell.innerText = "";

    });

    currentPlayer = "X";

    gameActive = true;

    statusText.innerText =
    `${playerX}'s Turn`;

});