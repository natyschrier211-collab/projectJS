console.log("hello naty");
const gameOverModal = document.getElementById("gameOverModal")
const finalScoreText = document.getElementById("finalScoreText")
const playAgainBtn = document.getElementById("playAgainBtn")
playAgainBtn.addEventListener("click", ()=>{
  gameOverModal.style.display = "none"
  resetGame()
  gameLoop = setInterval(moveSnake, speed)
})
const gameCanvas = document.getElementById("gameCanvas")
const ctx = gameCanvas.getContext('2d')
ctx.fillStyle = "green"
//אוכל לנחש
let food = {
    x:10,
    y:10
}
//לעלות רמה
let level = 1
//משתנה מהירות
let speed = 250
//להתחיל משחק
let gameLoop
//ניקוד
let score = 0
//משחק נגמר
let isGameOver =false
//תוצאה גבוהה
let highScore = localStorage.getItem("highScore") || 0
document.getElementById("highScore").innerText = "High Score: " + highScore
//שם השחקן
let playerName = ""
let scores = JSON.parse(localStorage.getItem("scores")) || []
//משתנה כיון
let direction = "right"
document.addEventListener("keydown", (e) => {

  if (e.key === "ArrowUp" && direction !== "down") {
    direction = "up"
  }

  if (e.key === "ArrowDown" && direction !== "up") {
    direction = "down"
  }

  if (e.key === "ArrowLeft" && direction !== "right") {
    direction = "left"
  }

  if (e.key === "ArrowRight" && direction !== "left") {
    direction = "right"
  }

})
const snake = [
    { x: 5 , y: 5 },
    {x: 4 , y: 5},
    {x:3 , y:5}
]

const box = 10
const gridSize = 30

gameCanvas.width = gridSize * box
gameCanvas.height = gridSize * box
function moveSnake () {
    if (score > highScore) {
  highScore = score
  localStorage.setItem("highScore", highScore)
  document.getElementById("highScore").innerText = "High Score: " + highScore
}

    if (isGameOver) return
document.getElementById("score").innerText = "Score: " + score
  ctx.clearRect(0 ,0, gameCanvas.width , gameCanvas.height)
  ctx.fillStyle = "white"
ctx.font = "20px Arial"


  let head = snake[0]

  let newHead

  // כיוון
  if (direction === "right") {
    newHead = { x: head.x + 1, y: head.y }
  }
  if (direction === "left") {
    newHead = { x: head.x - 1, y: head.y }
  }
  if (direction === "up") {
    newHead = { x: head.x, y: head.y - 1 }
  }
  if (direction === "down") {
    newHead = { x: head.x, y: head.y + 1 }
  }

  // ❗ קירות
if (
  newHead.x < 0 || newHead.y < 0 || 
  newHead.x >= gridSize || newHead.y >= gridSize
){
endGame()
return
}
  // ❗ פגיעה בעצמו
  let hitSelf = snake.some((part, index)=>{
    if (index === snake.length -1)return false
    return part.x === newHead.x && part.y === newHead.y
  })

  if (hitSelf) {
endGame()
return
  }

  // 🍎 אוכל
  if (newHead.x === food.x && newHead.y === food.y){
    score++
    if (score % 10 === 0){
        level++
    }
    if (score % 10 === 0){
        speed = speed * 0.9
        clearInterval(gameLoop)
        gameLoop =setInterval(moveSnake, speed)
    }
    food = generateFood()
  } else {
    snake.pop()
  }

  // להוסיף ראש
  snake.unshift(newHead)

  // 🎨 ציור אוכל
  ctx.shadowColor = "#ff0044"
  ctx.shadowBlur = 20
  ctx.fillStyle ="red"
  ctx.fillRect(food.x * box , food.y * box ,box ,box)

  // 🎨 ציור נחש
  ctx.shadowColor = "#00ff99"
  ctx.shadowBlur = 20
//צבעים לפי רמה 
let snakeColor = "#00cc88"
if (level === 2) snakeColor = "#00aaff"
if(level === 3) snakeColor = "#ffcc00"
if (level ===4) snakeColor = "#ff4444"
if(level >= 5)snakeColor = "#ff00ff"

  snake.forEach((part, index)=> {
    if (index === 0){
      ctx.fillStyle = "#00ffaa"
    } else {
      ctx.fillStyle = snakeColor
    }

    ctx.fillRect(part.x * box , part.y * box , box , box)
  })
 
}



function resetGame(){
    clearInterval(gameLoop)
    snake.length = 0
    score = 0
    level = 1
speed = 250

snake.push(
    { x: 5 , y: 5 },
    {x: 4 , y: 5},
    {x:3 , y:5}
)
direction = "right"
food = generateFood()
isGameOver = false


}

function generateFood() {
  let newFood
  let isOnSnake

  do {
    newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    }

    isOnSnake = snake.some((part) => {
      return part.x === newFood.x && part.y === newFood.y
    })

  } while (isOnSnake)

  return newFood
}
function startGame (){
    playerName = document.getElementById("playerName").value
    document.getElementById("playerDisplay").innerText = playerName
    if(!playerName){
        alert ("Enter your name")
        return
    }

    resetGame()
    gameLoop = setInterval(moveSnake, speed)
}

function endGame(){
  isGameOver = true
  clearInterval(gameLoop)
  saveScore()
  finalScoreText.innerText = "Your Score: " + score
  gameOverModal.style.display = "flex"
}

function saveScore (){
    scores.push({
        name : playerName , score : score
    })
    //מיון מהגבוה לנמוך
    scores.sort((a , b)=> b.score - a.score)
    //לשמור 5 ראשונים
    scores = scores.slice(0 , 5)
    localStorage.setItem("scores", JSON.stringify(scores))
    renderScores()
}

function renderScores(){
    const list = document.getElementById("scoresList")
    list.innerHTML = ""

    scores.forEach((item, index)=>{
        const li = document.createElement("li")
        li.innerText = `${index + 1}. 👤 ${item.name} | ⭐ ${item.score}`
        list.appendChild(li)
    })
}
renderScores()

function setDifficulty(level){
    if (level === "easy"){
        speed = 300
    } 
    if (level === "medium"){
        speed = 200
    } 
    if (level === "hard"){
        speed = 120
    }
   if (gameLoop) {
  clearInterval(gameLoop)
  gameLoop = setInterval(moveSnake, speed)
}
}