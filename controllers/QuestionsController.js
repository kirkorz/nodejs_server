const Dbquery = require('../mongodbquery/questiondb')


let getQuestions_user = async(req,res) =>{
    try{
        if(req.decoded['role'] != 'user'){
            return res.status(500).json('e')
        }        
        const result = await Dbquery.getQuestions_user(req.decoded['id'])
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let postQuestions = async(req,res) => {
    try{
        if(req.decoded['role']!='user'){
            return res.status(500).json('e')
        }
        const result = await Dbquery.postQuestions(req.decoded['id'],req.body.title,req.body.detail,req.body.tags)
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getQuestions_Id = async(req,res) => {
    try{
        const result = await Dbquery.getQuestions_ID(req.params.questionsId);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getQuestions_all = async(req,res) => {
    try{
        switch (req.body.category) {
            case 'moinhat' || null:
                var result = await Dbquery.getQuestions_all(req.body.skip,req.body.limit);
                break;
            case 'noibat':
                var result = await Dbquery.getQuestions_noibat(req.body.skip,req.body.limit);
                break;
            default:
                var result = await Dbquery.getQuestions_all(req.body.skip,req.body.limit,req.body.category);
                break;
        }
        return res.status(200).json(result);
    } catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
}
let deleteQuestions = async(req,res)=>{
    try{
        if(req.decoded['role']!='user'){
            return res.status.json('e')
        }
        const result = await Dbquery.deleteQuestions(req.decoded['id'],req.params.questionsId);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let searchQuestions = async(req,res) => {
    try{
        const result = await Dbquery.getQuestions_text(req.body.text_search); 
        return res.status(200).json(result);
    } catch (error){
        return res.status(500).json(error);
    }
}

let searchQuestionsbytags = async(req,res) => {
    try{
        const result = await Dbquery.getQuestions_tag(req.body.tags); 
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
    // putQuestions:putQuestions,
    searchQuestions:searchQuestions,
    searchQuestionsbytags:searchQuestionsbytags
}
