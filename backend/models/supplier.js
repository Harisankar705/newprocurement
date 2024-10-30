const mongoose=require('mongoose')
const supplier=new mongoose.Schema({
    supplierNo:{type:Number,unique:true},
    supplierName:{type:String},
    address:String,
    taxNo:String,
    country:String,
    phonenumber:String,
    email:String,
    status:{type:String,enum:["Active","Inactive","Blocked"],default:"Active"}
})
module.exports=mongoose.model('Supplier',supplier)