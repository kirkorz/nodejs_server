var express = require('express');
var router = express.Router();
const Dbquery = require('../mongodbquery/userdb');


/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.send('respond with a resource');
// });

router.get("/:id",async(req,res)=>{
    try{
        const result = await Dbquery.getUser(req.params.id);
        result["password"] = "";
        return res.status(200).json(result);
    } catch(error){
        console.log(error)
        return res.status(500).json(error);
    }
});


module.exports = router;
