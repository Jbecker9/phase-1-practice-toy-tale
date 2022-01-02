let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch("http://localhost:3000/toys")
 .then(response => response.json())
 .then(data => data.forEach(e => {
    addElements(e)
 }))

 function addElements(element){
  let toyCollection = document.getElementById("toy-collection")
  let toyCard = document.createElement("div")
  toyCard.className = "card"
  const h2 = document.createElement("h2")
  const img = document.createElement("img")
  const p = document.createElement("p")
  const button = document.createElement("button")
  toyCard.appendChild(h2)
  h2.innerText = element.name
  toyCard.appendChild(img)
  img.src = element.image
  img.className = "toy-avatar"
  toyCard.appendChild(p)
  p.innerText = element.likes
  toyCard.appendChild(button)
  button.className = "button"
  button.id = `${element.id}`
  button.innerHTML = `Like &hearts;`
  button.addEventListener("click", (e) => { 
    addLikes(element.id, e, p)
  })
  toyCollection.appendChild(toyCard)
}

function submitToys(e){
  e.preventDefault()
  let toyObject = {
    name:e.target.name.value,
    image:e.target.image.value,
    likes:0
  }
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyObject)
  })
  .then(response => response.json())
  .then(toy => addElements(toy))
}

const newToyForm = document.querySelector(".add-toy-form")
newToyForm.addEventListener("submit", (event) => {
  submitToys(event)
})

function addLikes(id, e, p){
  e.preventDefault()
console.log('id', id)
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({likes: ++p.innerText})
  })
  .then(response => response.json())
  .then(toy => {p.innerText = toy.likes
  console.log(toy)})
}



// document.addEventListener("submit", () => {
//   const submit = document.querySelector(".submit")
//   addToys(submit)
// })
