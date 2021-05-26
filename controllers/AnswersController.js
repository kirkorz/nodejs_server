const Dbquery = require('../mongodbquery/answerdb');
const axios = require('axios');


let getAnswers = async(req,res) =>{
    try{
        const result = await Dbquery.getAnswers(req.body);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

let postAnswers = async(req,res) =>{
    try{
        req.body.user_id =  req.decoded['id'];
        const flag = await axios.post('http://localhost:3000/text',{
            "content": "ASD asd"
            })
        if(flag.data.status){
            const result = await Dbquery.postAnswers(req.body);
            return res.status(200).json(result);
        }
        throw err;
    } catch(error){
        return res.status(500).json(error);
    }
}
let deleteAnswers = async(req,res)=>{
    try{
        req.body.user_id = req.decoded['id'];
        const result = await Dbquery.deleteAnswers(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
module.exports = {
    deleteAnswers:deleteAnswers,
    postAnswers:postAnswers,
    getAnswers : getAnswers,
}
