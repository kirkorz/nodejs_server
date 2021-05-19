var config = require('../config');
const uri = config.mongodb;
const { MongoClient } = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

let postVotes = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const document = {
            'user': ObjectID(data.user_id),
            'object': ObjectID(data.object_id),
            'rate': data.rate * 1
        };
        var ratedBefore = await client.db("ptud-15").collection("votes").findOne({'user':document.user,'object':document.object});
        if(!ratedBefore){
            const addvote = await client.db("ptud-15").collection("votes").insertOne(document);
            var result = await client.db('ptud-15').collection('questions').updateOne({'_id':document.object},{
                '$inc': {'rateCount': 1, 'rateValue':data.rate * 1}
            })
        } else{
            if(ratedBefore['rate']==document.rate){
                const addvote = await client.db("ptud-15").collection("votes").deleteOne({'user':document.user,'object':document.object});
                var result = await client.db('ptud-15').collection('questions').updateOne({'_id':document.object},{
                    '$inc': {'rateCount': -1, 'rateValue': data.rate*-1}
                })
            } else{
                const addvote = await client.db("ptud-15").collection("votes").updateOne({'user':document.user,'object':document.object},{
                    '$inc':{'rate':data.rate * 1 - ratedBefore['rate']}
                });
                var result = await client.db('ptud-15').collection('questions').updateOne({'_id':document.object},{
                    '$inc': {'rateValue': data.rate * 1 - ratedBefore['rate']}
                })
            }
            
        }
        await client.close();
        return result;
    } catch(err){
        throw err;
    }   
}

let getVotes = async(data)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("questions").findOne({
            '_id': ObjectID(data.object_id), 
        }, {projection: {'_id': 1,'rateValue':1,'rateCount':1}});
        await client.close();
        return result;
    } catch(err){
        throw err;
    }  
}
module.exports = {
    postVotes: postVotes,
    getVotes: getVotes
}