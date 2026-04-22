const goRegister = document.getElementById("goRegister")

goRegister.addEventListener("click", () => {
  window.location.href = "register.html"
})

const loginBtn = document.getElementById("loginBtn")

loginBtn.addEventListener("click", ()=>{

  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const users = JSON.parse(localStorage.getItem("users")) || []

  const foundUser = users.find(u => 
    u.email === email && u.password === password
  )

  if (foundUser){
    alert("ברוך הבא התחברת בהצלחה")
    localStorage.setItem("currentUser", foundUser.username)
    window.location.href = "gallery.html"
  } else {
    alert("הנתונים לא מתאימים")
  }

})
