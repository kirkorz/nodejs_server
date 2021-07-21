const { MongoClient } = require('mongodb');
var config = require('../config');
const uri = config.mongodb;
var ObjectID = require('mongodb').ObjectID;

let makePublic = async(questionsId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").updateOne({'_id':ObjectID(questionsId)},{"$set": {'live':true}});
        await client.close();
        return result;
    } catch(err){
        throw err;
    }   
}
let deleteQuestion = async(questionsId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const delans = await client.db("ptud-15").collection("comments").deleteMany({'node_id':ObjectID(questionsId)});
        const result = await client.db("ptud-15").collection("questions").deleteOne({'_id':ObjectID(questionsId)});        
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}

let getUnlive = async(skip = 0, limit = 5)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const query = {'live':false};
        const result = await client.db("ptud-15").collection("questions").find(query).skip(skip).limit(limit).toArray();
        const count = await client.db("ptud-15").collection("questions").find(query).count();
        await client.close();
        return {result,count};
    } catch(err){
        throw err;
    }   
}
let addCategory = async(questionsId,category)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const query = {'_id':ObjectID(questionsId)};
        const options = {'$push':{'category':{ "$each": category.split(',')}}};
        const result = await client.db("ptud-15").collection("questions").updateOne(query,options,{"upsert" : true});
        await client.close();
        return result;
    } catch(err){
        throw err;
    }   
}
module.exports={
    makePublic : makePublic,
    deleteQuestion: deleteQuestion,
    getUnlive: getUnlive,
    addCategory:addCategory
}
