const guess = document.getElementById("guess")
const report = document.getElementById("report")

const MAXNUM = 3
let secret;


function loadGame() {
    guess.max = MAXNUM;
    secret = Math.floor(Math.random() * MAXNUM);
    report.innerHHTML = secret;
}

function makeGuess() {

}