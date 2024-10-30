const itemSchema=require('../models/item')
const supplierSchema=require('../models/supplier')
const purchase_order = require('../models/purchase_order')
const createOrder=async(req,res)=>{
    try {
        const {supplierId,items}=req.body
        let itemTotal=0
        let discountTotal=0
        const itemList=await Promise.all(items.map(async(item)=>{
            const itemId=await itemSchema.findById(item.itemId)
            const itemAmount=item.orderQuantity*item.unitPrice
            const netAmount=itemAmount-item.discount
            itemTotal+=itemAmount
            discountTotal+=item.discount
            return {
                itemId:item.itemId,
                itemName:item.itemName,
                stockUnit:item.stockUnit,
                unitPrice:item.unitPrice,
                packingUnit:item.packingUnit,
                orderQuantity:item.orderQuantity,
                itemAmount,
                discount:item.discount,
                netAmount
                
            }
        }))
        const netOrderAmount=itemTotal-discountTotal
        const orderNumberGenerator=()=>{
            return Math.floor(100000+Math.random()*900000)
        }
        const newOrder=new purchase_order({
            orderNo:orderNumberGenerator(),
            supplierId,
            items:itemList,
            itemTotal,
            discountTotal,
            netAmount:netOrderAmount,
        })
        const savedOrder=await newOrder.save()
    } catch (error) {
        console.log('error occured while creating order',error)
        res.status(500).send("internal server error")
    }
}
const getOrders=async(req,res)=>{
    try {
       const orders=await purchase_order.find().populate('supplierId')
       res.json(orders)
    } catch (error) {
        console.log('error occured while getOrders',error)
        res.status(500).json({error:"internal server error"})
    }
}
module.exports={createOrder,getOrders   }
