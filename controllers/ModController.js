const Dbquery = require('../mongodbquery/publicdb');


let makePublic = async(req,res) =>{
    try{
        const result = await Dbquery.makePublic(req.body.questionsId);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}

let deleteQuestion = async(req,res) =>{
    try{
        const result = await Dbquery.deleteQuestion(req.body.questionsId);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
let getUnlive = async(req,res) =>{
    try{
        const result = await Dbquery.getUnlive(1 * req.body.skip,req.body.limit);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}
let addCategory = async(req,res)=>{
    try{
        const result = await Dbquery.addCategory(req.body.questionsId,req.body.category);
        return res.status(200).json(result);
    } catch(error){
        return res.status(500).json(error);
    }
}
module.exports = {
    makePublic:makePublic,
    deleteQuestion : deleteQuestion,
    getUnlive: getUnlive,
    addCategory: addCategory,
}