const express = require("express")
const cors = require("cors")
const app = express()

const {seed, getRestaurants, addRestaurant, editRating, deleteRestaurant} = require('./controller.js')

require("dotenv").config()

app.use(express.json())
app.use(cors())


//seed database 
app.post('/seed', seed)

//restaurants 
app.get('/restaurants', getRestaurants)
app.post('/restaurants', addRestaurant)
app.put('/restaurants', editRating)
app.delete('/restaurants/:id', deleteRestaurant)


const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));