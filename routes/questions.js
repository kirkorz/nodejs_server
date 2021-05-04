var express = require('express');
var router = express.Router();
const QuestionsController = require("../controllers/QuestionsController");

router.get("/questions/private",QuestionsController.getQuestions_user);
router.post("/questions",QuestionsController.postQuestions);
router.delete("/questions/:questionsId",QuestionsController.deleteQuestions);
router.put("/questions/:questionsId",QuestionsController.putQuestions);

module.exports = router;
  