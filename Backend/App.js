const express=require('express')
const app=express()
require('./Config')
const env=require('dotenv').config()



const port=process.env.PORT || 3000
const authRouter=require('./Routes/Authroutes')

app.get('/api/auth',authRouter)
app.get('/',(req,res)=>{
    res.send("you are at get")
})

app.listen(()=>{
    console.log("server started at",port)
})

module.exports=app