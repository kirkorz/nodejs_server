const { decode } = require("jsonwebtoken");
const { token } = require("morgan");
const jwtHelper = require("../helpers/jwt.helper");
//const accessTokenSecret = "secrettoken";
const Dbquery = require('../mongodbquery/auth.js')

const key = 
{   private:
    '-----BEGIN RSA PRIVATE KEY-----\nMIIBPAIBAAJBAKnyIsVzV3/7A5hO3+brWZNu0xqecq/AypS5UV8NDFGaCdYstbYx\nrVUv5lWH3uBDB/6vuHKWVKi2oJyrqh2XDjMCAwEAAQJBAJV5xsGayKxlcO0G+wKV\noKz/fihckw0o6kXTldGfnWUrQdWSEFeIznCeVbMRhntAiejVuIovLjvdRBp4mnn4\nTuECIQDk9eEK8lt5I8BgGHAgj5Y+DbIqngA74MtLUpz8LGOMUQIhAL4EFAUkzJtR\nlN9zQ7+FCSi+lvd7GUt2gJT2gfeK38VDAiEAwKlyG88CT/ZYi8QknhGVIFRQBvJ7\nSeeHybMTrFMB1XECIQCmpCb2l95EvJhGGu0oUkDFFdiJ89AsKSH9Ae7bLFSwxwIg\nK3LNRypKCfAF+64theNMPhQta3sO8EZoNJGc7WGIPh4=\n-----END RSA PRIVATE KEY-----',
    public:
    '-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKnyIsVzV3/7A5hO3+brWZNu0xqecq/A\nypS5UV8NDFGaCdYstbYxrVUv5lWH3uBDB/6vuHKWVKi2oJyrqh2XDjMCAwEAAQ==\n-----END PUBLIC KEY-----' 
}
const accessTokenSecret = key.public;

let isAuth = async(req,res,next)=>{
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if(tokenFromClient){
        try{
            const decoded = await jwtHelper.verifyToken(tokenFromClient,key.public);
            req.decoded = decoded;
            if(decoded['role'] == 'user'){
                next();
            } else throw error;
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
            // const id_mod =await Dbquery.is_mod(decoded['data']);
            if(decoded['role'] == 'admin'){
                next();
            } else throw error;
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