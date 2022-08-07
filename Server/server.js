const express = require("express")
const cors = require("cors")
const app = express()

require('./restaurants.js')

app.use(express.json())
app.use(cors())

const {} = require('./restaurants.js')







const  SERVER_PORT = 4004;

app.listen(SERVER_PORT, () => console.log(`Server running on port ${SERVER_PORT}`));