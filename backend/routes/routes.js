const express=require('express')
const supplierRoute=express.Router()
const upload=require('../middleware/upload')
const itemRoute=express.Router()
const {getSupplier,createSupplier} =require('../controllers/supplierControllers')
const { getItems, createItem } = require('../controllers/itemController')
supplierRoute.get('/getSupplier',getSupplier)
supplierRoute.post('/createSupplier',createSupplier)
itemRoute.get('/getitem',getItems)
itemRoute.post('/createItem',upload.array('itemImages',10),createItem)

module.exports={supplierRoute,itemRoute}