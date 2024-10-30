require('dotenv').config()
const mongoose=require('mongoose')
console.log("HEHE",process.env.MONGODB)
const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB,{
        })
        console.log('Mongodb connected successfully!')
    } catch (error) {
       console.log('error occured',error) 
       process.exit(1)
    }
}
module.exports=dbConnection