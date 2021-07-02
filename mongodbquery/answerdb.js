const { MongoClient } = require('mongodb');
var config = require('../config');
const uri = config.mongodb;
var ObjectID = require('mongodb').ObjectID;

let getAnswers = async(nodeId, skip = 0,limit = 5)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        var query = await client.db("ptud-15").collection("comments").find({
            'node_id':ObjectID(nodeId)
        })
        var result = [];
        query = await query.sort({"page":1}).toArray();
        for(let page of query){
            new_skip = skip - page['count']
            if(new_skip >= 0){
                skip =  new_skip;
                continue;
            }
            else if (skip > 0){
                comments = page['comments'].slice(skip,page['count']);
            }
            else{
                comments = page['comments'];
            }
            skip = new_skip;
            for(let cmt of comments){
                if(limit == 0){
                    break;
                }
                limit -= 1;
                result.push(cmt)
            }
            if(limit==0){
                break;
            }
        }
        return {result,skip: skip,limit: limit};
    } catch(err){
        throw err;
    }   
}

let postAnswers = async(userId, nodeId, comment)=>{
    try{  
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const node = await client.db("ptud-15").collection("questions").findOne({'_id':ObjectID(nodeId)});
        const author = await client.db("ptud-15").collection("users").findOne({'_id':ObjectID(userId)})
        var comment = {
            '_id':new ObjectID(),
            'posted': new Date(),
            'author': author,
            'text': comment,
            'star': 0
        }

        const result = await client.db("ptud-15").collection("comments").updateOne(
            {'node_id':node['_id'],
            'page':node['page_of_comment'],
            'count':{'$lt':5}},
            {
                '$inc':{'count':1},
                '$push':{'comments':comment}
            }
        ); 
        if(!result['modifiedCount']){
            await client.db("ptud-15").collection("questions").updateOne(
            {
                '_id':node['_id'],
                'page_of_comment':node['page_of_comment']
            },
            {
                '$inc':{ 'page_of_comment':1}
            }
            ); 
            await client.db("ptud-15").collection("comments").updateOne(
                {
                    'node_id': node['_id'],
                    'page':node['page_of_comment'] + 1
                },
                {
                    '$inc':{ 'count':1},
                    '$push':{'comments':comment}
                },{upsert : true}
            );
        }
        await client.close();
        return result;
    } catch(err){
        throw err;
    }   
}

let deleteAnswers = async(userId,commentId)=>{
    try {
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("comments").updateOne({'comments._id':ObjectID(commentId)},
        {
            '$inc':{ 'count':-1},
            '$pull': { 'comments': { '_id': ObjectID(commentId),'author._id': ObjectID(userId) } }
        })
        await client.close();
        return result; 
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getAnswers: getAnswers,
    postAnswers:postAnswers,
    deleteAnswers:deleteAnswers
}
