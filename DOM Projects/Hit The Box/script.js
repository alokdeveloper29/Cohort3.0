let gameBoard = document.querySelector(".game-board");
let startBtn = document.querySelector(".start-btn");
let timer = document.querySelector(".timer");
let score = document.querySelector(".score");
let smallBox = document.querySelector(".smallBox");
let gameOverBox = document.querySelector(".gameOverBox")
let yes = document.querySelector(".yes")
let no = document.querySelector(".no")


let num = 0;
let interval;
let gameOver = false;
let sc = 0;
let canClick = true;

let startGame = () => {
    let maxLeft = gameBoard.clientWidth - smallBox.offsetWidth;
    let maxTop = gameBoard.clientHeight - smallBox.offsetHeight;
    score.innerHTML = `Score - 0`;
    gameOver = false;
    if (interval) return;

    interval = setInterval(() => {
        num++;
        timer.innerHTML = `Timer - ${num}`;
        smallBox.style.left = `${Math.floor(Math.random() * maxLeft)}px`;
        smallBox.style.top = `${Math.floor(Math.random() * maxTop)}px`;
        smallBox.style.backgroundColor = `rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)}
        )`;
    }, 1000);

    setTimeout(() => {
        clearInterval(interval);
        timer.innerHTML = `Timer - ${num}`
        num = 0;
        sc = 0;
        interval = null;
    }, 10000);

    setTimeout(() => {
        gameOver = true;
        gameOverBox.style.display = "flex"
    }, 11000)

    smallBox.style.display = "flex";
}
startBtn.addEventListener("click", () => {
    startGame()
})


let clickBox = () => {
    if (gameOver) return;
    if (!canClick) return;
    sc++;
    score.innerHTML = `Score - ${sc}`;
    canClick = false;
    setTimeout(() => {
        canClick = true;
    }, 1000);

};
smallBox.addEventListener("click", () => {
    clickBox()
})


yes.onclick = () => {
    gameOverBox.style.display = "none"
    score.innerHTML = `Score - 0`;
    timer.innerHTML = `Timer - 0`;
    startGame()
    sc = 0;
}

no.onclick = () => {
    gameOverBox.style.display = "none";
    sc = 0;
}


