const user=require("../models/user.models")
require("dotenv").config()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const redisClient=require("../helper/helper")

const signup=async(req,res)=>{
    try {
        const {name,email,password,preferred_city}=req.body
        const isUserPresent=await user.findOne({email})
        if(isUserPresent) return res.send("User is allready Present,You can Login")
        const hash=await bcrypt.hash(password,5)

        const newUser=new user({name,email,password:hash,preferred_city})
        await newUser.save()
        res.send("SignUp Successfull")
    } catch (error) {
        res.send(error.message)
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const isUserPresent=await user.findOne({email})

        if(!isUserPresent) return res.send("User not Present ,Register first")
        const isPasswordCorrect=await bcrypt.compare(password,isUserPresent.password)
        if(!isPasswordCorrect) return res.send("Invalid Password")
        const token =await jwt.sign({userID:isUserPresent._id,preferred_city:isUserPresent.preferred_city},process.env.jwt_secret,{expiresIn:"6hr"})
        res.send({message:"Login Successful",token})
    } catch (error) {
        res.send(error.message)
    }
}

const logout=async(req,res)=>{
    try {
        const token=req.headers?.authorization?.split(" ")[1]
        if(!token) return res.status(403)

        await redisClient.set(token,token);
        res.send("Logout Succesfull")
    } catch (error) {
        res.send(error.message)
        
    }
}

module.exports={signup,login,logout}