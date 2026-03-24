const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
useName:{
    type:String,
    unique:[true,"user already exist"],
    required:true
},
email:{
    type:String,
    unique:[true,"Account already exists with this email"]
},
password:{
    type:String,
    required:true
}
})

const model=mongoose.model('usermodel',userSchema)
module.exports=model