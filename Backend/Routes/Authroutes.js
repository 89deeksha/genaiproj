const express=require('express')
const { registerUser } = require('../Controller/Registeruser')
const Authrouter=express.Router()



Authrouter.post('/register',registerUser)

module.exports=Authrouter


/*
 * This is a multi-line comment.
 * It can span across several lines.
 * 
*/
