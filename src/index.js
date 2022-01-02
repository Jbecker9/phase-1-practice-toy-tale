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
   console.log(element)
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
  button.innerHTML = `<button class = "like-btn" id = ${element.id}> Like &hearts; </button>`
  toyCollection.appendChild(toyCard)
}

function submitToys(e){
  e.preventDefault()
  const name = document.getAttribute("name")
  const image = document.getAttribute("image")
  let toyObject = {
    name:e.target.name.value,
    image:e.target.image.value,
  }
  addElements(toyObject)
}

function toyEvent(){
  const newToyButton = document.querySelector(".submit")
  newToyButton.addEventListener("submit", (event) => {
  submitToys(event)
  })
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
.then(toy => addToy(toy))



// document.addEventListener("submit", () => {
//   const submit = document.querySelector(".submit")
//   addToys(submit)
// })
