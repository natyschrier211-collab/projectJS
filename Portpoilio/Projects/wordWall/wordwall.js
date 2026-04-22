const themes = {
    space: ['🚀', '🛸', '🌍', '🌕', '⭐', '💻', '📱', '⌚', '🎮', '🔋', '📡', '🤖'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'],
    food: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑']
};

//נתחיל עם ברירת החלל כברירת מחדל
let currentTheme = "space"
let emojis = themes[currentTheme];
let gameCards = [...emojis , ...emojis]
const board = document.getElementById("game-board")

gameCards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.character = emoji;
//מוסיפים html פנימי בונים לקלף פנים וגב
card.innerHTML = `
<div class = "card-inner">
<div class = "card-front"></div>
<div class ="card-back">${emoji}</div>
</div>
`;

    card.addEventListener("click", flipCard)
    board.appendChild(card)
});

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let isGameStarted = false;
let mistakes = 0;



function flipCard(){
  
    //1.נעול או שלחצו על אותו קלף פעמיים ברצף - אל תעשה כלום ותעצור
    if (lockBoard === true) return;
    if (this === firstCard) return;

      startTimer()//פונקציה של תחילת הזמן משחק
    //2. הופכים את הקלפים
    this.classList.add("flip")
    //3.עכשיו בודקים האם זה הקלף הראשון שאנחנו הופכים 
    if (firstCard === null){
        firstCard = this;
    }else {
        secondCard = this;
moves++;
document.getElementById("moves-count").innerText = moves;
    cheakForMatch()
    }
}

function cheakForMatch(){
    // בודקים אם הערך ב"כיס הסודי" של הקלף הראשון שווה לערך בקלף השני
    if (firstCard.dataset.character === secondCard.dataset.character){
        // אם יש התאמה מנטרלים את הקלפים
        disableCard();
    }else {
        mistakes++
        document.getElementById("mistakes-count").innerText = mistakes
        // אם אין התאמה הופכים אותם חזרה
        unflipCards();
    }
    }
//פונקציה שמנטרלת את הקלפים שיש זוג
    function disableCard(){
// מסירים את "שומר הראש" מהקלפים האלה כדי שאי אפשר יהיה ללחוץ עליהם שוב
firstCard.removeEventListener("click" , flipCard)
secondCard.removeEventListener("click" , flipCard)
//מוסיפים 1 לספירת הזוגות
matchedPairs++

//בודקים אם הגענו למקסימום הזוגות האפשריים
if (matchedPairs === emojis.length){
    clearInterval(timerInterval); //פקודה שעוצרת את השעון
    // מחכים חצי שנייה כדי שהקלף האחרון יספיק להתהפך חזותית לפני שקופצת ההודעה
    setTimeout(()=>{
   // מעדכנים את הטקסט בחלון הקופץ לפי הביצועים
        document.getElementById("final-moves").innerText = moves;
        document.getElementById("final-time").innerText = document.getElementById("timer").innerText;
        document.getElementById("final-mistakes").innerText = mistakes
        
        // מציגים את החלון הקופץ
        document.getElementById("victory-modal").classList.add("show");
        
        // מפעילים תותח קונפטי! 🎉 (פונקציה מהספרייה שהבאנו ב-HTML)
        confetti({
            particleCount: 200, /* כמות החתיכות */
            spread: 90,         /* זווית הפיזור */
            origin: { y: 0.6 }, /* מאיזה גובה זה עף */
            colors: ['#00c6ff', '#00ff88', '#ffffff'] 
        });
    }, 500);
}
//מנקים את הזיכרון
resetBoard()
    
    }
//פונקציה שהופכת קלפים בחזרה שאין זוג
function unflipCards(){
    // נועלים את הלוח! שלא ילחצו על קלף שלישי בזמן שמחכים
    lockBoard = true;
    // setTimeout היא פקודה שמשהה את הקוד. היא מריצה את מה שבפנים רק אחרי זמן מסוים
    setTimeout(()=> {
        firstCard.classList.remove("flip")
        secondCard.classList.remove("flip")
        // מנקים את הזיכרון ומשחררים את נעילת הלוח לתור הבא
        resetBoard();
    }, 1000);//שנייה אחת של המתנה
}
// פונקציה שמנקה את משתני הזיכרון שלנו בסוף כל תור
function resetBoard(){
    firstCard = null;
    secondCard = null;
    lockBoard = false

}
// תופסים את הכפתור ומוסיפים לו מאזין לחיצה
const restartBtn = document.getElementById("restart-btn")
restartBtn.addEventListener("click", restartGame);


//פונקציה שמאפסת את המשחק
function restartGame(){
    // מעלים את חלון הניצחון (אם הוא פתוח)
document.getElementById("victory-modal").classList.remove("show");
    clearInterval(timerInterval); // עוצר שעון רץ
isGameStarted = false;        // מאפשר התחלה מחדש בלחיצה
seconds = 0;                 // איפוס זמן
document.getElementById("timer").innerText = "00:00"; // איפוס תצוגה
    //  איפוס כל משתני הזיכרון שלנו
firstCard = null;
secondCard = null;
lockBoard = false;
matchedPairs = 0; //מאפס את הניצחונות
    moves = 0
    document.getElementById("moves-count").innerText = moves;
    mistakes = 0
document.getElementById("mistakes-count").innerText = mistakes;
//מחיקת כל הקלפים הישנים מהלוח
board.innerHTML ="";
//ערבוב מחדש של הקלפים 
gameCards.sort(() => Math.random() - 0.5);
gameCards.forEach((emoji) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.character = emoji;
    
    // בניית שני הצדדים של הקלף גם בריסטרט!
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${emoji}</div>
        </div>
    `;
    
    card.addEventListener("click", flipCard);
    board.appendChild(card);
});
}

function startTimer(){
    // מונע מהשעון להתחיל פעמיים
    if(isGameStarted) return

    isGameStarted = true;
    timerInterval = setInterval(()=> {
        seconds++;
// חישוב דקות ושניות כדי להציג בפורמט 00:00
let mins = Math.floor(seconds / 60)
let secs = seconds % 60
// הוספת "0" לפני המספר אם הוא קטן מ-10
let displayMins = mins < 10 ? "0" + mins : mins;
let displaySecs = secs < 10 ? "0" + secs : secs;

document.getElementById("timer").innerText = `${displayMins}:${displaySecs}`;


    }, 1000)
}

function changeTheme(themeName){
    //עדכון הנושא הנוכחי
    currentTheme = themeName;
    emojis = themes[themeName]
    //עדכון מערך הקלפים
    gameCards = [...emojis , ...emojis];

    //עדכון ויזואלי של הכפתורים להדגיש את הנושא הנבחר
    document.querySelectorAll(".theme-btn").forEach(btn => {
        btn.classList.remove("active")
    });

    //לכפתור שלחצו עליו active מוסיפים
const clickedBtn = document.querySelector(`button[onclick= "changeTheme('${themeName}')"]`);
if (clickedBtn) clickedBtn.classList.add('active')

    //קריאה לפונקציית הריסטרט 
    restartGame()
}