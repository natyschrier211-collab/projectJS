document.addEventListener("DOMContentLoaded", () => {

  // ====== נתונים ======
  let posts = JSON.parse(localStorage.getItem("posts")) || []
  const currentUser = localStorage.getItem("currentUser")

  // ====== אלמנטים ======
  const radios = document.querySelectorAll('input[name="uploadType"]')
const fileLabel = document.querySelector('.upload-btn')
  const fileInput = document.getElementById("fileInput")
  const userNameInput = document.getElementById("usernameInput")
  const imageInput = document.getElementById("imageInput")
  const btn = document.getElementById("registerBtn")
  const gallery = document.getElementById("galleryContainer")
  fileLabel.classList.remove("hidden")
  imageInput.classList.add("hidden")

    radios.forEach(radio => {
  radio.addEventListener("change", () => {

    if (radio.value === "file" && radio.checked) {
      fileLabel.classList.remove("hidden")
      imageInput.classList.add("hidden")
    }

    if (radio.value === "url" && radio.checked) {
      fileLabel.classList.add("hidden")
      imageInput.classList.remove("hidden")
    }

  })
})
  // ====== רינדור ======
  function renderPosts() {
    gallery.innerHTML = ""

  posts.forEach((post, index) => {
  newPost(post, index)
})
  }

  renderPosts()

  // ====== פרסום פוסט ======
  btn.addEventListener("click", () => {
    const title = userNameInput.value.trim()
let image = ""

const file = fileInput.files[0]

if (file) {
  image = URL.createObjectURL(file)
} else {
  image = imageInput.value.trim()
}

    if (!currentUser) {
      alert("אתה לא מחובר")
      return
    }

    if (!title || (!imageInput.value && !fileInput.files.length)) {
      alert("תמלא כותרת ותמונה")
      return
    }

    const post = {
      user: currentUser,
      title: title,
      image: image,
      date: new Date().toLocaleString(),
      likes: [],
      comments: []
    }

    posts.push(post)
    localStorage.setItem("posts", JSON.stringify(posts))
    renderPosts()

    userNameInput.value = ""
    imageInput.value = ""
    fileInput.value = ""
  })

  // ====== Enter ======
  userNameInput.addEventListener("keydown", e => {
    if (e.key === "Enter") btn.click()
  })

  imageInput.addEventListener("keydown", e => {
    if (e.key === "Enter") btn.click()
  })

  // ====== יצירת פוסט ======
  function newPost(post, index) {

    // הגנה על דאטה ישן
    post.comments = post.comments || []
    post.likes = post.likes || []

    const card = document.createElement("div")
    card.classList.add("user-card")

    // כותרת
    const p = document.createElement("p")

    const userSpan = document.createElement("strong")
    userSpan.innerText = post.user

    const titleSpan = document.createElement("span")
    titleSpan.innerText = " • " + post.title

    p.appendChild(userSpan)
    p.appendChild(titleSpan)

    // תאריך
    const dateEl = document.createElement("span")
    dateEl.innerText = post.date
    dateEl.style.display = "block"
    dateEl.style.fontSize = "12px"
    dateEl.style.color = "gray"

    // תמונה
    const img = document.createElement("img")
    img.src = post.image

    const imageBox = document.createElement("div")
    imageBox.classList.add("image-box")
    imageBox.appendChild(img)

    // ===== לייקים =====
    const deleteBtn = document.createElement("button")
deleteBtn.innerText = "🗑 מחק"
deleteBtn.classList.add("action-btn", "delete-btn")
deleteBtn.addEventListener("click", ()=>{
  posts.splice(index, 1)
  localStorage.setItem("posts", JSON.stringify(posts))
  renderPosts()
})
    const likeBtn = document.createElement("button")
    likeBtn.classList.add("like-btn")
    likeBtn.innerText = `❤️ ${post.likes.length} Like`

    likeBtn.addEventListener("click", () => {
      if (!post.likes.includes(currentUser)) {
        post.likes.push(currentUser)
      }

      localStorage.setItem("posts", JSON.stringify(posts))
      likeBtn.innerText = `❤️ ${post.likes.length} Like`
    })

    // ===== תגובות =====
    const commentBox = document.createElement("div")
    commentBox.classList.add("comment-box")

    const commentsInput = document.createElement("input")
    commentsInput.placeholder = "כתוב תגובה"

    const commentsBtn = document.createElement("button")
    commentsBtn.innerText = "שלח"

    const commentsContainer = document.createElement("div")

    // תגובות קיימות
    post.comments.forEach(c => {
      addCommentToUI(c, commentsContainer)
    })

    commentsBtn.addEventListener("click", () => {
      const text = commentsInput.value.trim()
      if (!text) return

      const newComment = {
        user: currentUser,
        text: text
      }

      post.comments.push(newComment)
      localStorage.setItem("posts", JSON.stringify(posts))

      addCommentToUI(newComment, commentsContainer)

      commentsInput.value = ""
    })

    commentsInput.addEventListener("keydown", e => {
      if (e.key === "Enter") commentsBtn.click()
    })

    commentBox.appendChild(commentsInput)
    commentBox.appendChild(commentsBtn)

    // ===== חיבור =====
    const actionsRow = document.createElement("div")
    actionsRow.classList.add("actions-row")

actionsRow.appendChild(likeBtn)
if (post.user === currentUser){
actionsRow.appendChild(deleteBtn)
}
actionsRow.appendChild(commentBox)

    card.appendChild(p)
    card.appendChild(dateEl)
    card.appendChild(imageBox)
    card.appendChild(actionsRow)
    card.appendChild(commentsContainer)

    gallery.appendChild(card)
  }

  // ===== פונקציית תגובה =====
  function addCommentToUI(c, container) {
    const comment = document.createElement("div")
    comment.classList.add("comment")

    const textEl = document.createElement("p")

    const userSpan = document.createElement("strong")
    userSpan.innerText = c.user 

    const commentText = document.createElement("span")
    commentText.innerText = c.text

    textEl.appendChild(userSpan)
    textEl.appendChild(commentText)

    comment.appendChild(textEl)
    container.appendChild(comment)
  }

})