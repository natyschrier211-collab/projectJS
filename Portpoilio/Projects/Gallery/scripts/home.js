const loginBtn = document.getElementById("loginBtn")
const registerBtn = document.getElementById("registerBtn")

loginBtn.addEventListener("click", () => {
  window.location.href = "html/login.html"
})

registerBtn.addEventListener("click", () => {
  window.location.href = "./html/register.html"
})