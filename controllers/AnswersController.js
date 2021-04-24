const { query } = require('express');
const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
var ObjectID = require('mongodb').ObjectID;


let getAnswers = async(req,res) =>{
    try{
        node_id = req.body.node_id;
        skip = req.body.skip;
        limit = req.body.limit;
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        query = await client.db("ptud-15").collection("comments").find({'node_id':ObjectID(req.body.node_id)}).toArray();
        query = query.sort('page');
        query.forEach(page => {
            news_skip
        });
        const comments = await client.db("ptud-15").collection("comments").find({}).toArray();
        console.log()
        await client.close();
        return res.status(200).json(comments);
    } catch(error){
        return res.status(500).json(error);
    }
}

let postAnswers = async(req,res) =>{
    try{
        node_id = req.body.node_id;
        var comment = {
            '_id':new ObjectID(),
            'posted': new Date(),
            'author': ObjectID(req.decoded['data']),
            'text': req.body.comment,
            'star': 0
        }
        console.log(comment);
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const node = await client.db("ptud-15").collection("questions").findOne({'_id':ObjectID(node_id)});
        console.log(node);
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
        return res.status(200).json(comment);
    } catch(error){
        return res.status(500).json(error);
    }
}

let getAnswers1 = async(req,res) =>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const comments = await client.db("ptud-15").collection("comments").find({}).toArray();
        console.log()
        await client.close();
        return res.status(200).json(comments);
    } catch(error){
        return res.status(500).json(error);
    }
}

module.exports = {
    postAnswers:postAnswers,
    getAnswers : getAnswers,
    getAnswers1:getAnswers1,
}