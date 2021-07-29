var express = require('express');
var router = express.Router();
const VotesController = require("../controllers/VotesController");

router.post("/vote",VotesController.makeVote);
router.post("/report",VotesController.makeReport);
router.post("/report/status",VotesController.setReport);
router.get("/vote",VotesController.getVote);
router.get("/report",VotesController.getReport);

  
module.exports = router;
  