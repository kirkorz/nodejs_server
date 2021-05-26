const Dbquery = require('../mongodbquery/votedb')

let makeVote =  async(req,res) => {
    try{
        req.body.userId = req.decoded['id'];
        const result = await Dbquery.postVotes(req.body);
        return res.status(200).json(result);
    } catch(error){
        console.log(error);
        return res.status(500).json(error);
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
    // getVote: getVote
}