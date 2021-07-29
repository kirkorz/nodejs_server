const Dbquery = require('../mongodbquery/votedb');
const Dbquery2 = require('../mongodbquery/questiondb');

let makeVote =  async(req,res) => {
    try{
        if(req.decoded['role'] != 'user'){
            return res.status(500).json('e');    
        }
        await Dbquery.postVote(req.decoded['id'],req.body.objectId,req.body.upVote);
        const result = await Dbquery2.getQuestions_ID(req.body.objectId);
        return res.status(200).json(result);
    } catch(e){
        return res.status(500).json(error);
    }
}
let makeReport = async(req,res)=>{
    try{
        if(req.decoded['role'] != 'user'){
            return res.status(500).json('e');    
        }
        const result = await Dbquery.postReport(req.decoded['id'],req.body.objectId,req.body.content)
        return res.status(200).json(result);
    } catch(e){
        return res.status(500).json(e);
    }
}
let getVote = async(req,res) => {
    try{
        const result = await Dbquery.getVote(req.decoded['id'],req.body.objectId)
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}
let getReport = async(req,res) => {
    try{
        const result = await Dbquery.getReport(req.body.skip,req.body.limit)
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}
let setReport = async(req,res) => {
    try{
        const result = await Dbquery.setReport(req.body.reportId)
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
    }
}
module.exports = {
    makeVote: makeVote,
    makeReport: makeReport,
    getVote: getVote,
    getReport:getReport,
    setReport:setReport
}