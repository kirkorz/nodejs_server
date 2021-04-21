const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = "secrettoken";

let isAuth = async(req,res,next)=>{
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if(tokenFromClient){
        try{
            const decoded = await jwtHelper.verifyToken(tokenFromClient,accessTokenSecret);
            req.decoded = decoded;
            next();
        } catch(error){
            console.log(error);
            return res.status(401).json({
                messsage:"Unauthorized",
            });
        }
    } else{
        return res.status(403).send({message: 'No token provided.'})
    }
}

module.exports = {
    isAuth: isAuth
}