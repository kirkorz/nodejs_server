const Dbquery = require('../mongodbquery/answerdb');
const axios = require('axios');


let getAnswers = async(req,res) =>{
    try{
        const result = await Dbquery.getAnswers(req.params.nodeId,req.body.skip,req.body.limit,req.body.noibat);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}

let postAnswers = async(req,res) =>{
    try{
        if(req.decoded['role']!='user'){
            return res.status(500).json('e');
        }
        const result = await Dbquery.postAnswers(req.decoded['id'],req.body.nodeId,req.body.comment);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let deleteAnswers = async(req,res)=>{
    try{
        if(req.decoded['role']!= 'user'){
            return res.status(500).json('e')
        }
        const result = await Dbquery.deleteAnswers(req.decoded['id'],req.body.commentId);
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
