const deleteButtons = document.querySelectorAll('.fa-trash')
const likeButtons = document.querySelectorAll('.fa-heart-circle-plus')

Array.from(deleteButtons).forEach( deleteButton => {
  deleteButton.addEventListener('click', deleteFact)
})

Array.from(likeButtons).forEach( likeButton => {
  likeButton.addEventListener('click', addLike)
})



async function deleteFact() {
  const deletePW = window.prompt('Password required to delete:')

  const fact = this.parentNode.childNodes[1].innerText
  try {
    const response = await fetch('deleteFact', {
      method:'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'factToDelete': fact,
        'pw': deletePW
      })
    })
    const data = await response.json()
    console.log(data)
    if(data.msg === 'Incorrect password.') {
      alert('Incorrect password.')
    }
    else location.reload()
  }
  catch(err) {
    console.log(err)
  }
}

async function addLike() {
  const fact = this.parentNode.childNodes[1].innerText
  const likes = Number(this.parentNode.childNodes[3].innerText)
  if(!localStorage.getItem(fact)) {
    localStorage.setItem(fact, true)

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
  } else {
    console.log('You may only like each fact once.')
    alert(`Don't be greedy! You can only like a fact once.`)
  }
}