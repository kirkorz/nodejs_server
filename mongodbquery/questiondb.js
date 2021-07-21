const { MongoClient } = require('mongodb');
var config = require('../config');
const uri = config.mongodb;
var ObjectID = require('mongodb').ObjectID;

let getQuestions_all = async(skip= 0,limit = 5,category = null)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        if(category !=null){
            var query = {'live':true,"category":{"$in":[category]}};
        }
        else{
            var query = {'live':true};
        }
        const result = await client.db("ptud-15").collection("questions").find(query).
        skip(1 * skip).limit(1 * limit).toArray();
        const count = await client.db("ptud-15").collection("questions").find(query).count();
        await client.close();
        return {result,count};
    } catch(err){
        throw err;
    }   
}
let getQuestions_ID = async(questionId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").aggregate([{$match:{'_id':ObjectID(questionId)}},
        {$lookup:{from:'users',localField:'author',foreignField:'_id',as:'authors'}},
        {$lookup:{from:'comments',localField:'_id',foreignField:'node_id',as: 'comments'}}])
        .toArray();
        await client.close();
        return result;
    } catch(error){
        throw error;
    }
}

let getQuestions_text = async(text_search,skip=0,limit=5)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").find(
            {'$text': { '$search' : text_search } })
            .skip(skip).limit(limit).toArray();
        const count = await client.db("ptud-15").collection("questions").find(
            {'$text': { '$search' : text_search } }).count();
        await client.close();
        return {result,count};
    } catch (error){
        console.log(error);
        throw error;
    }
}
//check it
let getQuestions_user = async(userId,skip = 0,limit = 5)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const user_id = ObjectID(userId)
        const result = await client.db("ptud-15").collection("questions").find({'author':ObjectID(userId)})
            .skip(skip).limit(limit).toArray();
        const count = await client.db("ptud-15").collection("questions").find({'author':ObjectID(userId)}).count();
        await client.close();
        return {result,count};
    } catch(error){
        throw error
    }
}
let postQuestions = async(userId,title,detail,tags)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const questions = {
            'title':title,
            'detail':detail,
            'author': ObjectID(userId),
            'created_at': new Date(),
            'page_of_comment': 0,
            'tags': tags.split(','),
            'live': false
        }
        const result = await client.db("ptud-15").collection("questions").insertOne(questions);
        await client.close();
        return result;
    }
    catch (error){
        throw error;
    }
}

let deleteQuestions = async(userId,questionsId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        await client.db("ptud-15").collection("comments")
            .deleteMany({'node_id':ObjectID(questionsId)});
        const result = await client.db("ptud-15").collection("questions")
            .deleteOne({'author':ObjectID(userId),'_id':ObjectID(questionsId)});
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
        const result = await client.db("ptud-15").collection("questions").updateOne({'author':ObjectID(data.user_id),'_id':ObjectID(data.questionsId)},{'$set': {'detail':data.detail}});
        await client.close();
        return result;
    } catch(error){
        console.log(error);
        throw error;
    }
}

let getQuestions_tag = async(tags,skip =0,limit =0)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        if (typeof(tags) == 'string'){
            var query = {'tags':{'$all': [tags]}}
        } else {
            var query = {'tags':{'$all': tags}}
        }
        const result = await client.db("ptud-15").collection("questions").find(query)
            .skip(skip).limit(limit).toArray();
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
