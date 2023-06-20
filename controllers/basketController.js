const express = require("express")
const basket = express.Router()

const {getAllBaskets, getOneBasket, createBasket, updateBasket, deleteBasket} = require('../queries/baskets.js')
// validations

// GET ALL
basket.get("/", async (req, res) => {
    const allBaskets = await getAllBaskets()

    if(allBaskets.length){
        res.status(200).json(allBaskets)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
basket.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneBasket = await getOneBasket(id)

    if(!oneBasket.message){
        res.status(200).json(oneBasket)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
basket.post("/", async (req, res) => {
    const newBasket = await createBasket(req.body)

    if(!newBasket.message){
        res.status(200).json(newBasket)
    }
    else {
        res.status(500).json({error: newBasket.message})
    }
})

// UPDATE
basket.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedBasket = await updateBasket(req.body, id)

    if(!updatedBasket.message){
        res.status(200).json(updatedBasket)
    }
    else {
        res.status(500).json({error: updateBasket.message})
    }
})

// DELETE 
clientUser.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedBasket = await deleteBasket(id)

    if(!deletedBasket.message){
        res.status(200).json(deletedBasket)
    }
    else{
        res.status(500).json({error: deletedBasket.message})
    }
})

module.exports = basket