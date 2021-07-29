var config = require('../config');
const uri = config.mongodb;
const { MongoClient, ObjectId } = require('mongodb');
var ObjectID = require('mongodb').ObjectID;


let getUser = async(userId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("users").findOne({"_id":ObjectID(userId)})
        await client.close();
        return result;
    } catch(e){
        throw e;
    }
}
module.exports={
    getUser:getUser
}