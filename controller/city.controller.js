const redisClient=require("../helper")
const anxios=require("anxios")
const Cities=require("../models/city.model")
require("dotenv").config()

const user=require("../models/user.models")
const IP=process.env.IP_key

const getCityIP=async(req,res)=>{
    try {
        const city=req.params.city||req.body.preferred_city

        const isCityinCache=await redisClient.get(`${city}`)
        console.log(isCityinCache);

        if(isCityinCache) return res.status(200).send({data:isCityinCache});
        
        var https = require('https');

        const options = {
          path: '/8.8.8.8/country/',
          host: 'ipapi.co',
          port: 4500,
          headers: { 'User-Agent': 'nodejs-ipapi-v1.02' }
        };
        https.get(options, function(resp){
            var body = ''
            resp.on('data', function(data){
                body += data;
            });
        
            resp.on('end', function(){
                console.log(body);
            });
        });

        redisClient.set(city,JSON.stringify(body),{EX:30*60})
        return res.send({data:body})

    } catch (error) {
        res.send(error.message)
    }
}

module.exports=getCityIP