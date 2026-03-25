const mongoose=require("mongoose")
const TokenBlacklist=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required for blacklist"]
    }
   

},
 {timestamps:true}

)
const tokenBlacklist=mongoose.model("tokenblacklist",TokenBlacklist)
module.exports=tokenBlacklist
