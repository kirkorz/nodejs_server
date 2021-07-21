var express = require('express');
var router = express.Router();
const VotesController = require("../controllers/VotesController");

router.post("/vote",VotesController.makeVote);
  
module.exports = router;
  