console.log("Hello Naty");


const buttons = Array.from(document.getElementsByClassName("cell"))
console.log(buttons);

 let turn = "X"
 let board = ["","","","","","","","",""]
 let xWins = 0;
 let oWins = 0;
 let gameOver = false
 const resetBtn = document.getElementById("reset-btn")
 const xScoreEl = document.getElementById("xScore")
 const oScoreEl = document.getElementById("oScore")
 resetBtn.addEventListener("click" , resetGame)
 const currentPlayerEl = document.getElementById("current-player")
 const closeModal = document.getElementById("close-modal")
 const modal = document.getElementById("winner-modal")
 closeModal.addEventListener("click" , ()=> {
    modal.style.display = "none"
    resetGame()
 })
//יש לשים על כל כפתור מאזין לאירוע לחיצה ובלחיצה על הכפתור יודפס בקונסול האינדקס של הכפתור

//בלחיצה על הכפתור תדפיסז נלחץ בקונסול

buttons.forEach((btn,index) => {
    btn.addEventListener("click", ()=> {
        console.log("clicked" + index);
        makeMove(btn , index)
    });
});

function makeMove (button, index){
       if(button.innerText) return;
    if (gameOver) return
   board[index] = turn
    button.innerText = turn;
    currentPlayerEl.style.color = turn === "O" ? "#38bdf8" : "#22c55e";
    button.style.color = turn === "X" ? "#38bdf8" : "#22c55e";
    const winner = checkWinner()
if(winner){

        console.log(turn + " wins")
        
if (turn === "X"){
    xWins++;
}else {
    oWins++
}
xScoreEl.innerText = xWins;
oScoreEl.innerText = oWins

gameOver = true;

    const modal = document.getElementById("winner-modal")
const message = document.getElementById("winner-message")

message.innerText = "The Player " + turn + " winner"
if(turn === "X"){
  message.style.color = "#38bdf8"
} else {
  message.style.color = "#22c55e"
}
modal.style.display = "flex"
return
}
//בדיקת תיקו
const message = document.getElementById("winner-message")
if(!board.includes("")){
    gameOver = true
    message.innerText = "It's a Draw"
modal.style.display = "flex"
message.style.color = "white"

return
}
turn = turn ==="X" ? "O": "X"
currentPlayerEl.innerText = turn
console.log(board);

}

function checkWinner (){if(
     board[0] !== "" &&
    board[0] === board[1] &&
    board[1] === board[2] 
){
    console.log(" המנצח" + board[0]);
    gameOver = true
    return true
    

}
    if (
      board[3] !== "" &&  
    board[3] === board[4] &&
    board[4] === board[5]
    )
{
    console.log("המנצח " + board[3]);
      gameOver = true
       return true
     
}if (
    board[6] !== "" &&
    board[6] === board[7] &&
    board[7] === board[8]
)
{console.log("המנצח " + board[6]);
      gameOver = true;
       return true
       
}
if (
    board[0] !== "" &&
    board[0] === board[3] &&
    board[3] === board[6]
){
    console.log("המנצח " + board[0]);
     gameOver = true;
      return true
     
}
if(
    board[1] !== "" &&
    board[1] === board[4] &&
    board[4] === board[7]
){
console.log("המנצח " + board[1]);
 gameOver = true;
  return true
  
}
if(
    board[2] !== "" &&
    board[2] === board[5] &&
    board[5] === board [8]
){
    console.log("המנצח " + board[2]);
     gameOver = true;
     return true
    
}if (
    board[0] !== "" &&
    board[0] === board[4] &&
    board[4] === board[8]
){
    console.log("המנצח " + board[0]);
     gameOver = true;
      return true
     
}if (
    board[2] !== "" &&
    board[2] === board[4] &&
    board[4] === board[6]
){
    console.log("המנצח " + board[2]);
     gameOver = true;
      return true
  
    
}

}

function resetGame (){
    board = ["","","","","","","","",""]
    buttons.forEach(btn => {
        btn.innerText = "";
    })
    gameOver = false
    turn = "X"
}


