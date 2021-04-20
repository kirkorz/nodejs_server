const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const jwtHelper = require("../helpers/jwt.helper");
const {authquery} = require("../mongodbquery/checkauth");

let tokenList = {}

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "secrettoken";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-sercrettoken";

let login = async(req,res) =>{
    try{
        username = req.body.username;
        password = req.body.password;
        if(authquery(username,password)){
            console.log('suss');
        }
        else{
            console.log('fail');
        }
            
        // if(username != 'baor666' || password != '123456'){
        //     return res.status(404).json('notfound');
        // }
        const user = {
            id:'1234',
            name: 'baor',
            username:'baor',
            email: req.body.email,
        };
        const accessToken = await jwtHelper.generateToken(user,accessTokenSecret,accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(user,refreshTokenSecret,refreshTokenLife);
        tokenList[refreshToken] = {accessToken,refreshToken};
        return res.status(200).json({accessToken,refreshToken});
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
}