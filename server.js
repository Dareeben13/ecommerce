var express = require('express')
var morgan = require('morgan')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var app = express()

//  After requiring mongoose, we wanna connect it to the database
mongoose.connect('' , (err) => {
    if(err) console.log(err)

    console.log("Connected to the database")
})

// Morgan is used to log all our request made to the terminal i.e a logger
// We use app.use() as a middleware

app.use(morgan('dev'))

app.get("/", (req, res) => {
    let name = "Eben"
    res.json("My name is " + name)
})

app.listen(3002, (err) => {
    if (err) throw err;
    console.log("Server is Running on port 3002")
})