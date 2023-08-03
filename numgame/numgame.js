const guess = document.getElementById("guess");
const report = document.getElementById("report");

const MAXNUM = 100;
let secret;

var myConfetti = confetti.create(null, {
    resize: true,
    useWorker: true
});

function loadGame() {
    guess.max = MAXNUM;
    secret = Math.floor(Math.random() * (MAXNUM+1));
    // report.innerHTML = secret;
}

function makeGuess() {
    let myGuess = guess.value;
    
    if (myGuess < secret) {
        report.innerHTML += `<br/>[${myGuess}] too small`;
        // console.log(`myGuess = ${myGuess}`);
    } else if (myGuess > secret) {
        report.innerHTML += `<br/>[${myGuess}] too large`;
    } else {
        report.innerHTML += `<br/>[${myGuess}] is correct! :)`;
        // YOU WIN (DO SOMETHING HERE)
        
        myConfetti({
            particleCount: 100,
            spread: 160
        });
    }
}