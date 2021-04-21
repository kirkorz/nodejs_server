var express = require('express');
var router = express.Router();
const AnswersController = require("../controllers/AnswersController");
const AuthMiddleWare = require("../middleware/auth")



router.use(AuthMiddleWare.isAuth);
router.get("/answers",AnswersController.getAnswers);
  
module.exports = router;
  