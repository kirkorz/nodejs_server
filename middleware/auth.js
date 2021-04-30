const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const jwtHelper = require("../helpers/jwt.helper");
const accessTokenSecret = "secrettoken";
const Dbquery = require('../mongodbquery/auth.js')

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
        console.log('not auth');
        return res.status(403).send({message: 'No token provided.'})
    }
}

let isMod = async(req,res,next)=>{
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if(tokenFromClient){
        try{
            const decoded = await jwtHelper.verifyToken(tokenFromClient,accessTokenSecret);
            req.decoded = decoded;
            const id_mod =await Dbquery.is_mod(decoded['data']);
            if(id_mod == 'true'){
                next();
            } else{
                return res.status(401).json({
                    messsage:"Unauthorized",
                });
            }
        } catch(error){
            console.log(error);
            return res.status(401).json({
                messsage:"Unauthorized",
            });
        }
    } else{
        console.log('not auth');
        return res.status(403).send({message: 'No token provided.'})
    }
}

module.exports = {
    isAuth: isAuth,
    isMod: isMod
}