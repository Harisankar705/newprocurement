const supplier=require('../models/supplier')
const getSupplier=async(req,res)=>{
    try {
        console.log("IN GET SUPPLIERS")
        const suppliers=await supplier.find()
        console.log("SUPPLIERS",suppliers)
        res.json(suppliers)
    } catch (error) {
        console.log('error occured in getSupplier',error)
    }
}
const supplierNo=()=>{
    return Math.floor(100000+Math.random()*900000)
}
const createSupplier=async(req,res)=>{
    try {
        console.log("IN CREATE SUPPLIER")
        const supplierNumber=supplierNo()
        console.log(supplierNumber);
        const newSupplier=new supplier({...req.body,supplierNo:supplierNumber})
        console.log(newSupplier)
        const savedSupplier=await newSupplier.save()
        console.log('saved')
        res.status(201).json(savedSupplier)
    } catch (error) {
        console.log('error occured during createsupplier',error)
        res.status(500).json({error:error.message})   
    }
}
module.exports={getSupplier,createSupplier}