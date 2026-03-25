const express=require('express')
const { registerUser, loginUser, logOut } = require('../Controller/Registeruser.jsx')
const tokenBlacklist = require('../Model/Tokenblackllist.js')
const Authrouter=express.Router()
const middleWare=require('../middleware/Authmiddleware.js')

// @route POST(/api/auth/register)
// @description creating user with(username, email, password)

Authrouter.post('/register',registerUser)
// @route POST(/api/auth/login)
// @description login user with(email, password)
Authrouter.post('/login',loginUser)

// @router get('/api/auth/logout)
// @description logout user in cookie and add token in the blacklist
Authrouter.get('/logout',logOut)
Authrouter.get('/getUser',middleWare)

module.exports=Authrouter


/*
 * This is a multi-line comment.
 * It can span across several lines.
 * 
*/
