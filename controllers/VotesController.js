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
        console.log(e);
        return res.status(500).json(error);
    }
}

let makeReport = async(req,res)=>{
    try{
        if(req.decoded['role'] != 'user'){
            return res.status(500).json('e');    
        }
        const result = await Dbquery.postReport(req.decoded['id'],objectId)
        return res.status(200).json(result);
    } catch(e){
        console.log(e);
        return res.status(500).json(e);
    }
}
// let getVote = async(req,res) => {
//     try{
//         const result = await Dbquery.getVotes(req.body);
//         return res.status(200).json(result);
//     } catch(error){
//         console.log(error);
//         return res.status(500).json(error);
//     }
// }

module.exports = {
    makeVote: makeVote,
    makeReport: makeReport
    // getVote: getVote
}