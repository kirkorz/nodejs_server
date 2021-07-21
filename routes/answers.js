var express = require('express');
var router = express.Router();
const AnswersController = require("../controllers/AnswersController");
// const AuthMiddleWare = require("../middleware/auth")


router.post("/",AnswersController.postAnswers);
router.delete("/",AnswersController.deleteAnswers);

//pub
router.get("/:nodeId",AnswersController.getAnswers); 

module.exports = router;