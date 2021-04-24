const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
var ObjectID = require('mongodb').ObjectID;
let getQuestions = async(req,res) =>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const questions = await client.db("ptud-15").collection("questions").aggregate([{$match:{'author':ObjectID(req.decoded['data'])}},{$lookup:{from:'comments',localField:'_id',foreignField:'node_id',as: 'comments'}}]).toArray();
        await client.close();
        return res.status(200).json(questions);
    } catch(error){
        return res.status(500).json(error);
    }
}
let postQuestions = async(req,res) => {
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const questions = {
            'title':req.body.title,
            'detail':req.body.detail,
            'author': ObjectID(req.decoded['data']),
            'created_at': new Date()
        }
        const result = await client.db("ptud-15").collection("questions").insertOne(questions);
        await client.close();
        return res.status(200).json(questions);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getQuestionsbyId = async(req,res) => {
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const id = ObjectID(req.params.questionsId);
        // const result = await client.db("ptud-15").collection("questions").findOne({'_id':id});
        const result = await client.db("ptud-15").collection("questions").aggregate([{$match:{'_id':id}},{$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authors'}},{$lookup:{from:'comments',localField:'_id',foreignField:'node_id',as: 'comments'}}]).toArray();
        await client.close();
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getQuestionsall = async(req,res) => {
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").find({}).toArray();
        //const result = await client.db("ptud-15").collection("questions").aggregate([{$lookup:{from:'comments',localField:'_id',foreignField:'node_id',as: 'comments'}}]).toArray();
        await client.close();
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let deleteQuestions = async(req,res)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").deleteOne({'author':ObjectID(req.decoded['data']),'_id':ObjectID(req.params.questionsId)});
        await client.close();
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}

let putQuestions = async(req,res)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").updateOne({'author':ObjectID(req.decoded['data']),'_id':ObjectID(req.params.questionsId)},{'detail':req.body.detail});
        await client.close();
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}

module.exports = {
    getQuestions:getQuestions,
    postQuestions:postQuestions,
    getQuestionsbyId:getQuestionsbyId,
    getQuestionsall:getQuestionsall,
    deleteQuestions:deleteQuestions,
    putQuestions:putQuestions
}