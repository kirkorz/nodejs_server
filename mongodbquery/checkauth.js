const { MongoClient } = require('mongodb');
const auth = require('../middleware/auth');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const client = new MongoClient(uri, { useUnifiedTopology: true } );

let authquery = async (username, password) => {
    try{
        await client.connect();
        let user = await client.db("ptud-15").collection("users").findOne({'username':username});
        if(user){
            return true
        } else{
            return false
        }
    }
    catch(err){
        console.log(err)
    }
    finally{
        await client.close();
        return false;
    }
}
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

module.exports = {
    authquery:authquery,
}