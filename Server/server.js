const express = require("express")
const cors = require("cors")
const app = express()
const path = require('path')

const {seed, getRestaurants, addRestaurant, editRating, deleteRestaurant} = require('./controller.js')

require("dotenv").config()

app.use(express.json())
app.use(cors())


//connect to front-end
app.get("/", (req, res) => {
    res.sendFile(path.resolve("restaurants.html"));
  });
app.get('/js',(req,res)=>{res.sendFile(path.join(__dirname,'./restaurants.js'))})
app.get('/stylesheet.css', (req,res)=>{res.sendFile(path.join(__dirname,'./stylesheet.css'))})

//seed database 
app.post('/seed', seed)

//restaurants 
app.get('/restaurants', getRestaurants)
app.post('/restaurants', addRestaurant)
app.put('/restaurants', editRating)
app.delete('/restaurants/:id', deleteRestaurant)


const {SERVER_PORT} = process.env || 4004

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));