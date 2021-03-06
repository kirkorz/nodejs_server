const jwt = require("jsonwebtoken");
let generateToken = (user,secretSignature,tokenLife)=>{
    return new Promise((res,rej)=>{
        jwt.sign({data:user._id},secretSignature,
            {
                algorithm:"HS256",
                expiresIn: tokenLife,
            },
            (error,token)=>{
                if(error){
                    return rej(error);
                }
                res(token);
            });
    });
}
let verifyToken = (token, secretKey)=>{
    return new Promise((res,rej)=>{
        jwt.verify(token, secretKey,{algorithm: 'RS256'} ,(error,decoded)=>{
            if(error){
                return rej(error);
            }
            res(decoded);
        });
    });
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken,
};