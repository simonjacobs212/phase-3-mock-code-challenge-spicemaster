// write your code here

//spice blends
const spiceDiv = document.querySelector('#spice-blend-detail')
const blendImg = document.querySelector('.detail-image')
const blendTitle = document.querySelector('.title')
const spiceMenu = document.querySelector('#spice-images')

//ingredients
const ingredientsDiv = document.querySelector('.ingredients-container')
const ingredientsList = document.querySelector('.ingredients-list')

//forms
const updateForm = document.querySelector('#update-form')
const addForm = document.querySelector('#ingredient-form')


//urls
const url = 'http://localhost:3000/spiceblends'
const ingredientUrl = 'http://localhost:3000/ingredients'


//request functions
const getSpiceBlend = id => {
    fetch(url + `/${id}`)
    .then(res => res.json())
    .then(spiceBlend => {
        displaySpiceBlend(spiceBlend)
    })
}

const getAllSpices = _ => {
    fetch(url)
    .then(res => res.json())
    .then(spiceArr => {
        spiceArr.forEach(spice => {
            renderSpice(spice)
        })
    })
}

const renderSpice = spice => {
    const image = document.createElement('img')
    image.src = spice.image
    image.alt = spice.title
    image.dataset.id = spice.id

    spiceMenu.append(image)
}

const displaySpiceBlend = blend => {
    blendImg.src = blend.image
    blendImg.alt = blend.title
    blendTitle.innerText = blend.title

    updateForm.dataset.id = blend.id
    addForm.dataset.id = blend.id
    Array.from(ingredientsList.children).forEach(child => child.remove())

    blend.ingredients.forEach(ingredient => {
        const eachIngredient = document.createElement('li')
        eachIngredient.innerText = ingredient.name
        ingredientsList.append(eachIngredient)
    })
}

getSpiceBlend(1)
getAllSpices()

//event functions
const updateTitle = (newBlend, id) => {

    configObj = {
        method: "PATCH", 
        headers: { "Content-type":"application/json" },
        body: JSON.stringify(newBlend)
    }

    fetch(url + `/${id}`, configObj)
    .then( response => response.json() )    
    .then(data => blendTitle.innerText = data.title)

}


const grabUpdateData = event => {
    event.preventDefault()
    const title = event.target.title.value
    const id = event.target.dataset.id
    
    
    const newBlend = {title}
    
    updateTitle(newBlend, id)
}

const handleClick = event => {
    if (event.target.dataset.id) {
        getSpiceBlend(event.target.dataset.id)
    }
}

const grabNewData = event => {
    event.preventDefault()
    const name = event.target.name.value
    const spiceblendId = event.target.dataset.id

    const newIngredient = {name, spiceblendId}

    configObj = {
        method: "POST", 
        headers: { "Content-type":"application/json" },
        body: JSON.stringify(newIngredient)
    }

    fetch(ingredientUrl, configObj)
    .then( response => response.json() )    
    .then(data => {
        const newLi = document.createElement('li')
        newLi.textContent = data.name
        ingredientsList.append(newLi)
    })
    // const title = event.target.title.value
    // const id = event.target.dataset.id
    
    
    // const newSpice = {title}
    
    // updateTitle(newBlend, id)
}

// event listeners

updateForm.addEventListener('submit', grabUpdateData)
spiceMenu.addEventListener('click', handleClick)
addForm.addEventListener('submit', grabNewData)



