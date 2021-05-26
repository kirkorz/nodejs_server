var express = require('express');
var router = express.Router();
const VotesController = require("../controllers/VotesController");

router.post("/votes/vote",VotesController.makeVote);
// router.get("/votes",VotesController.getVote);
// router.post("/votes/unvote",VotesController.unVotes);
  
module.exports = router;
  