const express = require('express')
const storeItems = express.Router()

const {getTrueAllStoreItems} = require('../queries/storeitems.js')

storeItems.get('/', async (req, res) => {
    const allStoreItems = await getTrueAllStoreItems()

    if(allStoreItems.length){
        res.status(200).json(allStoreItems)
    } else {
        res.status(500).json({Error: 'server error'})
    }
})

module.exports = storeItems