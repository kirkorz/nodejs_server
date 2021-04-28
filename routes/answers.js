var express = require('express');
var router = express.Router();
const AnswersController = require("../controllers/AnswersController");
// const AuthMiddleWare = require("../middleware/auth")


router.post("/answers",AnswersController.postAnswers);
  
module.exports = router;
  