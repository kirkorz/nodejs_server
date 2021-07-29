var config = require('../config');
const uri = config.mongodb;
const { MongoClient, ObjectId } = require('mongodb');
var ObjectID = require('mongodb').ObjectID;

let postVote = async(userId,objectId,upVote)=>{ // upvote = [-1,0,1]
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const flag = await client.db("ptud-15").collection("votes").findOne({
            "object":ObjectID(objectId),
            "user" : ObjectID(userId)
        }) 
        if(flag){
            var ratedBefore = await client.db("ptud-15").collection("votes").findOne({
                'object':ObjectID(objectId),
                'user': ObjectID(userId) 
            })
            if(ratedBefore.status == 1 * upVote){
                await client.db("ptud-15").collection("votes").deleteOne({
                    'object':ObjectID(objectId),
                    'user': ObjectID(userId)
                })
                if (1 * upVote > 0){
                    var result = await client.db("ptud-15").collection("questions").updateOne({
                        '_id': ObjectID(objectId),
                    },
                    {
                        '$inc':{upvote: - 1 }
                    })
                } else{
                    var result = await client.db("ptud-15").collection("questions").updateOne({
                        '_id': ObjectID(objectId),
                    },
                    {
                        '$inc':{downvote: - 1 }
                    })
                }
                 
            } else {
                await client.db("ptud-15").collection("votes").updateOne({
                    'object':ObjectID(objectId),
                    'user': ObjectID(userId)
                },{
                    "$set": {"status": 1 * upVote}
                }) 
                if (1 * upVote > 0){
                    var result = await client.db("ptud-15").collection("questions").updateOne({
                        "_id": ObjectID(objectId),
                    },{
                        "$inc": {downvote: -1,upvote: 1}
                    })
                } else{
                    var result = await client.db("ptud-15").collection("questions").updateOne({
                        '_id': ObjectID(objectId),
                    },
                    {
                        '$inc':{downvote: 1,upvote: -1 }
                    })
                }
            }
        } else {
            await client.db("ptud-15").collection("votes").insertOne({
                "object": ObjectID(objectId),
                "user": ObjectID(userId),
                "status": 1 * upVote}
                )
            if(1 * upVote > 0){
                console.log("???")
                var result = await client.db("ptud-15").collection("questions").updateOne({
                    "_id": ObjectID(objectId),
                },{
                    "$inc": { "upvote" : 1 }
                })
            }
            else{
                var result = await client.db("ptud-15").collection("questions").updateOne({
                    "_id": ObjectID(objectId),
                },{
                    "$inc": { "downvote": 1 }
                })
            }
        }
        await client.close();
        return result;
    } catch(err){
        throw err;
    }
}
let postReport = async(userId,objectId,content)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("reports").insertOne({
            "object":ObjectID(objectId),
            "user" : ObjectID(userId),
            "content": content,
            "status" : false
        },{upsert : true}) 
        await client.close();
        return result;
    } catch(e){
        throw e;
    }
}
let getVote = async(userId,objectId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("votes").findOne({
            'user': ObjectID(userId),'object':ObjectID(objectId) 
        });
        await client.close();
        return result;
    } catch(err){
        throw err;
    }  
}
let getReport = async(skip=0,limit=5)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("reports").find({
            "status": false
        }).skip(skip).limit(limit).toArray();
        const count = await client.db("ptud-15").collection("reports").find({
            "status": false
        }).count()
        await client.close();
        return {result,count};
    } catch(err){
        throw err;
    }  
}
let setReport = async(reportId)=>{
    try{
        const client = new MongoClient(uri, { useUnifiedTopology: true } );
        await client.connect({native_parser:true});
        const result = await client.db("ptud-15").collection("reports").updateOne({
            "_id": reportId
        },{"status": true})
        await client.close();
        return result;
    } catch(err){
        throw err;
    }  
} 
module.exports = {
    postVote: postVote,
    postReport: postReport,
    getVote: getVote,
    getReport:getReport,
    setReport:setReport
}