const { MongoClient } = require('mongodb');
const auth = require('../middleware/auth');
const uri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
const client = new MongoClient(uri, { useUnifiedTopology: true } );

let authquery = async (username, password) => {
    try{
        await client.connect();
        const user = await client.db("ptud-15").collection("users").findOne({'username':username});
        console.log(user);
        return user;
    }
    catch(err){
        console.log(err)
    }
    finally{
        await client.close();
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