let userChoice = document.querySelectorAll(".yourChoice");
let user;
let computer;
let result;
let userScore = 0;
let computerScore = 0;

const resultBoard = document.getElementById("resultBoard");

const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");

const scoreBoard1 = document.getElementById("userScore");
const scoreBoard2 = document.getElementById("computerScore");

const resetBtn = document.getElementById("resetBtn");

function loadEventListener() {
  // Load scores from localStorage when the page loads
  loadScores();
  resetBtn.addEventListener("click", clearScore);
}

function loadScores() {
  const storedUserScore = localStorage.getItem('userScore');
  const storedComputerScore = localStorage.getItem('computerScore');

  if (storedUserScore !== null) {
    userScore = parseInt(storedUserScore);
  }
  if (storedComputerScore !== null) {
    computerScore = parseInt(storedComputerScore);
  }

  updateScore();
}

function computerMove() {
  let random = Math.floor(Math.random()*10+1);
    if(random >= 1 && random < 4) {
        computer = "rock";
    } 
    else if(random >= 4 && random < 7) {
        computer = "paper";
    }
    else{
        computer = "scissor";
    }

    if(computer === "rock") {
        screen2.src = "./img/rock.png";
    } 
    else if(computer === "paper") {
        screen2.src = "./img/paper.png";
    }
    else{
        screen2.src = "./img/scissor.png";
    }
}

function userMove() {
  userChoice.forEach(choice => {
    choice.addEventListener("click", () => {
        user = choice.alt;
        if(user === "rock") {
            screen1.src = "./img/rock.png";
        } 
        else if(user === "paper") {
            screen1.src = "./img/paper.png";
        }
        else{
            screen1.src = "./img/scissor.png";
        }
        computerMove();
        winner();
        updateScore();
    });
})
}

function winner() {
  if(user === "rock"){
    if(computer === "rock") {
        result = "Tie!";
    }
    else if(computer === "paper"){
        result = "You Lose!";
        computerScore +=1;
    }
    else if(computer === "scissor") {
        result = "You Won!";
        userScore += 1;
    }
}
else if(user === "paper") {
    if(computer === "rock") {
        result = "You Won!";
        userScore += 1;
    }
    else if(computer === "paper"){
        result = "Tie!";
    }
    else if(computer === "scissor") {
        result = "You Lose!";
        computerScore +=1;
    }
}

else if(user === "scissor") {
    if(computer === "rock") {
        result = "You Lose!";
        computerScore +=1;
    }
    else if(computer === "paper"){
        result = "You Won!";
        userScore += 1;
    }
    else if(computer === "scissor") {
        result = "Tie!";
    }
}
resultBoard.textContent = result;
}

function updateScore() {
  scoreBoard1.innerHTML = `
    <p>You</p>
    <h1>${userScore}</h1>
  `;

  scoreBoard2.innerHTML = `
    <p>Computer</p>
    <h1>${computerScore}</h1>
  `;

  localStorage.setItem("userScore", userScore);
  localStorage.setItem("computerScore", computerScore);
}

function clearScore() {
  userScore = 0;
  computerScore = 0;
  updateScore();
  resultBoard.textContent = "Start!";
}

loadEventListener();
userMove();
