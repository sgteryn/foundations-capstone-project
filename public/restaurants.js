let restaurantListContainer = document.querySelector('#restaurant-list-container')

const modalBody =document.querySelector('.modal-body')
const websiteBtn = document.querySelector('#website-link')

const form = document.querySelector("form")

const submitRestaurantButton = document.querySelector('#submitRestButton')

const baseURL = `http://localhost:4004/restaurants`

const dGoodsMonoGLogo = document.querySelector("#miniLogo")

dGoodsMonoGLogo.addEventListener('click', () => {
    window.location = '/home.html'
})

const restaurantsCallback = ({ data: restaurants }) => displayRestaurants(restaurants)
const errCallback = err => console.log(err)

const getRestaurants = () => axios.get(baseURL).then(restaurantsCallback).catch(errCallback)
const addRestaurant = body => axios.post(baseURL, body).then(restaurantsCallback).catch(errCallback)
const deleteRestaurant = id => axios.delete(`${baseURL}/${id}`).then(restaurantsCallback).catch(errCallback)
const editRating = (id) => axios.put(`${baseURL}/${id}`, {type}).then(restaurantsCallback).catch(errCallback)





//Add Restaurant 

function submitHandler(e) {
    e.preventDefault()
    
    let name = document.querySelector('#name')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let food_type = document.querySelector('#foodType')
    let address = document.querySelector('#location')
    let website = document.querySelector('#website')
    
    let bodyObj = {
        rating: rating.value, 
        name: name.value,
        food_type: food_type.value,
        address: address.value,
        website: website.value
    }
    
    
    addRestaurant(bodyObj)
    
    rating.value = false
    name.value =''
    food_type.value =''
    address.value =''
    website.value =''
    getRestaurants()
}

submitRestaurantButton.addEventListener('click', submitHandler)

function displayRestaurants(arr) {
    console.log(arr)
    restaurantListContainer.innerHTML = ''
    arr.map(restaurant => {
        const restaurantListCard = document.createElement('section')
        restaurantListCard.innerHTML =`<div class="card text-center mb-2" style="width: 30rem; height: 20rem;">
        <div class="card-header bg-success p-2 text-primary bg-opacity-10" >
        ${restaurant.name} 
        </div>
        <div class="card-body">
        <h5 class="card-title text-secondary">${restaurant.food_type}</h5>
        <p class="card-text text-secondary">${restaurant.address}</p>
        <p class="card-text text-secondary">Rating: ${restaurant.rating}</p>
        <a href="${restaurant.website}" class="btn btn-primary">Checkout Website</a>
        </div>
        <div class="card-footer text-muted">
        <button onclick='deleteRestaurant(${restaurant.restaurant_id})' class="btn btn-primary">Delete</button>
        <button class="btn btn-primary">Edit</button>
        </div>
        </div>`
        restaurantListContainer.appendChild(restaurantListCard)
    })
}


//Random Restaurant generator, Pick 4 me button located at the top right corner

function randomRestaurant(){ 
    axios.get(`${baseURL}`).then(res => {
        // console.log(res.data)
        const randomIndex = Math.floor(Math.random()* res.data.length);
        const pickedRestaurant = res.data[randomIndex]
        console.log(pickedRestaurant)
      
        modalBody.innerHTML = `<p>${pickedRestaurant.name}</p>
        <p>${pickedRestaurant.food_type}</p>
         <p>${pickedRestaurant.address}</p>
         <p>${pickedRestaurant.rating}</p>`
         websiteBtn.href = pickedRestaurant.website
        })
 }

let randomRestaurantButton = document.querySelector('#randomRestaurantButton')
randomRestaurantButton.addEventListener("click", randomRestaurant);


form.addEventListener('submit', submitHandler)

getRestaurants()