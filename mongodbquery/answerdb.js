const { MongoClient } = require('mongodb');
var config = require('../config');
const uri = config.mongodb;
var ObjectID = require('mongodb').ObjectID;

let getAnswers = async(data)=>{
    try{
        var skip = data.skip;
        var limit = data.limit;
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        var query = await client.db("ptud-15").collection("comments").find({
            'node_id':ObjectID(data.node_id)
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
        // const result = await client.db("ptud-15").collection("comments").findOne({
        //     'node_id':ObjectID(data.node_id),
        //     'page': data.page * 1
        // });
        // const count = await client.db("ptud-15").collection("questions").findOne({'_id':ObjectID(data.node_id)},{ projection:{'page_of_comment':1}});
        // await client.close();
        // console.log(result);
        return {result,skip: data.skip,limit: data.limit};
    } catch(err){
        throw err;
    }   
}

let postAnswers = async(data)=>{
    try{  
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const node = await client.db("ptud-15").collection("questions").findOne({'_id':ObjectID(data.node_id)});
        const author = await client.db("ptud-15").collection("users").findOne({'_id':ObjectID(data.user_id)})
        console.log(author);
        var comment = {
            '_id':new ObjectID(),
            'posted': new Date(),
            'author': author,
            'text': data.comment,
            'star': 0
        }

        const result = await client.db("ptud-15").collection("comments").updateOne(
            {'node_id':node['_id'],
            'page':node['page_of_comment'],
            'count':{'$lt':5}},
            {
                '$inc':{'count':1},
                '$push':{'comments':comment}
            }//,{upsert : true}
        ); 
        if(!result['modifiedCount']){
            const result1 = await client.db("ptud-15").collection("questions").updateOne(
            {
                '_id':node['_id'],
                'page_of_comment':node['page_of_comment']
            },
            {
                '$inc':{ 'page_of_comment':1}
            }
            ); 
            const result2 = await client.db("ptud-15").collection("comments").updateOne(
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

let deleteAnswers = async(data)=>{
    try {
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("comments").updateOne({'comments._id':ObjectID(data.id)},
        {
            '$inc':{ 'count':-1},
            '$pull': { 'comments': { '_id': ObjectID(data.id),'author._id': ObjectID(data.user_id) } }
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
