const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const jwtHelper = require("../helpers/jwt.helper");
const {authquery} = require("../mongodbquery/checkauth");
let tokenList = {}
const auth = require('../middleware/auth');



const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'


const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "secrettoken";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-sercrettoken";

let login = async(req,res) =>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        username = req.body.username;
        password = req.body.password;
        await client.connect({native_parser:true});
        const user = await client.db("ptud-15").collection("users").findOne({'username':username});
        check = String(user['is_mod']);
        username = user['name'];
        const accessToken = await jwtHelper.generateToken(user,accessTokenSecret,accessTokenLife);
        const refreshToken = await jwtHelper.generateToken(user,refreshTokenSecret,refreshTokenLife);
        tokenList[refreshToken] = {accessToken,refreshToken};
        await client.close();
        return res.status(200).json({accessToken,refreshToken,check,username});
    } catch(error){
        return res.status(500).json(error);
    }
    // finally{
    //     await client.close();
    // }
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