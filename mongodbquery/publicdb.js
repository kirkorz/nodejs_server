const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
var ObjectID = require('mongodb').ObjectID;

let makePublic = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").updateOne({'_id':ObjectID(data.questionsId)},{"$set": {'is_pub':'true'}});
        await client.close();
        console.log(result);
        return result;
    } catch(err){
        throw err;
    }   
}
let deleteQuestion = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const delans = await client.db("ptud-15").collection("comments").deleteMany({'node_id':ObjectID(data.questionsId)});
        const result = await client.db("ptud-15").collection("questions").deleteOne({'_id':ObjectID(data.questionsId)});        
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}

let notcheck = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const query = {'is_pub':'false'};
        const result = await client.db("ptud-15").collection("questions").find(query).skip(1 * data.skip||0).limit(data.limit||5).toArray();
        const count = await client.db("ptud-15").collection("questions").find(query).count();
        await client.close();
        return {result,count};
    } catch(err){
        throw err;
    }   
}
module.exports={
    makePublic : makePublic,
    deleteQuestion: deleteQuestion,
    notcheck: notcheck
}
