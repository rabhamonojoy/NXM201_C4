const express=require("express")
require("dotenv").config()
const {connection}=require("./config/db")
const { userRouter } = require("./routes/user.router");
const cityRouter = require("./routes/city.route");
const logger=require("./middleware/logger");
const redisClient = require("./helper/helper");
const app=express();
app.use(express.json())

app.get("/",async(req,res)=>{
    res.send(await redisClient.get("name"))
})

app.use("/user",userRouter)
app.use("/api/IP",cityRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connecte to DB")
        logger.log("info","Database connected")
    } catch (error) {
        console.log(error);
        logger.log("error","Database connection fail")
    }
    console.log("Sever is running")
})