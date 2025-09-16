
let currentPlayerScore = 0;
let currentComputerScore = 0;
let isProcessing = false;
const winCondition = 2;

const playerChoice = document.querySelector("#player-choice");
const computerChoice = document.querySelector("#computer-choice");
const playerScore = document.querySelector("#player-score");
const computerScore = document.querySelector("#computer-score");
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissor = document.querySelector("#scissor");
const resetButton = document.querySelector("#restart");
const game_end = document.querySelector("#state");
const winnername =document.querySelector("#official_winner");
const winnertext =document.querySelector("#message");
const playAgainButton = document.querySelector("#play_again");

rock.addEventListener('click',()=>{play_round(0)});
paper.addEventListener('click',()=>{play_round(1)});
scissor.addEventListener('click',()=>{play_round(2)});
resetButton.addEventListener('click',()=>{reset()});
playAgainButton.addEventListener('click',()=>{reset()});

function play_round(choice){
    if (isProcessing) {
    return; 
  }
    let currentPlayerChoice = choice;
    let currentComputerChoice = get_computer_choice();
    set_choice(playerChoice,currentPlayerChoice);
    set_choice(computerChoice,currentComputerChoice);
    let roundWinner = check_round_winner(currentPlayerChoice,currentComputerChoice)
    switch(roundWinner){
        case(0):
            return;
        case(1):
            currentPlayerScore+=1;
            updateHTML(playerScore,currentPlayerScore);
            break;
        case(2):
            currentComputerScore+=1;
            updateHTML(computerScore,currentComputerScore);
            break;
    }
    if(winCondition < Math.max(currentPlayerScore,currentComputerScore)){
        let win = (currentPlayerScore > currentComputerScore) ? 0 : 1;
        isProcessing = true;
        setTimeout(()=>{
            isProcessing = false;
            display_winner(win)},1000)
        return;
    }
}
function get_computer_choice(){
    return Math.floor((Math.random() * 100)% 3);
}

function check_round_winner(player, computer){
    if(player == computer){
        return 0;
    }
    else if(player == 0 && computer == 2 || player == 1 && computer == 0 || player == 2 && computer == 1){
        return 1;
    }
    else return 2;
}
function set_choice(html,choice){
    switch(choice){
        case(0):
            html.innerHTML = "<img src=\"scissors.png\">";
            break;
        case(1):
            html.innerHTML = "<img src=\"paper.png\">";
            break;
        case(2):
            html.innerHTML = "<img src=\"rock.png\">";
            break;
        case(3):
            html.innerHTML = "<img src=\"giphy2.gif\">";
            break;
        case(4):
            html.innerHTML = "<img src=\"giphy.gif\">";
            break;
    }
}
function updateHTML(html,score){
    html.textContent = `${score}`;
}
function display_winner(winner){
    end_screen();
    if(winner == 0){
        winnername.textContent= "Player";
        winnername.classList.remove("winner_is_robot");
        winnername.classList.add("winner_is_player");
        winnertext.textContent="You Win !!!";
    }
    else{
        winnername.textContent="Computer";
        winnername.classList.remove("winner_is_player");
        winnername.classList.add("winner_is_robot");
        winnertext.textContent="Better luck next time";
    }
}

function reset(){
    game_end.classList.add("toggle");
    currentPlayerScore = 0;
    currentComputerScore = 0;
    updateHTML(playerScore,currentPlayerScore);
    updateHTML(computerScore,currentComputerScore);
    set_choice(playerChoice,3);
    set_choice(computerChoice,4);
}
function hide(){
    game_end.classList.add("toggle");
}
function end_screen(){
    game_end.classList.remove("toggle");
}