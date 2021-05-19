const { MongoClient } = require('mongodb');
var config = require('../config');
const uri = config.mongodb;
var ObjectID = require('mongodb').ObjectID;

let getQuestions_all = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const query = {'live':'true'};
        const result = await client.db("ptud-15").collection("questions").find(query).skip(1 * data.skip||0).limit(1 * data.limit||5).toArray();
        const count = await client.db("ptud-15").collection("questions").find(query).count();
        await client.close();
        return {result,count};
    } catch(err){
        throw err;
    }   
}
let getQuestions_ID = async(data)=>{
    try{
        const question_id = ObjectID(data.id);
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").aggregate([{$match:{'_id':question_id}},{$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authors'}},{$lookup:{from:'comments',localField:'_id',foreignField:'node_id',as: 'comments'}}]).toArray();
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}

let getQuestions_text = async(data)=>{
    try{
        const text_search = data.text;
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").find({'$text': { '$search' : text_search } }).skip(1 * data.skip||0).limit(1 * data.limit||5).toArray();
        const count = await client.db("ptud-15").collection("questions").find({'$text': { '$search' : text_search } }).count();
        await client.close();
        return {result,count};
    } catch (error){
        console.log(error);
        throw error;
    }
}
//check it
let getQuestions_user = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const user_id = ObjectID(data.user_id)
        console.log(data.user_id);
        const result = await client.db("ptud-15").collection("questions").find({'author':user_id}).skip(1 * data.skip||0).limit(data.limit||5).toArray();
        const count = await client.db("ptud-15").collection("questions").find({'author':user_id}).count();
        console.log(result);
        //const result = await client.db("ptud-15").collection("questions").aggregate([{$match:{'author':user_id}},{$lookup:{from:'comments',localField:'_id',foreignField:'node_id',as: 'comments'}}]).toArray();
        await client.close();
        return {result,count};
    } catch(error){
        throw error
    }
}
let postQuestions = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const questions = {
            'title':data.title,
            'detail':data.detail,
            'author': ObjectID(data.user_id),
            'created_at': new Date(),
            'page_of_comment': 0,
            'tags': data.tags.split(','),
            'live': 'true'
        }
        const result = await client.db("ptud-15").collection("questions").insertOne(questions);
        await client.close();
        return result;
    }
    catch (error){
        throw error;
    }
}

let deleteQuestions = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const delans = await client.db("ptud-15").collection("comments").deleteMany({'node_id':ObjectID(data.questionsId)});
        const result = await client.db("ptud-15").collection("questions").deleteOne({'author':ObjectID(data.user_id),'_id':ObjectID(data.questionsId)});
        if(result['deletedCount'] == 0){
            throw err;
        }
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}

let putQuestions = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").updateOne({'author':ObjectID(data.user_id),'_id':ObjectID(data.questionsId)},{'detail':data.detail});
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}

let getQuestions_tag = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        if (typeof(data.tags) == 'string'){
            var query = {'tags':{'$all': [data.tags]}}
        } else {
            var query = {'tags':{'$all': data.tags}}
        }
        const result = await client.db("ptud-15").collection("questions").find(query).toArray();
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}


module.exports ={
    getQuestions_all:getQuestions_all,
    getQuestions_ID:getQuestions_ID,
    getQuestions_text:getQuestions_text,
    getQuestions_user:getQuestions_user,
    postQuestions:postQuestions,
    putQuestions:putQuestions,
    deleteQuestions:deleteQuestions,
    getQuestions_tag:getQuestions_tag
}










// const { MongoClient } = require('mongodb');
// const auth = require('../middleware/auth');
// const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
// const client = new MongoClient(uri, { useUnifiedTopology: true } );

// let authquery = async (username, password) => {
//     try{
//         await client.connect();
//         const user = await client.db("ptud-15").collection("users").findOne({'username':username});
//         console.log(user);
//         return user;
//     }
//     catch(err){
//         console.log(err)
//     }
//     finally{
//         await client.close();
//     }
// }
    // client.connect(function(err, db) {
    //     db.db('ptud-15').collection('users').findOne({'username':username},(error,user)=>{
    //         if(error){
    //             return false;
    //         }
    //         else{
    //             if(user){
    //                 return true;
    //             }
    //         }
    //     })
    // })

// module.exports = {
//     authquery:authquery,
// }