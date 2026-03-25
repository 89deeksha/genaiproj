const { JsonWebTokenError } = require('jsonwebtoken')
const userModel=require('../Model/UserModel')


const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const tokenBlacklist = require('../Model/Tokenblackllist')

module.exports={
    registerUser:async(req,res)=>{
        
try{
const{userName, email, password}=req.body || {}
        if(!userName ||!email || !password){
           return res.status(400).json({
            message:"please provide username, email and password"
           })
        }


//checking username and email should not exist
        const isUserRegister=await userModel.findOne({
        $or:[{userName},{email}]
    })
    if(isUserRegister){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const hash=await bcrypt.hash(password,10)
    //creating new user
    const newUser=await userModel.create({
        userName,
        email,
        password:hash

    })
    //creating token
    const token=jwt.sign(
        {id:newUser.id, userName:newUser.userName},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    //creating cookie and sending token
    res.cookie("token",token)

    res.status(201).json({
        message:"user registered successfully",
        token,
        user:{
            id:newUser.id,
            userName:newUser.userName,
            email:newUser.email


        }
    })
}catch(err){
res.status(500).json({message:err.message})
console.log(err)
}

        
    },
  

   loginUser:async(req,res)=>{
        const {email,password}=req.body
        //checking the email recieved is there any account exist from this
        const user=await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message:"user not found"
            })
        }
        //password check
        const comparePassword=await bcrypt.compare(password,user.password)
        if(!comparePassword){
            return res.status(400).json({
                message:"password not valid"
            })
        }
        const token=jwt.sign(
        {id:user.id, userName:user.userName},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    res.cookie("token",token)
    res.status(200).json({
        message:"user loggedin successfully",
        user:{
            userId:user.id,
            userName:user.userName,
            email:user.email
        }
    })
            


    } ,
    logOut :async(req,res)=>{
        //getting token from cookies
    const token=req.cookies.token
    if(token){
await tokenBlacklist.create({token})

    }
    res.clearCookie("token")
    res.status(200).json({
        message:"loggedout successfully"
    })


    }

}


    
