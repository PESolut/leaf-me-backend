const express = require("express")
const dispensary = express.Router()
const storeItemController = require("./storeItemController")
dispensary.use('/:dispensary_id/storeitems', storeItemController)

const {getAllDispensaries, getOneDispensary, createDispensary, updateDispensary, deleteDispensary} = require('../queries/dispensaries.js')
// validations

// GET ALL
dispensary.get("/", async (req, res) => {
    const allDispensaries = await getAllDispensaries()

    if(allDispensaries.length){
        res.status(200).json(allDispensaries)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
dispensary.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneDispensary = await getOneDispensary(id)

    if(!oneDispensary.message){
        res.status(200).json(oneDispensary)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
dispensary.post("/", async (req, res) => {
    const newDispensary = await createDispensary(req.body)

    if(!newDispensary.message){
        res.status(200).json(newDispensary)
    }
    else {
        res.status(500).json({error: newDispensary.message})
    }
})

// UPDATE
dispensary.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedDispensary = await updateDispensary(req.body, id)

    if(!updatedDispensary.message){
        res.status(200).json(updatedDispensary)
    }
    else {
        res.status(500).json({error: updatedDispensary.message})
    }
})

// DELETE 
dispensary.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedDispensary = await deleteDispensary(id)

    if(!deletedDispensary.message){
        res.status(200).json(deletedDispensary)
    }
    else{
        res.status(500).json({error: deletedDispensary.message})
    }
})

module.exports = dispensary