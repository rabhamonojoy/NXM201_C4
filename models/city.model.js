const mongoose=require("mongoose")
const userCities=mongoose.Schema({
    userId:{typeaa:mongoose.Schema.Types.ObjectId,ref:"user",required:true},
    previouscities:[{type:String,required:true}]
})

const Cities=mongoose.model("cities",userCities)
module.exports=Cities