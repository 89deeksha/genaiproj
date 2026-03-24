const mongoose=require('mongoose')
const env=require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("mongo connected..")
})
.catch((error)=>{
console.log("you have an error",error)
})
