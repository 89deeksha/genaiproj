const express=require('express')
const app=express()
const cookies=require('cookie-parser')
app.use(cookies())
require('./Config')
const env=require('dotenv').config()



const port=process.env.PORT || 3000
const authRouter=require('./Routes/Authroutes')

app.use(express.json());
app.use('/api/auth',authRouter)
app.get('/',(req,res)=>{
    res.send("you are at get")
})

app.listen(port,()=>{
    console.log("server started at",port)
})

module.exports=app