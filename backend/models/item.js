const mongoose=require('mongoose')
const itemSchema=new mongoose.Schema({
    itemNo:{type:Number,unique:true},
    itemName:{type:String,required:true},
    inventoryLocation:String,
    brand:String,
    category:String,
    suppler:{type:mongoose.Schema.Types.ObjectId,ref:"Supplier"},
    stockUnit:String,
    unitPrice:Number,
    itemImages:[String],
    status:{type:String,enum:["Enabled",'disabled'],default:"Enabled"}
})
module.exports=mongoose.model("Item",itemSchema)