require("dotenv").config()


const express = require("express")
const cors = require("cors")
const app = express()


const {seed} = require('./restaurants.js')

app.use(express.json())
app.use(cors())

const {} = require('./restaurants.js')


//seed database 
app.post('/seed', seed)






const {SERVER_PORT} = process.env

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));