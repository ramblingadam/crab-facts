const deleteButtons = document.querySelectorAll('.fa-trash')
const likeButtons = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteButtons).forEach( deleteButton => {
  deleteButton.addEventListener('click', deleteFact)
})

Array.from(likeButtons).forEach( likeButton => {
  likeButton.addEventListener('click', addLike)
})

async function deleteFact() {
  const fact = this.parentNode.childNodes[1].innerText
  try {
    const response = await fetch('deleteFact', {
      method:'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'factToDelete': fact
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }
  catch(err) {
    console.log(err)
  }
}

async function addLike() {
  // console.log(this.parentNode.childNodes[3].innerText)
  const fact = this.parentNode.childNodes[1].innerText
  const likes = Number(this.parentNode.childNodes[3].innerText)
  // console.log(fact,likes)
  try {
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'factToLike' : fact,
        'currentLikes': likes
      })
    })
    const data = await response.json()
    // console.log(data)
    location.reload()
  }
  catch(error) {
    console.log(error)
  }
}