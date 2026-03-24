const { JsonWebTokenError } = require('jsonwebtoken')
const userModel=require('../Model/UserModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
module.exports={
    registerUser:async(req,res)=>{
        const{userName, email, password}=req.body
        if(!userName||!email|| !password){
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
    const hash=bcrypt.hash(password,10)
    //creating new user
    const newUser=userModel.create({
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
            Email:newUser.email


        }
    })
    }
  

       
}
module.exports={
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
        const comparePassword=bcrypt.compare(password,newUser.password)


    }
}