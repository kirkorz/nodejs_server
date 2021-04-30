const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const jwtHelper = require("../helpers/jwt.helper");
let tokenList = {}
const auth = require('../middleware/auth');

const Dbquery = require('../mongodbquery/auth.js')


const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "secrettoken";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-sercrettoken";

let signup = async(req,res) =>{
    try{
        const result = Dbquery.singup(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let login = async(req,res) =>{
    try{
        
        const user = await Dbquery.login(req.body);
        const check = user['is_mod']; 
        const accessToken = await jwtHelper.generateToken(user,accessTokenSecret,accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(user,refreshTokenSecret,refreshTokenLife);
        tokenList[refreshToken] = {accessToken,refreshToken};
        return res.status(200).json({accessToken,refreshToken,check});
    } catch(error){
        return res.status(500).json(error);
    }
}

let refreshToken = async (req,res)=>{
    const refreshTokenFromClient = req.body.refreshToken;
    if(refreshTokenFromClient && (tokenList[refreshTokenFromClient])){
        try{
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient,refreshTokenSecret);
            const user = decoded.data;
            const accessToken = await jwtHelper.generateToken(user,accessTokenSecret,accessTokenLife);
            return res.status(200).json({accessToken});
        } catch(error){
            res.status(403).json({message:'Invalid refresh token.'});
        }
    } else{
        return res.status(403).send({message:'No token provided.'});
    }
}

module.exports = {
    login:login,
    refreshToken:refreshToken,
    signup:signup
}