const express = require("express")
const dotenv = require("dotenv").config()
const connection = require("./db")
const router = require("./routes/user")
const cors = require("cors")
const setupSwagger = require("./swagger")


connection()

// middleware:-
const app = express()
app.use(express.json())
app.use(cors({
    origin : 'https://entertanment-app.onrender.com'
}))
app.use("/api", router)

// setup swagger:-
setupSwagger(app)

// Running the server on localhost:4000
const Port = process.env.PORT
app.listen(Port, ()=>{
    console.log(`Server is listening on ${Port}`)
})