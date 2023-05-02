const {Router } = require("express");
const { authenticator } = require("../middleware/auth");
const  getCityIP = require("../controller/city.controller");


const cityRouter = Router();


cityRouter.get("/:city",authenticator,getCityIP);

module.exports = cityRouter;