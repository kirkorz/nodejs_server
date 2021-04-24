var express = require('express');
var router = express.Router();
const AnswersController = require("../controllers/AnswersController");
const AuthMiddleWare = require("../middleware/auth")


router.get("/answers/public",AnswersController.getAnswers);
router.use(AuthMiddleWare.isAuth);
router.post("/answers",AnswersController.postAnswers);
router.get("/answers",AnswersController.getAnswers1);
  
module.exports = router;
  