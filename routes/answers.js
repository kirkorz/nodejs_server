var express = require('express');
var router = express.Router();
const AnswersController = require("../controllers/AnswersController");
// const AuthMiddleWare = require("../middleware/auth")


router.post("/answers",AnswersController.postAnswers);
router.delete("/answers",AnswersController.deleteAnswers);
module.exports = router;
  