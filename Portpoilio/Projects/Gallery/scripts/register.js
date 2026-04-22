const login = document.getElementById("goLogin")
login.addEventListener("click", ()=>{
    window.location.href = "login.html"
})
const registerBtn = document.getElementById("registerBtn")

registerBtn.addEventListener("click", () => {

  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const age = document.getElementById("age").value

  if (!username || !email || !password || !confirmPassword || !age) {
    alert("מלא את כל השדות")
    return
  }

  if (password !== confirmPassword) {
    alert("הסיסמאות לא תואמות")
    return
  }

 const users = JSON.parse(localStorage.getItem("users")) || []

users.push({
  username: username,
  email: email,
  password: password,
  age: age
})

localStorage.setItem("users", JSON.stringify(users))

  alert("נרשמת בהצלחה!")

  window.location.href = "login.html"
})