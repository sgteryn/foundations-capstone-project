const express = require("express")
const cors = require("cors")
const app = express()
const path = require('path')

const {seed, getRestaurants, addRestaurant, editRating, deleteRestaurant} = require('./controller.js')
const exp = require("constants")

require("dotenv").config()

app.use(express.json())
app.use(cors())
app.use(express.static('public'))

//connect to front-end landing page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../public/landing.html"));
});

//connect to front end home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname,"../public/home.html"));
});


//seed database 
app.post('/seed', seed)

//restaurants 
app.get('/restaurants', getRestaurants)
app.post('/restaurants', addRestaurant)
app.put('/restaurants/:id', editRating)
app.delete('/restaurants/:id', deleteRestaurant)


const {SERVER_PORT} = process.env || 4004

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));