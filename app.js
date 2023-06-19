// DEPENDACIES
const express = require("express");
const cors = require("cors")
const morgan = require("morgan")
const dispensaryController = require('./controllers/dispensaryController.js')

// CONFIGURATION
const app = express();

// MIDDLEWARE
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

// CONTROLLERS
app.use('/dispensary', dispensaryController)

// ROUTES
app.get("/", (req, res) => {
    res.status(200).send('Welcome to Leaf-Me backend server.')
});

app.get("/not-found", (req, res) => {
    res.status(404).json({error: "page not found"})
})

app.get("*", (req, res)=> {
    res.redirect("/not-found")
})

// EXPORT
module.exports = app