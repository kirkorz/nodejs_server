const Dbquery = require('../mongodbquery/questiondb')

let getQuestions_user = async(req,res) =>{
    try{
        req.body.user_id = req.decoded['id'];
        const result = await Dbquery.getQuestions_user(req.body)
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let postQuestions = async(req,res) => {
    try{
        req.body.user_id = req.decoded['id'];
        const result = await Dbquery.postQuestions(req.body)
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getQuestions_Id = async(req,res) => {
    try{
        req.body.id = req.params.questionsId;
        const result = await Dbquery.getQuestions_ID(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getQuestions_all = async(req,res) => {
    try{
        // req.body.skip = 0;
        // req.body.limit = 5;
        const result = await Dbquery.getQuestions_all(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let deleteQuestions = async(req,res)=>{
    try{
        req.body.user_id = req.decoded['id'];
        req.body.questionsId = req.params.questionsId;
        const result = await Dbquery.deleteQuestions(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}

let putQuestions = async(req,res)=>{
    try{
        req.body.user_id = req.decoded['id'];
        req.body.questionsId = req.params.questionsId;
        const result = await Dbquery.putQuestions(req.body);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}

let searchQuestions = async(req,res) => {
    try{
        const result = await Dbquery.getQuestions_text(req.body); 
        return res.status(200).json(result);
    } catch (error){
        return res.status(500).json(error);
    }
}

let searchQuestionsbytags = async(req,res) => {
    try{
        const result = await Dbquery.getQuestions_tag(req.body); 
        return res.status(200).json(result);
    } catch (error){
        console.log(error);
        return res.status(500).json(error);
    }
}
module.exports = {
    getQuestions_user:getQuestions_user,
    postQuestions:postQuestions,
    getQuestions_Id:getQuestions_Id,
    getQuestions_all:getQuestions_all,
    deleteQuestions:deleteQuestions,
    putQuestions:putQuestions,
    searchQuestions:searchQuestions,
    searchQuestionsbytags:searchQuestionsbytags
}