let currentPlayer = 'x';
let gameActive = true;
const statusMessage = document.getElementById('statusMessage');
const cells = document.querySelectorAll('.cell')
const restartbtn = document.getElementById('restartbtn');

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick,{once: true});
});

restartbtn.addEventListener('click',restartGame);
function handleClick(e){
    if(!gameActive) return;
    const cell = e.target;
    placeMark(cell, currentPlayer);
    if(checkWin(currentPlayer)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        switchPlayer();
    }
}

function placeMark(cell,player){
    cell.textContent = player;
}
function switchPlayer(){
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    statusMessage.textContent = `player ${currentPlayer}'s Turn`;
}
function checkWin(player){
    return winningCombinations.some(combination => {
        return combination.every(index =>{
            return cells[index].textContent === player;
        });
    });
}
function isDraw(){
    return[...cells].every(cell =>{
        return cell.textContent === 'x' || cell.textContent ==='o';
    });
}
function endGame(draw){
    if(draw){
        statusMessage.textContent = 'Draw!';
    }else{
        statusMessage.textContent = `player ${currentPlayer} Wins!`;
    }
    gameActive = false;
}
function restartGame(){
    currentPlayer = 'x';
    gameActive = true;
    statusMessage.textContent = `player X's Turn`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click',handleClick, {once:true});
    });
}
