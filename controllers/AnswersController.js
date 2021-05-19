const Dbquery = require('../mongodbquery/answerdb');


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
        const result = await Dbquery.postAnswers(req.body);
        return res.status(200).json(result);
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
    postAnswers:postAnswers,
    getAnswers : getAnswers,
    deleteAnswers: deleteAnswers
}