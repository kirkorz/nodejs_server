const { MongoClient } = require('mongodb');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'

let getAnswers = async(req,res) =>{
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
    getAnswers:getAnswers,
}