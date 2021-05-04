// const { MongoClient } = require('mongodb');
// // const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
// const uri = 'mongodb+srv://baor000:moFexFUmwovUMN2Q@cluster0.e3ane.gcp.mongodb.net/ptud-15?retryWrites=true&w=majority'
// var ObjectID = require('mongodb').ObjectID;
// var bcrypt = require('bcryptjs');
// const jwtHelper = require("../helpers/jwt.helper");
// let tokenList = {}

// let signup = async(data)=>{
//     try{
//         const client = new MongoClient(uri, { useUnifiedTopology: true } );
//         await client.connect({native_parser:true});
//         const pass = await bcrypt.hash(data.password,10)
//         const user = {
//             '_id':new ObjectID(),
//             'username': data.username,
//             'password': pass,
//             'name': data.name,
//             'is_mod': 'false'
//         }
//         const result = await client.db("ptud-15").collection("users").insertOne(user);
//         await client.close();
//         return result;
//     } catch(err){
//         throw err;
//     }   
// }

// let login = async(data) =>{
//     try{
//         const client = new MongoClient(uri, { useUnifiedTopology: true } );
//         await client.connect({native_parser:true});
//         const password = await bcrypt.hash(data.password,10);
//         const user = await client.db("ptud-15").collection("users").findOne({'username':data.username})
//         const check = bcrypt.compareSync(data.password,user.password); // true
//         console.log(check);
//         if(check){
//             return user;
//         }
//         else{
//             throw error;
//         }
//     } catch(error){
//         throw error;
//     }
// }
// let is_mod = async(data) =>{
//     try{
//         const client = new MongoClient(uri, { useUnifiedTopology: true } );
//         await client.connect({native_parser:true});
//         const user = await client.db("ptud-15").collection("users").findOne({'_id':ObjectID(data)});
//         return user['is_mod'];
//     } catch(error){
//         throw error;
//     }
// }

// module.exports = {
//     singup: signup,
//     login:login,
//     is_mod:is_mod
// }