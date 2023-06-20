const express = require("express")
const clientUser = express.Router()
const basketController = require("./basketController.js")
clientUser.use('/:client_user_id/basket', basketController)
const orderController = require("./orderController.js")
clientUser.use('/:client_user_id/order', orderController)

const {getAllClientUsers,  getOneClientUser, createClientUser, updateClientUser, deleteClientUser} = require('../queries/clientusers.js')
// validations

// GET ALL
clientUser.get("/", async (req, res) => {
    const allClientUsers = await getAllClientUsers()

    if(allClientUsers.length){
        res.status(200).json(allClientUsers)
    }
    else{
        res.status(500).json({Error: "server error"})
    }  
})

// GET ONE
clientUser.get("/:id", async (req, res) => {
    const { id } = req.params
    const oneClientUser = await getOneClientUser(id)

    if(!oneClientUser.message){
        res.status(200).json(oneClientUser)
    }
    else {
        res.redirect("/not-found")
    }
})

// CREATE
clientUser.post("/", async (req, res) => {
    const newClientUser = await createClientUser(req.body)

    if(!newClientUser.message){
        res.status(200).json(newClientUser)
    }
    else {
        res.status(500).json({error: newClientUser.message})
    }
})

// UPDATE
clientUser.put("/:id", async (req, res) => {
    const { id } = req.params
    const updatedClientUser = await updateClientUser(req.body, id)

    if(!updatedClientUser.message){
        res.status(200).json(updatedClientUser)
    }
    else {
        res.status(500).json({error: updatedClientUser.message})
    }
})

// DELETE 
clientUser.delete("/:id", async (req, res) => {
    const { id } = req.params
    const deletedClientUser = await deleteClientUser(id)

    if(!deletedClientUser.message){
        res.status(200).json(deletedClientUser)
    }
    else{
        res.status(500).json({error: deletedClientUser.message})
    }
})

module.exports = clientUser