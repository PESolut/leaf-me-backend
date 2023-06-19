const express = require("express")
const storeItem = express.Router()

const {getAllStoreItems, getOneStoreItem, createStoreItem, updateStoreItem, deleteStoreItem} = require('../queries/storeitems.js')
// validations

// GET ALL
storeItem.get("/", async (req, res) => {
    const allStoreItems = await getAllStoreItems()

    if(allStoreItems.length){
        res.status(200).json(allStoreItems)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
storeItem.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneStoreItem = await getOneStoreItem(id)

    if(!oneStoreItem.message){
        res.status(200).json(oneStoreItem)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
storeItem.post("/", async (req, res) => {
    const newStoreItem = await createStoreItem(req.body)

    if(!newStoreItem.message){
        res.status(200).json(newStoreItem)
    }
    else {
        res.status(500).json({error: newStoreItem.message})
    }
})

// UPDATE
storeItem.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedStoreItem = await updateStoreItem(req.body, id)

    if(!updatedStoreItem.message){
        res.status(200).json(updatedStoreItem)
    }
    else {
        res.status(500).json({error: updatedStoreItem.message})
    }
})

// DELETE 
storeItem.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedStoreItem = await deleteStoreItem(id)

    if(!deletedStoreItem.message){
        res.status(200).json(deletedStoreItem)
    }
    else{
        res.status(500).json({error: deletedStoreItem.message})
    }
})

module.exports = storeItem